
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
		question_1: 'あなたの夢は？',
		question_2: 'あなた好きな食べ物は？',
		question_3: 'もし1年間、自由にどんなことをしても良いと言われたら、何をしたいですか？',
		question_4: 'あなたの一番尊敬する人物は？',
		question_5: 'あなたの出身地は？',
		question_6: 'もし宝くじで10億円当たったら、どんなことに使いたいですか？',
		question_7: 'あなたの一番好きな場所は？',
		question_8: 'あなたの趣味は？',
		question_9: '初恋の人のファーストネームは？',
		question_10: 'もし透明人間になれるとしたら、どんなことをしたいですか？',
		other: 'その他',
	},
	deactivated:'退会した会員のデータも表示',
	suspended: '停止した会員のデータも表示',
}