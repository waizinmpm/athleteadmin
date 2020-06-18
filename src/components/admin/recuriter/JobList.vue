<template>
<div>
    <div class="row">    
    <div class="col-sm-12 p-0 searchform-one">
    <!--advanced search-->
     <h5 class="m-b-10 main-header">求⼈⼀覧</h5>   
      <div class="content-row" style="padding-bottom:0px;">    
                  <div class="row">
                    <div class="col-md-3">
                    <label for="企業番号">企業番号</label>
                      <input type="text" placeholder="企業番号" class="form-control" name="企業番号">
                    </div>
                    <div class="col-md-3">
                      <label for="企業名">企業名</label>
                      <input type="text" placeholder="企業名" class="form-control">
                    </div>                    
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                    <label for="求⼈番号">求⼈番号</label>
                     <input type="text" placeholder="求⼈番号" class="form-control">
                    </div>
                    <div class="col-md-3">
                      <label for="求⼈タイトル">求⼈タイトル</label>
                       <input type="text" placeholder="求⼈タイトル" class="form-control">
                    </div>    
                    <div class="col-md-3">                        
                        <button class="btn searchbtn" style="margin-top:22px;">検索</button>
                    </div>                
                  </div>
                  <label for="ステータス">ステータス</label>
                   <div class="row">
                    <div class="col-md-6">                     
                        <div class="col-md-2 p-lr0">                          
                            <input type="checkbox" class="custom-control-input custom-checkbox" name="公開" id="公開">
                            <label for="公開" class="custom-control-label custom-checkbox-label">公開</label>                          
                        </div>
                         <div class="col-md-2 p-lr0">                          
                            <input type="checkbox" class="custom-control-input custom-checkbox" id="⾮公開">
                            <label for="⾮公開" class="custom-control-label custom-checkbox-label">⾮公開</label>                          
                        </div>
                        <div class="col-md-2 p-lr0">
                            <input type="checkbox" class="custom-control-input custom-checkbox" id="停⽌" >
                            <label for="停⽌" class="custom-control-label custom-checkbox-label">停⽌</label>
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
                <th>企業番号</th>
                <th>企業名</th>
                <th>求⼈番号</th>
                <th>求⼈タイトル</th>
                <th>求⼈応募者数</th>
                <th>スカウト受託者数</th>
                <th class="onebutton-wrapper">掲載期間</th>
                <th class="onlybutton-wrapper">ステータス</th>
               
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>コロナ会社</td>
                <td>レジ打ち </td>
                <td>1</td>
                <td>1</td>
                <td>2020/03/02~2020/03/05</td>
                <td class="td-btn"><span>公開</span><button class="custom-btn change">変更</button></td>
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>エキスパート</td>
                <td>レジ打ち </td>
                <td>-</td>
                <td>0</td>
                <td>2020/03/02~2020/03/05</td>
                <td class="td-btn"><span>⾮公開</span><button class="custom-btn change">変更</button></td>
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>エキスパート</td>
                <td>レジ打ち </td>
                <td>-</td>
                <td>0</td>
                <td>2020/03/02~2020/03/05</td>
                <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>エキスパート</td>
                <td>レジ打ち </td>
                <td>-</td>
                <td>0</td>
                <td>2020/03/02~2020/03/05</td>
                <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>エキスパート</td>
                <td>レジ打ち </td>
                <td>-</td>
                <td>0</td>
                <td>2020/03/02~2020/03/05</td>
                <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>エキスパート</td>
                <td>レジ打ち </td>
                <td>-</td>
                <td>0</td>
                <td>2020/03/02~2020/03/05</td>
                <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>エキスパート</td>
                <td>レジ打ち </td>
                <td>-</td>
                <td>0</td>
                <td>2020/03/02~2020/03/05</td>
                <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>エキスパート</td>
                <td>レジ打ち </td>
                <td>-</td>
                <td>0</td>
                <td>2020/03/02~2020/03/05</td>
                <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                 <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>エキスパート</td>
                <td>レジ打ち </td>
                <td>-</td>
                <td>0</td>
                <td>2020/03/02~2020/03/05</td>
                <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>エキスパート</td>
                <td>レジ打ち </td>
                <td>-</td>
                <td>0</td>
                <td>2020/03/02~2020/03/05</td>
                <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                 <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>エキスパート</td>
                <td>レジ打ち </td>
                <td>-</td>
                <td>0</td>
                <td>2020/03/02~2020/03/05</td>
                <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>エキスパート</td>
                <td>レジ打ち </td>
                <td>-</td>
                <td>0</td>
                <td>2020/03/02~2020/03/05</td>
                <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                 <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>エキスパート</td>
                <td>レジ打ち </td>
                <td>-</td>
                <td>0</td>
                <td>2020/03/02~2020/03/05</td>
                <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                 <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>エキスパート</td>
                <td>レジ打ち </td>
                <td>-</td>
                <td>0</td>
                <td>2020/03/02~2020/03/05</td>
                <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                 <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>エキスパート</td>
                <td>レジ打ち </td>
                <td>-</td>
                <td>0</td>
                <td>2020/03/02~2020/03/05</td>
                <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                 <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>エキスパート</td>
                <td>レジ打ち </td>
                <td>-</td>
                <td>0</td>
                <td>2020/03/02~2020/03/05</td>
                <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>エキスパート</td>
                <td>レジ打ち </td>
                <td>-</td>
                <td>0</td>
                <td>2020/03/02~2020/03/05</td>
                <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                 <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>エキスパート</td>
                <td>レジ打ち </td>
                <td>-</td>
                <td>0</td>
                <td>2020/03/02~2020/03/05</td>
                <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>
                <td><button class="custom-btn edit">編集</button></td>
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
          post:{}
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
                
                // $('.dataTables_filter input').attr("placeholder", "Zoeken...");
            } );
    },
    methods: {
      addPost(){
        console.log(this.post);
      }
    }
  }
</script>