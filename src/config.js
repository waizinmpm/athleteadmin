
export default {
	scouts: {
		waiting: '回答待ち',
		interested: '興味あり',		
		declined: '不採用/辞退',
		expired: '期限切れ',
		unclaimed: '内定未請求',		
		billed: '請求済',
		payment_confirmed: '入金確認済',
	},
	job_apply: {
		under_review: '検討中',
		declined: '辞退/不採用',
		unclaimed: '内定未請求',
		billed: '請求済',
		payment_confirmed: '入金確認済',
	},
	jobseeker: {
		active: {
			value: 1,
			display: '有効',
		},
		inactive: {
			value: 2,
			display: '無効',
		},
		stopped: {
			value: 3,
			display: '退会',
		},
		deleted: {
			value: 0,
			display: '削除',
		},
	},
	recruiter: {
		private: {
			value: 1, 
			display: '非公開',
		},
		public: {
			value: 2,
			display: '公開',
		},
		stopped: {
			value: 3,
			display: '停止'
		},
		delete: {
			value: 0,
			display: '削除'
		},
	},
	job: {
		delete: {
			value: 0,
			display: '削除'
		},
		public: {
			value: 1,
			display: '公開'
		},
		private: {
			value: 2,
			display: '非公開',
		},
		stopped: {
			value: 3,
			display: '停止'
		},
	},
	job_post: {
		post: 'post',
		draft: 'draft',
	},
	scout_setting: {
		scoutable: 1,
		not_scoutable: 0,
	},
	face_image_private: {
		private: 1,
		public: 0,
	},
	payment_job_type : {
		scout : 'scout',
		job_apply : 'job-apply',
	},
	payment_method : {
		invoice: '請求書',
		credit: 'クレカ',
	},
}