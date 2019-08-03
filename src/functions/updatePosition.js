import clients from './clients';

export default ({
	imei,
	time,
	io,
	gps,
	st
}) => {
	clients.emit({
		type: 'point',
		data: {
			imei,
			time,
			io,
			gps,
			st
		}
	});
};
