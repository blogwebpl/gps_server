import Employee from '../models/employee';
import OrganizationUnit from '../models/organizationUnit';
import _ from 'lodash';
import asyncForEach from '../functions/asyncForEach';
import mssql from 'mssql';
import mssqlConfig from './quatraConfig';

export default async() => {
	let connection;
	let sqlEmployees = [];
	try {
		connection = await new mssql.ConnectionPool(mssqlConfig).connect();
		if (!connection) {
			console.log('import employees - connection error');
			return false;
		}
		const request = new mssql.Request(connection);
		/* eslint-disable */
		const query = await request
			.query('select * from VTD_pracownicy order by numer');
			// VTD_pracownicy => SELECT cast( SUBSTRING ( b.numerakt, patindex( '%[^0]%', b.numerakt ), 10 ) as int) AS numer, a.imie,	a.nazwisko,	a.pesel,	c.symbol AS organizacja,	e.nazwa AS stanowisko,	b.dataRozpoczeciaUmowy AS data_zatrudnienia,	b.dataZakonczenia AS data_zwolnienia,	b.DataWaznosciUmowy AS umowa_czasowa,	poczta AS miasto,	g.ulica AS ulica,	g.nrDomu AS nr_domu,	g.nrLokalu aS nr_lokalu,	c.nazwa AS dzial,	h.symbol as centrum FROM PracNaStan b	left outer	JOIN osoba a on  a.osoba_Id = b.osoba_Id	left outer JOIN StrOrg c ON  b.strOrg_Id = c.strOrg_Id	left outer JOIN PracNaStan2StrZatr d ON b.pracNaStan_Id = d.pracNaStan_Id	left outer JOIN StrZatr e ON d.strZatr_Id = e.strZatr_Id  left outer JOIN adresosoby f on f.osoba_id = a.osoba_id  left outer join adres g on g.adres_id = f.adres_id	left join MPK h on h.mpk_Id = b.MPK_idwhere  	f.rodzajadresu_id = 96 and  b.numerakt like '0%'
		/* eslint-enable */
		sqlEmployees = query.recordset;
	} catch (err) {
		console.log(err);
		return false;
	}
	mssql.close();

	let mongoEmployees = [];
	try {
		mongoEmployees = await Employee.find();
	} catch (err) {
		console.log(err);
	}

	let organizationUnits = [];
	try {
		organizationUnits = await OrganizationUnit.find();
	} catch (err) {
		console.log(err);
	}

	await asyncForEach(sqlEmployees, async(asset) => {
		const number = asset.numer;
		const index = _.findIndex(mongoEmployees, { number });
		const organizationUnitIndex = _.findIndex(organizationUnits, { symbol: asset.organizacja });
		const organizationUnit = organizationUnitIndex > -1 ? organizationUnits[organizationUnitIndex]._id : null;
		const document = {
			number,
			name: asset.imie,
			surname: asset.nazwisko,
			organizationUnit,
			jobTitle: asset.stanowisko,
			employmentDate: asset.data_zatrudnienia,
			dismissalDate: asset.data_zwolnienia,
			temporaryDate: asset.umowa_czasowa
		};
		if (index === -1) {
			const newEmployee = new Employee(document);
			try {
				await newEmployee.save();
			} catch (err) {
				console.log(err);
			}
		}
		if (index > -1) {
			const _id = mongoEmployees[index]._id;
			try {
				await Employee.updateOne({ _id }, document);
			} catch (err) {
				console.log(err);
			}
		}
	});
};
