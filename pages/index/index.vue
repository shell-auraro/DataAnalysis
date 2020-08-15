<template>
	<view class="content">
		<!-- icon area start... -->
		<text class="icon fa fa-globe fa-spin"></text>
		<!-- icon area end... -->
		
		<!-- form area start... -->
		<view class="form">
			<view class="usernameArea">
				<text class="usernameIcon fa fa-user"></text>
				<input type="text" placeholder="your username..." v-model="username"/>
			</view>
			
			<view class="passwordArea">
				<text class="passwordIcon fa fa-unlock"></text>
				<input type="password" placeholder="your password..." v-model="password"/>
			</view>
		</view>
		<!-- form area end... -->
		
		<!-- buttons area start... -->
		<view class="buttonArea">
			<view class="register" @click="register">REGISTER</view>
			<view class="login" @click="login(username,password)">LOGIN</view>
		</view>
		<!-- buttons area end... -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:'',
				password:''
			}
		},
		onLoad() {

		},
		methods: {
			//注册模块：
			register(){
				uni.navigateTo({
					url: '../register/register'
				});
			},
			//登录模块：
			login(username,password){
				uni.showLoading({
					title:'登录中...',
					mask:false
				});
				
				uniCloud.callFunction({
					name:'login',
					data:{
						args:{
							username:username,
							password:password
						}
					},
					success: (res) => {
						console.log('success res: ',res);
						if(res.result.code !== 0){
							uni.showToast({
								title:'登录失败！',
								mask:false,
								icon:'none'
							});
							return;
						}
						
						uniCloud.callFunction({
							name:'getUserInfo',
							data:{
								username: res.result.username
							},
							success: (res) => {
								uni.navigateTo({
									url:`../analysis/analysis?userInfo=${encodeURIComponent(JSON.stringify(res.result.data[0]))}`
								});
							},
							fail: (res) => {
								console.log('getUserInfo fail res: ',res);
							},
							complete: () => {
								uni.hideLoading();
							}
						});
					}
				})
			}
		}
	}
</script>

<style>
	@import url("index.css");
</style>
