'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const tables = ['collection','collection_data','instrument','line','point'];
	const colsData = [];
	for(let i = 0;i <= tables.length - 1;++i){
		colsData[i] = await db.collection(tables[i]).get();
		// console.log('colsData: ',colsData[i]);
		// for(let j = 0;j <= colsData[i].data.length - 1;++j)
			// delete colsData[i].data[j]._id;
	}
	return colsData;
};
