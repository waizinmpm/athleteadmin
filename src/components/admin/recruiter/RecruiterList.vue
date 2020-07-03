<template>    
<div>
    <div class="row">
    <div class="col-sm-6 p-0 searchform-one">
    <h5 class="m-b-10 main-header">企業会員情報一覧</h5>     
        <div class="form-group">
                <!--<label class="control-label" for="inputGroup">Input Group </label>-->
                <div class="input-group">
                    <input type="text" class="form-control"
                        placeholder="会社名、企業コードを⼊⼒してください……" id="inputGroup"/>
                    <span class="input-group-addon bg-color">
                        <i class="fa fa-search"></i>
                    </span>
                </div>
            </div> 
        </div>
    </div>
    <div class="row">
    <div class="col-sm-12 p-0">
    <table id="exampleone" class="table table-striped table-bordered" style="width:100%">
        <thead>
            <tr>
                <th align="left"><input type="checkbox" id="chkAll" /></th>
                <th>企業会員番号</th>
                <th>企業名</th>
                <th>会社名(愛称)</th>
                <th class="onebutton-wrapper">ステータス</th>
                <th class="onlybutton-wrapper"></th>     
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>株式会社西村</td>
                <td>西村</td>     
                <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>         
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>0000002</td>
                <td>藤原</td>
                <td>無効</td>    
                 <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>           
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td> 
                 <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>              
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>    
                 <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>           
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>  
                 <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>             
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>  
                 <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>             
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>  
                 <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>             
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>  
                 <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>             
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>  
                 <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>             
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>  
                 <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>             
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>  
                 <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>             
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
               <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>    
                 <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>           
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>  
                 <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>             
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
               <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td> 
                 <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>              
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td> 
                 <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>              
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td> 
                 <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>              
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>  
                 <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>             
                <td><button class="custom-btn edit">編集</button></td>
            </tr>
            <tr>
                <td><input type="checkbox" name="employees" /></td>
                <td>00001</td>
                <td>源</td>
                <td>退会</td>  
                 <td class="td-btn"><span>停⽌</span><button class="custom-btn change">変更</button></td>             
                <td><button class="custom-btn edit">編集</button></td>
            </tr>            
        </tbody>       
    </table> 
    </div> 
    </div>
</div>     
</template>
<script>
import JQuery from 'jquery'
let $ = JQuery
export default {
    data() {
        return {
            post:[],
        }
    },
    mounted() {
        $(document).ready(function() {
            $("#chkAll").click(function () {
                $("input[name='employees']").attr("checked", this.checked);
            });
            $('#exampleone').DataTable({
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

    },
};
</script>
