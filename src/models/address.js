import mongoose from 'mongoose';
const addressSchema = new mongoose.Schema({
	address: {
		type: String
	}
});

addressSchema.index({ address: 1 }, { unique: true });

const Address = mongoose.models.Address || mongoose.model('Address', addressSchema);

export default Address;
