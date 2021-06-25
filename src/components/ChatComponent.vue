<template>
    <div id="boxchat">
        <div ref="draggableContainer" :class="`box-chat ${isToggled == true ? 'chat_show' : 'chat_hide' }`">  
                <div class="main-chat">
                    <div class="col-4 tab-left float-left">
						<ul class="list-user-search">
							<li class="has-input">
								<div class="search-container">
									<span class="fa fa-search"></span>
									<input @keydown.enter="getUsers" v-model="filter_text" type="text" class="filter-input" placeholder="キーワードを入力" />
								</div>
							</li>
							<li v-if="userListSearching" class="user-list-searching">
								<img width="25" src="/images/loading.gif" alt="loading">
							</li>
						</ul>
                        <transition-group name="list-user" class="list-user" ref="chattables" tag="ul">
                            <li v-for="item in jobs" @click="getMessage(item)" :class="`${getActiveJob(item)}`" v-bind:key="item.management_number">	
                                <div class="status">
                                    <div v-if="online.includes(item.jobseeker_user_id) | online.includes(item.recruiter_user_id)" >
                                    <i class="fa fa-circle text-success"></i>
                                    </div>
                                    <div v-else>
                                    <i class="fa fa-circle" style="color:#e1e1e1"></i>
                                    </div>									
                                </div>
                                <div class="name">
                                    <p>
										<span class="d_name">{{item.management_number}}</span>
										<span class="text-secondary pull-right">{{ item.last_chat_time|last_time }}</span>
									</p>
                                    <p class="txt-vertical-ellipsis">{{item.title}}</p>
                                </div>                               
                                <div class="unread" v-if="item.unread > 0">
                                    <span v-if="item.unread <= 5">{{item.unread}}</span>
                                    <span class="plus" v-else>5+</span>
                                </div>                              
                            </li>
                        </transition-group>
                    </div>
                    <div class="col-8 tab-right float-right">
                        <div class="header-chat">
                            <div class="name" @mousedown.self="dragMouseDown">
                                <span>{{number}}</span>
                                <span class="txt-vertical-ellipsis">{{title}}</span>
								<span class="txt-vertical-ellipsis" style="font-size:12px;">{{showName}}</span>
                            </div>
							<div class="draggable-filler" @mousedown="dragMouseDown"></div>
							<div class="close" @click="closeChatBox">
								<i class="fa fa-times-circle-o" title="Close"></i>
							</div>
                        </div>
                        <div :class="['content-chat',readOnly?'read-only':'']" ref="scrollChat" v-chat-scroll="{always: false, smooth: true}"  @v-chat-scroll-top-reached="scrollTop(channel,current_page)">
                            <div class="chat-history">
                                <div v-if="loading" class="loading d-flex justify-content-center">
                                    <div class="spinner-border text-info">
                                        <span class="sr-only"></span>
                                    </div>
                                </div>
                                <ul class="chat-msg">
                                    <li v-for="message in messages" :key="message.id">
                                        <div :class="`message ${ isSender(message) ? 'my-message float-right' : 'other-message float-left'}`">
											<div v-if="!isSender(message)" class="name">
												<strong>{{ senderName(message) }}</strong>
											</div>
                                            <!-- <div v-html="$options.filters.highlight(message.message, search)"></div> -->
											<pre v-if="message.message_type == 'text'">{{ message.message }}</pre>
											<div v-if="message.message_type == 'file'" :class="`file-message d-flex flex-column align-items-center ${message.expired ? 'file-expired' : ''}`">
												<div>
													<i :class="`fa fa-file-text-o mr-2 ${isSender(message)?'text-white':''}`"></i>{{ message.message|trim_file_message }}
												</div>
												<div class="btn-download" @click="downloadFile(message)" v-if="!message.expired">
													<i class="fa fa-download"></i>&nbsp;ダウンロード
												</div>
											</div>
											<!-- Message delete button -->
											<p class="message-delete" @click="deleteMessage(message)" v-if="false">
												<i class="fa fa-times"></i>
											</p>
                                        </div>
										<!-- Message Time -->
										<div :class="['time',isSender(message) ? 'float-right text-right' : '']">
											<span v-if="isSender(message) && message.status">
												<i :class="`fa fa-check`"></i>
											</span>
											<span>{{ message.created_at|date('%Y-%m-%d %H:%M') }}</span>
											<div v-if="message.expired">
												<span>このファイルのダウンロード期間が過ぎました</span>
											</div>
										</div>
                                    </li>
                                    <div class="clearfix"></div>
                                </ul>
                            </div>
                        </div>
                        <div class="footer-chat">
							<div v-if="typing" class="typing">
								<img width="50" src="/images/loading.gif" alt="loading">
							</div>
							<div class="d-flex" style="padding-top:15px;align-self: flex-end;align-items: center;" v-if="!readOnly">
								<!-- File Input -->
								<i class="btn-attachment fa fa-paperclip" @click="$refs.fileInput.click()" v-if="message_payload.scoutid_or_applyid"></i>
								<input type="file" @change="onFileChange" class="d-none" ref="fileInput">
								<!-- Text Input -->
								<div id="chrom-txtarea" v-if="message_payload.message_type == 'text'">
									<textarea :rows="messageLines" @keyup="userTyping" @keydown.alt.enter="sendMessage" @keydown.ctrl.enter="sendMessage" v-model="message_payload.message" placeholder="メッセージを入力(Shiftで改行)" 
										@input="calcTextareaHeight" :disabled="!message_payload.scoutid_or_applyid" ref="txtMessage">
									</textarea>
								</div>
								<div id="chrom-txtarea" v-else-if="message_payload.message_type == 'file'">
									<div :class="`file-upload-preview badge text-white py-2`" style="width: auto; position: relative;">
										<p class="file-name">{{ message_payload.message }}</p>
										<p class="file-delete" @click="deletePreviewFile">
											<span class="icon icon-times"></span>
										</p>
									</div>
								</div>
								<i class="btn-send fa fa-paper-plane-o" @click="sendMessage" title=""></i>
							</div>
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
import Vue from 'vue';
import { mapGetters } from "vuex";
import JQuery from 'jquery'
let $ = JQuery
Vue.filter('highlight', function(stringToSearch, searchTerm){
	if (searchTerm === '') return stringToSearch;
	var iQuery = new RegExp(searchTerm, "ig");
	return stringToSearch.toString().replace(iQuery, function(matchedText){
		return ('<span class=\'search-highlight\' style=\'background: yellow\'>' + matchedText + '</span>');
	});
});

function buildFormData(formData, data, parentKey) {
	if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
		Object.keys(data).forEach(key => {
			buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
		});
	} else {
		const value = data == null ? '' : data;
		formData.append(parentKey, value);
	}
}

export default {
	name: 'ChatComponent',
	filters: {
		last_time(value) {
			if (!value) return '';
			let v = new Date(value);
			let t = new Date();
			let diff = t - v;
			let diff_days = Math.ceil(diff/(1000 * 60 * 60 * 24)) - 1;
			if (t.getDate() == v.getDate() && t.getMonth() == v.getMonth() && t.getFullYear() == v.getFullYear()) {
				// --Is today
				let h = v.getHours();
				h = h < 10 ? '0'+h : h.toString();
				let m = v.getMinutes();
				m = m < 10 ? '0'+m : m.toString();
				return `${h}:${m}`;
			} else if (diff_days < 8) {
				// --Within week
				const days = [
					'日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'
				];
				const day = v.getDay();
				return days[day];
			} else {
				let m = v.getMonth() + 1;
				m = m < 10 ? '0'+m : m.toString();
				let d = v.getDate();
				d = d < 10 ? '0'+d : d.toString();
				return `${v.getFullYear()}-${m}-${d}`;
			}
		},
		trim_file_message(v) {
			if (v.length > 14) {
				return v.substring(14);
			} else {
				return v;
			}
		},
	},
    data(){
        return {
			jobs: [],
			filter_text: '',
			search: '',
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
			messageLines: 1,
			readOnly: false,
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
					this.scrollMessageBottom();
				}
				// --Reorder user list to show latest chat on top
				this.jobs.forEach(x => {
					if (x.scoutid_or_applyid == data.scoutid_or_applyid && 
						x.type == data.type) {
							x.last_chat_time = data.last_chat_time;
					}
				})
				this.reorderUserList();
            });
            window.socket.on("count-message", (data) => {
				this.jobs.forEach(job => {
					if (job.scoutid_or_applyid == data.scoutid_or_applyid && 
						job.type == data.type){
						job.unread++;
					}
					this.count_all += job.unread;
				});
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
			window.socket.on("scout-status-changed", () => {
				if (this.currentUser.role_id == 1 || this.currentUser.role_id == 2) {
					this.getUsers();
				}
			});
			window.socket.on("message-been-read", data => {
				if (this.message_payload.scoutid_or_applyid == data.scoutid_or_applyid && this.message_payload.type == data.type) {
					this.messages.forEach((message, index) => {
						if (data.message_ids.includes(message.id)) {
							this.messages[index].status = 1;
							this.messages[index].read_time = data.read_time;
							this.scrollMessageBottom();
						}
					})
				}
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
				var element = (document.getElementsByClassName('active-chattable'))[0];
				element.parentNode.scrollTop = element.offsetTop - 30;
			})	
		},
        resetBox(){
            this.$refs.draggableContainer.style.top = 'unset';
            this.$refs.draggableContainer.style.left = 'unset';
		},
		loadAllUsers() {
			if (this.filter_text.length == 0){
				this.getUsers();
			}
		},
        getUsers(){
			let role_id = this.currentUser.role_id;
			let filter_text = encodeURIComponent(this.filter_text);
			this.userListSearching = true;
			this.jobs = [];
			Promise.all([
				// --scout chattables
				this.$api.get(`/v1/chattables/${role_id}/scout?q=${filter_text}`)
				.then(r => Promise.resolve(r.data.data)).catch(error => Promise.reject(error.response)),
				// --jobapply chattables
				this.$api.get(`/v1/chattables/${role_id}/job-apply?q=${filter_text}`)
				.then(r => Promise.resolve(r.data.data)).catch(error => Promise.reject(error.response)),
				// --sponsor chattables
				this.$api.get(`/v1/chattables/${role_id}/sponsor?q=${filter_text}`)
				.then(r => Promise.resolve(r.data.data)).catch(error => Promise.reject(error.response)), 
			])
			.then((r) => {
				this.userListSearching = false;
				this.jobs = r[0].concat(r[1]).concat(r[2]); 
				// this.jobs = r[0].concat(r[2]);
				// --order by created_at of scouts/apply DESC
				this.jobs.sort((a,b) => {
					return new Date(b.o_created_at) - new Date(a.o_created_at);
				})
				this.jobs.forEach(x => {
					if (x.type == 'sponsor') {
						if (x.title == 'jobseeker') {
							x.title = 'アスリートからスポンサー希望';
						} else if (x.title == 'recruiter') {
							x.title = '企業からスポンサー希望';
						}
					}
				});

				if (filter_text.length == 0) {
					window.socket.emit('join', this.currentUser.id);
					this.sumUnRead();
				}
				this.reorderUserList();
			})
			.catch(() => {
				this.userListSearching = false;
			})
        }, 
		reorderUserList() {
			this.jobs.sort((a,b) => {
				let dateA = new Date(a.last_chat_time);
				let dateB = new Date(b.last_chat_time);
				return dateB - dateA;
			});
		},        
        getMessage(model){
			// --Set if message should be read only
			let RO_status = [
				this.$configs.scouts.payment_confirmed,
				this.$configs.sponsor.payment_confirmed,
				this.$configs.job_apply.payment_confirmed,
			];
			this.readOnly = RO_status.includes(model.status);
			this.message_payload.recruiter_id = model.recruiter_id;
			this.message_payload.jobseeker_id = model.jobseeker_id;
			this.message_payload.scoutid_or_applyid = model.scoutid_or_applyid;
			this.message_payload.type = model.type;
			this.deletePreviewFile();

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
				this.messages = r[0].data.reverse();
				this.current_page = r[0].current_page;
				this.last_page = r[0].last_page;
				
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
                if (this.title == 'jobseeker') {
					this.title = 'アスリートからスポンサー希望';
				} else if (this.title == 'recruiter') {
					this.title = '企業からスポンサー希望';
				}
				this.number = meta.job.management_number;
				this.showName = '企：'+ meta.recruiter.recruiter_name + '  ア：' + meta.jobseeker.jobseeker_name;
				this.loading = false;

				this.markAsRead();
				this.scrollMessageBottom();
				this.resetLine();
			})
			.catch(r => {
				console.log('Error when fetching data', r);
			})
            
        },
        unreadMessage(){
			this.jobs.forEach(job => {
				if(job.scoutid_or_applyid == this.message_payload.scoutid_or_applyid && 
					job.type == this.message_payload.type){
					job.unread = 0;
				}
			});
            this.sumUnRead();
        },
        sumUnRead(){
            let sum = 0;
			this.jobs.forEach(job => {
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

			let data = new FormData();
			buildFormData(data, this.message_payload);
			
			// --Save message using API
			this.$api.post('v1/messages', data)
			.then((r) => {
				const message = r.data.data;
				const broadcast = {
					id: message.id,
					recruiter_id: this.message_payload.recruiter_id,
					jobseeker_id: this.message_payload.jobseeker_id,
					speaker_id: this.message_payload.speaker_id,
					speaker_role_id: this.message_payload.speaker_role_id,
					scoutid_or_applyid: this.message_payload.scoutid_or_applyid,
					type: this.message_payload.type,
					message: message.message,
					message_type: this.message_payload.message_type,
					created_at: message.last_chat_time,
					last_chat_time: message.last_chat_time,
					status: 0,
					read_time: null,
				};
				this.messages.push(broadcast);
				// --Broadcast the message payload
				window.socket.emit("chat-message", broadcast);

				this.message_payload.message_type = 'text';
				this.message_payload.message = '';
				this.message_payload.file = null;

				// --Reorder user list to show latest chat on top
				this.jobs.forEach(x => {
					if (x.scoutid_or_applyid == this.message_payload.scoutid_or_applyid && 
						x.type == this.message_payload.type) {
							x.last_chat_time = message.last_chat_time;
					}
				})
				this.reorderUserList();

				// --Send offline user notification mails
				let offlines = [];
				if (!this.online.includes(this.meta.jobseeker_user_id)) {
					offlines.push({
						message_id: message.id,
						from: '運営管理者',
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
						from: '運営管理者',
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
					// console.log(`Sending chat notification mail to: ${x.to}`);
					this.sendMail(x);
					this.resetLine();
				})
			})
			.catch((error) => {
				console.log(error);
			})
        },
		formatDate(date){
			let datx = new Date(date).toLocaleString('en-us', { timeZone: 'Asia/Tokyo' });
			return this.$options.filters.date(datx, '%Y-%m-%d %T');
		},
        scrollTop(channel,page) {
			if (this.current_page > this.last_page) { return }
			
            this.$api.get(`v1/messages/${this.message_payload.type}/${this.message_payload.scoutid_or_applyid}?page=${page+1}`)
            .then(res => {
				const r = res.data;
                this.messages = r.data.reverse().concat(this.messages);
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
		async onFileChange(e) {
			const files =  e.target.files || e.dataTransfer.files;
			const file = files[0];
			const ext = file.name.split(".").pop().toLowerCase();
			// --Check for extension
			const allowed_ext = [
				'html','htm','css','js',
				'jpeg','jpg','png','gif','tiff','bmp',
				'avi','wmv','mpg','mov','swf','mp4','mp3',
				'pdf','txt','docx','xlsx','pptx','zip','csv','doc','xls','ppt','txt',
				'xml','rar','gz','flv','pps','xlr','odt','mkv','tar',
				'log','dat',
			];
			if (!allowed_ext.includes(ext)) {
				await Vue.swal({
					allowOutsideClick: false,
					icon: "warning",
					width: 350,
					title: null,
					html: 'ファイル形式を確認してください。<br> ※アップロードできるファイル形式：<br> html、htm、css、js、jpeg、jpg、png、gif、tiff、bmp、avi、wmv、mpg、mov、swf、mp4、mp3、pdf、txt、docx、xlsx、pptx、zip、csv、doc、xls、ppt、txt、xml、rar、gz、flv、pps、xlr、odt、mkv、tar、log、dat',
					confirmButtonText: '閉じる',
					confirmButtonColor: "#ff5733",
					customClass: {
						confirmButton: 'border-style',
					},
				});
				e.target.value = '';
				return;
			}
			// --Check for filesize
			let size = file.size/1024/1024; // --size in MB
			if (size > 51) {
				await this.$alertService.showWarningDialog(null,'添付できるファイルは50MBまでです',this.$t('common.close'));
				e.target.value = '';
				return;
			}
			
			this.message_payload.file = file;
			this.message_payload.message = file.name;
			this.message_payload.message_type = 'file';
			e.target.value = '';
		},
		deletePreviewFile() {
			this.message_payload.file = null;
			this.message_payload.message_type = 'text';
			this.message_payload.message = '';
		},
		downloadFile(message) {
			if (message.id) {
				this.$api.post(`/v1/messages/file/${message.id}`, {}, { responseType: "arraybuffer" })
				.then((r) => {
					const type = r.headers["content-type"];
					const blob = new Blob([r.data], { type: type, encoding: "UTF-8" });
					const filename = this.$options.filters.trim_file_message(message.message);
					const objectUrl = window.URL.createObjectURL(blob);
					// window.open(objectUrl);
					const link = document.createElement("a");
					link.href = objectUrl;
					link.download = filename;
					link.click();
					setTimeout(function () {
						// For Firefox it is necessary to delay revoking the ObjectURL
						window.URL.revokeObjectURL(objectUrl);
					}, 100);
				})
				.catch(err => {
					console.log(err);
					this.$alertService.showErrorDialog(null,'ファイルが存在しません。');
				});
			}
		},
		async deleteMessage(message) {
			if (!message.id) return;
			const confirm = await this.$alertService.showConfirmDialog(null,'このメッセージを本当に削除しますか？削除後は元に戻すことはできません');
			if (confirm.value) {
				// --Delete message API
				this.$api.delete(`/v1/messages/${message.id}`)
				.then(r => {
					const removed_message = r.data.data;
					// --Remove from messages array
					let i = this.messages.findIndex(x => x.id == message.id);
					if (i > -1) {
						this.messages.splice(i,1);
					}
					// --Broadcast deleted message event
					window.socket.emit("remove-message",removed_message);

					// --Reorder user list to show latest chat on top
					let requireReorder = false;
					this.jobs.forEach(job => {
						if (job.scoutid_or_applyid == removed_message.scoutid_or_applyid && job.type == removed_message.type) {
							// --Update last chat time
							if (removed_message.last_chat_time == job.last_chat_time) {
								job.last_chat_time = removed_message.second_last_chat_time;
								requireReorder = true;
							}
						}
					});
					if (requireReorder) this.reorderUserList();
				})
				.catch(e => {
					console.log(e.response);
				});
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
		addLine() {
			this.messageLines++;
			this.message_payload.message = this.message_payload.message + "\r\n";
		},
		resetLine() {
			this.message_payload.message = '';
			this.messageLines = 1;
		},
		calcTextareaHeight() {
			let lineBreaks = (this.message_payload.message.match(/\n/g)||[]).length;
			if (lineBreaks > 0) { 
				this.messageLines = lineBreaks + 1;
				if(lineBreaks >3 ){
					$("#chrom-txtarea textarea").animate({ scrollTop: $(document).height() -$(window).height() });
				}
			} else if (lineBreaks == 0) {
				this.messageLines = 1;
			}
		},
		scrollMessageBottom() {
			this.$refs.scrollChat.scrollTop = this.$refs.scrollChat.scrollHeight;
		},
	},
	computed: {
		...mapGetters(["currentUser"]),
	},
	watch: {
		filter_text() {
			this.loadAllUsers();
		}
	}
}
</script>
<style lang="scss" scoped>
.col-4 {
	position: relative;
	flex: 0 0 50%;
    max-width: 200px;
}
.col-8 {
	position: relative;
	flex: 0 0 50%;
    max-width:400px;
}
span.search-highlight {
	background: yellow !important;
	color: red;
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
    z-index: 1050;
}
.list-user-move {
	transition: transform 1s;
}
.d-none {
	display: none !important;
}
.text-secondary {
	color: #6c757d !important;
	font-size: 0.8rem !important;
}
.main-chat{
	right: 90px;
	bottom: 20px;
	.tab-right{
		width: 100%;
		padding: 0;
		border-left: 1px solid #e2e2e2;
		max-height: 460px;
		display:flex;
		flex-direction: column;
	}
	.tab-left{
		width: 100%;
		padding: 0;
		margin-top: 5px;
		.list-user-search {
			height: 70px;
		}
		.list-user{
			height: 390px;
			overflow-y: scroll;
		}
	}
	.header-chat{
		width: 100%;
		min-height: 70px;
		max-height: 80px;
		background:#84BE3F;
		padding: 5px;
		display: flex;
		h3{
			margin-top: 15px;
			font-size: 16px;
			color: #fff;
			text-align: center;
		}
		.name{
			margin-left: 15px;
			color: #fff;
			cursor: grabbing;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			p{
				margin: 0;
				font-size: 14px;
				
				font-weight: bold;
			}
			span{
				font-size: 12px;
				cursor: text;
			}
		}
		.close{
			align-self: flex-start;
			text-shadow:unset;
			cursor: pointer;
			&:hover{
				opacity: 1;
			}
		}
		.draggable-filler {
			flex: 1;
			cursor: grabbing;
		}
	}
	.list-user-search {
		margin-bottom: 0px;
		.filter-input {
			width: 100%;
			border: 0;
			line-height: 60px;
			&::placeholder {
				color: color(placeholder);
			}
		}
		li {
			display: flex;
			padding: 7px 10px;
			margin: 0 5px;
			position: relative;
			list-style-type: none;
			border-bottom: 1px solid #e2e2e2;
			transition: 0.3s;
			&:hover{
				cursor: pointer;
				background: #d4cdcd;
			}
			&.has-input {
				padding: 5px 3px;
				border: 0;
				height: 70px;
				position: sticky;
				top: 0px;
				z-index: 99;
				background: white;
				.search-container {
					display: flex;
					align-items: flex-end;
					width: 100%;
					height: 100%;
					border-bottom: 1px solid #e2e2e2;
					span {
						color: #a1a1a1;
						margin: 0px 5px;
						padding-bottom: 23px; 
					}
					input {
						flex: 1 1 auto;
					}
				}
			}
			&.user-list-searching {
				padding: 3px 0px;
				justify-content: center;
				border: 0;
			}
		}
	}
	.list-user{
		.filter-input {
			width: 100%;
			border: 0;
			border-bottom: 1px solid#e2e2e2;
			line-height: 60px; 
			&::placeholder {
				color: #A1A1A1;
			}
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
				top: 25px;
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
				height: 70px;
				position: sticky;
				top: 0px;
				z-index: 99;
				background: white;
				.search-container {
					display: flex;
					align-items: flex-end;
					width: 100%;
					height: 100%;
					span {
						color: #a1a1a1;
						margin: 0px 5px;
						padding-bottom: 23px; 
					}
					input {
						flex: 1 1 auto;
					}
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
			flex: 1;
			p{
				margin: 0;
				font-size: 12px;
				.d_name {
					max-width: 120px;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					display: inline-block;
				}
			}
		}
	}
	.content-chat{
		flex: 1 1 340px;
		&.read-only {
			flex-basis: 400px;
		}
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
				pre {
					min-height: 1rem;
				}
				.file-message {
					display: flex;
					flex-direction: column;
					align-items: center;
				}
				.message-delete {
					display: none;
					position: absolute;
					top: -5px;
					right: -5px;
					width: 20px;
					height: 20px;
					border: 1px solid #919191;
					background: #FFF;
					border-radius: 50%;
					text-align: center;
					line-height: 1.2;
					vertical-align: middle;
					cursor: pointer;
				}
				&:hover > .message-delete {
					display: block;
				}
			}                   
			.my-message{
				background: #59d0ce;
				background: #9bca64;
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
				border-bottom-left-radius: 10px;
				.btn-download {
					background: #F0F0F0;
					margin-top: 5px;
					margin-left: -5px;
					margin-right: -5px;
					margin-bottom: -5px;
					padding: 3px 6px;
					border-bottom-left-radius: 10px;
					cursor: pointer;
					flex: 1;
					align-self: stretch;
					text-align: center;
				}
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
				.btn-download {
					background: #F0F0F0;
					margin-top: 5px;
					margin-left: -5px;
					margin-right: -5px;
					margin-bottom: -5px;
					padding: 3px 6px;
					border-bottom-right-radius: 10px;
					cursor: pointer;
					align-self: stretch;
					text-align: center;
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
		padding: 10px 10px 0px 10px;
		margin-bottom: 10px;
		// display: flex;
		align-items: center;
		textarea{
			width: 90%;
			max-height: 96px;
			padding: 12px 20px;
			border-radius: 5px;	
			border: 1px solid #84BE3F;
            line-height: 17px;
            min-height: 43px;
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
		i.btn-attachment {
			margin-right: 7px;
		}
		i.btn-send {
			margin-left: 10px;
		}
		.typing{
			position: absolute;
			// bottom: 35px;
			margin-bottom: 10px;
		}
		.file-upload-preview {
			margin-top: 15px;
			margin-bottom: 5px;
			max-width: 250px;
			p.file-name {
				max-width: 230px;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-bottom: 0px;
				line-height: 1.2;
			}
			.file-delete {
				position: absolute;
				top: -12px;
				right: -10px;
				width: 20px;
				height: 20px;
				border: 1px solid #919191;
				background: #fff;
				border-radius: 50%;
				text-align: center;
				line-height: 1.9;
				span {
					position: relative;
					cursor: pointer;
				}
			}
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
    z-index: 50;
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
/*fixed for textarea browser support*/
#chrom-txtarea {
    width: 100%;
    margin: 0 auto;
	padding: 1px;
    position: relative;
    clear: both;
    box-sizing: border-box;
    border: 1px solid #84BE3F;
    border-radius: 5px;
}
#chrom-txtarea textarea {
    width: 100%;
    font-family: Arial;
    font-size: 12px;
    line-height: 18px;
	background:transparent;
    border: none !important;
    overflow: auto;
    resize: none;
    display: block;
}
#chrom-txtarea:before, #chrom-txtarea:after {
    display: block;
    height: 5px;
    background-color: #FFF;
    position: absolute;
    left: 1px;
    right: 17px;
    content:'';
}
#chrom-txtarea:before {
    top: 1px;
}
#chrom-txtarea:after {
    bottom: 1px;
}
/*end fixed for textarea browser support*/

*:focus {
    outline: none;
}


</style>
