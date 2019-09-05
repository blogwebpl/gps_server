import FixedAsset from '../models/fixedAsset';
import OrganizationUnit from '../models/organizationUnit';
import _ from 'lodash';
import asyncForEach from '../functions/asyncForEach';
import mssql from 'mssql';
import mssqlConfig from './quatraConfig';

export default async() => {
	let connection;
	let sqlFixedAssets = [];
	try {
		connection = await new mssql.ConnectionPool(mssqlConfig).connect();
		if (!connection) {
			console.log('import fixed assets - connection error');
			return false;
		}
		const request = new mssql.Request(connection);
		/* eslint-disable */
		const query = await request
			.query('select * from VTD_srodki_trwale_it where Klasyfikacja=\'ST\'order by nr_inwentarzowy');
			// VTD_srodki_trwale_it => SELECT a.Klasyfikacja, a.Nr AS nr_inwentarzowy, a.Nazwa, a.InformacjeDod AS informacje_dod, a.DataUzytk AS data_od, a.DataRozch AS data_do, b.nazwa AS nazwa_uzytkownika, b.symbol AS symbol_uzytkownika, CASE WHEN status = 80 THEN 1 ELSE 0 END AS likwidacja FROM dbo.SrodekTrwaly AS a LEFT OUTER JOIN dbo.StrOrg AS b ON a.IdJednOrg = b.strOrg_Id WHERE (a.IdOsobyOdpow = 1167) AND (a.IdFirmy = 1244) AND (b.idFirmy = 1244)
		/* eslint-enable */
		sqlFixedAssets = query.recordset;
	} catch (err) {
		console.log(err);
		return false;
	}
	mssql.close();

	let mongoFixedAssets = [];
	try {
		mongoFixedAssets = await FixedAsset.find();
	} catch (err) {
		console.log(err);
	}

	let organizationUnits = [];
	try {
		organizationUnits = await OrganizationUnit.find();
	} catch (err) {
		console.log(err);
	}

	await asyncForEach(sqlFixedAssets, async(asset) => {
		const inventoryNumber = asset.nr_inwentarzowy;
		const index = _.findIndex(mongoFixedAssets, { inventoryNumber });
		const organizationUnitIndex = _.findIndex(organizationUnits, { symbol: asset.symbol_uzytkownika });
		const organizationUnit = organizationUnitIndex > -1 ? organizationUnits[organizationUnitIndex]._id : null;
		const document = {
			inventoryNumber,
			name: asset.Nazwa,
			quatraInfo: asset.informacje_dod,
			fromDate: asset.data_od,
			toDate: asset.data_do,
			organizationUnit
		};
		if (index === -1) {
			const newFixedAsset = new FixedAsset(document);
			try {
				await newFixedAsset.save();
			} catch (err) {
				console.log(err);
			}
		}
		if (index > -1) {
			const _id = mongoFixedAssets[index]._id;
			try {
				await FixedAsset.updateOne({ _id }, document);
			} catch (err) {
				console.log(err);
			}
		}
	});
};
