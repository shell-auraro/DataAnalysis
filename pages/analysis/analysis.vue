<template>
	<view class="content">
		<!-- top area start... -->
		<view class="topArea">
			<view class="avatar" @click="previewAvatar" :style="{backgroundImage:`url(${userInfo.avatar})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center center'}"></view>
			<view class="loadDataBtn" @click="loadData">加载</view>
			<view class="editorableBtn" @click="editorable">{{!isEditorable ? '只读' : '可写'}}</view>
			<view class="saveBtn" @click="save" :style="isEditorable ? {backgroundColor:'#d7ccc8'} : {}">保存</view>
		</view>
		<!-- top area end... -->
		
		<!-- table area start... -->
		<scroll-view scroll-y="true" class="scrollArea">
			<view class="collection">
				<view class="id" @click="showDetail('列名: id 来源: collection数据表')">编号</view>
				<view class="line_id" @click="showDetail('列名: line_id 来源: collection数据表')">线路ID</view>
				<view class="code" @click="showDetail('列名: code 来源: collection数据表')">编码</view>
				<view class="name" @click="showDetail('列名: name 来源: collection数据表')">名称</view>
				<view class="fequency" @click="showDetail('列名: fequency 来源: collection数据表')">频率</view>
				<view class="ip" @click="showDetail('列名: ip_address 来源: collection数据表')">IP</view>
				<view class="create_time" @click="showDetail('列名: create_time 来源: collection数据表')">创建</view>
				<view class="update_time" @click="showDetail('列名: update_time 来源: collection数据表')">更新</view>
				
				<block v-for="(entry,index) in collection" :key="index">
					<block v-if="!isEditorable">	
						<view v-for="(member,mindex) in [entry.id,entry.line_id,entry.code,entry.name,entry.fequency,entry.ip_address,entry.create_time,entry.update_time]" class="cell" @click="showDetail(member)">{{member}}</view>
					</block>
					
					<block v-else>
						<input class="cell" type="text" v-model="entry.id"/>
						<input class="cell" type="text" v-model="entry.line_id"/>
						<input class="cell" type="text" v-model="entry.code"/>
						<input class="cell" type="text" v-model="entry.name"/>
						<input class="cell" type="text" v-model="entry.fequency"/>
						<input class="cell" type="text" v-model="entry.ip_address"/>
						<input class="cell" type="text" v-model="entry.create_time"/>
						<input class="cell" type="text" v-model="entry.update_time"/>
					</block>
					
				</block>
			</view>
			
			<view class="collection_data">
				<view class="id" @click="showDetail('列名: id 来源: collection_data数据表')">编号</view>
				<view class="point_id" @click="showDetail('列名: point_id 来源: collection_data数据表')">点ID</view>
				<view class="temperature" @click="showDetail('列名: temperature 来源: collection_data数据表')">气温</view>
				<view class="humidity" @click="showDetail('列名: humidity 来源: collection_data数据表')">湿度</view>
				<view class="is_deleted" @click="showDetail('列名: is_deleted 来源: collection_data数据表')">删除与否</view>
				<view class="create_time" @click="showDetail('列名: create_time 来源: collection_data数据表')">创建</view>
				<view class="update_time" @click="showDetail('列名: update_time 来源: collection_data数据表')">更新</view>
				
				<block v-for="(entry,index) in collection_data" :key="index">
					<block v-if="!isEditorable">
						<view v-for="(member,mindex) in [entry.id,entry.point_id,entry.temperature,entry.humidity,entry.is_deleted,entry.create_time,entry.update_time]" class="cell" @click="showDetail(member)">{{member}}</view>
					</block>
					
					<block v-else>
						<input class="cell" type="text" v-model="entry.id"/>
						<input class="cell" type="text" v-model="entry.point_id"/>
						<input class="cell" type="text" v-model="entry.temperature"/>
						<input class="cell" type="text" v-model="entry.humidity"/>
						<input class="cell" type="text" v-model="entry.is_deleted"/>
						<input class="cell" type="text" v-model="entry.create_time"/>
						<input class="cell" type="text" v-model="entry.update_time"/>
					</block>
				</block>
			</view>
			
			<view class="instrument">
				<view class="id" @click="showDetail('列名: id 来源: instrument数据表')">编号</view>
				<view class="instrument_code" @click="showDetail('列名: instrument_code 来源: instrument数据表')">仪器编码</view>
				<view class="status" @click="showDetail('列名: status 来源: instrument数据表')">状态</view>
				<view class="channel" @click="showDetail('列名: channel 来源: instrument数据表')">管道</view>
				<view class="point_id" @click="showDetail('列名: point_id 来源: instrument数据表')">点ID</view>
				<view class="create_time" @click="showDetail('列名: create_time 来源: instrument数据表')">创建</view>
				<view class="update_time" @click="showDetail('列名: update_time 来源: instrument数据表')">更新</view>
				
				<block v-for="(entry,index) in instrument" :key="index">
					<block v-if="!isEditorable">
						<view v-for="(member,mindex) in [entry.id,entry.instrument_code,entry.status,entry.channel,entry.point_id,entry.create_time,entry.update_time]" class="cell" @click="showDetail(member)">{{member}}</view>
					</block>
					
					<block v-else>
						<input class="cell" type="text" v-model="entry.id"/>
						<input class="cell" type="text" v-model="entry.instrument_code"/>
						<input class="cell" type="text" v-model="entry.status"/>
						<input class="cell" type="text" v-model="entry.channel"/>
						<input class="cell" type="text" v-model="entry.point_id"/>
						<input class="cell" type="text" v-model="entry.create_time"/>
						<input class="cell" type="text" v-model="entry.update_time"/>
					</block>
				</block>
			</view>
			
			<view class="line">
				<view class="id" @click="showDetail('列名: id 来源: line数据表')">编号</view>
				<view class="line_code" @click="showDetail('列名: line_code 来源: line数据表')">线路码</view>
				<view class="line_name" @click="showDetail('列名: line_name 来源: line数据表')">线路名称</view>
				<view class="line_type" @click="showDetail('列名: line_type 来源: line数据表')">线路类型</view>
				<view class="order_no" @click="showDetail('列名: order_no 来源: line数据表')">订单编号</view>
				<view class="line_level" @click="showDetail('列名: line_level 来源: line数据表')">线路级别</view>
				<view class="parent_id" @click="showDetail('列名: parent_id 来源: line数据表')">父线路</view>
				<view class="create_time" @click="showDetail('列名: create_time 来源: line数据表')">创建</view>
				<view class="update_time" @click="showDetail('列名: update_time 来源: line数据表')">更新</view>
				
				<block v-for="(entry,index) in line" :key="index">
					<block v-if="!isEditorable">
						<view v-for="(member,mindex) in [entry.id,entry.line_code,entry.line_name,entry.line_type,entry.order_no,entry.line_level,entry.parent_id,entry.create_time,entry.update_time]" class="cell" @click="showDetail(member)">{{member}}</view>
					</block>
					
					<block v-else>
						<input class="cell" type="text" v-model="entry.id"/>
						<input class="cell" type="text" v-model="entry.line_code"/>
						<input class="cell" type="text" v-model="entry.line_name"/>
						<input class="cell" type="text" v-model="entry.line_type"/>
						<input class="cell" type="text" v-model="entry.order_no"/>
						<input class="cell" type="text" v-model="entry.line_level"/>
						<input class="cell" type="text" v-model="entry.parent_id"/>
						<input class="cell" type="text" v-model="entry.create_time"/>
						<input class="cell" type="text" v-model="entry.update_time"/>
					</block>
				</block>
			</view>
			
			<view class="point">
				<view class="id" @click="showDetail('列名: id 来源: point数据表')">编号</view>
				<view class="collection_id" @click="showDetail('列名: collection_id 来源: point数据表')">采集点编号</view>
				<view class="code" @click="showDetail('列名: code 来源: point数据表')">编码</view>
				<view class="name" @click="showDetail('列名: name 来源: point数据表')">名称</view>
				<view class="type" @click="showDetail('列名: type 来源: point数据表')">类型</view>
				<view class="instype" @click="showDetail('列名: instype 来源: point数据表')">仪器类型</view>
				<view class="ins_addr" @click="showDetail('列名: ins_addr 来源: point数据表')">仪器地址</view>
				<view class="create_time" @click="showDetail('列名: create_time 来源: point数据表')">创建</view>
				<view class="update_time" @click="showDetail('列名: update_time 来源: point数据表')">更新</view>
				
				<block v-for="(entry,index) in point" :key="index">
					<block v-if="!isEditorable">
						<view v-for="(member,mindex) in [entry.id,entry.collection_id,entry.code,entry.name,entry.type,entry.instype,entry.ins_addr,entry.create_time,entry.update_time]" class="cell" @click="showDetail(member)">{{member}}</view>
					</block>
					
					<block v-else>
						<input class="cell" type="text" v-model="entry.id"/>
						<input class="cell" type="text" v-model="entry.collection_id"/>
						<input class="cell" type="text" v-model="entry.code"/>
						<input class="cell" type="text" v-model="entry.name"/>
						<input class="cell" type="text" v-model="entry.type"/>
						<input class="cell" type="text" v-model="entry.instype"/>
						<input class="cell" type="text" v-model="entry.ins_addr"/>
						<input class="cell" type="text" v-model="entry.create_time"/>
						<input class="cell" type="text" v-model="entry.update_time"/>
					</block>
				</block>
			</view>
		</scroll-view>
		<!-- table area end... -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				isEditorable: true,
				isLoaded:false,
				collection:[],
				collection_data:[],
				instrument:[],
				line:[],
				point:[]
			}
		},
		methods: {
			//预览头像:
			previewAvatar(){
				uni.previewImage({
					count:0,
					current:0,
					indicator:'none',
					loop:true,
					urls:[this.userInfo.avatar]
				});
			},
			//加载数据表:
			loadData(){
				this.isEditorable = false;
				uni.showLoading({
					title:'加载中...',
					mask:false
				});
				
				uniCloud.callFunction({
					name:'loadData',
					success: (res) => {
						const cols = res.result;
						this.collection = cols[0].data;
						this.collection_data = cols[1].data;
						this.instrument = cols[2].data;
						this.line = cols[3].data;
						this.point = cols[4].data;
						this.isLoaded = true;
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
			//数据可读/可写回调:
			editorable(){
				this.isEditorable = !this.isEditorable;
			},
			//更新数据到云数据库:
			save(){
				if(!this.isLoaded)
					return;
					
				if(this.isEditorable){
					uni.showModal({
						content:'当前为可编辑态，无法保存数据，请切换到只读态！',
						showCancel:false,
						title:'提示: '
					});
					return;
				}
				
				
				//TODO: 更新数据:
				uni.showLoading({
					title:'更新中...',
					mask:false
				});
				
				uniCloud.callFunction({
					name:'updateData',
					data:{
						tables:[this.collection,this.collection_data,this.instrument,this.line,this.point]
					},
					success: () => {
						uni.showToast({
							title:'保存成功！',
							mask:false
						});
					},
					fail: () => {
						uni.showToast({
							title:'保存失败！',
							mask:false,
							icon:'none'
						});
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
			//展示详细数据:
			showDetail(data){
				uni.showModal({
					title:'Details:',
					content:data,
					showCancel:false
				});
			}
		},
		onLoad(options) {
			this.userInfo = JSON.parse(decodeURIComponent(options.userInfo));
		}
	}
</script>

<style>
	@import url("analysis");
</style>
