<template>
    <div>
        <h5 class="main-header">消費税</h5>   
        <div class="row col-xs-12">
            <div class="col-tax">            
                <div class="admin-dashboard-card text-center">                
                    <div v-if="!editTax">
                       <p>消費税</p>
                       <h5>{{current_taxes.percent}}<small style="color:black;">%</small></h5>
                    </div>
                    <span v-if="editTax">
                        <input type="text"  v-model="current_taxes.percent" @paste="(e)=> { e.preventDefault(); return false}" @input="filterInput" @keydown="filterInput"  class="input-num">
                        <small style="color:black;">%</small>
                    </span>
                    <br v-if="editTax">
                    <span v-if="message" class="error">{{message}}</span>   
                    <br v-if="message">                 
                    <span v-if="editTax" class="btnClass">
                        <span @click="cancelTax" class="btn back-btn" style="margin-top:10px;">{{$t('common.cancel')}}</span>
                        <span @click="() => {if(message){return false}else{updateTax()}}" class="btn searchbtn" style="margin-top:10px;">{{$t('jobseekerprofile.save')}}</span>
                    </span>
                    <div class="text-right cursor-pointer">
                        <span v-if="!editTax" @click="editTax = !editTax">
                        <span data-v-6497ef78="" class="icon icon-edit" style="margin-top:10px;"></span>{{$t('common.edit')}}</span>
                    </div>                                         
                </div>  
            </div>  
           
        </div>
        
      <div class="row col-xs-12">
           <hr>
            <h5 class="main-header">チャットにメッセージが投稿された際の通知メール</h5>   
            <div class="col-setting">           
            <div class="text-left">     
             <!-- <p>チャット関係のメール</p>            -->
                <div class="form-row">
                    <div class="form-check form-check-inline" style="margin-right:2rem;">
                        <input class="custion-radio" id="1" type="radio" value="1"  @change="changeEmailStatus" v-model="checked">
                        <label class="custom-radio-lable" for="1">{{$t('common.send')}}</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="custion-radio" id="0" type="radio" value="0"  @change="changeEmailStatus" v-model="checked">
                        <label class="custom-radio-lable" for="0">{{$t('common.unsend')}}</label>
                    </div>
                </div>               
            </div>  
        </div>  
      </div>

       <div class="row col-xs-12">
           <hr>
            <h5 class="main-header">管理者への通知メール宛先の追加</h5>               
            <div class="col-setting">            
            <div class="admin-dashboard-card">
            <p>{{admin_email.email}}</p>
              <div class="text-right"> <button class="btn btn-default add-btn" @click="addRow"><i class="glyphicon glyphicon-plus-sign pr-2" style="color:#3377b2"></i>{{$t('common.add')}}</button>   </div>    
                <table v-if="addEmail.length" class="table table-bordered">
                    <thead>
                        <tr>
                            <td class="text-center">{{$t('jobseekerprofile.email')}}</td>
                            <td class="text-center" style="width:300px">{{$t('common.action')}}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(email, index) in addEmail" :key="index" >
                            <td class="text-left position-relative">
                                <input type="email" v-model="$v.addEmail.$each.$iter[index].current_email.$model"  v-if="email.edit" :class="['form-control',$v.addEmail.$each.$iter[index].current_email.$error ? 'is-invalid':'']">
                                    <div class="form-group has-error has-feedback" v-if="$v.addEmail.$each.$iter[index].current_email.$error"> 
                                       
                                        <div  class="error" v-if="!$v.addEmail.$each.$iter[index].current_email.required">メールアドレスは必須です  {{$v.addEmail.$each.$iter[index].current_email.$required}}</div>
                                        <div  class="error" v-if="!$v.addEmail.$each.$iter[index].current_email.email">メールアドレスの形式が正しくありません</div>
                                        <!-- <div class="error" v-if="!$v.email.current_email.isUnique">このメールアドレスは、既に使われています</div> -->
                                    </div>
                                <span v-if="email.edit" @click="cancel(index,email.email)" class="close-btn"><span class="glyphicon glyphicon-remove"></span></span>
                                <span v-if="!email.edit">{{email.email}}</span>
                            </td>
                            <td>                           
                                <span @click="deleteRow(index)" class="btn back-btn btn-default">{{$t('common.delete')}}</span>
                                <span v-if="email.edit" @click="updateEmail(index,email.current_email)" class="btn searchbtn btn-default">{{$t('jobseekerprofile.save')}}</span>
                                <span v-if="!email.edit" @click="editEmail(index)" class="btn btn-default">{{$t('common.edit')}}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>                               
            </div>  
        </div>  
       </div>
    </div>
</template>
<script>
import { required, email} from "vuelidate/lib/validators";
export default {
    data(){
        return {
            current_taxes:[],
            editTax:false,
            emailChangeStatus:false,
            percent:'',
            addEmail: [],
            disabled:null,
            edit:false,
            value:null,
            message:'',
            // save:true,
            oldNum:'',
            checked: null,
            // email:[{
            //         current_email : ''
            //     }]
            
        }
    },
    validations:{
        
            addEmail:{
               $each:{
                    current_email:{required,email}
               }
            }
        
        
    },
    created(){
        this.get_taxes();
        this.get_extra_eamil();
        this.get_email_status();
        
    },
    computed:{
        admin_email(){
            return this.$store.getters.currentUser
        },
    },
    methods:{
        filterInput(evt){
        evt = evt ? evt : window.event;
        var charCode = evt.which ? evt.which : evt.keyCode;
        let percent = this.current_taxes.percent;
            if(percent <= 0 ){
                this.current_taxes.percent = ''
            }
            if(percent <= 0){
                this.message = '0以上で入力してください';
                // this.save = false;
            }else{
                this.message = '';
                // this.save = true;
            }
            // alert(charCode)
            if(charCode == 8 || charCode == 190 || charCode == 35 || charCode == 36 || charCode == 37 || charCode == 39 || charCode == 46 || (charCode > 47 && charCode < 58) || (charCode > 95 && charCode < 106) || charCode == 110){
                return true;
            }
            else if(isNaN(evt.key) && charCode != 8){
                evt.preventDefault();
            } 
            else{
                evt.preventDefault();
            }
            // if((charCode == 37 || charCode == 39) && (charCode > 95 || charCode < 106)){
            //     return true;
            // }
            // if (charCode > 31 && charCode != 8 && (charCode < 48 || charCode > 57)  && charCode !== 46) {
            //     evt.preventDefault();
            // } else if(isNaN(evt.key) && charCode != 8){
            //     evt.preventDefault();
            // } 
            // else {
            //     return true;
            // }
        },
        get_taxes(){
            this.$api.get('/v1/admin/admin-setting-taxes').then(res => {
                    let taxes = res.data.reduce((x, y) => y);
                    this.current_taxes = taxes
            });
        },
        get_extra_eamil(){
            this.$api.get('/v1/admin/get-extra').then(res => {
                    let extra = res.data
                    if(extra == '' || extra == null){
                        this.addEmail = []
                    }else{
                        extra.map(extra_email => {
                        this.addEmail.push({email:extra_email,current_email:extra_email,edit:false})
                        })
                    }
                    
            });
        },
        cancelTax(){
            this.get_taxes();
            this.editTax = false;
            this.message = '';
            // this.save = true;
        },
        updateTax(){
            
                const min_length = 0;
                // const max_length = 100;
                console.log(this.current_taxes.percent)
                if(this.current_taxes.percent >= min_length){
                    this.editTax = false;
                    this.$api.post('/v1/admin/update-taxes',this.current_taxes).then(() => {
                       this.get_taxes();
                    })
                }else{
                    this.message = '0以上で入力してください';
                }
            
        },
        addRow() {
            this.addEmail.push({email: '',current_email:'',edit:true})
        },
        deleteRow(index) {
            let c_email = this.addEmail[index].current_email
            if(!c_email){
                this.addEmail.splice(index,1)
            }else{
                this.$api.post(`/v1/admin/update-email/${'delete'}`,{oldEmail:c_email}).then( res => {
                    // this.addEmail[index].email = currentEmail
                    console.log(res.data)
                    this.addEmail.splice(index,1)
                })
                
            }
            
        },
        editEmail(index){
             
            this.addEmail.map((v , indx) => {
                 v.edit = false
                if(v.email == ''){
                    this.addEmail.splice(indx)
                }else{
                    v.current_email =v.email
                }
              //
            })
            this.addEmail[index].edit = true
            // this.email[index]['current_email'].edit = true
           
        },
        cancel(index,email){
            // alert(index)
             console.log(this.addEmail)
            console.log(index,email)
            
            let c_email = this.addEmail[index].current_email
            if(!c_email){
                console.log('if')
               this.addEmail.splice(index,1) 
            }else{
                 this.addEmail.map(v => {
                     if(v.email != c_email && v.edit == true && v.email == ''){
                        this.addEmail.splice(index,1)  
                     }else{
                         v.current_email = email
                         v.edit =false
                     }
                 })
                //  this.addEmail[index].current_email = email
                //  this.addEmail[index].edit = false 
                
            }
            
        },
        updateEmail(index,currentEmail){
            this.$v.addEmail.$each.$iter[index].current_email.$touch()
            if (this.$v.addEmail.$each.$iter[index].current_email.$invalid) {
                return;
            }
            // console.log(this.email[0]['current_email'])
            let old_email = this.addEmail[index].email;
            if(this.addEmail[index].email != currentEmail){
                this.$api.post(`/v1/admin/update-email/${'update'}`,{oldEmail:old_email,c_email:currentEmail}).then( () => {
                    this.addEmail[index].email = currentEmail
                })
            }
             this.addEmail[index].edit = false
            
        },
        get_email_status(){
            this.$api.get('/v1/admin/email-send').then(res => {
                this.checked = res.data
            })
        },
        changeEmailStatus(e){
            let value = e.target.value
            this.$api.post('/v1/admin/update-email-send',{updateEmailSend:value}).then( res => {
                this.checked = res.data
            })
        }   
        
    }
}
</script>

<style lang="scss" scoped>
.cursor-pointer{
    cursor: pointer;    
    &:hover{
        opacity: 0.7;
    }
}
.col-tax{
   width: 352px;
   height: 174px;
   max-width: 100%;
   .admin-dashboard-card{
       height: 195px;
   }
}
.col-setting{
    width: 768px;
    max-width: 100%;
}
.table>thead>tr>td{
    padding:8px 20px;
}
.input-num{
    width: 90px;
    height: 60px;
    text-align: center;
    appearance: textfield;
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    margin: 0px 10px 20px 0px;
    font-size: 24px;
    font-weight: bold;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;   
}
.admin-dashboard-card{   
    align-items: center;
    border-radius: 4px;
    border: 1px solid #eee;
    box-shadow: 0 1px 2px rgb(189, 203, 228);
    padding: 25px;  
}
.admin-dashboard-card p{  
    font-size: 16px;
    color: #6a7482;
    margin-bottom: 20px;
}
.admin-dashboard-card h5{
    font-size: 30px;
    color: #000;
    font-weight: bold;
}
.form-check {
  position: relative;
  display: block;
  padding-left: 1.25rem;
}
.form-check-input {
  position: absolute;
  margin-top: 0.3rem;
  margin-left: -1.25rem;
}
.form-check-label {
  margin-bottom: 0;
}
.form-check-inline {
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
  padding-left: 0;
  margin-right: 0.75rem;
}
.form-check-inline .form-check-input {
  position: static;
  margin-top: 0;
  margin-right: 0.3125rem;
  margin-left: 0;
}
.email-textBox{
    width:200px;
    margin-right:10px;
    display: inline !important;
    height: 30px !important;
    border-radius: unset;
    border-color: gray;
}
.btn_1 {
    cursor: pointer;
    display: inline-block;
    outline: none;
    *zoom: 1;
    text-align: center;
    text-decoration: none;
    font-family: inherit;
    font-weight: 300;
    letter-spacing: 1px;
    vertical-align: middle;
    border: 1px solid;
    transition: all 0.2s ease;
    box-sizing: border-box;
    margin-left:3px;
    text-shadow: 0 1px 0 rgba(0,0,0,0.01);
    box-shadow: 0px 2px 3px 0px #80808059;
}
.btn-small {
    font-size: 0.8125em;
    padding: 0.4125em 1.25em;
}
.icon-edit{
    font-size: 30px;
}
.btn{
    width: 120px;
    padding: 10px 0px;
}
.btn-edit {
    width: 120px;
    padding:10px 0px;
    color: #434a54;
    border-color: #8c949f;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 2px 2px 8px #e0d7d7;
    float: inline-end;
    margin-bottom:10px;
}
.btn-edit:hover {
 opacity: 0.9;      
}
.back-btn {
    margin-right: 10px;
}
.add-btn{
    width: 120px;
    padding: 10px 0px;
    color: #434a54;
    border-color: #8c949f;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 2px 2px 8px #e0d7d7; 
    float: inline-end;
    margin-bottom:10px;   
}
.close-btn{
    position: absolute;
    top: 12px;
    right: 10px;
    width: 35px;
    height: 35px;
    font-size: 16px;
    text-align: center;  
    color: #919191;   
    line-height: 35px;
    vertical-align: middle;
    cursor: pointer;
}
.error{
    margin-bottom: 5px;
    color:red; 
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
.is-invalid {
  border-color: #dc3545;
  display: block;
  +{
      .invalid-feedback{
          display: block;
      }
  }
}
.is-invalid > .invalid-feedback{
    display: block;
}
.is-invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}
.hide{
    display: none;
}
</style>