<template>
	<view class="content">
		<!-- icon area start... -->
		<view class="title">REGISTER</view>
		<!-- icon area end... -->

		<scroll-view scroll-y class="form">
			<!-- username inputer area start... -->
			<view class="usernameInputer">
				<view class="usernameInputerLabel">用户名: </view>
				<input class="usernameInputerComponent" type="text" placeholder="input username" v-model="username"></input>
			</view>
			<!-- username inputer area end... -->

			<!-- password inputer area start... -->
			<view class="passwordInputer">
				<view class="passwordInputerLabel">密码: </view>
				<input class="passwordInputerComponent" type="password" placeholder="input password" maxlength="20" v-model="password"></input>
			</view>
			<!-- password inputer area end... -->

			<!-- again password inputer area start... -->
			<view class="againInpter">
				<view class="againInputerLabel">确认密码: </view>
				<input class="againInputerComponent" type="password" placeholder="again password" maxlength="20" v-model="againPassword"></input>
			</view>
			<!-- again password inputer area end... -->

			<!-- nickname inputer area start... -->
			<view class="nicknameInputer">
				<view class="nicknameInputerLabel">昵称: </view>
				<input class="nicknameInputerComponent" type="text" placeholder="input nickname" maxlength="20" v-model="nickname"></input>
			</view>
			<!-- nickname inputer area end... -->

			<!-- gender checker area start... -->
			<view class="genderChecker">
				<view class="genderCheckerLabel">性别: </view>
				<radio-group class="genderCheckerComponentGroup">
					<view>
						<radio @click="watchGender(1)" :checked="male"/><text>男</text>
					</view>
					<view>
						<radio @click="watchGender(2)" :checked="female"/><text>女</text>
					</view>
				</radio-group>
			</view>
			<!-- gender checker area end... -->

			<!-- mobile inputer area start... -->
			<view class="mobileInpter">
				<view class="mobileInputerLabel">电话: </view>
				<input class="mobileInputerComponent" type="number" placeholder="input mobile" maxlength="11" v-model="mobile"></input>
			</view>
			<!-- mobile inputer area end... -->

			<!-- email inputer area start... -->
			<view class="emailInputer">
				<view class="emailInputerLabel">邮箱: </view>
				<input class="emailInputerComponent" type="text" placeholder="input email" v-model="email"></input>
			</view>
			<!-- email inputer area end... -->

			<!-- avatar checker area start.... -->
			<view class="avatarChecker" @click="chooseAvatar" :style="{backgroundImage:`url(${tmpAvatar})`,backgroundRepeat:'no-repeat',backgroundPosition:'center center',backgroundSize:'cover'}">
				{{plus}}
			</view>
			<!-- avatar checker area end.... -->

			<!-- buttons area start... -->
			<view class="buttonArea">
				<view class="submitBtn" @click="submit">SUBMIT</view>
				<view class="resetBtn" @click="reset">RESET</view>
			</view>
			<!-- buttons area end... -->
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				plus: '+',
				male:false,
				female:false,
				username:'',
				password:'',
				againPassword:'',
				nickname:'',
				gender:0,
				mobile:'',
				email:'',
				tmpAvatar: ''
			}
		},
		methods: {
			//提交表单：
			submit(){
				if(this.username.search(new RegExp("^\\d(\\d{8})\\d$")) === -1){
					uni.showModal({
						content:'用户名必须是十个数字！',
						showCancel:false,
						title:'警告！'
					});
					return;
				}
				
				if(this.password.search(new RegExp("\\s")) !== -1 || this.password.search(new RegExp("[a-zA-Z]")) === -1 || this.password.search(new RegExp("\\d")) === -1){
					uni.showModal({
						content:'密码必须包含英文字符和数字，并且不能有空白符参与！',
						showCancel:false,
						title:'警告！'
					});
					return;
				}
				
				if(this.againPassword !== this.password){
					uni.showModal({
						content:'确认密码与密码不一致！',
						showCancel:false,
						title:'警告！'
					});
					return;
				}
				
				if(this.nickname === ''){
					uni.showModal({
						content:'昵称不能为空！',
						showCancel:false,
						title:'警告'
					});
					return;
				}
				
				if(this.gender === 0){
					uni.showModal({
						content:'您未选择性别！',
						showCancel:false,
						title:'警告'
					});
					return;
				}
				
				if(this.mobile.search(new RegExp("(\\d{11})")) === -1){
					uni.showModal({
						content:'电话号码格式非法！',
						showCancel:false,
						title:'警告！'
					});
					return;
				}
				
				if(this.email.search(new RegExp("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"))){
					uni.showModal({
						content:'邮箱格式非法！',
						showCancel:false,
						title:'警告！'
					});
					return;
				}
				
				if(this.tmpAvatar === ''){
					uni.showModal({
						content:'您还未选择头像！',
						showCancel:false,
						title:'警告！'
					});
					return;
				}
				
				this.uploadAvatar(this.tmpAvatar);
			},
			//监控性别:
			watchGender(gender){
				this.gender = gender;
				if(gender === 1){
					this.male = true;
					this.female = false;
				}
				
				if(gender === 2){
					this.female = true;
					this.male = false;
				}
			},
			//清空表单:
			reset(){
				this.username = '';
				this.password = '';
				this.againPassword = '';
				this.nickname = '';
				this.male = false;
				this.female = false;
				this.gender = 0;
				this.mobile = '';
				this.email = '';
				this.tmpAvatar = '';
				this.avatar = '';
				this.plus = "+";
			},
			//上传头像:
			uploadAvatar(tmpAvatar) {
				if (tmpAvatar === null || tmpAvatar === undefined || tmpAvatar === '' || (typeof tmpAvatar !== 'string' && !(
						tmpAvatar instanceof String)))
					return;
				uniCloud.uploadFile({
					cloudPath: 'avatar.jpg',
					filePath: tmpAvatar,
					success: (res) => {
						// this.avatar = res.fileID;
						uniCloud.callFunction({
							name:'register',
							data:{
								args:{
									username:this.username,
									password:this.password,
									nickname:this.nickname,
									gender:this.gender,
									mobile:this.mobile,
									email:this.email,
									avatar:res.fileID
								}
							},
							success: (res) => {
								if(res.result.code !== 0){
									uni.showModal({
										content:res.result.msg,
										showCancel:false,
										title:'警告！'
									});
									return;
								}
								
								uni.showToast({
									title:'注册成功！',
									mask:false,
									icon:'success',
									complete: () => {
										uni.navigateBack();
									}
								});
							},
							fail: (res) => {
								uni.showToast({
									title:'注册失败！',
									mask:false,
									icon:'none'
								});
							}
						});
					},
					fail: () => {
						uni.showToast({
							title: '上传头像失败！',
							mask: false,
							icon: 'none'
						});
					}
				});
			},
			//选择头像:
			chooseAvatar() {
				uni.chooseImage({
					count: 1,
					sizeType: 'original',
					sourceType: ['album'],
					success: (res) => {
						uni.showToast({
							title: '选择头像成功！',
							mask: false,
							icon: 'success'
						});

						this.plus = null;
						this.tmpAvatar = res.tempFilePaths[0];
					},
					fail: (res) => {
						uni.showToast({
							title: '选择头像失败！',
							icon: 'none',
							mask: false
						});
					}
				});
			}
		}
	}
</script>

<style>
	@import url("register.css");
</style>
