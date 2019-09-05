import mongoose from '../db/mongoose';

const employeeSchema = new mongoose.Schema({
	number: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	address: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Address'
	},
	employees: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Employee'
	}],
	organizationUnits: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'OrganizationUnit'
	}]
}, { collection: 'phoneNumbers' });

employeeSchema.index({ number: 1 }, { unique: true });

const PhoneNumber = mongoose.models.Eployee || mongoose.model('PhoneNumber', employeeSchema);

export default PhoneNumber;
