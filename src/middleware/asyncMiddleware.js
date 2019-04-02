export default (fn) => (req, res) => {
	Promise.resolve(fn(req, res)).catch(
		/* ignore coverage */
		() => res.sendStatus(400)
	);
};
