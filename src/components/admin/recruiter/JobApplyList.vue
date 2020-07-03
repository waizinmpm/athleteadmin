<template>
 <div>   
   <div class="row">
    <div class="col-sm-12 p-0 searchform-one">
    <!--advanced search-->
     <h5 class="m-b-10 main-header">求⼈応募者⼀覧</h5>   
      <div class="content-row" style="padding-bottom:0px;">    
                  <div class="row">
                    <div class="col-md-3">
                    <label for="企業番号">企業番号</label>
                      <input type="text" placeholder="企業番号" class="form-control">
                    </div>
                    <div class="col-md-3">
                      <label for="企業名">企業名</label>
                      <input type="text" placeholder="企業名" class="form-control">
                    </div>
                    <div class="col-md-3">
                    <label for="求職者番号">求職者番号</label>
                     <input type="text" placeholder="求⼈番号" class="form-control">
                    </div>
                    <div class="col-md-3">
                      <label for="求職者⽒名">求職者⽒名</label>
                       <input type="text" placeholder="求⼈タイトル" class="form-control">
                    </div>                        
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                    <label for="求⼈タイトル">求⼈タイトル</label>
                     <input type="text" placeholder="求⼈タイトル" class="form-control">
                    </div>      
                  </div>
                  <div class="row">
                    <div class="col-md-3 datepicker-wrapper">
                    <label for="応募⽇時">応募⽇時</label>
                    <date-picker v-model="time1" valueType="format" class="datepicker" :lang="lang" placeholder="年 - 月 - 日"></date-picker>                  
                    </div>  
                    <div class="col-md-3 datepicker-wrapper">
                    <label for="応募⽇時">応募⽇時</label>
                    <date-picker v-model="time2" valueType="format" class="datepicker" :lang="lang"  placeholder="年 - 月 - 日"></date-picker> 
                    </div>                     
                    <div class="col-md-3">                        
                        <button class="btn searchbtn" style="margin-top:22px;">検索</button>
                    </div>                
                  </div>
                  <label for="ステータス">ステータス</label>
                   <div class="row">
                    <div class="col-md-6">                     
                        <div class="col-md-2 p-lr0">                          
                            <input type="checkbox" id="検討中" class="custom-control-input custom-checkbox">
                            <label for="検討中" class="custom-control-label custom-checkbox-label">検討中</label>                          
                        </div>
                         <div class="col-md-2 p-lr0">                          
                            <input type="checkbox" id="辞退/不採⽤" class="custom-control-input custom-checkbox">
                            <label for="辞退/不採⽤" class="custom-control-label custom-checkbox-label">辞退/不採⽤</label>                          
                        </div>
                        <div class="col-md-2 p-lr0">
                            <input type="checkbox" id="採⽤未請求" class="custom-control-input custom-checkbox">
                            <label for="採⽤未請求" class="custom-control-label custom-checkbox-label">採⽤未請求</label>
                        </div>  
                        <div class="col-md-2 p-lr0">
                            <input type="checkbox" id="請求済" class="custom-control-input custom-checkbox">
                            <label for="請求済" class="custom-control-label custom-checkbox-label">請求済</label>
                        </div>   
                         <div class="col-md-2 p-lr0">
                            <input type="checkbox" id="⼊⾦確認済" class="custom-control-input custom-checkbox">
                            <label for="⼊⾦確認済" class="custom-control-label custom-checkbox-label">⼊⾦確認済</label>
                        </div>                       
                    </div>                    
                  </div>
                  <div class="row">
                  <div class="col-12">
                  <button class="custom-btn delete">削除</button>
                  </div>
                  </div>
      </div>
    <!--end advanced search-->     
    </div>
   </div>   
     <table id="example" class="table table-striped table-bordered" style="width:100%">    
        <thead>
            <tr>
                <th>管理番号</th>
                <th>応募⽇時</th>
                <th>企業番号</th>
                <th>企業名</th>
                <th>求⼈番号</th>
                <th>求⼈タイトル</th>
                <th>求職者会員番号</th>
                <th>⽒名</th>
                <th class="onebutton-wrapper">ステータス</th>
                <th class="threebutton-wrapper"></th>               
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>K2020-0001</td>
                <td>2020/03/02 12:30:00</td>
                <td>00001</td>
                <td>コロナ会社</td>
                <td>00001-0001</td>
                <td>レジ打ち</td>
                <td>0000001</td>
                <td>⼭⽥</td>
                <td class="td-btn"><span>採⽤未請求</span><button class="custom-btn change">変更</button></td>
                <td class="text-left">
                <button class="custom-btn btns-margin">チャット</button>
                <button class="custom-btn btns-margin">請求書⽣成</button>
                <button class="custom-btn btns">クレカ請求</button>
                </td>
            </tr>    
            <tr>
                <td>K2020-0002</td>
                <td>2020/03/02 12:30:00</td>
                <td>00001</td>
                <td>コロナ会社</td>
                <td>00001-0002</td>
                <td>レジ打ち</td>
                <td>0000001</td>
                <td>タナカ</td>
                <td class="td-btn"><span>請求済</span><button class="custom-btn change">変更</button></td>
                <td class="text-left">
                <button class="custom-btn btns-margin">チャット</button>
                <button class="custom-btn btns-margin">請求書⽣成</button>
                <button class="custom-btn btns">クレカ請求</button>
                </td>
            </tr>            
            
        </tbody>
        <!-- <tfoot>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>
                <th>Start date</th>
                <th>Salary</th>
            </tr>
        </tfoot> -->
    </table>
 </div>
</template>

<script>
import JQuery from 'jquery'
let $ = JQuery
    export default {
        data(){
        return {
            lang:{
                days: ['日', '月', '火', '水', '木', '金', '土'],
                months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                placeholder: {
                    //date: new Date().toISOString().slice(0,10),
                    date: '年 - 月 - 日',
                }
            },
            post:{},
            time1: null,
            time2: null,            
            
        }
    },
    mounted(){
         $(document).ready(function() {
                $("#chkAll").click(function () {
                    $("input[name='employees']").attr("checked", this.checked);
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
                        // "infoFiltered":"(filtered from _MAX_ total entries)",
                        "infoFiltered":"",    
                    }
                }); 
            } );
    },
    methods: {
      addPost(){
        console.log(this.post);
      }
    }
  }
</script>
