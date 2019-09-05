import mongoose from '../db/mongoose';

const organizationUnitSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	symbol: {
		type: String,
		required: true
	},
	arch: {
		type: Boolean,
		required: true,
		default: false
	}
}, { collection: 'organizationUnits' });

organizationUnitSchema.index({ symbol: 1, arch: 1 }, { unique: true });

const OrganizationUnit = mongoose.models.Eployee || mongoose.model('OrganizationUnit', organizationUnitSchema);

export default OrganizationUnit;
