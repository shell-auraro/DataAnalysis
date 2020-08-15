'use strict';
exports.main = async (event, context) => {
	const tables = event.tables;
	const cols = ['collection','collection_data','instrument','line','point'];
	const db = uniCloud.database();
	for(let i = 0;i <= cols.length - 1;++i){
		for(let j = 0;j <= tables[i].length - 1;++j){
			const _id = tables[i][j]._id;
			delete tables[i][j]._id;
			await db.collection(cols[i]).where({
				_id: _id
			}).update(tables[i][j]);
		}
	}
	return;
};
