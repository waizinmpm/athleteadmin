<template>
    <div class="pb-4">
        <form enctype="multipart/form-data">
        <!-- self-intro -->
        <div
            class="row tab-content introduction-content mb-3 m-0"
            id="selfIntroEdit"
            v-if="!selfIntroEdit && showDetails"
        >
            <div class="col-md-12">
                <div class="tit-box">
                    <h3 class="profile-edit-tit" >スカウト待ち人材検索用自己紹介</h3>
                    <p class="profile-edit-txt" @click="editBox('selfIntroEdit','open')" v-if="edit_page">
                        <span class="icon icon-edit"></span>編集
                    </p>
                </div>
                <div class="row movie-row">
                    <div class="col-md-7">
                        <div class="card-carousel row mt-3">
                            <!--image sliders-->
                            <transition name="list">
                                <div class="col-md-9 pr-0">
                                    <div class="row col-md-12 face-img-block pr-0">
                                        <img v-if="currentImage" :src="currentImage" alt="faceimage" @click="imagePopup(currentImage)" />
                                    </div>
                                    <div class="row col-md-12 pr-0">
                                        <div class="col-md-4  pr-0 float-right">
                                            <div :class="['face-image', (activeImage == 4) ? 'active' : '']" @click="activateImage('face_image',4) ">
                                                <img :src="selfIntro.face_image_url" alt />
                                                <p class="show-info">顔写真</p> 
                                            </div>
                                        </div>
                                    </div>
                                    <!-- popup images--> 
                                    <div class="img-modal-wrapper" v-if="showModal">
                                        <div class="img-modal-block">
                                            <div class="img-modal-container">
                                                <button class="cross-btn" @click="showModal = false">
                                                    <span class="icon icon-times"></span>
                                                    閉じる
                                                </button>
                                                <img  :src="this.imgUrl" class="img-popup"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                            <!-- <div class="thumbnails col-md-3 pl-0">
                                <transition-group tag="span" name="list">
                                    <span
                                    v-for="(image, index) in  selfIntro.related_images"
                                    :key="image.id"
                                    :class="['thumbnail-image', (activeImage == index) ? 'active' : '']"
                                    @click="activateImage('related',index) "
                                    >
                                    <img :src="image.file_url" class />
                                    </span> 
                                </transition-group>
                                <p class="show-info mt-0">関連画像</p>
                            </div> -->
                            <div class="thumbnails col-md-3  pl-0">
                                <transition-group tag="span" name="list">
                                    <span v-for="(image, index) in  selfIntro.related_images" :key="image.id" :class="['thumbnail-image', (activeImage == index) ? 'active' : '']" @click="activateImage('related',index) ">
                                        <img :src="image.file_url" class="" alt="related-images" />
                                    </span>
                                </transition-group>
                                <span v-for="(n,index) in 4 - selfIntro.related_images.length" :key="n.id" :class="['thumbnail-image', (activeImage == selfIntro.related_images.length + index) ? 'active' : '']" @click="activateImage('related',selfIntro.related_images.length+index) ">
                                    <img :src="defaultImageUrl" class="cursor-pointer" alt="related-images"/>                                           
                                </span>   
                                <p class="show-info mt-0">関連画像</p>
                            </div>
                            <!--end image slider-->
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="mt-3 movie-col">
                            <div v-if="!selfIntroDetails.video">
                                <p class="no-video movie-link">
                                     <img src="/images/youtube.png" alt="動画なし">
                                </p>
                            </div>
                            <div v-if="selfIntroDetails.video">
                                <iframe class="movie-link" :src="selfIntroDetails.video"></iframe>
                            </div>
                        </div>
                        <p class="show-info">関連動画</p>
                        <div class="d-flex align-items-center justify-content-center">
								<a :href="selfIntroDetails.facebook_account" target="_blank" v-if="selfIntroDetails.facebook_account"><img :src="'/images/facebook-old.svg'"  alt="Facebook" width="50" /></a>
								<a :href="selfIntroDetails.twitter_account" target="_blank" v-if="selfIntroDetails.twitter_account"><img :src="'/images/twitter.svg'"  alt="Twitter" width="38" /></a>
								<a :href="selfIntroDetails.ig_account" target="_blank" v-if="selfIntroDetails.ig_account"><img :src="'/images/instagram.svg'"  alt="Instagram" width="50" /></a>
							</div>
                    </div>
                </div>
                <!--info-->
                <dl class="detail-list clearfix">                       
                    <dt class="detail-head">希望職種</dt>
                    <dd class="detail-data"> 
                        <p class="mb-0" v-for="occ in desired_condition.occupation_name" :key="occ.id">
                            {{occ.occupation_name}} 
                        </p>
                        <p  class="mb-0" v-if="desired_condition.occupation_name.length == 0 && desired_condition.desired_occupation_status == 0">未入力</p>
                        <p v-if="desired_condition.desired_occupation_status == 1">こだわらない </p>
                    </dd>
                    <dt class="detail-head">希望勤務地</dt>
                    <dd class="detail-data">
                        <p class="mb-0">
                            <label class="desired-label">第一希望</label>
                            <span v-if="desired_condition.desired_locations_1 != null">{{desired_condition.desired_locations_1}}</span>
                            <span v-else>未入力</span>
                        </p>
                        <p class="mb-0">
                            <label class="desired-label">第二希望</label>
                            <span v-if="desired_condition.desired_locations_2 != null">{{desired_condition.desired_locations_2}}</span>
                            <span v-else>未入力</span>
                        </p>
                        <p class="mb-0">
                            <label class="desired-label">第三希望</label>
                            <span v-if="desired_condition.desired_locations_3 != null">{{desired_condition.desired_locations_3}}</span>
                            <span v-else>未入力</span>
                        </p>
                        <!-- <p class="mb-0">{{selfIntroDetails.desired_location_1}}</p>   
                        <p class="mb-0">{{selfIntroDetails.desired_location_2}}</p>   
                        <p class="mb-0">{{selfIntroDetails.desired_location_3}}</p>
                        <p class="mb-0" v-if="selfIntroDetails.desired_location_1 === null && selfIntroDetails.desired_location_2 === null && selfIntroDetails.desired_location_3 === null">
                            未入力
                        </p> -->
                    </dd>
                </dl>
                <!-- info-->
                <div class="row">
                    <div class="col-md-12">
                        <h6 class="about-tit">自己PR等</h6>
                        <p class="about-box">
                            <pre>{{selfIntro.self_pr}}</pre>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row tab-content introduction-content mb-3 m-0" v-if="selfIntroEdit">
            <div class="col-md-12">
            <div class="tit-box tit-box-edit">
                <h3 class="profile-edit-tit">スカウト待ち人材検索用自己紹介</h3>
                <p class="profile-edit-txt" @click="editBox('selfIntroEdit','close')">
                <span class="icon icon-times"></span>
                {{$t('common.close')}}
                </p>
            </div>
            <label class="info">
                <span class="glyphicon glyphicon-info-sign"></span>「希望職種・希望勤務地→就業希望条件」「語学レベル→経験・資格」にて設定してください。
            </label>
            <!-- <div class="popup-databox">
                <label for class="mb-3">ニックネーム</label>
                <div class="form-group"> 
                    <div class="col-md-6 float-none m-auto">
                        <input type="text" class="form-control" v-model="selfIntro.jobseeker_nick_name" />
                    </div>
                </div>
            </div> -->
            <div class="popup-databox">
                <div class="form-group">
                <label for class="mb-3">顔写真</label>
                <br />
                <span
                    class="label-txt"
                >※JPG、JPEG、PNGいずれかの形式の画像をアップロード可能です。</span>

                <div
                    class="col-md-12 p-0 drag-wrapper mt-2 float-none"
                    @drop.prevent="changeFaceImage($event)"
                    @dragover.prevent
                >
                    <div class="upload-content">
                    <p>
                        <span class="icon icon-upload-img">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        </span>
                    </p>
                    <label for class="pl-3 pr-3">画像をドラッグ&amp;ドロップまたは</label>
                    <div class="upload-btn-wrapper">
                        <span class="btn upload-btn">ファイルを選択</span>
                        <input
                        type="file"
                        class="upload-file"
                        name="face_image"
                        accept="image/x-png, image/jpeg"
                        @change="changeFaceImage($event)"
                        />
                    </div>
                    </div>
                </div>
                </div>

                <div class="row">
                <div class="col-md-7">
                    <div class="face-image-wrapper">
                        <img :src="selfIntro.face_image_url" />
                        <button
                            v-show="selfIntro.face_image_url != defaultImageUrl"
                            type="button"
                            @click="deleteFacImage"
                            class="delete-photo"
                        ><span class="icon icon-times"></span></button>
                    </div>
                </div>
                <div class="col-md-5">
                    <h3 class="intro-tit">TOPページでの写真公開可否</h3>
                    <p class="custom-radio-group">
                    <input
                        type="radio"
                        id="overseas"
                        value="1"
                        name="radio-group"
                        class="custion-radio"
                        v-model="selfIntro.face_image_private_status"
                    />
                    <label for="overseas" class="custom-radio-lable">公開</label>
                    </p>
                    <p class="custom-radio-group">
                    <input
                        type="radio"
                        id="japan"
                        value="0"
                        name="radio-group"
                        checked
                        class="custion-radio"
                        v-model="selfIntro.face_image_private_status"
                    />
                    <label for="japan" class="custom-radio-lable">公開しない</label>
                    </p>
                </div>
                </div>
            </div>
            <!-- @drop.prevent="addFile($event,'drop','profile')" @dragover.prevent -->
            <div class="popup-databox">
                <div class="form-group clearfix">
                <label for class="mb-3">関連画像</label>
                <br />
                <span
                    class="label-txt"
                >※JPEG、PNGいずれかの形式の画像を4枚までアップロード可能です。</span>
                <div
                    class="col-md-12 p-0 mt-2"
                    @drop.prevent="changeRelatedImages($event)"
                    @dragover.prevent
                >
                    <div class="upload-content">
                    <p>
                        <span class="icon icon-upload-img">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        </span>
                    </p>
                    <label for class="pl-3 pr-3">画像をドラッグ&amp;ドロップまたは</label>

                    <div class="upload-btn-wrapper">
                        <button class="upload-btn">ファイルを選択</button>
                        <input
                        type="file"
                        class="upload-file"
                        name="myfile"
                        @change="changeRelatedImages($event)"
                        multiple
                        />
                    </div>
                    </div>
                </div>
                </div>

                <div class="row">
                    <div class="col-md-3" v-for="(path,indx) in selfIntro.related_images" :key="path.id">
                        <img :src="path.file_url" class="profile-edit-img"/>
                        <button type="button" @click="deleteRelatedImage(indx)" class="delete-photo">
                            <span class="icon icon-times"></span>
                        </button>
                    </div>
                    <div v-if="imageError != ''">
                        <span class="error">{{imageError}}</span>
                    </div>
                </div>
            </div>
            <div class="popup-databox">
                <div class="form-group mb-1">
                <label for class="mb-3">関連動画</label>
                <div class="col-md-12 p-0 d-flex float-none">
                    <label for class="label-txt col-md-2 pl-0 mt-2">YouTubeURL</label>
                    <div class="col-md-10">
                        <input
                        type="text"
                        :class="['form-control',$v.selfIntro.video.$error?'is-invalid':'']"
                        v-model.trim="$v.selfIntro.video.$model"
                        />
                        <div class="invalid-feedback">
                            <div class="error" v-if="!$v.selfIntro.video.matchYoutubeUrl">URLの形式が正しくありません</div>
                        </div>
                    </div>
                    <!-- <input type="text" class="form-control ml-3"  v-model="selfIntro.video"> -->
                </div>
                </div>
            </div>

            <div class="popup-databox">
                    <div class="form-group">
                    <label for="" class="mb-3">関連SNS</label>
                    <div class="row">
                        <label class="col-12 col-sm-3 col-md-2 label-txt mt-2">SNS URL</label>
                        <div class="col-12 col-sm-9 col-md-10">
                            <input v-model="selfIntro.sns_account" type="text" class="form-control" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="popup-databox">
                <div class="form-group  mb-1">
                <label for class="mb-3">自己PR</label>

                <div class="col-md-12 p-0 d-flex align-items-center float-none">
                    <textarea v-model="selfIntro.self_pr" class="form-control"></textarea>
                </div>
                </div>
            </div>
            </div>
            <p class="col-md-12 text-center mt-3">
                <span class="btn save-btn" @click="saveSelfIntro">保存する</span>
            </p>
        </div>
        <!-- end self-intro -->

        <!-- basic-info -->
        <div
            class="row tab-content information-content mb-3 m-0"
            id="basicInfoEdit"
            v-if="!basicInfoEdit && showDetails"
        >
            <div class="col-md-12">
                <div class="tit-box">
                    <h3 class="profile-edit-tit">{{$t('jobseekerprofile.basicinfo')}}</h3>
                    <p class="profile-edit-txt" @click="editBox('basicInfoEdit','open')" v-if="edit_page">
                    <span class="icon icon-edit"></span>編集
                    </p>
                </div>
                <dl class="detail-list clearfix">
                    <dt class="detail-head">{{$t('jobseekerprofile.jobseeker_number')}}</dt>
                    <dd class="detail-data" v-if="basicInfo.jobseeker_number != ''">{{basicInfo.jobseeker_number}}</dd>
                    <dd class="detail-data" v-else>未入力</dd>
                    <dt class="detail-head">
                        {{$t('jobseekerprofile.jobseeker_name')}}
                        <span v-if="basicInfo.jobseeker_furigana_name_status == 1" class="private">{{$t('jobseekerprofile.private')}}</span>
                    </dt>
                    <dd class="detail-data" v-if="basicInfo.jobseeker_name != ''">{{basicInfo.jobseeker_name}}</dd>
                    <dd class="detail-data" v-else>未入力</dd>
                    <dt class="detail-head">{{$t('jobseekerprofile.gender')}}
                        <span v-if="basicInfo.gender_status == 1" class="private">{{$t('jobseekerprofile.private')}}</span>
                    </dt>
                    <dd class="detail-data" v-if="basicInfo.gender != '' && basicInfo.gender != null">{{basicInfo.gender}}</dd>
                    <dd class="detail-data" v-else>未入力</dd>
                    <!-- {{checkDOB}} -->
                    <dt class="detail-head">
                        {{$t('jobseekerprofile.date')}}
                        <span v-if="basicInfo.dob_status == 1" class="private">{{$t('jobseekerprofile.private')}}</span>
                    </dt>
                    <!-- <dd class="detail-data" v-if="basicInfo.dob != '' && checkDOB != '0000,00,00'">{{basicInfo.dob[0]}}年 {{basicInfo.dob[1]}}月 {{basicInfo.dob[2]}}日</dd> -->
                    <dd class="detail-data" v-if="basicInfo.dob">{{basicInfo.dob}}</dd>
                    <dd class="detail-data" v-else>未入力</dd>
                    <!-- <dt class="detail-head">{{$t('jobseekerprofile.Language')}}</dt> -->
                    <!-- {{basicInfo}} -->
                    <!--  <dd class="detail-data" v-if="basicInfo.language_name != null">{{basicInfo.language_name}}</dd>
                    <dd class="detail-data" v-else>未入力</dd> -->
                    <dt class="detail-head">
                        {{$t('jobseekerprofile.location')}}
                        <span v-if="basicInfo.current_address_status == 1" class="private">{{$t('jobseekerprofile.private')}}</span>
                    </dt>
                    <dd class="detail-data" v-if="basicInfo.country_id != '' && basicInfo.country_id != null">{{basicInfo.continent_name}}<span v-if="basicInfo.country_name">, {{basicInfo.country_name}}</span></dd>
                    <dd class="detail-data" v-else>未入力</dd>
                    <dt class="detail-head">住所詳細<span class="view-permission">{{$t('jobseekerprofile.admin')}}</span>
                    </dt>
                    <dd class="detail-data" v-if="basicInfo.address != '' && basicInfo.address != null">{{basicInfo.address}}</dd>
                    <dd class="detail-data" v-else>未入力</dd>
                    <dt class="detail-head">{{$t('jobseekerprofile.phone')}}<span class="view-permission">{{$t('jobseekerprofile.admin')}}</span></dt>
                    <dd class="detail-data" v-if="basicInfo.phone != ''">{{basicInfo.phone}}</dd>
                    <dd class="detail-data" v-else>未入力</dd>
                    <dt class="detail-head">{{$t('jobseekerprofile.email')}}<span class="view-permission">{{$t('jobseekerprofile.admin')}}</span></dt>
                    <dd class="detail-data" v-if="basicInfo.email !=''">{{basicInfo.email}}<br /></dd>
                    <dd class="detail-data" v-else>未入力</dd>
                    <dt class="detail-head">{{$t('jobseekerprofile.skype')}}<span class="view-permission">{{$t('jobseekerprofile.admin')}}</span></dt>
                    <dd class="detail-data" v-if="basicInfo.skype_account != '' && basicInfo.skype_account != null">{{basicInfo.skype_account}}<br /></dd>
                    <dd class="detail-data" v-else>未入力</dd>
                    <dt class="detail-head">{{$t('jobseekerprofile.education')}}</dt> 
                    <dd class="detail-data" v-if="basicInfo.final_education != '' && basicInfo.final_education != null">{{basicInfo.final_education}}</dd>
                    <dd class="detail-data" v-else>未入力</dd>
                    <dd class="detail-head">{{$t('jobseekerprofile.status')}}</dd>
                    <dd class="detail-data" v-if="basicInfo.current_situation != '' && basicInfo.current_situation !=null">{{basicInfo.current_situation}}</dd>
                    <dd class="detail-data" v-else>未入力</dd>
                </dl>
                <div class="explation-note">
                    <span class="private">{{$t('jobseekerprofile.private')}}</span>{{$t('jobseekerprofile.details')}}<br>
                    <!-- {{$t('jobseekerprofile.details1')}}<br> -->
                    <span class="view-permission">{{$t('jobseekerprofile.admin')}}</span>{{$t('jobseekerprofile.detailsadmin')}}
                </div>
            </div>
        </div>
        <div class="row tab-content information-content mb-3 m-0" v-if="basicInfoEdit">
            <div class="col-md-12">
            <div class="tit-box tit-box-edit">
                <h3 class="profile-edit-tit">基本情報</h3>
                <p class="profile-edit-txt" @click="editBox('basicInfoEdit','close')">
                <span class="icon icon-times"></span>
                {{$t('common.close')}}
                </p>
            </div>
            <div class="popup-databox">
                <div class="form-group">
                <label for>
                    {{$t('jobseekerprofile.jobseeker_name')}}
                </label>
                <div class="col-md-8 p-0">
                    <input
                    type="text"
                    class="form-control"
                    :class="['form-control',$v.basicInfo.jobseeker_name.$error?'is-invalid':'']"
                    v-model.trim="$v.basicInfo.jobseeker_name.$model"
                    />
                    <div class="invalid-feedback">
                    <div
                        class="error"
                        v-if="!$v.basicInfo.jobseeker_name.required"
                    >{{$t('jobseekerprofile.name_req')}}</div>
                    </div>
                </div>
                </div>
                <div class="form-group">
                <label for>{{$t('jobseekerprofile.furigana')}}</label>
                <span class="status">
                    <input type="checkbox" id="jobseeker_furigana_name_status_id" class="custom-control-input custom-checkbox" v-model="basicInfo.jobseeker_furigana_name_status" />
                    <label for="jobseeker_furigana_name_status_id" class="custom-control-label custom-checkbox-label" style="color:#636363">非公開</label>
                </span>
                <div class="col-md-8 p-0">
                    <input
                    type="text"
                    :class="['form-control',$v.basicInfo.jobseeker_furigana_name.$error?'is-invalid':'']"
                    v-model.trim="$v.basicInfo.jobseeker_furigana_name.$model"
                    />
                    <div class="invalid-feedback">
                    <div
                        class="error"
                        v-if="!$v.basicInfo.jobseeker_furigana_name.required"
                    >{{$t('jobseekerprofile.furigana_req')}}</div>
                    <div
                        class="error"
                        v-if="!$v.basicInfo.jobseeker_furigana_name.isFurigana"
                    >{{$t('jobseekerprofile.furigana_type')}}</div>
                    </div>
                </div>
                </div>
                <div class="form-group gender-group">
                <label for>{{$t('jobseekerprofile.gender')}}</label>
                <span class="status">
                    <input type="checkbox" id="gender_status_id" class="custom-control-input custom-checkbox" v-model="basicInfo.gender_status" />
                    <label for="gender_status_id" class="custom-control-label custom-checkbox-label" style="color:#636363">非公開</label>
                </span>
                <div class="row col-md-7 p-0 m-0">
                    <div class="col-md-4 pl-0">
                    <p class="check-item m-0" transition="fade" @click="checkGender('女性')">
                        <span :class="[basicInfo.gender == '女性'?'fa fa-check':'fa fa-check disabled']"></span>
                        {{$t('jobseekerprofile.female')}}
                    </p>
                    </div>
                    <div class="col-md-4 pl-0">
                    <p class="check-item m-0" transition="fade" @click="checkGender('男性')">
                        <span :class="[basicInfo.gender == '男性'?'fa fa-check':'fa fa-check disabled']"></span>
                        {{$t('jobseekerprofile.male')}}
                    </p>
                    </div>
                </div>
                </div>
                <div class="form-group">
                <label for>{{$t('jobseekerprofile.date')}}</label>
                <span class="status">
                    <input type="checkbox" id="dob_status_id" class="custom-control-input custom-checkbox" v-model="basicInfo.dob_status" />
                    <label for="dob_status_id" class="custom-control-label custom-checkbox-label" style="color:#636363">非公開</label>
                </span>
                <div class="row col-md-7 p-0 m-0">
                    <div class="col-md-4 pl-0">
                        <input type="text" class="form-control" placeholder="生年月日" v-model="basicInfo.dob"/>
                        <!-- <select class="form-control" v-model="basicInfo.dobyears">
                            <option disabled :value="null">年</option>
                            <option v-for="year in 100" :key="year">{{ 1920 + year}}{{' 年'}}</option>
                        </select>
                        </div>
                        <div class="col-md-4 pl-0">
                        <select class="form-control" v-model="basicInfo.dobmonth">
                            <option disabled :value="null">月</option>
                            <option v-for="month in 12" :key="month">{{ month }}{{' 月'}}</option>
                        </select>
                        </div>
                        <div class="col-md-4 pl-0">
                        <select class="form-control" v-model="basicInfo.dobday">
                            <option disabled :value="null">日</option>
                            <option v-for="day in 31" :key="day">{{ day }}{{' 日'}}</option>
                        </select> -->
                    </div>
                </div>
                </div>

                <div class="form-group">
                    <label for>{{$t('jobseekerprofile.location')}}</label>
                    <span class="status"> 
                        <input type="checkbox" id="current_address_status_id" class="custom-control-input custom-checkbox" v-model="basicInfo.current_address_status" />
                        <label for="current_address_status_id" class="custom-control-label custom-checkbox-label" style="color:#636363">非公開</label>
                    </span>
                    <div class="row col-md-7 p-0 m-0">
                        <div class="col-md-4 pl-0">
                            <select v-model.trim="basicInfo.continent_name" @change="getCity()" class="form-control">
                                <option :value="null" v-if="basicInfo.continent_name == null" selected>地域を選択</option>
                                <option selected v-else :value="0">地域を選択</option>
                                <option v-for="country in countries" :key="country.id" v-bind:value="country.continent_name">
                                    {{country.continent_name}}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <select class="form-control" v-model.trim="basicInfo.country_name">
                                <!-- <option value="" v-if="basicInfo.country_name == basicInfo.continent_name" selected>都市を選択</option> -->
                                <option value="">都道府県を選択</option>
                                <option v-for="city in city_list" :key="city.id" v-bind:value="city.country_name">
                                    {{city.country_name}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <!-- <div class="row col-md-7 p-0 m-0">
                        <div class="col-md-4 pl-0">
                        <select
                            v-model.trim="basicInfo.country_name"
                            @change="getCity()"
                            class="form-control"
                        >
                            <option value="0" disabled selected>国・地域を選択</option>
                            <option
                            v-for="country in countries"
                            :key="country.id"
                            v-bind:value="country.country_name"
                            >{{country.country_name}}</option>
                        </select>
                        </div>
                        <div class="col-md-4 pl-0">
                        <select class="form-control" v-model.trim="basicInfo.city_name">
                            <option value="0" disabled selected>都市を選択</option>
                            <option
                            v-for="city in city_list"
                            :key="city.id"
                            v-bind:value="city.city_name"
                            >{{city.city_name}}</option>
                        </select>
                        </div>
                    </div> -->
                </div>
                <div class="form-group">
                <label for>
                    {{$t('jobseekerprofile.loca_details')}}
                    <span class="view-permission">{{$t('jobseekerprofile.admin')}}</span>
                </label>
                <div class="col-md-8 p-0">
                    <textarea class="form-control" v-model="basicInfo.address"></textarea>
                </div>
                </div>
                <div class="form-group">
                <label for>
                    {{$t('jobseekerprofile.phone')}}
                    <span class="view-permission">{{$t('jobseekerprofile.admin')}}</span>
                </label>
                <div class="col-md-8 p-0">
                    <input
                    type="text"
                    :class="['form-control',$v.basicInfo.phone.$error?'is-invalid':'']"
                    v-model.trim="$v.basicInfo.phone.$model"
                    />
                    <div class="invalid-feedback">
                    <div
                        class="error"
                        v-if="!$v.basicInfo.phone.required"
                    >{{$t('jobseekerprofile.phone_req')}}</div>
                    <div
                        class="error"
                        v-else-if="!$v.basicInfo.phone.numeric"
                    >{{$t('jobseekerprofile.number_only')}}</div>
                    <div
                        class="error"
                        v-else-if="!$v.basicInfo.phone.minLength || !$v.basicInfo.phone.maxLength"
                    >{{$t('jobseekerprofile.phone_length')}}</div>
                    </div>
                </div>
                </div>
                <div class="form-group">
                <label for>
                    {{$t('jobseekerprofile.email')}}
                    <span class="view-permission">{{$t('jobseekerprofile.admin')}}</span>
                </label>
                <div class="col-md-8 p-0">
                    <input type="email" class="form-control" v-model.trim="basicInfo.email" disabled>
                    <!-- <input
                    type="text"
                    :class="['form-control',$v.basicInfo.email.$error?'is-invalid':'']"
                    v-model.trim="$v.basicInfo.email.$model"
                    />
                    <div class="invalid-feedback">
                    <div
                        class="error"
                        v-if="!$v.basicInfo.email.required"
                    >{{$t('jobseekerprofile.email_req')}}</div>
                    <div
                        class="error"
                        v-if="!$v.basicInfo.email.email"
                    >{{$t('jobseekerprofile.email_type')}}</div>
                    </div> -->
                </div>
                </div>
                <div class="form-group">
                <label for>
                    {{$t('jobseekerprofile.skype')}}
                    <span class="view-permission">{{$t('jobseekerprofile.admin')}}</span>
                </label>
                <div class="col-md-8 p-0">
                    <input type="text" class="form-control" v-model="basicInfo.skype_account" />
                </div>
                </div>
                <div class="form-group">
                <label for>{{$t('jobseekerprofile.education')}}</label>
                <div class="row">
                    <div class="col-md-4">
                    <div>
                        <select class="form-control" v-model.trim="basicInfo.final_education">
                        <option
                            :value="null"
                            v-if="basicInfo.final_education == null"
                        >{{$t('jobseekerprofile.finaledu')}}</option>
                        <option :value="null" v-else selected>{{$t('jobseekerprofile.finaledu')}}</option>
                        <option
                            v-for="status in finaleducation"
                            :key="status.id"
                            v-bind:value="status.id"
                        >{{status.id}}</option>
                        </select>
                    </div>
                    </div>
                </div>
                </div>

                <div class="form-group">
                <label for>{{$t('jobseekerprofile.status')}}</label>
                <div class="row">
                    <div class="col-md-4">
                    <select class="form-control" v-model.trim="basicInfo.current_situation">
                        <option
                        :value="null"
                        v-if="basicInfo.current_situation  == null"
                        selected
                        >{{$t('jobseekerprofile.currentpos')}}</option>
                        <option v-else :value="null" selected>{{$t('jobseekerprofile.currentpos')}}</option>
                        <option
                        v-for="status in currentposition"
                        :key="status.id"
                        v-bind:value="status.id"
                        >{{status.id}}</option>
                    </select>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <p class="col-md-12 text-center mt-3">
            <span class="btn save-btn" @click="saveBasicInfo">保存する</span>
            </p>
        </div>
        <!-- End basic-info -->

        <!-- Athlete-info -->
        <div class="row tab-content experience-content mb-3 m-0" id="athleteInfoEdit" v-if="!athleteInfoEdit && showDetails">
            <div class="col-12">
                <div class="tit-box">
                    <h3 class="profile-edit-tit">アスリート情報</h3>
                    <p class="profile-edit-txt" @click="editBox('athleteInfoEdit','open')" v-if="edit_page"><span class="icon icon-edit"></span>{{$t('common.edit')}}</p>
                </div>
                <dl class="detail-list clearfix history-edit">
                    <dt class="detail-head">競技</dt>
                    <dd class="detail-data">
                        <div v-if="!containNullOnly(athleteInformation.tmp_competition_names)">
                            <span v-for="competition in athleteInformation.tmp_competition_names" :key="competition.id">
                                {{ competition.competition_name }}
                            </span>
                            <!-- <hr v-if="index != (athleteInformation.competition_name.length-1)"> -->
                        </div>
                        <div v-else>未入力</div>
                    </dd>
                    <dt class="detail-head">競技歴</dt>
                    <dd class="detail-data">
                        <span v-if="athleteInformation.competition_year || athleteInformation.competition_month">{{athleteInformation.competition_year ? athleteInformation.competition_year + ' 年' : ''}}{{athleteInformation.competition_month ?athleteInformation.competition_month + ' ヵ月' : ''}}</span>
                        <span v-else>未入力</span>
                    </dd>
                    <dt class="detail-head">所得ライセンス</dt>
                    <dd class="detail-data">
                        <div v-for="(income_license, index) in athleteInformation.income_license" :key="income_license.id">
                            <span v-if="!containNullOnly(income_license)">
                                {{income_license.income_lic}}
                                <hr v-if="index != (athleteInformation.income_license.length-1)">
                            </span>
                            <span v-else>
                                未入力
                            </span>
                        </div>
                    </dd>
                    <dt class="detail-head">出身校</dt>
                    <dd class="detail-data">
                            <div v-for="(this_college, index) in athleteInformation.attended_college" :key="index">
                                <div v-if="!containNullOnly(this_college)">
                                    <p class="mb-0">
                                        <label class="desired-label">学校</label>
                                        <span>{{ this_college.college_name || '-' }}</span>
                                    </p>
                                    
                                    
                                    <p class="mb-0">
                                        <label class="desired-label">入学</label>
                                        <span>
                                            {{ this_college.from_year ? this_college.from_year + ' 年' : '- 年' }}
                                            {{ this_college.from_month ? this_college.from_month + ' 月' : '- 月' }}
                                        </span>
                                         
                                    </p>

                                    <p class="mb-0">
                                        <label class="desired-label">卒業</label>
                                        <span>
                                            {{ this_college.to_year ? this_college.to_year + ' 年' : '- 年' }}
                                            {{ this_college.to_month ? this_college.to_month + ' 月' : '- 月' }} 
                                        </span>
                                    </p>
                                    <br>
                                </div>
                                <div v-else>
                                    未入力
                                </div>
                            </div>
                        </dd>
                    <dt class="detail-head">活動実績・経歴</dt>
                    <dd class="detail-data">
                        <span>{{athleteInformation.competition_activity || '未入力'}}</span>
                    </dd>
                </dl>
            </div>
        </div>
    
        <div class="row tab-content experience-content mb-3 m-0" v-if="athleteInfoEdit">
            <div class="head-wrap col-12">
                <div class="tit-box tit-box-edit">
                    <h3 class="profile-edit-tit">アスリート情報</h3>
                    <p class="profile-edit-txt" @click="editBox('athleteInfoEdit','close')"><span class="icon icon-times"></span>{{$t('common.close')}}</p>
                </div>

                <div class="popup-databox" >
                    <div class="form-group">
                        <label for="">競技</label>
                        <div class="row">
                            <div class="col-md-12 d-flex">
                                <div  class="col-md-8 area-col sport-text pl-0">
                                    <!-- <input type="text" class="form-control" placeholder="" /> -->
                                     <input type="text" class="form-control" :value="athleteInformation.current_competitions" readonly />
                                </div> 
                                <span v-for="(competition, index) in athleteInformation.tmp_competition_names" :key="'Show'+index">
                                    {{ competition.competition_name }}
                                </span>
                                <button type="button" class="pl-md-4 btn add-btn selected-info-btn" @click="modalOnOff('open')">選択</button>
                            </div>
                        </div>
                        <!-- Competition-Name ModalBox -->
                        <transition name="fade">
                            <div class="modal-wrapper competition-modal" v-if="athleteInformation.competition_modal">
                                <div class="modal-block">
                                    <div class="modal-container">
                                        <div class="header-wrap">
                                            <h3 class="header">競技</h3>
                                            <button class="cross-btn" type="button" @click="modalOnOff('close')">
                                                <span class="icon icon-times"></span>
                                                閉じる
                                            </button>
                                        </div>
                                        <div class="modal-body competition-modal-body">
                                            <div class="row m-0  area-col">
                                                <div class="col-md-2 left-competition">
                                                        <h5 class="competition-title">Competitions </h5>
                                                        <div class="competition-group">
                                                            <span v-for="competition in athleteInformation.all_competition_list" :key="competition.id">
                                                                <button type="button" class="form-control btn btn-primary" v-if="competition.parent_id === null" @click="showCompetitions(competition.id)">
                                                                    {{competition.competition_name}}
                                                                    {{selectedItemsCount(groupBySelectedItems()[competition.id])}}
                                                                </button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                <div class="col-md-10 right-competition">
                                                    <h5 class="competition-title">{{ athleteInformation.current_sub_competition }}</h5>
                                                    <div class="row sub-competition-group">
                                                        <div v-for="competition in athleteInformation.all_competition_list" :key="competition.id" :class="{ competnameClass: competition.parent_id === athleteInformation.current_competition_id }">
                                                            <button type="button" class="form-control btn-info col-md-12 competnameClass-btn" v-show="competition.parent_id === athleteInformation.current_competition_id" @click="selectedCompetitions(competition.id, competition.parent_id, competition.competition_name)">
                                                                {{competition.competition_name}}
                                                                <span v-show="showRemoveIcon(competition.id)">
                                                                    <span class="icon icon-times"></span>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row col-md-12 selected-group" v-show="athleteInformation.tmp_competition_names.length > 0">
                                                <div class="col-md-12">
                                                    <h5>Selected Competitions</h5>
                                                </div>
                                                <div class="col-md-12 selected-btngroup">
                                                    <button type="button" class="form-control selected-btn" v-for="(competition, index) in athleteInformation.tmp_competition_names" :key="'Display'+index" @click="removeCompetition(competition.id)" style="color:black;">
                                                        {{ competition.competition_name }}<span class="icon icon-times"></span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-md-12 mt-3" v-if="athleteInformation.showAddCompetition">
                                                <div class="col-md-12 popup-databox showadd-box">
                                                    <div class="row col-md-12 area-col">
                                                        <span class="col-md-10 col-sm-10 area-col">
                                                            <input v-model="athleteInformation.new_competition" type="text" placeholder="競技を入力" class="form-control" />
                                                        </span>
                                                        <span class="col-md-2 col-sm-2">
                                                            <button type="button" class="pl-md-4 btn add-btn selected-info-btn ml-0 compet-save-btn-2" @click="saveNewCompetition('save')">保存する</button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12 mt-3" v-else>
                                                <div class="col-md-12 popup-databox showadd-box">
                                                    <span class="col-md-2">その他</span>
                                                    <span class="col-md-2">
                                                        <button type="button" class="pl-md-4 btn add-btn selected-info-btn compet-save-btn" @click="saveNewCompetition('show')">+ 追加する</button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button class="btn delete-color" type="button" @click="removeCompetition(null)">全てクリア</button>
                                            <button class="btn cancelbtn" type="button" @click="modalOnOff('close')">選択する</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>

                    <div class="form-group">
                        <label for="">競技歴</label>
                        <div class="row">
                            <div class="col-md-4 d-flex align-items-center">
                                <select class="form-control mr-2" v-model="athleteInformation.competition_year">
                                    <option value="">年</option>
                                    <option v-for="year in years_data" :key="year">{{ 1920 + year}}</option>
                                </select>
                                <span>年</span>
                            </div>
                            <div class="col-md-4 d-flex align-items-center">
                                <select class="form-control mr-2" v-model="athleteInformation.competition_month">
                                    <option value="">月</option>
                                    <option v-for="month in 12" :key="month">{{ month }}</option>
                                </select>
                                <span class="month-txt">ヵ月</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="popup-databox" >
                        
                        <div class="row form-group license-row" v-for="(income_license, index) in athleteInformation.income_license" :key="income_license.id">
                            <p class="delete-btn" @click="deleteIncomeLicense(index, income_license.id)" v-if="athleteInformation.income_license.length > 1">
                                <span class="icon icon-times"></span>
                            </p>
                            <div class="col-md-8 p-0 mb-3">
                                <label for="">所得ライセンス</label>
                                <input type="text" class="form-control" placeholder="" v-model="income_license.income_lic" />
                            </div>
                            <div class="col-md-8 p-0">
                                <label for="">所属</label>
                                <input type="text" class="form-control" placeholder="例.チーム・会社・団体・組織etc" v-model="income_license.affiliation" />
                            </div>
                        </div>
                        <p class="text-center mt-4">
                            <span class="btn add-btn" @click="addIncomeLicense">+ {{$t('jobseekerprofile.add')}}</span>
                        </p>
                </div>

                 <!-- <div class="popup-databox" >
                    <div class="form-group">
                        <label for="">出身校</label>
                        <div class="form-group" v-for="(this_college, index) in athleteInformation.attended_college" :key="this_college.id">
                            <div class="row">
                                <div class="col-md-8">
                                    <label>学校</label>
                                    <p class="delete-btn" @click="deleteAttendedCollege(index, this_college.id)" v-if="athleteInformation.attended_college.length > 1">
                                        <span class="icon icon-times"></span>
                                    </p>
                                    <input type="text" class="form-control" placeholder="" v-model="this_college.college_name" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3">
                                    <select class="form-control" v-model="this_college.from_year">
                                        <option value="">年</option>
                                        <option v-for="year in years_data" :key="year">{{ 1920 + year}}</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <select class="form-control" v-model="this_college.from_month">
                                        <option value="">月</option>
                                        <option v-for="month in 12" :key="month">{{ month }}</option>
                                    </select>
                                </div>
                                <div class="col-md-2">入学</div>
                            </div>
                            <div class="row">
                                <div class="col-md-3">
                                    <select class="form-control" v-model="this_college.to_year">
                                        <option value="">年</option>
                                        <option v-for="year in years_data" :key="year">{{ 1920 + year}}</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <select class="form-control" v-model="this_college.to_month">
                                        <option value="">月</option>
                                        <option v-for="month in 12" :key="month">{{ month }}</option>
                                    </select>
                                </div>
                                <div class="col-md-2">卒業</div>
                            </div>
                        </div>
                        <span class="btn add-btn" @click="addAttendedCollege">+ {{$t('jobseekerprofile.add')}}</span>
                    </div>
                </div> -->

                 <div class="popup-databox">
                    <label for="">出身校</label>
                    <div class="form-group license-row" v-for="(this_college, index) in athleteInformation.attended_college" :key="this_college.id">
                        <p class="delete-btn" @click="deleteAttendedCollege(index, this_college.id)" v-if="athleteInformation.attended_college.length > 1">
                            <span class="icon icon-times"></span>
                        </p>
                        <div class="row mb-4">
                            <div class="col-md-8 col-sm-12">
                                <label>学校</label>
                                <input type="text" class="form-control" placeholder="" v-model="this_college.college_name" />
                            </div>
                        </div>
                        <div class="row mb-4 d-flex align-items-center">
                            <div class="col-md-4 col-sm-5 admission-year">
                                <select class="form-control" v-model="this_college.from_year">
                                    <option value="">年</option>
                                    <option v-for="year in years_data" :key="year">{{ 1920 + year}}</option>
                                </select>
                            </div>
                            <div class="col-md-4 col-sm-5 admission-month">
                                <select class="form-control" v-model="this_college.from_month">
                                    <option value="">月</option>
                                    <option v-for="month in 12" :key="month">{{ month }}</option>
                                </select>
                            </div>
                            <label class="col-md-2 col-sm-2 admission-label mb-0">入学</label>
                        </div>
                        <div class="row mb-4 d-flex align-items-center">
                            <div class="col-md-4 col-sm-5 graduate-year">
                                <select class="form-control" v-model="this_college.to_year">
                                    <option value="">年</option>
                                    <option v-for="year in years_data" :key="year">{{ 1920 + year}}</option>
                                </select>
                            </div>
                            <div class="col-md-4 col-sm-5 graduate-month">
                                <select class="form-control" v-model="this_college.to_month">
                                    <option value="">月</option>
                                    <option v-for="month in 12" :key="month">{{ month }}</option>
                                </select>
                            </div>
                            <label class="col-md-2 col-sm-2 graduate-label mb-0">卒業</label>
                        </div>
                    </div>
                    <p class="text-center mt-4">
                        <span class="btn add-btn" @click="addAttendedCollege">+ {{$t('jobseekerprofile.add')}}</span>
                    </p>
                </div>

                 <div class="popup-databox" >
                    <div class="form-group">
                        <label for="">活動実績・経歴</label>
                        <div class="row">
                            <div class="col-md-8">
                                <textarea class="form-control" v-model="athleteInformation.competition_activity" rows="3"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>

            <p class="col-md-12 text-center mt-3">
                <span class="btn save-btn" @click="saveAthleteInfo">{{$t('common.save')}}</span>
            </p>
            
        </div>
        <!-- End Athlete-info -->

        <!-- career -->
        <div
            class="row tab-content experience-content mb-3 m-0"
            id="careerEdit"
            v-if="!careerEdit && showDetails"
        >
            <div class="col-md-12">
                <div class="tit-box">
                    <h3 class="profile-edit-tit">経歴</h3>
                    <p class="profile-edit-txt" @click="editBox('careerEdit','open')" v-if="edit_page">
                    <span class="icon icon-edit"></span>編集
                    </p>
                </div>
                <dl class="detail-list clearfix">
                    <dt class="detail-head">{{$t('jobseekerprofile.edbackground')}}</dt>
                    <dd class="detail-data">
                        <div style="white-space: unset;" v-if="educations.length > 0">
                            <div style="white-space: unset;" v-for="(edu,index) in educations" :key="edu.id">
                                <div style="white-space: unset;" v-if="(educations.length ==1 && edu.id != null) || educations.length > 1">
                                    <table class="history-edit-tbl">
                                        <tr>
                                            <td>学校名</td>
                                            <td>
                                                <span v-if="edu.school_name">{{edu.school_name}}</span>
                                                <span v-else> - </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>学部学科</td>
                                            <td>
                                                <span v-if="edu.subject">{{edu.subject}}</span>
                                                <span v-else> - </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>学位 <span class="view-permission float-right">{{$t('jobseekerprofile.admin')}}</span></td>
                                            <td>
                                                <span v-if="edu.degree">{{edu.degree != 'null' ? edu.degree : '-'}}</span>
                                                <span v-else> - </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>在籍期間 <span class="view-permission float-right">{{$t('jobseekerprofile.admin')}}</span></td>
                                            <td>
                                                <span v-if="edu.from_year != null || edu.from_month != null">
                                                    <span v-if="edu.from_year != null">{{edu.from_year}}</span>
                                                    <span v-if="edu.from_month != null">{{edu.from_month}}</span>

                                                    <span v-if="edu.to_year != null  && edu.to_month != null"> ~ {{edu.to_year}}{{edu.to_month}}</span>
                                                    <span v-if="edu.to_year != null  && edu.to_month == null"> ~ {{edu.to_year}}</span>
                                                    <span v-if="edu.to_year == null  && edu.to_month != null"> ~ {{edu.to_month}}</span>
                                                    <span v-if="edu.to_year == null  && edu.to_month == null"> ~ 在籍中</span>
                                                </span>
                                                <span v-else>
                                                    <span v-if="edu.to_year != null || edu.to_month != null">
                                                        ~ <span v-if="edu.to_year != null">{{edu.to_year}}</span>
                                                        <span v-if="edu.to_month != null">{{edu.to_month}}</span>
                                                    </span>
                                                    <span v-else> - </span>
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>ステータス <span class="view-permission float-right">{{$t('jobseekerprofile.admin')}}</span></td>
                                            <td>
                                                <span v-if="edu.education_status">{{edu.education_status != 'null' ? edu.education_status : '-'}} </span>
                                                <span v-else> - </span>
                                            </td>
                                        </tr>
                                    </table>
                                    <hr v-if="index != (educations.length-1)">
                                </div>
                                <span v-else> 未入力 </span>
                            </div>
                        </div>
                        <div v-else> 未入力 </div>
                    </dd>

                    <dt class="detail-head">{{$t('jobseekerprofile.experiencecompany')}}</dt>
                    <dd class="detail-data">
                        <span v-if="(carrers.num_of_experienced_companies != '' && carrers.num_of_experienced_companies != null) || (carrers.num_of_experienced_companies == 0)">
                            {{carrers.num_of_experienced_companies}} 社
                        </span>
                        <span v-else>未入力</span>
                    </dd>
                    <dt class="detail-head"> 勤務先  </dt>
                    <dd class="detail-data" v-if="experiences">
                        <div  v-for="(exp,index) in experiences" :key="exp.id">
                                <div v-if="(experiences.length ==1 && exp.id != null) || experiences.length > 1">
                                <!-- <label>勤務先{{index + 1}}</label> -->
                                <table class="history-edit-tbl">
                                    <tr>
                                        <td>企業名 <span class="private float-right" style="margin" v-if="exp.private_status == 1 || exp.private_status == 2">{{$t('jobseekerprofile.private')}}</span></td>
                                        <td>
                                            <span v-if="exp.job_location">{{exp.job_location}} </span>
                                            <span v-else>-</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>在籍期間 <span class="private float-right" v-if="exp.private_status == 1">{{$t('jobseekerprofile.private')}}</span></td>
                                        <td>
                                            <span  v-if="exp.current == 0 || exp.current == null">
                                                <span v-if="exp.from_year != '年' || exp.from_month != '月'">
                                                    <span v-if="exp.from_year != '年'">{{exp.from_year}}</span>
                                                    <span v-if="exp.from_month != '月'">{{exp.from_month}}</span>
                                                    <span v-if="exp.to_year != '年'  && exp.to_month != '月'"> ~ {{exp.to_year}}{{exp.to_month}}</span>
                                                    <span v-if="exp.to_year != '年'  && exp.to_month == '月'"> ~ {{exp.to_year}}</span>
                                                    <span v-if="exp.to_year == '年'  && exp.to_month != '月'"> ~ {{exp.to_month}}</span>
                                                    <span v-if="exp.to_year == '年'  && exp.to_month == '月'"> ~ 在籍中</span>
                                                </span>
                                                <span v-else> - </span> 
                                            </span>
                                            <span v-else>
                                                <span v-if="exp.from_year != '年' && exp.from_month != '月'">{{exp.from_year}}{{exp.from_month}} ~ 在籍中</span>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ポジション <span class="private float-right" v-if="exp.private_status == 1">{{$t('jobseekerprofile.private')}}</span></td>
                                        <td>
                                            <span v-if="exp.position_name"> {{exp.position_name}} </span>
                                            <span v-else> - </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>雇用形態 <span class="private float-right" v-if="exp.private_status == 1">{{$t('jobseekerprofile.private')}}</span></td>
                                        <td>
                                            <span v-if="exp.employment_type_name"> {{exp.employment_type_name}} </span>
                                            <span v-else> - </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>主な業務 <span class="private float-right" v-if="exp.private_status == 1">{{$t('jobseekerprofile.private')}}</span></td>
                                        <td>
                                            <span v-if="exp.main_duty"> {{exp.main_duty}} </span>
                                            <span v-else> - </span>
                                        </td>
                                    </tr>
                                </table>
                                <hr v-if="index != (experiences.length-1)">
                            </div>
                            <span v-else>未入力</span>
                        </div> 
                    </dd>
                    <dt class="detail-head">{{$t('jobseekerprofile.annualincome')}}</dt>
                    <dd class="detail-data" v-if="carrers.last_currency != null || carrers.last_annual_income != null">
                        <span v-if="carrers.last_annual_income != null && carrers.last_annual_income != null">{{ carrers.last_annual_income}}</span> <span v-if="carrers.last_currency != null && carrers.last_currency != null">{{carrers.last_currency}}</span>
                    </dd>
                    <dd class="detail-data" v-else>未入力</dd>
                </dl>
                <div class="explation-note"><span class="private">{{$t('jobseekerprofile.private')}}</span>{{$t('jobseekerprofile.details')}}<br>
                <!-- {{$t('jobseekerprofile.details1')}}<br> -->
                <span class="view-permission">{{$t('jobseekerprofile.admin')}}</span>{{$t('jobseekerprofile.detailsadmin')}}
                </div>
            </div>
        </div>

        <div class="row tab-content experience-content mb-3 m-0" v-if="careerEdit">
            <div class="head-wrap col-md-12">
            <!-- <h3 class="text-left main-header header" >経歴 <span class="delete-btn" @click="careerEdit = !careerEdit"> <span class="icon icon-times"></span>{{$t('common.close')}} </span></h3> -->
            <div class="tit-box tit-box-edit">
                <h3 class="profile-edit-tit">経歴</h3>
                <p class="profile-edit-txt" @click="editBox('careerEdit','close')">
                <span class="icon icon-times"></span>
                {{$t('common.close')}}
                </p>
            </div>

            <div class="popup-databox">
                <h6 class="font-weight-bold">学歴</h6>
                <!-- education array -->
                <div class="col-md-12 school-box" v-for="(edu,indx) in educations" :key="edu.id">
                <p class="delete-btn" @click="deleteEducation(indx)" v-if="educations.length > 1">
                    <span class="icon icon-times"></span>
                </p>
                <div class="form-group">
                    <label for>学校名</label>
                    <div class="col-md-8 p-0">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="学校名を入力"
                        v-model="edu.school_name"
                    />
                    </div>
                </div>
                <div class="form-group">
                    <label for>学部学科</label>
                    <div class="col-md-8 p-0">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="学部学科を入力"
                        v-model="edu.subject"
                    />
                    </div>
                </div>
                <div class="form-group">
                    <label for>学位</label>
                    <div class="row">
                    <div class="col-md-4">
                        <select class="form-control" v-model="edu.degree">
                        <option :value="null" selected>学位を選択</option>
                        <option
                            v-for="status in finaleducation"
                            :key="status.id"
                            v-bind:value="status.id"
                        >{{status.id}}</option>
                        </select>
                        <!-- <select v-model="edu.degree" id="" class="form-control">
                                                    <option value="">学位を選択する</option>
                                                    <option value="大学（学士）">大学（学士）</option>
                                                    <option value="短期大学">短期大学</option>
                                                    <option value="大学院（修士）">大学院（修士）</option>
                                                    <option value="大学院（博士）">大学院（博士）</option>
                                                    <option value="専門学校">専門学校</option>
                                                    <option value="高校">高校</option>
                                                    <option value="高等専門学校">高等専門学校</option>
                                                    <option value="中学校">中学校</option>
                                                    <option value="その他">その他</option>
                        </select>-->
                    </div>
                    </div>
                </div>
                <div class="form-group">
                    <label>在籍期間</label>
                    <div class="row mb-2 align-items-center">
                        <div class="col-md-2 pr-1">
                            <div class="select-wrap">
                            <!-- <select v-model="edu.from_year" id="" class="form-control">
                                                        <option value="">年</option>
                                                        <option v-for="year in years" :value="year" :key="year">{{ year }}</option>
                            </select>-->

                            <select class="form-control" v-model="edu.from_year">
                                <option :value="null">年</option>
                                <option v-for="year in years_data" :key="year">{{ 1920 + year}}{{' 年'}}</option>
                            </select>
                            <!-- <span class="sort-desc">&#9662;</span> -->
                            </div>
                        </div>
                        <div class="col-md-2 pl-1">
                            <div class="select-wrap">
                            <!-- <select v-model="edu.from_month" id="" class="form-control">
                                                        <option value="">月</option>
                                                        <option v-for="m in months" :value="m" :key="m">{{ m }}</option>
                            </select>-->
                            <select class="form-control" v-model="edu.from_month">
                                <option :value="null">月</option>
                                <option v-for="month in 12" :key="month">{{ month }}{{' 月'}}</option>
                            </select>
                            <!-- <span class="sort-desc">&#9662;</span> -->
                            </div>
                        </div>
                        <label for class="lbl-txt">から</label>
                    </div>
                    <div class="row align-items-center">
                    <div class="col-md-2 pr-1">
                        <div class="select-wrap">
                        <!-- <select v-model="edu.to_year" id="" class="form-control">
                                                    <option value="">年</option>
                                                    <option v-for="year in years" :value="year" :key="year">{{ year }}</option>
                        </select>-->
                        <select class="form-control" v-model="edu.to_year">
                            <option :value="null">年</option>
                            <option v-for="year in years_data" :key="year">{{ 1920 + year}}{{' 年'}}</option>
                        </select>
                        <!-- <span class="sort-desc">&#9662;</span> -->
                        </div>
                    </div>
                    <div class="col-md-2 pl-1">
                        <div class="select-wrap">
                        <!-- <select v-model="edu.to_month" id="" class="form-control">
                                                    <option value="">月</option>
                                                    <option v-for="m in months" :value="m" :key="m">{{ m }}</option>
                        </select>-->
                        <select class="form-control" v-model="edu.to_month">
                            <option :value="null">月</option>
                            <option v-for="month in 12" :key="month">{{ month }}{{' 月'}}</option>
                        </select>
                        <!-- <span class="sort-desc">&#9662;</span> -->
                        </div>
                    </div>
                    <label for class="lbl-txt">まで</label>
                    </div>
                </div>
                <div class="form-group">
                    <label for>ステータス</label>
                    <div class="row">
                    <div class="col-sm-4">
                        <div class="select-wrap">
                        <select v-model="edu.education_status" id class="form-control">
                            <option value="null" selected>ステータスを選択</option>
                            <option value="卒業">卒業</option>
                            <option value="卒業予定">卒業予定</option>
                            <option value="中退">中退</option>
                        </select>
                        <!-- <span class="sort-desc">&#9662;</span> -->
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <!-- end education array -->
                <p class="text-center mt-4">
                <span class="btn add-btn" @click="addEducation">+ 追加する</span>
                </p>
            </div>

            <div class="popup-databox">
                <h6 class="font-weight-bold">職歴</h6>
                <div class="form-group mt-4">
                <label for>経験社数</label>
                <div class="col-md-3 p-0 d-flex align-items-center">
                    <input type="number" onkeypress="return (event.charCode >= 48 && event.charCode < 58)" min="0" v-model="carrers.num_of_experienced_companies" class="form-control mr-3" placeholder="経験社数を入力" /><span>社</span>
                </div>
                </div>

                <h6 class="font-weight-bold">勤務先</h6>
                <p class="mb-0">※1社ずつ公開・非公開が選択できます</p>
                <!-- experience array -->
                <div class="col-md-12 experience-box" v-for="(exp,indx) in experiences" :key="exp.id">
                <div class="form-group">
                    <div class="row col-12 p-0 m-0">   
                            勤務先 {{indx+1}}  
                            <div class="check-private" transition="fade" @click="checkPrivateStatus(exp.private_status,indx,1)">
                                <p class="m-0">
                                <span :class="[exp.private_status == 1?'fa fa-check':'fa fa-check disabled']"></span>
                            </p>
                            </div>
                            <label for="非公開にする">非公開に</label>   
                            <div class="check-private" transition="fade" @click="checkPrivateStatus(exp.private_status,indx,2)">
                                <p class="m-0">
                                <span :class="[exp.private_status == 2?'fa fa-check':'fa fa-check disabled']"></span>
                            </p>
                            </div>
                            <label for="企業名のみ非公開にする">企業名のみ非公開に</label>   
                    </div>
                    <!-- <input
                    type="checkbox"
                    :id="'非公開'+indx"
                    class="custom-control-input custom-checkbox"
                    v-model="exp.private_status"
                    />
                    <label :for="'非公開'+indx" class="custom-control-label custom-checkbox-label">非公開</label> -->
                </div>

                <p class="delete-btn" @click="deleteExperience(indx)" v-if="experiences.length > 1">
                    <span class="icon icon-times"></span>
                </p>

                <div class="form-group">
                    <label for="">企業名</label>
                    <div class="col-md-8 p-0">
                        <input type="text" class="form-control" placeholder="勤務先を入力" v-model="exp.job_location"/>
                    </div>
                </div>

                <!-- <div class="form-group">
                    <label for>勤務先</label>
                    <div class="col-md-8 p-0">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="学校名を入力"
                        v-model="exp.job_location"
                    />
                    </div>
                </div> -->

                <!-- <div class="form-group">
                    <label for>在籍期間</label>
                    <div class="col-md-8 p-0">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="学部学科を入力"
                        v-model="exp.main_duty"
                    />
                    </div>
                </div> -->

                <div class="form-group">
                    <!--  <h6 class="font-weight-bold mb-3">{{$t('jobseekerprofile.experiencetype')}}</h6> -->
                    <div class="form-group">
                        <input type="checkbox" :id="'現在も在籍中'+indx" class="custom-control-input custom-checkbox" @change="yearChange(indx,exp.current)" v-model="exp.current"/>
                        <label :for="'現在も在籍中'+indx" class="custom-control-label custom-checkbox-label">{{$t('jobseekerprofile.currentperoid')}}</label>
                    </div>
                    <div class="form-group">
                        <div class="row mb-2 align-items-center">
                            <div class="col-md-2 pr-1">
                                <div class="select-wrap">
                                    <select class="form-control" v-model="exp.from_year" @change="change('year',exp.from_year,indx)">
                                        <option  value="年">年</option>
                                        <option v-for="year in expyears_data" :key="year">{{ 1920 + year}}{{' 年'}}</option>
                                    </select>
                                    
                                </div>
                                <span class="error" v-if="exp.current == 1 && exp.from_year == '年' "> 開始年を入力してください </span>
                            </div>
                            <div class="col-md-2 pl-1">
                                <div class="select-wrap">
                                    <select class="form-control" v-model="exp.from_month" @change="change('month',exp.from_month,indx)" >
                                        <option  value="月">月</option>
                                        <option v-for="month in 12" :key="month">{{ month }}{{' 月'}}</option>
                                    </select>
                                    
                                </div>
                                <span class="error" v-if="exp.current == 1 && exp.from_month == '月' "> 開始月を入力してください </span>
                            </div>
                            <label for="" class="lbl-txt">から</label>
                        </div>
                        <div class="row align-items-center">
                            <div class="col-md-2 pr-1">
                                <select class="form-control" v-model="exp.to_year" v-bind:disabled="(exp.current != 0 && exp.current != null) || (exp.from_year == '年' && exp.from_month == '月')">
                                    <option  value="年">年</option>
                                    <option v-for="year in expyears_data" :key="year">{{ 1920 + year}}{{' 年'}}</option>
                                </select>
                            </div>
                            <div class="col-md-2 pl-1">
                                <select class="form-control" v-model="exp.to_month" v-bind:disabled="(exp.current != 0 && exp.current != null) || (exp.from_year == '年' && exp.from_month == '月')">
                                    <option  value="月">月</option>
                                    <option v-for="month in 12" :key="month">{{ month }}{{' 月'}}</option>
                                </select>
                            </div>
                            <label for="" class="lbl-txt">まで</label>
                        </div>
                    </div>
                </div>

                <div class="form-group clearfix">
                    <label class="col-md-12 pl-0">ポジション</label>
                    <div class="col-md-4 pl-0">
                        <div class="select-wrap">
                            <select v-model="exp.position_id" id class="form-control">
                            <option value="0" selected>ポジションを選択</option>
                            <option
                                v-for="pos in positions"
                                :key="pos.id"
                                :value="pos.id"
                            >{{ pos.position_name }}</option>
                            </select>
                            <!-- <span class="sort-desc">&#9662;</span> -->
                        </div>
                    </div>
                </div>

                <div class="form-group clearfix">
                    <label class="col-md-12 pl-0">雇用形態</label>
                    <div class="col-md-4 pl-0">
                        <div class="select-wrap">
                            <select v-model="exp.employment_type_id" id class="form-control">
                            <option value="0" selected>雇用形態を選択</option>
                            <option
                                v-for="etype in employment_types"
                                :key="etype.id"
                                :value="etype.id"
                            >{{ etype.employment_type_name }}</option>
                            </select>
                            <!-- <span class="sort-desc">&#9662;</span> -->
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-12 pl-0">主な業務内容</label>
                    <div class="col-md-8 p-0">
                    <textarea class="form-control" v-model="exp.main_duty" placeholder="例)リーダーとしてメンバーをまとめあげました。"></textarea>
                    </div>
                </div>
                </div>
                <!-- end experience array -->
                <p class="text-center mt-4">
                <span class="btn add-btn" @click="addExperience">+ 追加する</span>
                </p>
            </div>

            <div class="popup-databox">
                <h6 class="font-weight-bold">最終年収</h6>
                <div class="form-group row">
                <div class="col-md-6 float-none">
                    <div class="row">
                        <div class="col-md-6">
                            <input
                            type="text"
                            v-model="carrers.last_annual_income"
                            placeholder="金額を入力"
                            class="form-control"
                            />
                        </div>
                        <div class="col-md-6">
                            <!-- <select class="form-control" v-model.trim="carrers.last_currency">
                            <option :value="null" v-if="carrers.last_currency  == null" selected>通貨を選択</option>
                            <option v-else :value="null" selected>通貨を選択</option>
                            <option
                                v-for="status in currency"
                                :key="status.id"
                                v-bind:value="status.id"
                            >{{status.id}}</option>
                            </select> -->
                            <v-select v-model="carrers.last_currency"
                                :options="iso_list" 
                                label="iso_list"
                                class="form-control"
                                :placeholder="$t('jobseekerprofile.selectcurrency')"
                                :reduce="iso_list=>iso_list" 
                                aria-autocomplete="on">
                                <span slot="no-options" @click="$refs.select.open = false">
                                検索条件当てはまるデータはありません。
                                </span>
                            </v-select>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <!-- <div class="row underline"></div> -->
            <p class="col-md-12 text-center mt-3">
            <span class="btn save-btn" @click="saveCarrer">保存する</span>
            </p>
            <!-- <ul class="button-block">
                        <li>
                            <span class="btn searchbtn job-primary-color" @click="saveCarrer">保存する</span>
                        </li>
            </ul>-->
        </div>
        <!-- End career -->

        <!-- exp-qualification -->
        <div
            class="row tab-content qualification-content mb-3 m-0"
            id="expQualificationEdit"
            v-if="!expQualificationEdit && showDetails"
        >
            <div class="col-md-12">
                <div class="tit-box">
                    <h3 class="profile-edit-tit">経験・資格</h3>
                    <p class="profile-edit-txt" @click="editBox('expQualificationEdit','open')" v-if="edit_page">
                    <span class="icon icon-edit"></span>編集
                    </p>
                </div>
                <dl class="detail-list clearfix">
                    <dt class="detail-head">経験業種・職種</dt>
                    <dd class="detail-data">
                        <div v-for="(exp_job,index) in experience_qualification.experience_jobs" :key="exp_job.id">
                            <!-- <span v-if="!containNullOnly(exp_job)">
                                <span v-show="exp_job.experience_year > 0">{{exp_job.experience_year}}年</span>
                                <span v-for="occupation in occupation_list" :key="'occupation'+occupation.id">
                                    <span v-if="occupation.id == exp_job.experience_occupation">{{occupation.occupation_name}}</span>
                                </span>
                                <span v-for="position in positions" :key="'position'+position.id">
                                    <span v-if="position.id == exp_job.experience_position">・{{position.position_name}}</span>
                                </span>
                                <span v-for="industry in industry_list" :key="'industry'+industry.id">
                                    <div v-if="industry.id == exp_job.experience_industry">{{industry.industry_name}}</div>
                                </span>
                            </span> -->
                            <!-- <div v-if="(experience_qualification.experience_jobs.length ==1 && exp_job.industry_history_id != null) || experience_qualification.experience_jobs.length > 1"> -->
                            <div v-if="!containNullOnly(exp_job)">
                                <table class="history-edit-tbl">
                                    <tr>
                                        <td>経験年数</td>
                                        <td>
                                            <span v-if="exp_job.experience_year != null">{{exp_job.experience_year}}年</span>
                                            <span v-else>-</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>経験業種</td>
                                        <td>
                                            <span v-if="exp_job.experience_occupation != '' && exp_job.experience_occupation != null">
                                                <span v-for="occupation in occupation_list" :key="'occupation'+occupation.id">
                                                    <span v-if="occupation.id == exp_job.experience_occupation">{{occupation.occupation_name}}</span>
                                                </span>
                                            </span>
                                            <span v-else>-</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>経験職種</td>
                                        <td>
                                            <span v-if="exp_job.experience_industry != '' && exp_job.experience_industry != null">
                                                <span v-for="industry in industry_list" :key="'industry'+industry.id">
                                                    <div v-if="industry.id == exp_job.experience_industry">{{industry.industry_name}}</div>
                                                </span>
                                            </span>
                                            <span v-else>-</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width:25%">ポジション</td>
                                        <td>
                                            <span v-if="exp_job.experience_position != '' && exp_job.experience_position != null">
                                                <span v-for="position in positions" :key="'position'+position.id">
                                                    <span v-if="position.id == exp_job.experience_position">{{position.position_name}}</span>
                                                </span>
                                            </span>
                                            <span v-else>-</span>
                                        </td>
                                    </tr>
                                </table>
                                <hr v-if="index != (experience_qualification.experience_jobs.length-1)">
                            </div>
                            <div v-else>未入力</div>
                        </div>
                    </dd>
                    <dt class="detail-head">資格</dt>
                    <!-- その他資格 -->
                    <dd class="detail-data"><pre>{{experience_qualification.other_qualifications.qualifications ? experience_qualification.other_qualifications.qualifications : '未入力'}}</pre></dd>
                </dl>
            </div>
        </div>
        <div class="row tab-content qualification-content mb-3 m-0" v-if="expQualificationEdit">
            <div class="head-wrap col-md-12">
            <!-- <h3 class="text-left main-header header" >経歴 <span class="delete-btn" @click="careerEdit = !careerEdit"> <span class="icon icon-times"></span>{{$t('common.close')}} </span></h3> -->
            <div class="tit-box tit-box-edit">
                <h3 class="profile-edit-tit">経歴業種・資格</h3>
                <p class="profile-edit-txt" @click="editBox('expQualificationEdit','close')">
                <span class="icon icon-times"></span>
                {{$t('common.close')}}
                </p>
            </div>

            <!-- Experienced job type -->
            <div class="popup-databox">
                <h6 class="font-weight-bold">{{$t('jobseekerprofile.experience_industry_occupation')}}</h6>
                <div
                class="col-md-12 school-box"
                v-for="(experience_job,index) in experience_qualification.experience_jobs"
                :key="experience_job.id"
                >
                <p
                    class="delete-btn"
                    @click="deleteExpQualification(index, experience_job.industry_history_id)"
                    v-if="experience_qualification.experience_jobs.length > 1"
                >
                    <span class="icon icon-times"></span>
                </p>
                <div class="form-group">
                    <label for>{{$t('jobseekerprofile.experience_year')}}</label>
                    <div class="col-md-4 p-0 float-none">
                    <div class="select-wrap">
                        <input
                        v-model="experience_job.experience_year"
                        class="form-control"
                        placeholder="経験年数を入力"
                        @paste="(e)=> { e.preventDefault(); return false}"
                        type="text"
                        onkeypress="return ((event.charCode >= 48 && event.charCode < 58) || event.charCode == 46)"
                        />
                    </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for>{{$t('jobseekerprofile.experience_industry')}}</label>
                    <div class="col-md-8 p-0">
                    <div class="select-wrap">
                        <select
                        class="form-control"
                        v-model="experience_job.experience_industry"
                        >
                        <option
                            value
                        >{{ $t('jobseekerprofile.select_field', { field: $t('jobseekerprofile.experience_industry') }) }}</option>
                        <option
                            v-for="industry in industry_list"
                            :key="industry.id"
                            :value="industry.id"
                        >{{industry.industry_name}}</option>
                        </select>
                        <!-- <span class="sort-desc">&#9662;</span> -->
                    </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for>{{$t('jobseekerprofile.experience_occupation')}}</label>
                    <div class="col-md-8 p-0 mb-2">
                    <div class="select-wrap">
                        <select
                        class="form-control"
                        v-model="experience_job.experience_occupation"
                        >
                        <option
                            value
                        >{{ $t('jobseekerprofile.select_field', { field: $t('jobseekerprofile.experience_occupation') }) }}</option>
                        <option
                            v-for="occupation in exp_occupations"
                            :key="occupation.id"
                            :value="occupation.id"
                        >{{occupation.occupation_name}}</option>
                        </select>
                        <!-- <span class="sort-desc">&#9662;</span> -->
                    </div>
                    </div>
                    <div class="col-md-8 p-0">
                    <div class="select-wrap">
                        <select
                        class="form-control"
                        v-model="experience_job.experience_position"
                        >
                        <option
                            value
                        >{{ $t('jobseekerprofile.select_field', { field: $t('jobseekerprofile.experience_position') }) }}</option>
                        <option
                            v-for="position in exp_positions"
                            :key="position.id"
                            :value="position.id"
                        >{{position.position_name}}</option>
                        </select>
                        <!-- <span class="sort-desc">&#9662;</span> -->
                    </div>
                    </div>
                </div>
                </div>
                <p class="text-center mt-4">
                <span
                    class="btn add-btn"
                    @click="addExpQualification()"
                >+&nbsp;{{$t('jobseekerprofile.add')}}</span>
                </p>
            </div>

            <!-- qualification -->
            <div class="popup-databox">
                <h6 class="font-weight-bold">{{$t('jobseekerprofile.qualifications')}}</h6>
                <div class="form-group">
                <!-- <label for>{{$t('jobseekerprofile.other_qualifications')}}</label> -->
                <div class="col-md-8 p-0">
                    <textarea
                    class="form-control"
                    v-model="experience_qualification.other_qualifications.qualifications"
                    ></textarea>
                </div>
                </div>
            </div>
            </div>
            <p class="col-md-12 text-center mt-3">
            <span
                class="btn save-btn"
                @click="saveExpQualification()"
            >{{$t('jobseekerprofile.save')}}</span>
            </p>
        </div>
        <!-- End exp-qualification -->

        <!-- desired-condition -->
        <div
            class="row tab-content condition-content m-0"
            id="desiredConditionEdit"
            v-if="!desiredConditionEdit && showDetails"
        >
            <div class="col-md-12">
            <div class="tit-box">
                <h3 class="profile-edit-tit">就業希望条件</h3>
                <p class="profile-edit-txt" @click="editBox('desiredConditionEdit','open')" v-if="edit_page">
                <span class="icon icon-edit"></span>編集
                </p>
            </div>
            <dl class="detail-list clearfix">
                <dt class="detail-head">{{$t('jobseekerprofile.changejobs')}}</dt>
                <dd class="detail-data" v-if="desired_condition.job_change_reason != null && desired_condition.job_change_reason != ''">{{desired_condition.job_change_reason}}</dd>
                <dd class="detail-data" v-else>未入力</dd>
                <dt class="detail-head">{{$t('jobseekerprofile.activitystatus')}}</dt>
                <dd class="detail-data" v-if="desired_condition.job_search_activity != '' && desired_condition.job_search_activity != null">{{desired_condition.job_search_activity}}</dd>
                <dd class="detail-data" v-else>未入力</dd>
                <dt class="detail-head">{{$t('jobseekerprofile.translocation')}}</dt>
                <dd class="detail-data" v-if="desired_condition.main_fact_when_change != null && desired_condition.main_fact_when_change != ''">{{desired_condition.main_fact_when_change}}</dd>
                <dd class="detail-data" v-else>未入力</dd>
                <dt class="detail-head">{{$t('jobseekerprofile.timetochagejobs')}}</dt>
                <dd class="detail-data" v-if="desired_condition.desired_change_period != null && desired_condition.desired_change_period != ''">{{desired_condition.desired_change_period}}</dd>
                <dd class="detail-data" v-else>未入力</dd>
                <dt class="detail-head">{{$t('jobseekerprofile.preferredworkplace')}}</dt>
                <dd class="detail-data">                            
                    <p class="mb-0">
                        <label class="desired-label">第一希望</label>
                        <span v-if="desired_condition.desired_locations_1 != null">{{desired_condition.desired_locations_1}}</span>
                        <span v-else>未入力</span>
                    </p>
                    <p class="mb-0">
                        <label class="desired-label">第二希望</label>
                        <span v-if="desired_condition.desired_locations_2 != null">{{desired_condition.desired_locations_2}}</span>
                        <span v-else>未入力</span>
                    </p>
                    <p class="mb-0">
                        <label class="desired-label">第三希望</label>
                        <span v-if="desired_condition.desired_locations_3 != null">{{desired_condition.desired_locations_3}}</span>
                        <span v-else>未入力</span>
                    </p>
                </dd>
                <!-- <dd class="detail-data" v-if="desired_condition.desired_locations_1  || desired_condition.desired_locations_2 || desired_condition.desired_locations_3  "> {{desired_condition.desired_locations_1}} {{desired_condition.desired_locations_2}} {{desired_condition.desired_locations_3}}</dd>
                <dd class="detail-data" v-else>未入力</dd> -->
                <dt class="detail-head">{{$t('jobseekerprofile.preferredindustry')}}</dt>
                <dd class="detail-data">
                    <span v-if="desired_condition.industry_name">
                        <span v-for="industry in desired_condition.industry_name" v-bind:key="industry.id">{{industry.industry_name}}<br></span>
                    </span>
                        <span  v-if="desired_condition.industry_name.length == 0 && desired_condition.desired_industry_status == 0">未入力</span>
                    <span v-if="desired_condition.desired_industry_status == 1">こだわらない </span>
                </dd>
                <dt class="detail-head">{{$t('jobseekerprofile.desiredoccupation')}}</dt>
                <dd class="detail-data">
                    <span v-if="desired_condition.occupation_name">
                        <span v-for="occupation in desired_condition.occupation_name" v-bind:key="occupation.id">{{occupation.occupation_name}}<br></span>
                    </span>
                        <span  v-if="desired_condition.occupation_name.length == 0 && desired_condition.desired_occupation_status == 0">未入力</span>
                    <span v-if="desired_condition.desired_occupation_status == 1">こだわらない </span>
                </dd>
                <dt class="detail-head">{{$t('jobseekerprofile.desiredsalary')}}</dt>
                <dd class="detail-data" v-if="!desired_condition.desired_min_annual_income && !desired_condition.desired_max_annual_income"> 未入力 </dd>
                <dd class="detail-data" v-if="desired_condition.desired_min_annual_income && !desired_condition.desired_max_annual_income">{{desired_condition.desired_min_annual_income}}{{desired_condition.desired_currency}}以上 </dd>
                <dd class="detail-data" v-if="!desired_condition.desired_min_annual_income && desired_condition.desired_max_annual_income">{{desired_condition.desired_max_annual_income}}{{desired_condition.desired_currency}} </dd>
                <dd class="detail-data" v-if="desired_condition.desired_min_annual_income && desired_condition.desired_max_annual_income">{{desired_condition.desired_min_annual_income}} ~ {{desired_condition.desired_max_annual_income}}{{desired_condition.desired_currency}}</dd>
            </dl>
            </div>
        </div>
        <div class="row tab-content condition-content m-0" v-if="desiredConditionEdit">
            <div class="col-md-12">
            <div class="tit-box tit-box-edit">
                <h3 class="profile-edit-tit">就業希望条件</h3>
                <p class="profile-edit-txt" @click="editBox('desiredConditionEdit','close')">
                <span class="icon icon-times"></span>
                {{$t('common.close')}}
                </p>
            </div>

            <div class="popup-databox">
                <div class="form-group">
                <label for>転職意欲</label>
                <div class="col-md-8 p-0">
                    <div class="select-wrap">
                    <select id class="form-control" v-model="desired_condition.job_change_reason">
                        <option :value="null">転職意欲を選択</option>
                        <option
                        v-for="moti in moitivation"
                        :key="moti.id"
                        :value="moti.id"
                        >{{ moti.id }}</option>
                    </select>

                    <!-- <span class="sort-desc">&#9662;</span> -->
                    </div>
                </div>
                </div>
                <div class="form-group">
                <label for>転職活動状況</label>
                <div class="col-md-8 p-0">
                    <div class="select-wrap">
                        <select id class="form-control" v-model="desired_condition.job_search_activity">
                            <option :value="null">転職活動状況を選択</option>
                            <option
                            v-for="status in activity_status"
                            :key="status.id"
                            :value="status.id"
                            >{{ status.id }}</option>
                        </select>
                    <!-- <span class="sort-desc">&#9662;</span> -->
                    </div>
                </div>
                </div>
                <div class="form-group">
                <label for>転職で最も重視すること</label>
                <div class="col-md-8 p-0">
                    <div class="select-wrap">
                    <select id class="form-control" v-model="desired_condition.main_fact_when_change">
                        <option :value="null">転職で最も重視することを選択</option>
                        <option
                        v-for="jobs in changing_jobs"
                        :key="jobs.id"
                        :value="jobs.id"
                        >{{ jobs.id }}</option>
                    </select>
                    <!-- <span class="sort-desc">&#9662;</span> -->
                    </div>
                </div>
                </div>
                <div class="form-group">
                <label for>転職希望時期</label>
                <div class="col-md-8 p-0">
                    <div class="select-wrap">
                    <select id class="form-control" v-model="desired_condition.desired_change_period">
                        <option :value="null">転職希望時期</option>
                        <option v-for="date in date_list" :key="date.id" :value="date">{{ date }}</option>
                    </select>
                    <!-- <span class="sort-desc">&#9662;</span> -->
                    </div>
                </div>
                </div>
            </div>
            <div class="popup-databox">
                <h6 class="font-weight-bold">勤務希望地</h6>

                <div class="col-md-12 school-box float-none">
                <div class="form-group">
                    <div class="col-md-8 p-0">
                    <div class="select-wrap">
                        <select id class="form-control" v-model="desired_condition.desired_location_1">
                        <option :value="null">第1希望を選択</option>
                        <option
                            v-for="city in desired_city_list"
                            :key="city.id"
                            :value="city.id"
                        >{{ city.country_name }}</option>
                        </select>
                        <!-- <span class="sort-desc">&#9662;</span> -->
                    </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-8 p-0">
                    <div class="select-wrap">
                        <select id class="form-control" v-model="desired_condition.desired_location_2">
                        <option :value="null">第2希望を選択</option>
                        <option
                            v-for="city in desired_city_list"
                            :key="city.id"
                            :value="city.id"
                        >{{ city.country_name }}</option>
                        </select>
                        <!-- <span class="sort-desc">&#9662;</span> -->
                    </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-8 p-0">
                    <div class="select-wrap">
                        <select id class="form-control" v-model="desired_condition.desired_location_3">
                        <option :value="null">第3希望を選択</option>
                        <option
                            v-for="city in desired_city_list"
                            :key="city.id"
                            :value="city.id"
                        >{{ city.country_name }}</option>
                        </select>
                        <!-- <span class="sort-desc">&#9662;</span> -->
                    </div>
                    </div>
                </div>
                </div>
            </div>

            <div class="popup-databox">
                <h6 class="font-weight-bold mb-4">希望業種</h6>
                <div class="form-group">
                <input
                    type="checkbox"
                    id="非公開0"
                    class="custom-control-input custom-checkbox"
                    @change="getData('industry')"
                    v-model="desired_condition.desired_industry_status"
                />
                <label for="非公開0" class="custom-control-label custom-checkbox-label">こだわらない</label>
                </div>
                <div class="form-group mb-0">
                    <div
                        class="error col-md-12"
                        v-if="desired_errors.industry_error"
                    >{{desired_errors.industry_error}}</div>
                    <div v-if="!desired_condition.desired_industry_status">
                        <div class="col-md-12 school-box" v-for="(industry,indx) in industries" :key="indx">
                        <p v-if="indx != 0" class="delete-btn" @click="removeIndustry(indx)">
                            <span class="icon icon-times"></span>
                        </p>
                        <div class="form-group">
                            <div class="col-md-8 p-0">
                            <div class="select-wrap">
                                <select
                                id
                                v-model="industry.id"
                                @change="getData('industry')"
                                class="form-control"
                                >
                                <option value="0">業種を選択</option>
                                <option
                                    v-for="(indu,index) in industry_list"
                                    :key="index"
                                    :value="indu.id"
                                >{{ indu.industry_name }}</option>
                                </select>
                                <!-- <span class="sort-desc">&#9662;</span> -->
                            </div>
                            </div>
                        </div>
                        </div>

                        <p class="text-center mt-4">
                        <span class="btn add-btn" @click="addIndustry">+ 追加する</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="popup-databox">
                <h6 class="font-weight-bold mb-4">希望職種</h6>
                <div class="form-group">
                <input
                    type="checkbox"
                    id="非公開1"
                    class="custom-control-input custom-checkbox"
                    @change="getData('occupation')"
                    v-model="desired_condition.desired_occupation_status"
                />
                <label for="非公開1" class="custom-control-label custom-checkbox-label">こだわらない</label>
                </div>
                <div
                class="error col-md-12"
                v-if="desired_errors.occupation_error"
                >{{desired_errors.occupation_error}}</div>
                <div v-if="!desired_condition.desired_occupation_status">
                <div
                    class="col-md-12 school-box"
                    v-for="(occupation,index) in occupations"
                    :key="index"
                >
                    <p v-if="index != 0" class="delete-btn" @click="removeOccupation(index)">
                    <span class="icon icon-times"></span>
                    </p>
                    <div class="form-group">
                    <div class="col-md-8 p-0">
                        <div class="select-wrap">
                        <select
                            id
                            class="form-control"
                            v-model="occupation.id"
                            @change="getData('occupation')"
                        >
                            <option value="0">職種を選択</option>
                            <option
                            v-for="(occu,indx) in occupation_list"
                            :key="indx"
                            :value="occu.id"
                            >{{ occu.occupation_name }}</option>
                        </select>
                        <!-- <span class="sort-desc">&#9662;</span> -->
                        </div>
                    </div>
                    </div>
                </div>
                <p class="text-center mt-4">
                    <span class="btn add-btn" @click="addOccupation">+ 追加する</span>
                </p>
                </div>
            </div>
            <div class="popup-databox">
                <h6 class="font-weight-bold mb-5">希望年収</h6>
                <div class="form-group row">
                <label for class="col-md-2 pl-5">最低年収</label>
                <div class="col-md-4">
                    <input type="number" :placeholder="[[$t('jobseekerprofile.enteramount') ]]" class="form-control" v-model="desired_condition.desired_min_annual_income " onkeypress="return (event.charCode >= 48 && event.charCode < 58)" min="0"/>  
                    <!-- <span class="invalid-feedback">
                    <span v-if="$v.desired_condition.desired_min_annual_income.$error">最低年収が必要です</span>
                    </span> -->
                </div>
                <div class="col-md-1" style="margin-top:5px;">円</div>
                </div>

                <div class="form-group row">
                <label for class="col-md-2 pl-5">最高年収</label>
                <div class="col-md-4">
                    <input type="number" class="form-control" :placeholder="[[$t('jobseekerprofile.enteramount') ]]"
                    v-model="desired_condition.desired_max_annual_income" onkeypress="return (event.charCode >= 48 && event.charCode < 58)" min="0"/>
                </div>
                <div class="col-md-1" style="margin-top:5px;">円</div>
                <!-- <div class="col-md-2" style="margin-top:5px;">万</div> -->
                </div>
                <div class="form-group row">
                <label for class="col-md-2"></label>
                <div class="col-md-4">
                    <!-- <div class="select-wrap"> -->
                        <!-- <v-select v-model="desired_condition.desired_currency"
                            :options="iso_list" 
                            label="iso_list"
                            class="form-control"
                            :placeholder="$t('jobseekerprofile.selectcurrency')"
                            :reduce="iso_list=>iso_list" 
                            aria-autocomplete="on">
                            <span slot="no-options" @click="$refs.select.open = false">
                            検索条件当てはまるデータはありません。
                            </span>
                        </v-select> -->
                        <!-- <select id class="form-control" v-model="desired_condition.desired_currency">
                            <option :value="null">通貨を選択</option>
                            <option v-for="curr in currency" :key="curr.id" :value="curr.id">{{ curr.id }}</option>
                        </select>
                        <span class="sort-desc">&#9662;</span> -->
                    <!-- </div> -->
                </div>
                </div>
            </div>
            </div>
            <p class="col-md-12 text-center mt-3">
            <span class="btn save-btn" @click="saveDesiredCondition()">保存する</span>
            </p>
        </div>
        <!-- End desired-condition -->

        <!-- Start Sponsorship Requirements -->
            <div class="row tab-content experience-content mb-3 m-0" id="sponsorshipEdit" v-if="!sponsorshipEdit && showDetails">
                <div class="col-12">
                    <div class="tit-box">
                        <h3 class="profile-edit-tit">スポンサー希望条件 <span class="private ml-3">非公開</span></h3>
                        <p class="profile-edit-txt" @click="editBox('sponsorshipEdit','open')" v-if="edit_page"><span class="icon icon-edit"></span>{{$t('common.edit')}}</p>
                    </div>
                    <dl class="detail-list clearfix history-edit">
                        <dt class="detail-head">希望支援額</dt>
                        <dd class="detail-data">
                            {{ sponsorship.supportive_amount || '未入力' }}
                        </dd>
                        <dt class="detail-head">活動費内訳</dt>
                        <dd class="detail-data">
                            <div v-for="activities in sponsorship.activities" :key="activities.id">
                                <p v-if="!containNullOnly(activities)" class="mb-0">
                                <label class="desired-label">{{activities.activity}} </label>
                                <span class="price-txt">{{activities.cost}}</span>
                                </p>
                                <div v-else>未入力</div>
                            </div>   
                        </dd>
                        <dt class="detail-head">スポンサーに対して出来ること</dt>
                        <dd class="detail-data">
                            {{ sponsorship.sponsor_detail || '未入力' }}
                        </dd>
                        <dt class="detail-head">活動目標</dt>
                        <dd class="detail-data">
                            {{ sponsorship.activity_goal || '未入力' }}
                        </dd>
                        <dt class="detail-head">競技への意気込み</dt>
                        <dd class="detail-data">
                            {{ sponsorship.enthusiasm || '未入力' }}
                        </dd>
                        <dt class="detail-head">スポンサーへのPR</dt>
                        <dd class="detail-data">
                            {{ sponsorship.sponsor_pr || '未入力' }}
                        </dd>
                    </dl>
                </div>
            </div>
        
            <div class="row tab-content experience-content mb-3 m-0" v-if="sponsorshipEdit">
                <div class="head-wrap col-12">
                    <div class="tit-box tit-box-edit">
                        <h3 class="profile-edit-tit">スポンサー希望条件</h3>
                        <p class="profile-edit-txt" @click="editBox('sponsorshipEdit','close')"><span class="icon icon-times"></span>{{$t('common.close')}}</p>
                    </div>

                    <div class="popup-databox">
                        <div class="form-group">
                            <span class="mr-4">
                                 <input type="radio"  class="custom-control-input custom-checkbox" v-model="sponsorship.is_sponsor" :value="1" id="private" />
                                <label  class="custom-control-label custom-checkbox-label" for="private" style="color:#636363">非公開</label>
                            </span> 
                            <span>
                                <input type="radio" class="custom-control-input custom-checkbox" v-model="sponsorship.is_sponsor" :value="0" id="public" />
                                <label class="custom-control-label custom-checkbox-label" for="public" style="color:#636363">公開</label>
                            </span> 
                        </div>

                       
                        <div class="form-group">
                            <label for="">希望支援額</label>
                            <div class="row d-flex  align-items-center">
                                <div class="col-md-4 pr-0">
                                    <input type="text" class="form-control" v-model="sponsorship.supportive_amount">
                                </div>
                                <div class="col-md-1 pl-2 yan-txt">円</div>
                            </div>
                        </div>
                    </div>

                    <div class="popup-databox">
                        <!-- <input type="radio" v-model="sponsorship.is_sponsor" :value="1">private
                        <input type="radio" v-model="sponsorship.is_sponsor" :value="0">public -->
                        <label for="">活動費内訳</label>
                        <div class="col-md-12 experience-box"  v-for="(activities, index) in sponsorship.activities" :key="activities.id">
                            <p class="delete-btn" @click="deleteActivity(index, activities.id)" v-if="sponsorship.activities.length > 1">
                                <span class="icon icon-times"></span>
                            </p>
                            <div class="row form-group  mb-0 d-flex align-items-center">
                                <div class="col-md-8">
                                    <input type="text" class="form-control" v-model="activities.activity">
                                </div>
                                <div class="col-md-2 pr-0">
                                    <input type="number" class="form-control" v-model="activities.cost" onkeypress="return (event.charCode >= 48 && event.charCode < 58)" min="0">
                                </div>
                                <div class="col-md-1 pl-2 yan-txt">円</div>
                            </div>
                        </div>
                        <p class="text-center mt-4">
                            <span class="btn add-btn" @click="addActivity">+ {{$t('jobseekerprofile.add')}}</span>
                        </p>

                            
                    </div>

                    <div class="popup-databox">
                        <div class="form-group">
                            <label for="">スポンサーに対して出来ること</label>
                            <div class="col-md-8 p-0">
                                <textarea rows="3" class="form-control col-md-8" v-model="sponsorship.sponsor_detail"></textarea>
                            </div>
                        </div>


                        <div class="form-group">
                            <label for="">活動目標</label>
                            <div class="col-md-8 p-0">
                                <textarea rows="3" class="form-control" v-model="sponsorship.activity_goal"></textarea>
                            </div>
                        </div>


                        <div class="form-group">
                            <label for="">競技への意気込み</label>
                            <div class="col-md-8 p-0">
                                <textarea rows="3" class="form-control" v-model="sponsorship.enthusiasm"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="">スポンサーへのPR</label>
                            <div class="col-md-8 p-0">
                                <textarea rows="3" class="form-control" v-model="sponsorship.sponsor_pr"></textarea>
                            </div>
                        </div>
                    </div>

                </div>

                <p class="text-center mt-3">
                    <span class="btn appendbtn btn-large" @click="saveSponsorshipRequirements">{{$t('common.save')}}</span>
                </p>
            </div>
            <!-- End Sponsorship Requirements -->
        </form>
    </div>
</template>
<script>
    import {required, minLength, maxLength, numeric, helpers} from "vuelidate/lib/validators";
    import { matchYoutubeUrl } from "../../../partials/common";
    import _ from "lodash";

    const isFurigana = (value) => {
    let allow = true;
    let charArray = value.split("");
    for (let i = 0; i < charArray.length; i++) {
        let code = charArray[i].charCodeAt();
        if (!(code > 12448 && code < 12543)) {
        allow = false;
        break;
        }
    }
    return !helpers.req(value) || allow;
    };
    const isTrueImage = (value) => {
    if (!value) {
        return true;
    }
    let file = value;
    return file.type ? file.type.startsWith("image") : true;
    };
    function buildFormData(formData, data, parentKey) {
        if (
            data &&
            typeof data === "object" &&
            !(data instanceof Date) &&
            !(data instanceof File)
        ) {
            Object.keys(data).forEach((key) => {
            buildFormData(
                formData,
                data[key],
                parentKey ? `${parentKey}[${key}]` : key
            );
            });
        } else {
            const value = data == null ? "" : data;
            formData.append(parentKey, value);
        }
    }
    export default {
    data() {
        return {
            years_data : (new Date().getFullYear()) - 1919,
            expyears_data : (new Date().getFullYear()) - 1920,
            edit_page : true,
            showMenuBar: true,
            file_names: [],
            defaultImageUrl: "",
            showDetails: true,
            selfIntroEdit: false,
            basicInfoEdit: false,
            athleteInfoEdit : false,
            careerEdit: false,
            expQualificationEdit: false,
            desiredConditionEdit: false,
            sponsorshipEdit: false,
            facImageUrl: "",
            selfIntro: {
                related_images: [],
                delete_related_images: [],
                delete_fac_image: false,
            },
            selfIntroDetails: {
                occupation_name : []
            },
            currentImage: "",
            imageError: "",
            employment_types: [],
            iso_list:[],
            positions: [],
            carrers: [
                {
                last_annual_income: "",
                num_of_experienced_companies: "",
                last_currency: "",
                },
            ],
            educations: [
                {
                id: null,
                jobseeker_id: null,
                school_name: "",
                subject: "",
                degree: 0,
                from_year: "年",
                from_month: "月",
                to_year: "年",
                to_month: "月",
                education_status: 0,
                },
            ],
            experiences: [
                {
                id: null,
                jobseeker_id: null,
                position_id: 0,
                employment_type_id: 0,
                job_location: "",
                main_duty: "",
                from_year: "年",
                from_month: "月",
                to_year: "年",
                to_month: "月",
                current: "",
                private_status: "",
                },
            ],
            //basicInfo
            basicInfo: {
                jobseeker_number:'',
                dob:'',
                continent_name:0,
                country_name:0,
                final_education: "",
                current_situation: "",
            },
            countries: [],
            city_list: [],
            languages: [],
            disabled: 0,
            finaleducation: [
                { id: "大学（学士)" },
                { id: "短期大学" },
                { id: "大学院（修士）" },
                { id: "大学院（博士）" },
                { id: "専門学校" },
                { id: "高校" },
                { id: "高等専門学校" },
                { id: "中学校" },
                { id: "その他" },
            ],
            currentposition: [
                { id: "会社員" },
                { id: "大学生/大学院生/専門学校" },
                { id: "語学留学生" },
                { id: "主婦" },
                { id: "経営者/自営業" },
                { id: "無職" },
                { id: "定年退職" },
                { id: "その他" },
            ],
            // currency : [{ id: "円"},{ id: "元"},{ id: "USドル"},{ id: "バーツ"}],
            //basicInfo

            // start athleteInformation
            athleteInformation: {
                competition_modal       : false,
                all_competition_list    : [],
                current_competition_id  : 1,
                tmp_competition_names   : [],
                competition_names    : [],
                competition_year    : "",
                competition_month   : "",
                income_license      : [],
                attended_college    : [],
                competition_activity    : "",
                remove_income_ids   : [],
                remove_college_ids  : []
            },
            // end athleteInformation

            // start sponsor's desired condition
            sponsorship: {
                is_sponsor          : 0,
                delete_activities   : [],
                supportive_amount   : "",
                activities          : [],
                sponsor_detail      : "",
                activity_goal       : "",
                enthusiasm          : "",
                sponsor_pr          : ""
            },
            // end sponsor's desired condition

            // (start) experience qualification
            ids_to_del_exp_quali: [],
            country_list: [],
            exp_occupations: [],
            exp_positions: [],
            experience_qualification: {
                experience_jobs: [],
                other_qualifications: {
                    qualifications: "",
                },
            },
            study_abroad_period: [
                "半年未満",
                "半年～1年",
                "1年～2年",
                "2年～3年",
                "4年以上",
            ],
            purpose_study_abroad: [
                "語学留学",
                "大学",
                "MBA",
                "MBA以外の修士号",
                "その他",
            ],
            overseas_working_period: ["1年未満", "1年～2年", "2年～3年", "4年以上"],
            language_level: [
                "挨拶程度",
                "日常会話",
                "ビジネスレベル",
                "ネイティブレベル",
            ],
            // (end) experience qualification

            desired_industries: [],
            desired_occupations: [],
            // images: [],
            activeImage: 4,

            //desired_condition
            moitivation: [
                { id: "積極的に多くの企業と会いたい" },
                { id: "いいところがあれば会いたい" },
                { id: "まだ積極的には考えていない" },
            ],
            activity_status: [
                { id: "特に何もしていない" },
                { id: "情報収集（求人サイト・求人雑誌）" },
                { id: "情報収集（人材会社等に登録）" },
                { id: "企業にエントリー済み" },
                { id: "一次面接・筆記試験予定がある" },
                { id: "最終面接予定がある" },
                { id: "既に内定をもらっている" },
            ],
            changing_jobs: [
                { id: "特になし" },
                { id: "勤務地域（国、都市）" },
                { id: "経験を活かせる業界、職種で働きたい" },
                { id: "未経験・異なる業界、職種に挑戦したい" },
                { id: "有名企業、大手企業で働きたい" },
                { id: "安定性、将来性がある企業で働きたい" },
                { id: "新規拠点・事業の立上げに関わりたい" },
                { id: "給与・待遇面を改善したい" },
                { id: "駐在案件の海外勤務を希望" },
            ],
            currency: [
                { id: "円" },
                { id: "元" },
                { id: "USドル" },
                { id: "バーツ" },
            ],
            desired_city_list: [],
            industry_list: [],
            occupation_list: [],
            date_list: [],
            industries: [{
                id: 0,
                jobseeker_id: null,
                }],
            occupations: [{
                id: 0,
                jobseeker_id: null,
            }],
            desired_condition:{
                occupation_name:'',
                industry_name:'',
                desired_min_annual_income:null,
                desired_location_1:null
            },
            desired_errors: {
                industry_error:'',
                occupation_error:'',
                location_error:'',
                location_error_status:false
            },
            experience_errors:'',
            exp_year_errors:'',
            exp_month_errors:'',
            //desired_condition
            showModal : false,
            imgUrl: '',
        };
    },
    validations: {
        selfIntro: {
        video: { matchYoutubeUrl },
        face_image: { isTrueImage },
        },
        basicInfo: {
            phone: {
                required,
                numeric,
                minLength: minLength(10),
                maxLength: maxLength(14),
            },
            jobseeker_furigana_name: {
                required,
                isFurigana,
            },
            jobseeker_name: {
                required,
            },
            /* email: {
                required,
                email,
            }, */
        },

        // desired_condition: {
        //     desired_min_annual_income: { required },
        // },
        showModal : false,
        imgUrl: '',
    },

    created() {
        // this.$loading.show();
        window.scrollTo(0, 0);
        this.edit_page = this.$route.name == 'jobseeker-detail' ? false : true;
        this.selfIntro.face_image_private_status = 0;
        this.landingProfileInfos();
        // let jobseeker_id = `${this.$route.params.id}`;
        // this.getSelfIntroDetails(jobseeker_id);
        // this.getCarrerRequiredList();
        // this.getBasicInfoDetails(jobseeker_id);
        // this.getCarrerDetails(jobseeker_id);
        // this.getDesiredCondition(jobseeker_id);

        // let request_id = {};
        // this.$set(request_id, "id", jobseeker_id);
        // this.getJobIndustryExpDetails(request_id);
    },

    computed: {
        years() {
            const year = new Date().getFullYear();
            return Array.from(
                { length: year - 1900 },
                (value, index) => year - index
            );
        },
        months() {
            return [
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月",
            ];
        }
    },

    methods: {

        chooseLocation(){            
            
            if(this.desired_condition.desired_location_1 != null || this.desired_condition.desired_location_2 != null || this.desired_condition.desired_location_3 != null){
            
                this.desired_errors.location_error_status = true;
                this.desired_errors.location_error = '';
                
            }
            else if(this.desired_condition.desired_location_1 == null && this.desired_condition.desired_location_2 == null && this.desired_condition.desired_location_3 == null){
                
                this.desired_errors.location_error_status = false;
                
            }
        },
        getData(status) {
            if (status == "industry") {
                this.desired_errors.industry_error = "";
            } else {
                this.desired_errors.occupation_error = "";
            }
        },

        checkGender(type) {
            this.basicInfo.gender = type;
        },

        checkPrivateStatus(type,index,status) {
            if(type == 0){
                    this.experiences[index].private_status = status;
            }
            if(type == 1){
                if(status == 2 ){
                    this.experiences[index].private_status = status;
                } else{
                    this.experiences[index].private_status = 0;
                }
            }
            if(type == 2){
                    if(status == 1 ){
                    this.experiences[index].private_status = status;
                }else{
                    this.experiences[index].private_status = 0;
                }
            }
        },

        getCarrerRequiredList() {
            this.$api.get("/v1/jobseeker/required-list").then((response) => {
                this.positions = response.data.data.positions;
                this.employment_types = response.data.data.employment_types;
                this.iso_list = response.data.data.iso_list;
            });
        },

        yearChange(index,istrue)
        {
            if(istrue){
                this.experiences[index].to_year = '年';
                this.experiences[index].to_month = '月';

            }
        
        },

        change(type,value,index)
        {
            if(type == 'year')
            {
                if(value == '年'){
                        this.experiences[index].to_year = '年';
                }
                
            }else{
                    if(value == '月'){
                    this.experiences[index].to_month = '月';
                }
                
            }
        },

        //su sandy
        getSelfIntroDetails(request_id) {
            let loader = this.$loading.show();
            //console.log("loader",loader);
            this.$api.get("/v1/default-image").then((r) => {
                this.defaultImageUrl = r.data.data;
            });

            this.$api.get(`/v1/jobseeker/profile/selfintro?jobseekerid=${request_id}`).then((r) => {
                this.file_names = r.data.data.hashedFile; //hashed for related_images

                this.selfIntro = r.data.data.selfIntro; //rebind selfintro data

                this.selfIntro.delete_related_images = []; //clear deleted images

                this.currentImage = this.selfIntro.face_image_url;

                this.selfIntroDetails = r.data.data.selfIntroDetails; //to show selfintro details

                if(this.selfIntroDetails.occupation_name != null) {
                    this.selfIntroDetails.occupation_name = this.selfIntroDetails.occupation_name.split(',');
                }
                else{
                    this.selfIntroDetails.occupation_name = [];
                }

                this.activeImage = 4;
                this.$emit('showDeactivateInDetail', this.selfIntro.record_status);
            });
            loader.hide();
        },

        //su sandy
        activateImage(type, imageIndex) {
            if (type == "related") {
                this.activeImage = imageIndex;
                this.currentImage = this.selfIntro.related_images[imageIndex].file_url;
            } else {
                this.activeImage = imageIndex;
                this.currentImage = this.selfIntro.face_image_url;
            }
        },

        //su sandy
        changeFaceImage(e) {
            this.$v.selfIntro.face_image.$touch();
            if (this.$v.selfIntro.face_image.$error) {
                return;
            }
            const files = e.target.files || e.dataTransfer.files;
            const file = files[0];
            const ext = file.name.split(".").pop().toLowerCase();

            if (ext == "png" || ext == "jpg" || ext == "jpeg") {
                // if (file.size / 1024 / 1024 <= 3) {
                this.selfIntro.face_image = file;
                this.selfIntro.face_image_url = URL.createObjectURL(file);
                this.selfIntro.delete_fac_image = false;
                // } 
                /* else {
                this.$alertService
                    .showWarningDialog(
                    null,
                    this.$t("alertMessage.imageSizeWarning"),
                    this.$t("alertMessage.yes")
                    )
                    .then((r) => {
                        console.log(r);
                    });
                } */
            } else {
                this.$alertService
                .showWarningDialog(
                    null,
                    this.$t("alertMessage.imageTypeWarning"),
                    this.$t("alertMessage.yes")
                )
                .then((r) => {
                    console.log(r);
                });
            }
            e.target.value = ''; 
        },

        //su sandy
        deleteFacImage() {
            // this.$alertService.showConfirmDialog(null, "Are you sure to delete logo?").then((r) => {
            //     if (r.value) {
            this.selfIntro.face_image = "";
            this.selfIntro.face_image_url = this.defaultImageUrl;
            this.selfIntro.delete_fac_image = true;
            //     }
            // });
        },

        //su sandy
        changeRelatedImages(e) {
            const files = e.target.files || e.dataTransfer.files;
            if (files.length + this.selfIntro.related_images.length > 4) {
                this.$alertService
                .showWarningDialog(
                    null,
                    this.$t("alertMessage.imageMaximunWarning"),
                    this.$t("alertMessage.yes")
                )
                .then((r) => {
                    console.log(r);
                });
                return;
            }

            let taken = this.selfIntro.related_images.map((x) => {
                return x.url.split(".")[0];
            });
            let availables = this.file_names.filter((x) => !taken.includes(x));

            const vm = this;
            Array.from(files).forEach((file, i) => {
                const ext = file.name.split(".").pop().toLowerCase();

                if (ext == "png" || ext == "jpg" || ext == "jpeg") {
                // if (file.size / 1024 / 1024 <= 3) {
                    let filename = availables[i];
                    let extension = file.type.split("/").pop();
                    let entry = {
                    file: file,
                    url: `${filename}.${extension}`,
                    file_url: URL.createObjectURL(file),
                    file_type: "photo",
                    user_type: "jobseeker",
                    };
                    vm.selfIntro.related_images.splice(i, 0, entry);
                    let deleteFlagIndex = vm.selfIntro.delete_related_images.indexOf(
                    filename
                    );
                    if (deleteFlagIndex == -1)
                    vm.selfIntro.delete_related_images.splice(deleteFlagIndex, 1);
                // } 
                /* else {
                    this.$alertService
                    .showWarningDialog(
                        null,
                        this.$t("alertMessage.imageSizeWarning"),
                        this.$t("alertMessage.yes")
                    )
                    .then((r) => {
                        console.log(r);
                    });
                } */
                } else {
                this.$alertService
                    .showWarningDialog(
                    null,
                    this.$t("alertMessage.imageTypeWarning"),
                    this.$t("alertMessage.yes")
                    )
                    .then((r) => {
                        console.log(r);
                    });
                }
            });
            e.target.value = ''; 
        },

        //su sandy
        deleteRelatedImage(index) {
            // this.$alertService.showConfirmDialog(null, "Delete image?").then((r) => {
            //     if (r.value) {
            let uploadedFile = this.selfIntro.related_images.splice(index, 1);
            let filename = uploadedFile[0].url.slice(
                0,
                uploadedFile[0].url.indexOf(".")
            );

            if (this.selfIntro.delete_related_images.indexOf(filename) == -1)
                this.selfIntro.delete_related_images.push(filename);
            //     }
            // });
        },

        landingProfileInfos() {
            let jobseeker_id = `${this.$route.params.id}`;
            this.getSelfIntroDetails(jobseeker_id);
            this.getCarrerRequiredList();
            this.getBasicInfoDetails(jobseeker_id);
            this.getCarrerDetails(jobseeker_id);
            this.getDesiredCondition(jobseeker_id);

            let request_id = {};
            this.$set(request_id, "id", jobseeker_id);
            this.getAthleteInfo(request_id);
            this.getJobIndustryExpDetails(request_id);
            this.getSponsorshipRequirements(request_id);
        },

        // Edit Button Click
        editBox(boxName, action) {
            this.showDetails = !this.showDetails;
            this[boxName] = !this[boxName];
            // let request_id = {};
            // this.$set(request_id, "id", `${this.$route.params.id}`);
            // // this.getBasicInfoDetails();
            // this.getSelfIntroDetails(`${this.$route.params.id}`);
            // this.getCarrerDetails();
            if (action == "open") {
                if(boxName == 'desiredConditionEdit'){
                    if(!this.date_list.includes(this.desired_condition.desired_change_period)){
                        this.desired_condition.desired_change_period = null;
                    }
                }
                window.scrollTo(0, 0);
                this.$emit('menuShowHide',this.showMenuBar = false)
            } else {
                this.landingProfileInfos();
                // if (boxName == "expQualificationEdit") {
                //     this.getJobIndustryExpDetails(request_id); // request_id
                //     // call getData func back to clear empty array in data collection
                // }
                this.$emit('menuShowHide',this.showMenuBar = true);
                this.$nextTick(() => {
                var ele = this.$el.querySelector("#" + boxName);
                window.scrollTo(0, ele.offsetTop);
                });
            }
        },

        // Education
        addEducation() {
            this.educations.push({
                id: null,
                jobseeker_id: null,
                school_name: "",
                subject: "",
                degree: null,
                from_year: null,
                from_month: null,
                to_year: null,
                to_month: null,
                education_status: null,
            });
        },

        deleteEducation(indx) {
            this.educations.splice(indx, 1);
        },

        //(start) Athlete-Information Part
        addIncomeLicense(){
            this.athleteInformation.income_license.push({
                income_lic : ''
            });
        },

        deleteIncomeLicense(index, income_id){
            if( typeof(income_id) !== 'undefined' ){
                this.athleteInformation.remove_income_ids.push(income_id);
            }
            this.athleteInformation.income_license.splice(index, 1);
        },

        addAttendedCollege(){
            this.athleteInformation.attended_college.push({
                college_name : '',
                from_year : '',
                from_month : '',
                to_year : '',
                to_month : '',
            });
        },

        deleteAttendedCollege(index, attended_college_id){
            if( typeof(attended_college_id) !== 'undefined' ){
                this.athleteInformation.remove_college_ids.push(attended_college_id);
            }
            this.athleteInformation.attended_college.splice(index, 1);
        },

        modalOnOff(box){
            if(box == 'open')
                this.athleteInformation.competition_modal = true;
            else
                this.athleteInformation.competition_modal = false;
        },

        showCompetitions(id){
            this.athleteInformation.current_competition_id = id;
            this.athleteInformation.current_sub_competition = _.find(this.athleteInformation.all_competition_list, (f) => f.id == id).competition_name;
                this.athleteInformation.current_competitions_count = _.filter(this.athleteInformation.all_competition_list, (e) =>  e.parent_id == id).length;
        },

        selectedCompetitions(id, parent_id, name){
            if(this.athleteInformation.tmp_competition_names.some(competition => competition.id === id)){
                this.removeCompetition(id);
                /* let result = _.filter(this.athleteInformation.tmp_competition_names, (e) => e.id !== id );
                this.athleteInformation.tmp_competition_names = [];
                result.forEach(element => {
                    this.athleteInformation.tmp_competition_names.push(element);
                }); */
            }else{
                this.athleteInformation.tmp_competition_names.push({
                    id               : id,
                    parent_id        :parent_id,
                    competition_name :name
                });
            }
        },

        removeCompetition(id){
            // if id is null, remove all selected items
            if(id === null){
                this.athleteInformation.tmp_competition_names = [];
            }else{
                let left_selected_competitions = _.filter(this.athleteInformation.tmp_competition_names, (e) => e.id !== id );
                this.athleteInformation.tmp_competition_names = [];
                left_selected_competitions.forEach(element => {
                    this.athleteInformation.tmp_competition_names.push(element);
                });
            }
        },

        showRemoveIcon(id){
            return this.athleteInformation.tmp_competition_names.some(competition => competition.id === id);
        },

        groupBySelectedItems() {
            return _.groupBy(this.athleteInformation.tmp_competition_names, (e) => e.parent_id );
        },

        selectedItemsCount(data){
            if (data !== undefined)
                return Object.keys(data).length;
        },

        getAthleteInfo(request_id){
            this.$api.post("/v1/jobseeker/profile/athlete-information", request_id)
            .then((res) => {
                let athlete_histories   = res.data.data.athlete_histories;
                let jobseeker_info      = res.data.data.jobseeker_detail;
                let all_competitions    = res.data.data.competition;
                let competition_ids     = jobseeker_info['competition_name'] === null ? [] : jobseeker_info['competition_name'].split(',');

                this.athleteInformation.all_competition_list    = all_competitions;
                this.athleteInformation.competition_year        = jobseeker_info['competition_year'] || '';
                this.athleteInformation.competition_month       = jobseeker_info['competition_month'] || '';
                this.athleteInformation.competition_activity    = jobseeker_info['competition_activity'] || '';
                this.athleteInformation.tmp_competition_names   = [];
                this.athleteInformation.attended_college        = [];
                this.athleteInformation.income_license          = [];

                if(competition_ids.length > 0){
                    for(const competition_id of competition_ids){
                        var result = _.find( all_competitions, (item) => item.id == competition_id );
                        this.athleteInformation.tmp_competition_names.push(result);
                    }
                }

                if(athlete_histories.length > 0){
                    for(const athlete_history of athlete_histories){
                        if(athlete_history['income_license'] === null){
                            this.athleteInformation.attended_college.push({
                                id              : athlete_history['id'],
                                income_lic      : null,
                                college_name    : athlete_history['attended_college'],
                                from_year       : athlete_history['from_year'] || '',
                                from_month      : athlete_history['from_month'] || '',
                                to_year         : athlete_history['to_year'] || '',
                                to_month        : athlete_history['to_month'] || '', 
                            });
                        }else{
                            this.athleteInformation.income_license.push({
                                id          : athlete_history['id'],
                                income_lic  : athlete_history['income_license']
                            });
                        } 
                    }
                }
                if(this.athleteInformation.attended_college.length == 0){
                    this.athleteInformation.attended_college.push({
                        income_lic      : null,
                        college_name    : '',
                        from_year       : '',
                        from_month      : '',
                        to_year         : '',
                        to_month        : '',
                    });
                }
                if(this.athleteInformation.income_license.length == 0){
                    this.athleteInformation.income_license.push({
                        income_lic  : '',
                    });
                }
            })
            .catch((errors) => {
                console.log(errors);
            });
        },

        saveAthleteInfo(){
            this.athleteInformation.competition_names = this.athleteInformation.tmp_competition_names.map((name) => name.id);
            let request_data = {
                request_id          : `${this.$route.params.id}`,
                athlete_information : this.athleteInformation,
            };
            let loader = this.$loading.show();
            this.$api.post("/v1/jobseeker/profile/athlete-information/update", request_data)
                .then((response) => {
                    console.log(response.data.data);
                    loader.hide();
                    this.$alertService.showSuccessDialog(null, this.$t('alertMessage.saveSuccess'), this.$t('common.close'));
                    this.editBox('athleteInfoEdit','close');
                    this.getAthleteInfo();
                })
                .catch((errors) => {
                    console.log(errors);
                    loader.hide();
                });
        },
        //(end) Athlete-Information Part

        //(start) Sponsorship-Requirements Part
        addActivity(){
            this.sponsorship.activities.push({ activity : '', cost : '' });
        },

        deleteActivity(index, id){
            if( typeof(id) !== 'undefined' ){
                this.sponsorship.delete_activities.push(id);
            }
            this.sponsorship.activities.splice(index, 1);
        },

        getSponsorshipRequirements(request_id){
            this.$api.post("/v1/jobseeker/profile/sponsorship-requirements", request_id)
            .then((res) => {
                let jobseeker       = res.data.data.jobseeker_detail;
                let sponsor_info    = res.data.data.sponsor_info;

                this.sponsorship.is_sponsor         = jobseeker.is_sponsor;
                this.sponsorship.supportive_amount  = jobseeker.sponsor_amount;
                this.sponsorship.sponsor_detail     = jobseeker.sponsor_detail;
                this.sponsorship.activity_goal      = jobseeker.sponsor_activity;
                this.sponsorship.enthusiasm         = jobseeker.enthusiasm;
                this.sponsorship.sponsor_pr         = jobseeker.sponsor_pr;
                
                this.sponsorship.activities = [];
                if(sponsor_info.length > 0){
                    for(const sponsor_activity of sponsor_info){
                        this.sponsorship.activities.push({
                            id          : sponsor_activity.id,
                            activity    : sponsor_activity.sponsor_item,
                            cost        : sponsor_activity.cost
                        });
                    }
                }else{
                    this.addActivity();
                }
            })
            .catch((errors) => {
                console.log(errors);
            });
        },

        saveSponsorshipRequirements(){
            let loader = this.$loading.show();
            this.$set(this.sponsorship, "request_id", `${this.$route.params.id}`);
            this.$api
                .post("/v1/jobseeker/profile/sponsorship-requirements/update", this.sponsorship)
                .then((response) => {
                    console.log(response.data.data);
                    loader.hide();
                    this.$alertService.showSuccessDialog(null, this.$t('alertMessage.saveSuccess'), this.$t('common.close'));
                    this.editBox('sponsorshipEdit','close');
                })
                .catch((errors) => {
                    console.log('errors', errors);
                    loader.hide();
                });
        },
        //(end) Sponsorship-Requirements Part

        // Experience
        addExperience() {
            this.experiences.push({
                id: null,
                jobseeker_id: null,
                position_id: 0,
                employment_type_id: 0,
                job_location: "",
                main_duty: "",
                from_year: "年",
                from_month: "月",
                to_year: "年",
                to_month: "月",
                current: null,
                private_status: "",
            });
        },
        deleteExperience(indx) {
            this.experiences.splice(indx, 1);
        },

        //(start) ExpQualification by zayar_phone_naing
        containNullOnly(exp_job) {
            return Object.values(exp_job).every(x => (x === null || x === ''));
        },

        addExpQualification() {
            this.experience_qualification.experience_jobs.push({
                experience_year: "",
                experience_industry: "",
                experience_occupation: "",
                experience_position: "",
            });
        },

        getJobIndustryExpDetails(request_id) {
            this.$api
                .post("/v1/jobseeker/profile/experiences-qualifications", request_id)
                .then((res) => {
                let response            = res.data.data;
                this.industry_list      = response.industries;
                this.country_list       = response.countries;
                this.exp_occupations    = response.occupations;
                this.exp_positions      = response.positions;
                let jobseeker_detail    = response.jobseeker_detail;
                let industry_histories  = response.industry_histories;

                // experience job type
                this.experience_qualification.experience_jobs = [];
                if (industry_histories.length > 0) {
                    for (const industry_history of industry_histories) {
                        this.experience_qualification.experience_jobs.push({
                            industry_history_id: industry_history.id,
                            experience_year: industry_history.experience_year,
                            experience_industry: industry_history.industry_id || '',
                            experience_occupation: industry_history.occupation_keyword_id || '',
                            experience_position: industry_history.position_id || '',
                        });
                    }
                } else {
                    this.experience_qualification.experience_jobs.push({
                    industry_history_id: "",
                    experience_year: "",
                    experience_industry: "",
                    experience_occupation: "",
                    experience_position: "",
                    });
                }

                // other qualifications
                this.experience_qualification.other_qualifications.qualifications =
                    jobseeker_detail.other_certificate;
            })
            .catch((errors) => {
            console.log(errors);
            });
        },

        deleteExpQualification(index, industry_history_id) {
            if (typeof industry_history_id !== "undefined") {
                this.ids_to_del_exp_quali.push({ industry_history_id });
            }
            this.experience_qualification.experience_jobs.splice(index, 1);
        },

        saveExpQualification() {
            let loader = this.$loading.show();
            let request_data = {
                request_id:             `${this.$route.params.id}`,
                experienced_jobs:       this.experience_qualification.experience_jobs,
                delete_experience_jobs: this.ids_to_del_exp_quali,
                other_qualifications:   this.experience_qualification.other_qualifications,
            };
            this.$api.post("/v1/jobseeker/profile/experiences-qualifications/update", request_data)
            .then((response) => {
                console.log(response.data.data);
                loader.hide();
                this.$alertService.showSuccessDialog(null, this.$t('alertMessage.updateSuccess'), this.$t('common.close'));
                this.editBox("expQualificationEdit", "close");
            })
            .catch((errors) => {
                console.log(errors);
                loader.hide();
            });
        },
        //(end) ExpQualification by zayar_phone_naing

        //Industry (sus andy)
        addIndustry() {
            this.industries.push({
                id: 0,
                jobseeker_id: null,
            });
        },
        removeIndustry(index) {
            this.industries.splice(index, 1);
        },
        //occupation

        //occupation (su sandy)
        addOccupation() {
            this.occupations.push({
                id: 0,
                jobseeker_id: null,
            });
        },
        removeOccupation(index) {
            this.occupations.splice(index, 1);
        },
        //occupation

        //su sandy
        saveSelfIntro() {
            this.$v.selfIntro.$touch();
            if (this.$v.selfIntro.$invalid) {
                return;
            }

            let loading = this.$loading.show();
            this.$set(this.selfIntro, "jobseekerid", this.$route.params.id);
            let data = new FormData();
            buildFormData(data, this.selfIntro);
            this.$api
                .post("/v1/jobseeker/profile/selfintro", data)
                .then((r) => {
                    console.log(r);
                this.$alertService.showSuccessDialog(
                    null,
                    this.$t("alertMessage.updateSuccess"),
                    this.$t("common.close")
                );
                this.editBox("selfIntroEdit", "close");
                this.getSelfIntroDetails(`${this.$route.params.id}`);
                })
                .catch((e) => {
                    console.log(e);
                })
                .finally(() => {
                    loading.hide();
                });
        },

        // Zinko
        saveBasicInfo() {
            this.$v.basicInfo.$touch();
            if (this.$v.basicInfo.$invalid) {
                return;
            }

            // let data = new FormData();
            // buildFormData(data, this.basicInfo);
            this.$set(this.basicInfo, "jobseekerid", this.$route.params.id);
            let loading = this.$loading.show();
            this.$api
                .post("/v1/jobseeker/profile/basicinfo",this.basicInfo)
                .then((r) => {
                    console.log(r);
                this.$alertService.showSuccessDialog(
                    null,
                    this.$t("alertMessage.updateSuccess"),
                    this.$t("common.close")
                );
                this.basicInfoEdit = false;
                this.showDetails = true;
                this.$emit('menuShowHide',this.showMenuBar = true);
                this.getBasicInfoDetails(`${this.$route.params.id}`);
                })
                .catch((e) => {
                console.log(e);
                })
                .finally(() => {
                loading.hide();
                });
        },

        getBasicInfoDetails(request_id) {
            this.$api.get(`/v1/jobseeker/profile/basicinfo?jobseekerid=${request_id}`).then((response) => {
                this.basicInfo = response.data.data.profile;
                this.city_list = response.data.data.cities;
                this.languages = response.data.data.languages;
                this.countries = response.data.data.countries;
                // if(this.basicInfo.dob == '' ){
                //     this.basicInfo.dobyears = null;
                //     this.basicInfo.dobmonth = null;
                //     this.basicInfo.dobday = null;
                // }
                // else{
                //     const dob = new Date(this.basicInfo.dob);
                //     this.basicInfo.dobyears = dob.getFullYear() + ' 年';
                //     this.basicInfo.dobmonth = dob.getMonth() + 1 + ' 月';
                //     this.basicInfo.dobday = dob.getDate() + ' 日';
                // }
            });
        },

        getCity() {
            /* this.basicInfo.city_name = 0;
            this.$api
                .get("/v1/jobseeker/city-list/" + this.basicInfo.country_name)
                .then((res) => {
                this.city_list = res.data;
                }); */
            this.basicInfo.country_name = '';
            this.$api.get("/v1/jobseeker/city-list/" + this.basicInfo.continent_name).then((res) => {
                this.city_list = res.data;
            });
        },

        getCarrerDetails(request_id) {
            this.$api.get(`/v1/jobseeker/profile/carrerinfo?jobseekerid=${request_id}`).then((response) => {
                
                this.educations = response.data.data.educations;
                this.experiences = response.data.data.experiences;
                if(this.educations.length > 0){
                            
                    this.educations.forEach(element => {
                        
                        if(element.from_year){
                            element.from_year = element.from_year + 1920+ " 年";
                        }else{
                            element.from_year = null;
                        }

                        if(element.from_month || element.from_month == 0){
                            element.from_month = element.from_month + 12+ " 月";
                        }else{
                            element.from_month = null;
                        }

                        if(element.to_year){
                            element.to_year = element.to_year + 1920+ " 年";
                        }else{
                            element.to_year = null ;
                        }

                        if(element.to_month || element.to_month == 0){
                            element.to_month = element.to_month + 12+ " 月";
                        }else{
                            element.to_month =  null;
                        }   
                        
                    });
                } else {
                    this.educations.push({
                        id: null,
                        jobseeker_id: null,
                        school_name: "",
                        subject: "",
                        degree: null,
                        from_year: null,
                        from_month: null,
                        to_year: null,
                        to_month: null,
                        education_status: null,
                        
                    });
                }

                if (this.experiences.length > 0) {
                this.experiences.forEach((element) => {
                    if (element.position_id == null) {
                    element.position_id == 0;
                    }

                    if (element.employment_type_id == null) {
                    element.employment_type_id == 0;
                    }

                    if (element.from_year) {
                    element.from_year = element.from_year + 1920 + " 年";
                    } else {
                    element.from_year = "年";
                    }

                    if (element.from_month) {
                    element.from_month = element.from_month + 12 + " 月";
                    } else {
                    element.from_month = "月";
                    }

                    if (element.to_year) {
                    element.to_year = element.to_year + 1920 + " 年";
                    } else {
                    element.to_year = "年";
                    }

                    if (element.to_month) {
                    element.to_month = element.to_month + 12 + " 月";
                    } else {
                    element.to_month = "月";
                    }

                    if(element.private_status == null){
                        element.private_status = 0;
                    }
                });
                } else {
                    this.experiences.push({
                        id: null,
                        jobseeker_id: null,
                        position_id: 0,
                        employment_type_id: 0,
                        job_location: "",
                        main_duty: "",
                        from_year: "年",
                        from_month: "月",
                        to_year: "年",
                        to_month: "月",
                        current: 0,
                        private_status: 0,
                    });
                }

                this.carrers = response.data.data.carrers;
            });
        },

        //Zin ko

        // Thuzar
        saveCarrer() {
            let current = this.experiences.filter(x=>x.current == 1 && (x.from_year == '年' || x.from_month == '月'));
            if(current.length > 0){
                this.exp_year_errors = "errors";
                this.exp_month_errors = "errors";
            }
            else{
                this.exp_year_errors = '';
                this.exp_month_errors = '';

            }

            for(var i =this.experiences.length-1;i>=0;i--){
                if(this.experiences.length != 1){
                    if((this.experiences[i].job_location == null || this.experiences[i].job_location == '') && this.experiences[i].from_year == '年' && this.experiences[i].from_month == '月' && 
                        this.experiences[i].to_year == '年' && this.experiences[i].to_month == '月' && this.experiences[i].position_id == "0" && this.experiences[i].employment_type_id == "0" && 
                        (this.experiences[i].main_duty == null || this.experiences[i].main_duty == '' && this.experiences[i].private_status == 0 ) && (this.experiences[i].current == false || this.experiences[i].current == 0)
                        && this.exp_year_errors == '' && this.exp_month_errors == '')  {
                        this.experiences.splice(i,1);
                        
                    }
                }
                    
            }

            for(var j =this.educations.length-1;j>=0;j--){
                if(this.educations.length != 1) {
                    if((this.educations[j].school_name == null || this.educations[j].school_name == '' ) && (this.educations[j].degree == null || this.educations[j].degree == '' )  && (this.educations[j].subject == null || this.educations[j].subject == '' ) && this.educations[j].from_year == null && this.educations[j].to_year == null && this.educations[j].from_month == null && this.educations[j].to_month == null && this.educations[j].education_status == null ){
                        this.educations.splice(j,1);
                    }
                }
            }
            if(this.exp_year_errors == '' && this.exp_month_errors == ''){
                let loader = this.$loading.show();
                
                let jsonData = {
                    jobseekerid : `${this.$route.params.id}`,
                    educations: this.educations,
                    experiences: this.experiences,
                    carrers: this.carrers,
                };
                this.$api.post("/v1/jobseeker/profile/carrer", jsonData).then((response) => {
                this.$alertService.showSuccessDialog(
                        null,
                        this.$t("alertMessage.updateSuccess"),
                        this.$t("common.close")
                    );
                    // this.editBox("careerEdit", "close");
                    // this.getCarrerDetails(); 
                    // loader.hide();
                    console.log(response);
                    this.careerEdit = false;
                    this.showDetails = true;
                    this.getCarrerDetails(`${this.$route.params.id}`);
                    this.$emit('menuShowHide',this.showMenuBar = true);
                    loader.hide();
                })
                .catch((errors) => {
                    console.log(errors);
                    loader.hide();
                });
            }
            /* for(var i =this.experiences.length-1;i>=0;i--){
                if(this.experiences.length != 1)
                {
                    if(this.experiences[i].job_location == null || this.experiences[i].job_location == '')
                    {
                        this.experiences.splice(i,1);
                    }
                }
            }

            for(var j =this.educations.length-1;j>=0;j--){
                if(this.educations.length != 1)
                {
                    if(this.educations[j].school_name == null || this.educations[j].school_name == '')
                    {
                        this.educations.splice(j,1);
                    }
                }
            }

            let loader = this.$loading.show();

            let jsonData = {
                jobseekerid : `${this.$route.params.id}`,
                educations: this.educations,
                experiences: this.experiences,
                carrers: this.carrers,
            };

            this.$api
                .post("/v1/jobseeker/profile/carrer", jsonData)
                .then((response) => {
                    console.log(response);
                    this.$alertService.showSuccessDialog(
                        null,
                        this.$t("alertMessage.updateSuccess"),
                        this.$t("common.close")
                    );
                    this.careerEdit = false;
                    this.showDetails = true;
                    this.getCarrerDetails(`${this.$route.params.id}`);
                    this.$emit('menuShowHide',this.showMenuBar = true);
                    loader.hide();
                })
                .catch((errors) => {
                    console.log(errors);
                    loader.hide();
                }); */
        },
        // Thuzar

        //Su Sandy
        getDesiredCondition(request_id) {
        this.$api
            .get(`/v1/jobseeker/profile/desired-condition?jobseekerid=${request_id}`)
            .then((response) => {
                this.desired_city_list = response.data.city_list;
                this.industry_list = response.data.industry_list;
                this.occupation_list = response.data.occupation_list;
                this.date_list = response.data.date_list;
                this.desired_condition = response.data.desired_condition;
                this.chooseLocation();

                    if(response.data.industries.length)
                    {
                        this.industries = response.data.industries;
                    }
                    else{
                        this.industries=[{id:0,jobseeker_id:null}];
                    }

                    if(response.data.occupations.length)
                    {
                        this.occupations = response.data.occupations;
                    }
                    else{
                        this.occupations=[{id:0,jobseeker_id:null}];
                    }
            });
        },

        saveDesiredCondition() {
            let jsonData = {
                jobseekerid: `${this.$route.params.id}`,
                desired_condition: this.desired_condition,
                industries: this.industries,
                occupations: this.occupations,
            };

            //delete industry null 
            if(this.desired_condition.desired_industry_status) {
                jsonData.industries = [];
            }else{
                var indexArray = [];
                this.industries.forEach(function(value, index) {
                    if (value.id != 0) {
                        indexArray.push(index);
                    }
                })
            
            }

            //delete occupation null 
            if(this.desired_condition.desired_occupation_status){
                jsonData.occupations = [];
            }
            else{
                indexArray = [];
                this.occupations.forEach(function(value, index) {
                    if (value.id != 0) {
                        indexArray.push(index);
                    }
                })
            }
            console.log(jsonData);
            
            let loader = this.$loading.show();
            this.$api
                .post("/v1/jobseeker/profile/desired-condition", jsonData)
                .then((response) => {
                    console.log(response);
                    this.$alertService.showSuccessDialog(
                    null,
                    this.$t("alertMessage.updateSuccess"),
                    this.$t("common.close")
                    );
                    this.desiredConditionEdit = false;
                    this.showDetails = true;
                    this.$emit('menuShowHide',this.showMenuBar = true);
                    this.getDesiredCondition(`${this.$route.params.id}`);
                    loader.hide();
                })
            .catch((errors) => {
                console.log(errors);
                loader.hide();
            });
        },
        // Su Sandy

        imagePopup(url) {
            if(url.includes('images/default.png') || url.includes('images/no_public.png')){
                return false;
            }else{
                this.showModal =  true;
                this.imgUrl = url;
            }  
        },
    },
};
</script>
<style lang="scss" scoped>
.form-group {
    .col-md-8 ,
    .col-md-7 ,
    .col-md-3 {
        float: none;
    }
}
// .movie-row {
//    .col-md-8 ,
//     .col-md-7 ,
//     .col-md-3 {
//         float: left;
//     } 
// }
.error {
    color: red;
}
.position-relative {
    position: relative!important;
}
.d-inline-block {
    display: inline-block!important;
}
.face-img-block {
    height: 240px;
    margin-bottom: 10px !important;
    cursor: pointer;
}
.face-img-block img {
    width: 100%;
    height: 100%;
    -o-object-fit: contain;
    object-fit: contain;
    cursor: pointer;
}
.face-image-wrapper {
  position: relative;
  display: inline-block;
  img {
      max-width: 100%;
      height: 240px;
  }
}
.face-image {
  height: 115px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: bottom;
  }
}
.img-wrapper {
    margin-bottom: 10px;
    height: 240px;
}
.img-wrapper img {
   width: 100%;
    height: 100%;
    -o-object-fit: contain;
    object-fit: contain;
}
.card-carousel p {
    margin-bottom: 6px;
    line-height: 1.3;
}
.form-control {
    border: 1px solid #919191;
    border-radius: 0;
}
/* modal-dialog */
.popup-databox {
    border: 1px solid #c4c4c4;
    border-radius: 8px;
    padding: 15px 30px;
    margin-bottom: 20px;
}
.popup-databox .form-group {
    margin-bottom: 1.5rem;
}
.school-box,
.experience-box {
    margin-bottom: 30px;
    padding: 30px;
    background: #f0f0f0;
    border-radius: 3px;
    border: 1px solid #c4c4c4;
}



/* modal-dialog */
.popup-databox {
    border: 1px solid #c4c4c4;
    border-radius: 8px;
    padding: 15px 30px;
    margin-bottom: 20px;
}
.popup-databox .form-group {
    margin-bottom: 1.5rem;
}
.school-box,
.experience-box {
    margin-bottom: 30px;
    padding: 30px;
    background: #f0f0f0;
    border-radius: 3px;
    border: 1px solid #c4c4c4;
}
.school-box-2{
    border: none;
    background: none;
    padding: 10px 0 0 0;
}
/*.school-box-2 .popup-databox{
    padding: 30px;
}*/
.school-box-2 .form-group{
    border-radius: 3px;
    border: 1px solid #c4c4c4;
    padding: 30px;
    background: #ffffff;
    position: relative;
}
.history-box{
    margin: 0;
}
.license-row{
    position: relative;
    background: #f0f0f0;
    margin: 0 0 1.5rem 0;
    border-radius: 3px;
    border: 1px solid #c4c4c4;
    padding: 30px;
}
.school-box-2 .college_row{
    background: #f0f0f0;
}
.admission-row,
.graduate-row{
    padding: 0;
    margin: 0;
}
.competition-group,
.sub-competition-group,
.selected-group{
    width: 100%;
    background: #f0f0f0;
    max-height: 335px;
    overflow-y: auto;
    padding: 20px;
}
.sub-competition-group{
    display: flex;
    flex-wrap: wrap;
    min-height: 150px;
}
.competition-group .btn-primary{
    min-width: 90px !important;
    margin-bottom: 5px;
    border: none;
    border-radius: 10px !important;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}
.sub-competition-group{
    margin: 0;
}
.selected-group{
    margin: 15px 15px 0px 15px !important;
}
.selected-info{
    padding: 30px;
    background: #f0f0f0;
    border: 1px solid #c4c4c4;
}
.selected-info-btn{
    width: 120px;
    height: 40px;
    padding: 8px 0.75rem !important;
    margin-left: 30px;
}
.showadd-box{
    text-align: center;
}
.selected-info .check-item{
    border-radius: 0;
    margin: 0 15px 12px 0;
    width: 32%;
    background: #ffffff;
}
.selected-info .check-item:nth-child(3n+0){
    margin-right: 0;
}
.selected-info .add-btn{
    background: #fff;
}
.competition-modal .header{
    padding-left: 15px;
    margin: 0 10px 0 0;
    font-size: 20px;
    color: #84BE3F;
}
.competition-modal .modal-footer .btn {
    min-width: 120px;
    padding: 8px .75rem;
    font-size: 14px;
    box-shadow: 2px 2px 8px #afadad;
    border-radius: .15rem;
    color: #fff;
    border-color: transparent;
}
.competition-modal-body{
    padding: 0 0 1rem 0;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    max-height: 400px;
    overflow-y: auto;
}
.competition-modal .modal-footer {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: end;
    justify-content: flex-end;
    padding: .75rem;
    border-top: 1px solid #dee2e6;
    border-bottom-right-radius: calc(.3rem - 1px);
    border-bottom-left-radius: calc(.3rem - 1px);
    justify-content: center;
    margin: 10px 0;
}
.selected-info .modal-btn{
    text-align: center;
}
.competnameClass{
    width: 46.5%;
    margin: 0 0 12px 15px;
    box-sizing: border-box;
}
.competnameClass-btn{
    width: 100%;
    max-height: 40px;
    box-sizing: border-box;
    padding: 8px 0 8px 15px;
    text-align: left;
    background: #ffffff;
    border: 1px solid #9b9898;
    color: #999;
    overflow-y: auto;
}
.competnameClass-btn:hover,
.selected-btn:hover{
    cursor: pointer;
    color: #666 !important;
}
.competnameClass-btn .icon-times,
.selected-btn .icon-times{
    float: right;
    padding: 5px 10px;
}
.selected-btngroup{
    padding: 0;
}
.selected-btn{
    width: 47.2%;
    float: left;
    text-align: left;
    background: #ffffff;
    border: 1px solid #9b9898;
    color: #999 !important;
    margin: 10px;
    padding-right: 0;
}
.school-box-2 .modal-footer{
    justify-content: center;
    margin: 10px 0;
}

.add-btn {
    padding: 0.7rem 2rem;
    background: #f0f0f0;
    color: #222;
    border: 1px solid #c4c4c4;
    border-radius: 50px;
    font-size: 14px;
}
.delete-btn {
    position: absolute;
    top: -17px;
    right: -15px;
    width: 35px;
    height: 35px;
    font-size: 16px;
    text-align: center;
    background: #fff;
    border-radius: 50%;
    color: #919191;
    border: 1px solid;
    line-height: 32px;
    vertical-align: middle;
}

/* intro edit */
.upload-content {
    display: flex;
    position: relative;
    padding: 20px 0;
    background: #fff;
    color: #333;
    justify-content: center;
    align-items: center;
}
.upload-content::after {
  content: "";
    position: absolute;
    background: linear-gradient(
      to right,
      #b5ccc7f2 50%,
      rgba(255, 255, 255, 0) 0%
    ),
    linear-gradient(#b5ccc7f2 50%, rgba(255, 255, 255, 0) 0%),
    linear-gradient(to right, #b5ccc7f2 50%, rgba(255, 255, 255, 0) 0%),
    linear-gradient(#b5ccc7f2 50%, rgba(255, 255, 255, 0) 0%);
    background-position: top, right, bottom, left;
    background-repeat: repeat-x, repeat-y;
    background-size: 25px 4px, 4px 25px;
    top: -2px;
    bottom: -2px;
    left: -2px;
    right: -2px;
    z-index: 1;
}
.upload-btn-wrapper {
    position: relative;
    overflow: hidden;
    display: inline-block;
    z-index: 2;
}

.upload-btn {
  border: 1px solid #b5ccc7f2;
  background-color: #fff;
  padding: 8px 20px;
  border-radius: 8px;
  font-weight: bold;
  color: #333;
  box-shadow: none;
}

.upload-file {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 45px;
  
}
.profile-edit-img {
    width: 100%;
}
.intro-tit {
    margin-bottom: 15px;
    font-size: 15px;
    color: #333;
}
.custom-radio-lable {
    font-weight: normal;
}
.custion-radio:checked + .custom-radio-lable:before {
    border: 1px solid #ddd;
}
.custion-radio:not(:checked) + .custom-radio-lable:before {
    border: 1px solid #ddd;
}
/*
.custion-radio:checked + .custom-radio-lable:after {
        background: #6085A3;
}
*/
.upload-content .icon {
    font-size: 50px;
}

.tab-list {
    margin: 20px 0;
    background: #fff;
    box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    border: 1px solid #f3efef;
}
.tab-list .list-group-item {
    border: none;
}
.list-link {
    color: #3377b2;
}
.tab-content {
    padding: 50px 20px;
    background: #fff;
    box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
    border-radius: 5px !important;
    border: 1px solid #f3efef;
}
.tit-box {
    position: relative;
    display: flex;
    margin-bottom: 40px;
    border-bottom: 2px solid #c3c4c3;
}
.profile-edit-tit {
    font-size: 1.2rem;
    line-height: 0.8;
    margin: 0 0 1rem 0;
}
.icon-edit {
    display: inline-block;
    margin-right: 5px;
    font-size: 40px;
    color: #619873;
    font-weight: 500;
    vertical-align: baseline;
}
.profile-edit-txt {
    position: absolute;
    top: -20px;
    right: 0;
    font-size: 16px;
    color: #619873;
    cursor: pointer;
}
.tit-box-edit .profile-edit-txt {
    top: -27px;
    padding: 8px 20px;
    border-radius: 50px;
    color: #919191;
    border: 1px solid;
}
.about-tit {
    color: #666766;
}
.about-box {
    height: 200px;
    padding: 10px 20px;
    line-height: 2;
    border: 1px solid #ddd;
    margin: 15px 0 30px 0;
    overflow-y: auto;
}
.about-box::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1);   
    border-radius: 5px;
}

.about-box::-webkit-scrollbar
{
    width: 5px;   
}

.about-box::-webkit-scrollbar-thumb
{
    background-color: #e6eec8;
    background-image: none;
    border: 1px solid #b4c574;
    border-radius: 20px;
}
.movie-row {
    padding-bottom: 20px;
}
.movie-col {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
}
.movie-link {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border: none;
}
.detail-list {
    margin: 0 0 50px 0;
}

.detail-head,
.detail-data {
    padding: 10px 0 15px 0;
    border-top: 1px solid #ddd;
    line-height: 1.7;
}
.detail-head {
    display: flex;
    float: left;
    width: 35%;
    margin-right: 6%;
    align-items: flex-start;
    font-weight: normal;
}
.detail-data {
    float: left;
    width: 59%;
    background-color: #fff;
    min-height: 50px;
    word-break: break-all;
}
.private {
    margin: 0 20px 0 auto;
    padding: 0 10px;
    background: #0071b4;
    color: #fff;
}
.explation-note .private {
    padding: 3px 10px;
} 
.view-permission {
    display: inline-block;
    margin: 0 20px 0 auto;
    padding: 0 10px;
    background: #cc7694;
    color: #fff;
}
.explation-note {
  margin: 0 20px;
  padding: 15px 20px;
  border: 1px solid #ababab;
  border-radius: 10px;
  color: #666666;
  line-height: 1.8;
}
.explation-note .private {
  // padding: 3px 10px;
}
textarea.form-control {
  height: 200px;
  text-align: left;
}
.popup-databox .private {
  padding: 2px 10px 3px 10px;
  vertical-align: middle;
  font-weight: normal;
}

.introduction-content .popup-databox .form-group {
  margin-bottom: 2rem;
}
.gender-choice {
  position: relative;
  display: block;
  padding: 0.5rem 0.1rem;
  border-radius: 0.25rem;
  border: 1px solid #707070;
  text-align: center;
  background: #f0f0f0;
}
.gender-choice.disable {
  color: #d5d5d5;
  background: #fff;
}
.gender-choice .check-icon {
  padding-right: 10px;
}

.select-wrap {
  position: relative;
  border: 1px solid #919191;
}
.select-wrap .form-control{
    border: none;
}
// .select-wrap .form-control {
//   border: none;
//   -webkit-appearance: none;
// }

// .sort-desc {
//   position: absolute;
//   top: 0;
//   right: 18px;
//   font-size: 24px;
//   color: #c4c4c4;
// }
.r-5 {
  right: 5px !important;
}
/*wmo for carousel slider */
.card-carousel {
  user-select: none;
  position: relative;
}
.progressbar {
  display: block;
  width: 100%;
  height: 5px;
  position: absolute;
  background-color: rgba(221, 221, 221, 0.25);
  z-index: 1;
}
.progressbar > div {
  background-color: rgba(255, 255, 255, 0.52);
  height: 100%;
}
.thumbnails {
    display: block;
    justify-content: space-evenly;
    flex-direction: row;
}
.thumbnail-image {
    align-items: flex-start;
    cursor: pointer;
    width: 100%;
    height: 82px;
    display: flex;
    overflow: hidden;
    margin: 0px 0px 12px 0px;
    box-shadow: none;
}
.thumbnail-image > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 250ms;
}
.thumbnail-image:hover > img,
.thumbnail-image.active > img {
    opacity: 0.6;
    box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.5);
}
.img-contain {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.card-img {
    position: relative;
    margin-bottom: 15px;
}
.card-img > img {
    display: block;
    margin: 0 auto;
}
.actions {
    font-size: 1.5em;
    height: 40px;
    position: absolute;
    top: 50%;
    margin-top: -20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #585858;
}
.actions > span {
    cursor: pointer;
    transition: all 250ms;
    font-size: 45px;
}
.actions > span.prev {
    margin-left: 5px;
}
.actions > span.next {
    margin-right: 5px;
}
.actions > span:hover {
    color: #eee;
}
.list-enter-active,
.list-leave-active {
    transition: opacity 0.25s ease-out;
}

.list-enter,
.list-leave-to {
    opacity: 0;
}
.delete-photo {
    position: absolute;
    width: 35px;
    height: 35px;
    line-height: 1.8;
    background: #fff;
    border: 1px solid #444;
    right: -12px;
    top: -10px;
    border-radius: 50%;
}
.check-item {
    position: relative;
    width: 100%;
    list-style: none;
    padding: 10px 20px;
    margin: 0 10px 10px 0;
    display: inline-block;
    color: #999;
    border: 1px solid #9b9898;
    /* margin-right: 10px; */
    background: #eee;
    border-radius: 5px;
}
.check-item .fa {
    margin-right: 5px;
}
.fa-check.disabled {
    opacity: 0.2;
}
.no-video {
    display: flex;
    background: #f0f0f0;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-size: 20px;
    color: #fff;
}   
.custion-radio:checked + .custom-radio-lable:after {
    width: 12px;
    height: 12px;
    background: #2f2d2c;
}
.label-txt {
    min-width: 50px;
    // padding-right: 1.5rem;
    font-size: 15px;
}
// .form-control {
//     width: 70%;
// }
.save-btn {
    width: 140px;
    padding: 9px;
    border-color: #EF8B1E;
    background-color: #EF8B1E;
}
.show-info{    
	border: 1px solid #d2d2d2;
	width: 100%;
	display: inline-block;
	line-height: 1.5;
	padding: 6px;
	margin-top: 10px;
	background: #fff;
	color: #333;
	text-align: center;
}
.info {
    margin-bottom: .25rem;
    background: #fff3f3;
    padding: 2px 5px;
    color: #ff7a00;
}
.icon-times {
    font-size: 11px;
    font-weight: bold;
}
.delete-photo .icon-times::before {
    color: #444;
}
.icon-times::before {
    color: #919191;
}
.form-control.is-invalid, .was-validated .form-control:invalid {
    border-color: #dc3545;
}
.invalid-feedback {
    width: 100%;
    margin-top: .25rem;
    font-size: 80%;
    color: #dc3545;
}
.error {
    color: #F60D0D;
    font-size: 13px;
}
.custom-checkbox-label {
    top: 2px;
}
/* img-modal-wrapper */
.img-modal-wrapper {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
    z-index: 10001;
}
.img-modal-wrapper .img-modal-block {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 950px;
    height: 80vh;
    transition: all 0.3s ease;
    text-align: center;
}
.img-modal-wrapper .img-modal-container {
    height: 100%;
}
.img-modal-wrapper .cross-btn {
    position: absolute;
    top: 15px;
    right: 25px;
    font-size: 16px;
    background: #999;
    padding: 4px 10px;
    border-radius: 50px;
    color:#fff;
    border: 1px solid;
    z-index: 9;
    background: #fff;
}
.img-modal-wrapper .icon-times:before {
    color: #fff;
}
.img-modal-wrapper .cross-btn span {
    font-size: 13px;
}
.img-cursor {
    cursor: pointer;
}
.img-popup {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.check-private{
    position: relative;
    max-width: 28px;
    list-style: none;
    padding: 3px 15px 0px 6px;
    display: inline-block;
    color: #3276e0;
    border: 1px solid #9b9898;
    margin: -3px 10px 0px 10px;
    max-height: 28px;
}
.history-edit-tbl td {
   padding: 5px 0;
}
.history-edit-tbl td:first-child {
    width: 48%;
}
.status {
    display: inline-block;
    width: 100px;
    height: 35px;
    background-color: #eee;
    margin: 0px 0px 8px 0px;
    padding: 8px 8px 5px 8px;
    border-radius: 3px;
}
.desired-label {
    width: 260px;
    margin-bottom: 0px;
    font-weight: normal;
}
.history-edit-tbl  {
    width: 100%;
}
.lbl-txt {
    line-height: 43px;
}
.price-txt {
    display: inline-block;
    width: 25%;
    text-align: right;
}
.profile-edit-tit .private {
    padding: 3px 10px;
    font-size: 14px;
}
.appendbtn {
    background-color: #EF8B1E;
    color: #fff;
}
.btn-large {
    padding: 8px 0;
    width: 140px;
}
.yan-txt {
    font-weight: bold;
    font-size: 16px;
}

.delete-color {
    background-color: #ef8b1e !important;
}
.cancelbtn {
    background: #828fa5 !important;
}
.modal-wrapper {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    transition: opacity 0.3s ease;
    z-index: 9998;
    .cross-btn {
        position: absolute;
        top: 15px;
        right: 25px;
        padding: 2px 7px;
        font-size: 16px;
        background: transparent;
        padding: 4px 10px;
        border-radius: 50px;
        color: #919191;
        border: 1px solid;
        span {
            font-size: 13px;
        }
    }
    .modal-container {
        position: relative;
        width: 950px;
        max-height: 800px;
        margin: 0px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        overflow-y: auto;
        
    }
}
.left-competition{
    flex: 0 0 20%;
    max-width: 20%;
}
.right-competition{
    flex: 0 0 80%;
    max-width: 80%;
}
.competition-title{
    min-height: 25px;
    max-height: 25px;
}



// check box

.custom-control-label {
    position: relative;
    margin-bottom: 0;
    vertical-align: top;
  }
  
  .custom-control-label::before {
    position: absolute;
    top: 0.25rem;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    pointer-events: none;
    content: "";
    background-color: #fff;
    border: #adb5bd solid 1px;
  }
  
  .custom-control-label::after {
    position: absolute;
    top: 0.25rem;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    content: "";
    background: no-repeat 50% / 50% 50%;
  }


.custom-checkbox {
    height: 18px !important;
    width: 18px !important;
}

.custom-checkbox-label {
    padding-left: 29px;
    line-height: 20px;
    font-weight: normal;
    &::before {
        top: -0.15rem;
        left: 0;
        width: 1.4rem;
        height: 1.4rem;
        border: #b5b5b5 solid 2px;
        border-radius: 0;
    }
}

.custom-control-input {
    &:checked~.custom-control-label {
        &::before {
            color: #fff;
            background-color: transparent;
            content: '\2714';
            color: #2f2d2c;
            font-size: 17px;
            padding-left: 2px;
            border-color: #b5b5b5;
        }
    }
}

// custom radio
.custion-radio {
    &:checked {
        position: absolute;
        left: -9999px;
        + {
            .custom-radio-lable {
                position: relative;
                padding-left: 35px;
                cursor: pointer;
                line-height: 20px;
                display: inline-block;
                &:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 22.4px;
                    height: 22.4px;
                    border: 1px solid color(bordercolor);
                    border-radius: 100%;
                    background: #fff;
                }
                &:after {
                    content: '';
                    width: 12px;
                    height: 12px;
                    background: #2f2d2c;
                    position: absolute;
                    top: 5px;
                    left: 5px;
                    border-radius: 100%;
                    -webkit-transition: all 0.2s ease;
                    transition: all 0.2s ease;
                    opacity: 1;
                    -webkit-transform: scale(1);
                    transform: scale(1);
                }
            }
        }
    }
    &:not(:checked) {
        position: absolute;
        left: -9999px;
        + {
            .custom-radio-lable {
                position: relative;
                padding-left: 35px;
                cursor: pointer;
                line-height: 20px;
                display: inline-block;
                &:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 22.4px;
                    height: 22.4px;
                    border: 1px solid color(bordercolor);
                    border-radius: 100%;
                    background: #fff;
                }
                &:after {
                    content: '';
                    width: 12px;
                    height: 12px;
                    background: #2f2d2c;
                    position: absolute;
                    top: 5px;
                    left: 5px;
                    border-radius: 100%;
                    -webkit-transition: all 0.2s ease;
                    transition: all 0.2s ease;
                    opacity: 0;
                    -webkit-transform: scale(0);
                    transform: scale(0);
                }
            }
        }
    }
}


.custom-checkbox {
    height: 18px !important;
    width: 18px !important;
}
.custom-control-input {
    position: absolute;
    left: 0;
    z-index: -1;
    width: 1rem;
    height: 1.25rem;
    opacity: 0;
}
.custom-control-label::after {
    position: absolute;
    top: .25rem;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    content: "";
    background: no-repeat 50%/50% 50%;
}

.month-txt {
    display: block;
    width: 35px;
}

</style>