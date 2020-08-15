'use strict';
exports.main = async (event, context) => {
	return await uniCloud.database().collection('uni-id-users').where({
		username: event.username
	}).get();
};
