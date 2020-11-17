
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
			display: '停止',
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
		active: {
			value: 1,
			display: '有効',
		},
		inactive: {
			value: 2,
			display: '停止',
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
	questions: {
        question_1: 'What is your name?',
        question_2: 'What is your pet name?',
        question_3: 'What is your favourite food?',
        question_4: 'Who is your favourite person?',
        question_5: 'What is your favourite sport?',
        other: 'Other'
	},
	deactivated:'退会した会員のデータも表示'
}