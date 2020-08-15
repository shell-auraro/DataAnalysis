'use strict';
const uniID = require('uni-id');
exports.main = async (event, context) => {
	const args = event.args;
	return await uniID.login({
		...args,
		queryField: ['username', 'email', 'mobile']
	});
};
