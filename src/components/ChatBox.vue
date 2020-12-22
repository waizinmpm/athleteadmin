<template>
	<div class="chat-box bg-white border">
	<div class="d-flex flex-column chat-container">
		<div class="border-bottom bg-teal px-2">
			<h4 class="">{{ message_payload.type == 'scout' ? 'スカウト' : '応募者' }} 
				<span class="text-danger btn-close pull-right" @click="closeChatBox">&times;</span><br>
				<small>{{ meta.job_number }} {{ meta.job_title }}</small>
			</h4>
		</div>
		<div class="message-container d-flex flex-column align-items-start p-2"
			ref="scrollChat" v-chat-scroll="{always: false, smooth: true}"  @v-chat-scroll-top-reached="scrollTop(current_page)">
			<div :class="['mt-2', isSender(row) ? 'align-self-end text-right' : '' ]" v-for="(row,i) in messages" :key="i">
				<label :class="['px-2 m-0 badge badge-pill', senderMessageClass(row)]" >
					{{ row.message }}
				</label>
				<p class="m-0 time">{{ row.created_at|date('%m/%d %I:%M %p') }}</p>
			</div>
		</div>

		<div class="d-flex">
			<div class="flex-fill">
				<input type="text" class="form-control" v-model.trim="message_payload.message" @keydown.enter="sendMessage">
			</div>
			<button class="btn btn-primary" @click="sendMessage">Send</button>
		</div>	
	</div>
	</div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
	props: {
		payload: {
			type: Object,
			default: () => {},
		}
	},
	data() {
		return {
			messages: [],
			message_payload: {
				recruiter_id: 0,
				jobseeker_id: 0,
				speaker_id: 0,
				speaker_role_id: 0,
				scoutid_or_applyid: 0,
				type: 'scout',
				message: '',
				created_at: new Date(),
			},
			loggedInUser: {},
			meta: {
				jobseeker_nickname: '',
				jobseeker_name: '',
				recruiter_name: '',
				admin_name: '',
				job_title: '',
			},
			current_page: 1,
		}
	},
	created() {
		this.$api.get('v1/me')
		.then((r) => {
			this.loggedInUser = r.data.data;
			this.message_payload.speaker_id = this.loggedInUser.id;
			this.message_payload.speaker_role_id = this.currentUser.role_id;
		})
		this.message_payload.recruiter_id = this.$props.payload.recruiter_id;
		this.message_payload.jobseeker_id = this.$props.payload.jobseeker_id;
		this.message_payload.scoutid_or_applyid = this.$props.payload.scoutid_or_applyid;
		this.message_payload.type = this.$props.payload.type;
		this.loadMessages();
	},
	mounted() {
		// --Listen for message received
		window.socket.on('channel-chat', (payload) => {
			// console.log('message recrived', payload);
			if (this.isReceiver(payload)) {
				this.messages.push(payload);
			}
		})
	},
	computed: {
		...mapGetters(["currentUser"]),
	},
	methods: {
		isSender(message_payload) {
			return (message_payload.speaker_role_id == this.currentUser.role_id);
		},
		isReceiver(message_payload) {
			let allow = false;
			if (message_payload.speaker_role_id != this.currentUser.role_id) {
					if (this.currentUser.role_id == 1) {
						allow = true;
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
		senderName(message_payload) {
			switch (message_payload.speaker_role_id)
			{
				case 1:
					return this.meta.admin_name;

				case 2:
					return this.meta.recruiter_name;

				case 3:
					// --Todo: jobseeker name should be nickname depending on status
					return this.meta.jobseeker_name;
			}
		},
		senderMessageClass(message_payload) {
			switch (message_payload.speaker_role_id)
			{
				case 1:
					return 'badge-success';

				case 2:
					return 'badge-primary';

				case 3:
					return 'badge-danger';
			}
		},
		sendMessage(e) {
			e.preventDefault();
			if (!this.message_payload.message) { return }
			// --Broadcast the message payload
			window.socket.emit("chat-message", this.message_payload);

			// --Todo: save message using API
			this.$api.post('v1/messages', this.message_payload)
			.then(() => {
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
				this.message_payload.message = '';
			})
			.catch((error) => {
				alert(error.message);
			})	
		},
		loadMessages() {
			Promise.all([
				// --messages
				this.$api.get(`v1/messages/${this.message_payload.type}/${this.message_payload.scoutid_or_applyid}`)
				.then(r => Promise.resolve(r.data.data)).catch(error => Promise.reject(error.response)),
				// --metadata
				this.$api.get(`v1/messages/meta/${this.message_payload.type}/${this.message_payload.scoutid_or_applyid}`)
				.then(r => Promise.resolve(r.data.data)).catch(error => Promise.reject(error.response))
			])
			.then(r => {
				// --messages response
				this.messages = r[0];

				// --metadata response
				let meta = r[1];
				this.meta.jobseeker_nickname = meta.jobseeker.jobseeker_nickname;
				this.meta.jobseeker_name = meta.jobseeker.jobseeker_name;
				this.meta.recruiter_name = meta.recruiter.recruiter_name;
				this.meta.admin_name = meta.admin.name;
				this.meta.job_number = meta.job.job_number;
				this.meta.job_title = meta.job.title;

				this.$refs.scrollChat.scrollTop = this.$refs.scrollChat.scrollHeight ; 
			})
			.catch(() => {
				console.log('Error when fetching data');
			})
		},
		closeChatBox() {
			this.$emit('chatboxClosed', {
				scoutid_or_applyid: this.message_payload.scoutid_or_applyid,
				type: this.message_payload.type,
			});
		},
		scrollTop(page) {
			console.log(page);
			/*
            if(this.current_page > this.last_page){ return }
            api.get(`message/${channel}?page=${page+1}`)
            .then(res => {
                this.messages = res.data.messages.data.reverse().concat(this.messages);
                this.current_page = res.data.messages.current_page;
                this.last_page = res.data.messages.last_page;
            })
            .catch(err => {
                console.log(err);
			});
			this.$refs.scrollChat.scrollTop = 50 ;      
			*/
        },
	}
}
</script>
<style scoped>
.chat-box {
	min-height: 470px;
	height: 450px;
	max-width: 350px;
	width: 350px;
	margin: 0 !important;
}
.d-flex {
	display: flex;
}
.flex-column {
	flex-direction: column;
}
.flex-fill {
	flex: 1 1 auto !important;
}
.border {
	border: 1px solid #dee2e6 !important;
}
.border-bottom {
	border-bottom: 1px solid #dee2e6 !important;
}
.bg-white {
	background-color: #FFF;
}
.chat-container {
	max-height: 100%;
}
.px-2 {
	padding-left: .5rem;
	padding-right: .5rem;
}

.badge {
	font-size: 100%;
	line-height: 1.5;
}
.message-container {
	flex: 1 1 auto;
	min-height: 345px;
	overflow-y: auto;
	padding: 0.5rem;
	align-items: flex-start;
}
.align-self-end {
	align-self: flex-end;
}
small, .small {
	font-size: 60%;
	color: #777;
}
.time {
	font-size: 80%;
}
.btn-close {
	cursor: pointer;
}
.m-0 {
	margin: 0 !important;
}
.mt-2 {
	margin-top: 0.5rem !important;
}
label {
	max-width: 100%;
	white-space: normal;
	text-align: left;
	font-weight: 500 !important;
}

</style>