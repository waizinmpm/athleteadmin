<template>
    <div id="boxchat" @mousedown="dragMouseDown">
        <div ref="draggableContainer" :class="`box-chat ${isToggled == true ? 'chat_show' : 'chat_hide' }`">  
                <div class="main-chat">
                    <div class="col-4 tab-left float-left">
                        <ul class="list-user">
							<li class="has-input">
								<input @keydown.enter="getUsers" v-model="filter_text" type="text" class="filter-input" placeholder="管理番号/タイトル/会員名" />
							</li>
							<li v-if="userListSearching" class="user-list-searching">
								<img width="25" src="@/assets/loading.gif" alt="loading">
							</li>
							<!-- <li class="text-primary is-title">スカウト</li> -->
                            <li v-for="item in scout_jobs" :key="item.index" @click="getMessage(item)" :class="`${getActiveJob(item)}`">	
                                <div class="status">
                                    <div v-if="online.includes(item.jobseeker_user_id) | online.includes(item.recruiter_user_id)" >
                                    <i class="fa fa-circle text-success"></i>
                                    </div>
                                    <div v-else>
                                    <i class="fa fa-circle" style="color:#e1e1e1"></i>
                                    </div>									
                                </div>
								
                                <div class="name">
                                    {{item.management_number}}
                                    <p class="txt-vertical-ellipsis">{{item.title}}</p>
                                </div>                               
                                <div class="unread" v-if="item.unread > 0">
                                    <span v-if="item.unread <= 5">{{item.unread}}</span>
                                    <span class="plus" v-else>5+</span>
                                </div>                              
                            </li>                          
							<!-- <li class="text-primary is-title">応募/問い合わせ</li> -->
							<li v-for="item in apply_jobs" :key="item.index" @click="getMessage(item)" :class="`${getActiveJob(item)}`">
								<div class="status">
									<div v-if="online.includes(item.jobseeker_user_id) | online.includes(item.recruiter_user_id)" >
									<i class="fa fa-circle text-success"></i>
									</div>
									<div v-else>
									<i class="fa fa-circle" style="color:#e1e1e1"></i>
									</div>									
								</div>
								<div class="name">
									{{item.management_number}}
									<p class="txt-ellipsis-1">{{item.title}}</p>
								</div>                               
								<div class="unread" v-if="item.unread > 0">
									<span v-if="item.unread <= 5">{{item.unread}}</span>
									<span class="plus" v-else>5+</span>
								</div>                              
							</li>
                        </ul>
                    </div>
                    <div class="col-8 tab-right float-right">
                        <div class="header-chat">
                            <div class="close" @click="closeChatBox()" >
                                <i class="fa fa-times-circle-o" title="Close"></i>
                            </div>
                            <div class="name">
                                <p>{{number}}</p>
                                <span class="txt-vertical-ellipsis">{{title}}</span>
								<span class="txt-vertical-ellipsis" style="font-size:12px;">{{showName}}</span>
                            </div>
                        </div>
                        <div class="content-chat" ref="scrollChat" v-chat-scroll="{always: false, smooth: true}"  @v-chat-scroll-top-reached="scrollTop(channel,current_page)">
                            <div class="chat-history">
                                <div v-if="loading" class="loading d-flex justify-content-center">
                                    <div class="spinner-border text-info">
                                        <span class="sr-only"></span>
                                    </div>
                                </div>
                                <ul>
                                    <li v-for="message in messages" :key="message.id" :title="message.created_at | date('%Y-%m-%d %I:%M %p')">
                                        
                                        <div :class="`message ${ isSender(message) ? 'my-message float-right' : 'other-message float-left'}`">
											<div v-if="!isSender(message)" class="name">
												<strong>{{ senderName(message) }}</strong>
											</div>
                                            {{ message.message }}
                                        </div>
                                        <div :class="`time ${ isSender(message) ? 'float-right' : ''}`">
                                            {{ message.created_at | date('%Y-%m-%d %I:%M %p') }}
                                        </div>
                                        
                                    </li>
                                    <div class="clearfix"></div>
                                </ul>
                            </div>
                        </div>
                        <div class="footer-chat">
                            <div v-if="typing" class="typing"><img width="50" src="/images/loading.gif" alt="loading"></div>
                            <input @keyup="userTyping" @keydown.enter="sendMessage" v-model="message_payload.message" type="text" placeholder="Type your message">
                            <i class="fa fa-paper-plane-o" @click="sendMessage" title="Press Enter to send"></i>
                        </div>
                    </div>
            </div> 
            
        </div>
        <div class="btn-chat" @dblclick="resetBox">
            <div @click="isToggled = !isToggled">
                <i class="fa fa-comments-o"></i>
                <div class="count-all" v-if="count_all > 0">
                    <span v-if="count_all <= 5">{{count_all}}</span>
                    <span class="plus" v-else>5+</span>
                </div>    
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
	name: 'ChatComponent',
    data(){
        return{
            scout_jobs: null,
			apply_jobs: null,
			filter_text: '',
			userListSearching: false,
            typing: false,
            isToggled: false,
            messages: [],
            online: [],
            current_page: 1,
            last_page: 1,
            channel: null,
            title: null,
            number: null,
			showName: null,
            role: null,
            username: null,
            loading: false,
            count_all: 0,
            positions: {
                clientX: undefined,
                clientY: undefined,
                movementX: 0,
                movementY: 0
			},
			// --Loggedin admin object
			loggedInUser: {},
			message_payload: {
				recruiter_id: 0,
				jobseeker_id: 0,
				speaker_id: 0,
				speaker_role_id: 0,
				scoutid_or_applyid: 0,
				type: '',
				message: '',
				created_at: new Date(),
			},
			meta: {},
        }
    },
    mounted() {
		if (!window.socket.connected) {
			window.socket.connect()
		}
        this.role = this.currentUser.role_id;
        this.getUsers();
        this.listenForSocket();
	},
	created() {
		this.$api.get('v1/me')
		.then(r => {
			this.loggedInUser = r.data.data;
			this.message_payload.speaker_id = this.loggedInUser.id;
			this.message_payload.speaker_role_id = this.currentUser.role_id;
		})
	},
    methods: {
        listenForSocket() {
            window.socket.on("channel-chat", (data) => {
				if (this.isReceiver(data)) {
					this.messages.push(data);
					this.markAsRead();
				}
            });
            window.socket.on("count-message", (data) => {
				if ('scout' == data.type) {
					this.scout_jobs.forEach(job => {
						if(job.scoutid_or_applyid == data.scoutid_or_applyid){
							job.unread++;
						}
						this.count_all += job.unread;
					});
				}
				if ('job-apply' == data.type) {
					this.apply_jobs.forEach(job => {
						if(job.scoutid_or_applyid == data.scoutid_or_applyid){
							job.unread++;
						}
						this.count_all += job.unread;
					});
				}
				this.sumUnRead();
            });
            window.socket.on("usertyping", (data) => {
				if (this.isReceiver(data)) {
					if (!this.typing) this.typing = true;
				}
				setTimeout(() => {
					this.typing = false;
				}, 3000);
            });
            window.socket.on("usernames", (data) => {
                this.online = data;
            });
		},
		isSender(message_payload) {
			return (message_payload.speaker_role_id == this.currentUser.role_id);
		},
		senderName(message_payload) {
			switch (message_payload.speaker_role_id)
			{
				case 1:
					return "運営管理";

				case 2:
					return this.meta.recruiter_name;

				case 3:
					// --Todo: jobseeker name should be nickname depending on status
					return this.meta.jobseeker_name;
			}
		},
		isReceiver(message_payload) {
			let allow = false;
			if (message_payload.speaker_role_id != this.currentUser.role_id) {
					if (this.currentUser.role_id == 1) {
						allow = this.message_payload.scoutid_or_applyid == message_payload.scoutid_or_applyid && 
							this.message_payload.type == message_payload.type;
					} else if (this.currentUser.role_id == 2) {
						allow = this.loggedInUser.id == message_payload.recruiter_id && 
							this.message_payload.scoutid_or_applyid == message_payload.scoutid_or_applyid && 
							this.message_payload.type == message_payload.type;
					} else if (this.currentUser.role_id == 3) {
						allow = this.loggedInUser.id == message_payload.jobseeker_id && 
							this.message_payload.scoutid_or_applyid == message_payload.scoutid_or_applyid && 
							this.message_payload.type == message_payload.type;
					}
			} else {
				allow = false;
			}
			return allow;
		},
		getActiveJob(item) {
			if (this.message_payload.type == item.type && this.message_payload.scoutid_or_applyid == item.scoutid_or_applyid) {
				return 'active-job active-chattable';
			} else {
				return '';
			}
		},
		scrollUserIntoView() {
			this.$nextTick(() => {
				var isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
				var element = (document.getElementsByClassName('active-chattable'))[0];
				if (isSmoothScrollSupported) {
					element.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});    
				} else {
					element.scrollIntoView(false);
				}
			})	
		},
        resetBox(){
            this.$refs.draggableContainer.style.top = 'unset';
            this.$refs.draggableContainer.style.left = 'unset';
        },
        getUsers(){
			let role_id = this.currentUser.role_id;
			let filter_text = encodeURIComponent(this.filter_text);
			this.userListSearching = true;
			this.scout_jobs = [];
			this.apply_jobs = [];
			Promise.all([
				// --scout chattables
				this.$api.get(`/v1/chattables/${role_id}/scout?q=${filter_text}`)
				.then(r => Promise.resolve(r.data.data)).catch(error => Promise.reject(error.response)),
				// --jobapply chattables
				this.$api.get(`/v1/chattables/${role_id}/job-apply?q=${filter_text}`)
				.then(r => Promise.resolve(r.data.data)).catch(error => Promise.reject(error.response))
			])
			.then((r) => {
				this.userListSearching = false;
				this.scout_jobs = r[0];
				this.apply_jobs = r[1];

				if (filter_text.length == 0) {
					window.socket.emit('join', this.currentUser.id);
					this.sumUnRead();
				}
			})
			.catch(() => {
				this.userListSearching = false;
			})
        },         
        getMessage(model){
			
			this.message_payload.recruiter_id = model.recruiter_id;
			this.message_payload.jobseeker_id = model.jobseeker_id;
			this.message_payload.scoutid_or_applyid = model.scoutid_or_applyid;
			this.message_payload.type = model.type;

			Promise.all([
				// --messages
				this.$api.get(`v1/messages/${this.message_payload.type}/${this.message_payload.scoutid_or_applyid}`)
				.then(r => Promise.resolve(r.data)).catch(error => Promise.reject(error.response)),
				// --metadata
				this.$api.get(`v1/messages/meta/${this.message_payload.type}/${this.message_payload.scoutid_or_applyid}`)
				.then(r => Promise.resolve(r.data.data)).catch(error => Promise.reject(error.response))
			])
			.then(r => {
				// --messages response
				this.messages = r[0].data;

				// --metadata response
				let meta = r[1];
				this.username = this.currentUser.role_id == 2 ? meta.jobseeker.jobseeker_name : meta.recruiter.recruiter_name ;
				this.meta = {
					'jobseeker_name': meta.jobseeker.jobseeker_name,
					'recruiter_name': meta.recruiter.recruiter_name,
					'jobseeker_nickname': meta.jobseeker.jobseeker_nick_name,
					'recruiter_nickname': meta.recruiter.recruiter_nick_name,
					'jobseeker_user_id': meta.jobseeker.user_id,
					'recruiter_user_id': meta.recruiter.user_id,
					'jobseeker_email': meta.jobseeker.email,
					'recruiter_email': meta.recruiter.email,
				};
                this.title = meta.job.title;
				this.number = meta.job.management_number;
				this.showName = '企：'+ meta.recruiter.recruiter_name + '  求：' + meta.jobseeker.jobseeker_name;
				this.loading = false;

				this.markAsRead();

				this.$refs.scrollChat.scrollTop = this.$refs.scrollChat.scrollHeight ; 
			})
			.catch(r => {
				console.log('Error when fetching data', r);
			})

            this.$refs.scrollChat.scrollTop = this.$refs.scrollChat.scrollHeight ;   
        },
        unreadMessage(){
			if (this.message_payload.type == 'scout') {
				this.scout_jobs.forEach(job => {
					if(job.scoutid_or_applyid == this.message_payload.scoutid_or_applyid){
						job.unread = 0;
					}
				});
			}
			if (this.message_payload.type == 'job-apply') {
				this.apply_jobs.forEach(job => {
					if(job.scoutid_or_applyid == this.message_payload.scoutid_or_applyid){
						job.unread = 0;
					}
				});
			}
            this.sumUnRead();
        },
        sumUnRead(){
            let sum = 0;
			this.scout_jobs.forEach(job => {
				sum += job.unread
			});
			this.apply_jobs.forEach(job => {
				sum += job.unread
			});
            this.count_all = sum;
        },
        markAsRead() {
            this.$api.post(`/v1/messages/read/${this.message_payload.type}/${this.message_payload.scoutid_or_applyid}/${this.currentUser.role_id}`)
            .then(() => {
                this.unreadMessage();
            })
            .catch(err => {
                console.log(err);
			});
        },
        userTyping(){
            window.socket.emit('typing', {
				speaker_role_id: this.message_payload.speaker_role_id,
				jobseeker_id: this.message_payload.jobseeker_id,
				recruiter_id: this.message_payload.recruiter_id,
				scoutid_or_applyid: this.message_payload.scoutid_or_applyid,
				type: this.message_payload.type,
			});
        },
        sendMessage(e){
            e.preventDefault();
			if (this.message_payload.message == '' ) { return }

			this.message_payload.created_at = Date.now();
			
			// --Save message using API
			this.$api.post('v1/messages', this.message_payload)
			.then((r) => {
				this.messages.push({
					recruiter_id: this.message_payload.recruiter_id,
					jobseeker_id: this.message_payload.jobseeker_id,
					speaker_id: this.message_payload.speaker_id,
					speaker_role_id: this.message_payload.speaker_role_id,
					scoutid_or_applyid: this.message_payload.scoutid_or_applyid,
					type: this.message_payload.type,
					message: this.message_payload.message,
					created_at: Date.now(),
				});
				// --Broadcast the message payload
				window.socket.emit("chat-message", this.message_payload);
				this.message_payload.message = '';

				const message = r.data.data;
				// --Send offline user notification mails
				let offlines = [];
				if (!this.online.includes(this.meta.jobseeker_user_id)) {
					offlines.push({
						message_id: message.id,
						from: '運営管理',
						to: this.meta.jobseeker_email,
						to_name: this.meta.jobseeker_name,
						date: Date.now(),
						number: this.number,
						title: this.title,
						jobseeker_email: this.meta.jobseeker_email,
						recruiter_email: this.meta.recruiter_email,
						receiver_role_id: 3,
					})
				}
				if (!this.online.includes(this.meta.recruiter_user_id)) {
					offlines.push({
						message_id: message.id,
						from: '運営管理',
						to: this.meta.recruiter_email,
						to_name: this.meta.recruiter_name,
						date: Date.now(),
						number: this.number,
						title: this.title,
						jobseeker_email: this.meta.jobseeker_email,
						recruiter_email: this.meta.recruiter_email,
						receiver_role_id: 2,
					})
				}
				offlines.forEach(x => {
					this.sendMail(x);
				})
			})
			.catch((error) => {
				console.log(error);
			})
        },
        scrollTop(channel,page) {
			if (this.current_page > this.last_page) { return }
			
            this.$api.get(`v1/messages/${this.message_payload.type}/${this.message_payload.scoutid_or_applyid}?page=${page+1}`)
            .then(res => {
				const r = res.data;
                this.messages = r.data.concat(this.messages);
                this.current_page = r.current_page;
                this.last_page = r.last_page;
            })
            .catch(err => {
                console.log(err);
			});
            this.$refs.scrollChat.scrollTop = 50 ;      
        },
        // --This method is called by parent component
        resetChatMessage(payload){
			if (payload.scoutid_or_applyid == this.message_payload.scoutid_or_applyid && 
				payload.type == this.message_payload.type) {
				this.message_payload.scoutid_or_applyid = 0;
				this.meta = {
					'jobseeker_name': '',
					'recruiter_name': '',
					'jobseeker_nickname': '',
					'recruiter_nickname': '',
					'jobseeker_user_id': 0,
					'recruiter_user_id': 0,
					'recruiter_email': '',
					'jobseeker_email': '',
				};
                this.title = '';
				this.number = '';
				this.showName = '';
				this.messages = [];
			}
		},
        dragMouseDown: function (event) {
            this.positions.clientX = event.clientX
            this.positions.clientY = event.clientY
            document.onmousemove = this.elementDrag
            document.onmouseup = this.closeDragElement
        },
        elementDrag: function (event) {
            event.preventDefault()
            this.positions.movementX = this.positions.clientX - event.clientX
            this.positions.movementY = this.positions.clientY - event.clientY
            this.positions.clientX = event.clientX
            this.positions.clientY = event.clientY
            this.$refs.draggableContainer.style.top = (this.$refs.draggableContainer.offsetTop - this.positions.movementY) + 'px'
            this.$refs.draggableContainer.style.left = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX) + 'px'
        },
        closeDragElement () {
            document.onmouseup = null
            document.onmousemove = null
		},
		closeChatBox() {
			this.messages = [];
			this.title = '';
			this.number = '';
			this.showName = '';
			this.isToggled = !this.isToggled;
			this.message_payload.recruiter_id = 0;
			this.message_payload.jobseeker_id = 0;
			this.message_payload.scoutid_or_applyid = 0;
		},
		sendMail(receiver){
			this.$api.post('v1/messages/send-mail', receiver)
			.then(() => {})
			.catch((e) => {
				console.log(e);
			})
		},
	},
	computed: {
		...mapGetters(["currentUser"]),
	},
}
</script>
<style lang="scss" scoped>
.col-4 {
	position: relative;
	flex: 0 0 33.333333%;
    max-width: 33.333333%;
}
.col-8 {
	position: relative;
	flex: 0 0 66.666667%;
    max-width: 66.666667%;
}
input:focus{
    outline: none;
}
.chat_show{
    display: block;
    animation: bounce-in .1s;
}
.chat_hide{
    display: none;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
.box-chat{
    background: white;
    box-shadow: 2px 2px 5px 0px #7b7b7b;
    position: fixed;
    right: 90px;
    bottom: 20px;
    width: 600px;
    height: 460px;
    z-index: 9;
}
    .main-chat{
        right: 90px;
        bottom: 20px;
        .tab-right{
            padding: 0;
            border-left: 1px solid #e2e2e2;
        }
        .tab-left{
			width: 100%;
            padding: 0;
            margin-top: 5px;
            .list-user{
                height: 410px;
                overflow-y: scroll;
            }
        }
        .header-chat{
            width: 100%;
            height: 70px;
            background:#84BE3F;
            padding: 5px;
            h3{
                margin-top: 15px;
                font-size: 16px;
                color: #fff;
                text-align: center;
            }
            .name{
                margin-left: 15px;
                color: #fff;
                p{
                    margin: 0;
                    font-size: 14px;
                    
                    font-weight: bold;
                }
                span{
                    font-size: 12px;
                }
            }
            .close{
                text-shadow:unset;
                &:hover{
                    opacity: 1;
                }
            }
        }
        .list-user{
			.filter-input {
				width: 100%;
				border: 0;
				border-bottom: 1px solid#e2e2e2;
			}
            li{
                display: flex;
                padding: 7px 10px;
                margin: 0 5px;
                position: relative;
                list-style-type: none;
                border-bottom: 1px solid #e2e2e2;
                transition: 0.3s;
                &.active{
                    background: #84BE3F;
                    color: #fff;
                    
                    &:hover{
                        background: #84BE3F;
                        cursor: context-menu;
                    }
                }
                &:hover{
                    cursor: pointer;
                    background: #d4cdcd;
                }
                .unread{
                    position: absolute;
                    top: 15px;
                    right: 0;
                    height: 18px;
                    width: 18px;
                    background: #c51223;
                    border-radius: 50%;
                    span{
                        position: absolute;
                        color: #fff;
                        font-size: 9px;
                        left: 34%;
                        top: 2px;
                    }
                    .plus{
                        left: 29%;
                    }
                }
				&.has-input {
					padding: 7px 3px;
					border: 0;
					&:hover {
						background: transparent;
					}
				}
				&.is-title {
					padding: 7px 3px;
					&:hover {
						cursor: default;
						background: transparent;
					}
				}
				&.user-list-searching {
					padding: 3px 0px;
					justify-content: center;
					border: 0;
				}
            }
            .name{
                margin-left: 5px;
                p{
                    margin: 0;
                    font-size: 12px;
                }
            }
        }
        .content-chat{
            height: 340px;
            overflow-y: scroll;  
            .chat-history{
                .loading{
                    margin-top: 40%;
                }
                padding: 10px;
                ul{
                    li{
                        list-style-type: none;
                    }
                }
                .message{
                    clear: both;
                    padding: 5px;
                    max-width: 230px;
                    font-size: 13px;
                }                   
                .my-message{
                    background: #59d0ce;
                    background: #9bca64;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    border-bottom-left-radius: 10px;
                }
                .other-message{
                    background: #d0d0d0;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    border-bottom-right-radius: 10px;
                    .name{
                        color: #84BE3F;
                        font-size: 11px;
                    }
                }
                .time{
                    clear: both;
                    margin-bottom: 15px;
                    font-size: 10px;
                    color: #888888;
                }

            }
        }
        .footer-chat{
            padding: 5px 10px;
            input{
                padding: 7px 20px;
                width: 80%;
                border-radius: 20px;
                border: 1px solid #84BE3F;
            }
            i{
                margin-left: 10px;
                font-size: 18px;
                color: #84BE3F;
                padding: 10px;
                &:hover{
                    color: #fff;
                    background: #84BE3F;
                    border-radius: 20px;
                    cursor: pointer;
                }
            }
            .typing{
                position: absolute;
                bottom: 35px;
            }
        }
    }

.btn-chat{
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 20px;
    right: 20px;
    border-radius: 50%;
    background:#27a09e;
    background:#84BE3F;
    i{
        font-size: 40px;
        padding: 10px;
        color:#fff;
    }
    .count-all{
        position: absolute;
        background: #c51223;
        right: 0px;
        top: -5px;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        span{
            font-size: 11px;
            color: #fff;
            position: absolute;
            left: 34%;
            top: 2px;
        }
        .plus{
            left: 20%;
        }
    }
}
.active .unread{
    display: none;
}
.active-job {
	background: #F0F0F0;
}
</style>
