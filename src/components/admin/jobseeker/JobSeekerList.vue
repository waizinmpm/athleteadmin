<template>
 <div>
    <div class="row">
        <div class="col-sm-12 p-0 searchform-one">
        <!--advanced search-->
            <h5 class="m-b-10 main-header">求職者会員情報⼀覧</h5>   
            <div class="content-row" style="padding-bottom:0px;">    
                        <div class="row">
                            <div class="col-md-6">                                
                                <div class="input-group">
                                    <input type="text" class="form-control"
                                        placeholder="求職者会員番号、求職者名を⼊⼒してください……" id="inputGroup"/>
                                    <span class="input-group-addon bg-color">
                                        <i class="fa fa-search"></i>
                                    </span>
                                </div>                   
                            </div>                                        
                        </div>
                        
                        <label for="ステータス">ステータス</label>
                        <div class="row">
                            <div class="col-md-6">                     
                                <div class="col-md-2 p-lr0">                          
                                    <input type="checkbox" class="custom-control-input custom-checkbox" id="有効">
                                    <label for="公開" class="custom-control-label custom-checkbox-label">有効</label>                          
                                </div>
                                <div class="col-md-2 p-lr0">                          
                                    <input type="checkbox" class="custom-control-input custom-checkbox" id="無効">
                                    <label for="⾮公開" class="custom-control-label custom-checkbox-label">無効</label>                          
                                </div>
                                <div class="col-md-2 p-lr0">
                                    <input type="checkbox" class="custom-control-input custom-checkbox" id="退会">
                                    <label for="停⽌" class="custom-control-label custom-checkbox-label">退会</label>
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
                <th align="left"><input type="checkbox" id="chkAll" /></th>
                <th>求職者会員番号</th>
                <th>求職者名</th>
                <th>ステータス</th>
                <th class="threebutton-wrapper"></th>     
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>平</td>
                <td>有効</td>                
                <td>
                    <button class="custom-btn edit btns-margin">編集</button>
                    <button class="custom-btn btns-margin">無効</button>
                    <button class="custom-btn enable btns">有効</button>
                </td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>0000002</td>
                <td>藤原</td>
                <td>無効</td>               
                 <td>
                    <button class="custom-btn edit btns-margin">編集</button>
                    <button class="custom-btn btns-margin">無効</button>
                    <button class="custom-btn enable btns">有効</button>
                </td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>               
                  <td>
                    <button class="custom-btn edit btns-margin">編集</button>
                    <button class="custom-btn btns-margin">無効</button>
                    <button class="custom-btn enable btns">有効</button>
                </td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>               
                 <td>
                    <button class="custom-btn edit btns-margin">編集</button>
                    <button class="custom-btn btns-margin">無効</button>
                    <button class="custom-btn enable btns">有効</button>
                </td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>               
                 <td>
                    <button class="custom-btn edit btns-margin">編集</button>
                    <button class="custom-btn btns-margin">無効</button>
                    <button class="custom-btn enable btns">有効</button>
                </td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>               
                <td>
                    <button class="custom-btn edit btns-margin">編集</button>
                    <button class="custom-btn btns-margin">無効</button>
                    <button class="custom-btn enable btns">有効</button>
                </td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>               
                  <td>
                    <button class="custom-btn edit btns-margin">編集</button>
                    <button class="custom-btn btns-margin">無効</button>
                    <button class="custom-btn enable btns">有効</button>
                </td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>               
                 <td>
                    <button class="custom-btn edit btns-margin">編集</button>
                    <button class="custom-btn btns-margin">無効</button>
                    <button class="custom-btn enable btns">有効</button>
                </td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>               
                 <td>
                    <button class="custom-btn edit btns-margin">編集</button>
                    <button class="custom-btn btns-margin">無効</button>
                    <button class="custom-btn enable btns">有効</button>
                </td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>               
                 <td>
                    <button class="custom-btn edit btns-margin">編集</button>
                    <button class="custom-btn btns-margin">無効</button>
                    <button class="custom-btn enable btns">有効</button>
                </td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>               
                 <td>
                    <button class="custom-btn edit btns-margin">編集</button>
                    <button class="custom-btn btns-margin">無効</button>
                    <button class="custom-btn enable btns">有効</button>
                </td>
            </tr>
            <tr>
               <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>               
                 <td>
                    <button class="custom-btn edit btns-margin">編集</button>
                    <button class="custom-btn btns-margin">無効</button>
                    <button class="custom-btn enable btns">有効</button>
                </td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>               
                 <td>
                    <button class="custom-btn edit btns-margin">編集</button>
                    <button class="custom-btn btns-margin">無効</button>
                    <button class="custom-btn enable btns">有効</button>
                </td>
            </tr>
            <tr>
               <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>               
                <td>
                    <button class="custom-btn edit btns-margin">編集</button>
                    <button class="custom-btn btns-margin">無効</button>
                    <button class="custom-btn enable btns">有効</button>
                </td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>               
                 <td>
                    <button class="custom-btn edit btns-margin">編集</button>
                    <button class="custom-btn btns-margin">無効</button>
                    <button class="custom-btn enable btns">有効</button>
                </td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>               
                 <td>
                    <button class="custom-btn edit btns-margin">編集</button>
                    <button class="custom-btn btns-margin">無効</button>
                    <button class="custom-btn enable btns">有効</button>
                </td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>               
                  <td>
                    <button class="custom-btn edit btns-margin">編集</button>
                    <button class="custom-btn btns-margin">無効</button>
                    <button class="custom-btn enable btns">有効</button>
                </td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>               
                <td>
                    <button class="custom-btn edit btns-margin">編集</button>
                    <button class="custom-btn btns-margin">無効</button>
                    <button class="custom-btn enable btns">有効</button>
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
          post:{}  
        }
    },
    mounted(){
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
    },
    methods: {
      addPost(){
        console.log(this.post);
      }
    }
  }
</script>
