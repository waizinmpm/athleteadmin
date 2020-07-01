<template>
    <div>   
        <div class="row">
            <div class="col-sm-12 p-0 searchform-one">
                <!--advanced search-->
                <h5 class="m-b-10 main-header">スカウト済み一覧</h5>   
                <div class="content-row" style="padding-bottom:0px;">    
                    <div class="row">
                        <div class="col-md-3">
                            <label for="求人番号">求人番号</label>
                            <input type="text" placeholder="求人番号" class="form-control" v-model.trim="searchKey.job_number">
                        </div>
                        <div class="col-md-3">
                            <label for="求人タイトル">求人タイトル</label>
                            <input type="text" placeholder="求人タイトル" class="form-control" v-model.trim="searchKey.job_title">
                        </div>
                        <div class="col-md-3">
                            <label for="求人番号">求人番号</label>
                            <input type="text" placeholder="求人番号" class="form-control" v-model.trim="searchKey.job_number">
                        </div>
                        <div class="col-md-3">
                            <label for="アスリート会員氏名">アスリート会員氏名</label>
                            <input type="text" placeholder="アスリート会員氏名" class="form-control" v-model.trim="searchKey.athlete_membership_number">
                        </div>                        
                    </div>
                    <div class="row">
                        <div class="col-md-3 datepicker-wrapper">
                            <label for="スカウト日時">スカウト日時</label>
                            <date-picker v-model="searchKey.from_date" valueType="format" class="datepicker" :lang="lang" placeholder="年 - 月 - 日"></date-picker>                  
                        </div>  
                        <div class="col-md-3 datepicker-wrapper">
                            <label for=""></label>
                            <date-picker v-model="searchKey.to_date" valueType="format" class="datepicker" :lang="lang"  placeholder="年 - 月 - 日"></date-picker> 
                        </div>                     
                        <div class="col-md-3">                        
                            <button class="btn searchbtn" style="margin-top:22px;">検索</button>
                        </div>                
                    </div>
                    <!-- Search by Status -->
                    <label for="ステータス">ステータス</label>
                    <div class="row">
                        <div class="col-md-6">                     
                            <div class="col-md-2 p-lr0" v-for="status in arr_status" v-bind:key="status.title">                          
                                <input type="checkbox" @click="samplefunction(status.title)" class="custom-control-input custom-checkbox" v-model="status.checked">
                                <label class="custom-control-label custom-checkbox-label">{{status.title}}</label>                          
                            </div>  
                        </div>                    
                    </div>
                </div>
                <!--end advanced search-->     
            </div>
        </div>   
        <table id="example" class="table table-striped table-bordered" style="width:100%">    
            <thead>
                <tr>
                    <th>スカウト日時</th>
                    <th>管理番号</th>
                    <th>求人番号</th>
                    <th>求人タイトル</th>
                    <th>アスリート会員番号</th>
                    <th>アスリート会員氏名</th>
                    <th>ステータス</th>
                    <th></th>             
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>2020/03/02 12:30:00</td>
                    <td>K2020-0001</td>
                    <td>00001</td>
                    <td>コロナ会社</td>
                    <td>00001-0001</td>
                    <td>レジ打ち</td>
                    <td>0000001</td>
                    <td class="text-left">
                    <button class="custom-btn btns-margin">チャット</button>
                    <button class="custom-btn btns-margin">請求書⽣成</button>
                    <button class="custom-btn btns">クレカ請求</button>
                    </td>
                </tr>    
            </tbody>
        </table>
    </div>
</template>

<script>
import JQuery from 'jquery'
let $ = JQuery
    export default {
        data(){
        return {
          searchKey:{
            from_date: '',
            to_date:'',
            control_number: '',
            job_number: '',
            job_title: '',
            athlete_membership_number: '',
            athlete_membership_name: '',
            selected_status: []
          },
          arr_status: [
            { title: '興味あり', checked: false },
            { title: '入社済', checked: false },
            { title: '辞退/不採用', checked: false },
            { title: '回答待ち', checked: false },
            { title: '期限切れ', checked: false }
        ],
            lang:{
                days: ['日', '月', '火', '水', '木', '金', '土'],
                months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                placeholder: {
                    date: '年 - 月 - 日',
                }
            },
            post:{},         
        }
    },
    mounted(){

        //   this.$api.get('/get-scout-list')            
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(error => {
        //        console.log(error);
        //     })

         $(document).ready(function() {
                $("#chkAll").click(function () {
                    console.log(this);
                    // $("input[name='employees']").attr("checked", this.checked);
                });
                $('#example').DataTable({
                     "language": {
                        "search": "フィルタ",
                        "zeroRecords": 'お探しの条件に合うは見つかりませんでした。',
                        "sLengthMenu": "1ページ _MENU_ ",
                         "paginate": {                               
                                "next": "次へ ",
                                "previous": " 前へ"
                        },
                        "info":"_START_ - _END_ (_TOTAL_ 件中)",    
                        "infoEmpty":"",
                        "infoFiltered":"",    
                    }
                }); 
            } );
    },
    methods: {
        samplefunction(){
            console.log(this.selected_status);
        }
    }
  }
</script>
