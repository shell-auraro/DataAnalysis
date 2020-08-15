//传感器DTU模块数据获取:
export const DTU = (address,result)=>{
	if(address === null || address === undefined || typeof address !== 'object' || Object.keys(address).length === 0)
		return {msg:'DTU 接口传入参数非法！'};
	uni.request({
		url:`http://${address.ip}:address.port`,
		dataType:'json',
		method:'GET',
		success: (res) => {
			result.data = res.result;
		},
		fail: (res) => {
			console.log('DTU fail res: ',res);
		}
	});
}