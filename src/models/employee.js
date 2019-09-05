import mongoose from '../db/mongoose';

const employeeSchema = new mongoose.Schema({
	number: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},
	organizationUnit: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'OrganizationUnit',
		required: false
	},
	jobTitle: {
		type: String,
		required: true
	},
	employmentDate: {
		type: Date,
		required: true
	},
	dismissalDate: {
		type: Date,
		required: false
	},
	temporaryDate: {
		type: Date,
		required: false
	}
}, { collection: 'employees' });

employeeSchema.index({ number: 1 }, { unique: true });

const Employee = mongoose.models.Eployee || mongoose.model('Employee', employeeSchema);

export default Employee;
