<template>
  <div class="container">
    <h1>Hallo {{ currentUser.name }} . . . welcome to your work space.</h1>
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
                <th>ステータス</th>
                <th></th>               
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
                <td>
                <button class="custom-btn">チャット</button>
                <button class="custom-btn">請求書⽣成</button>
                <button class="custom-btn">クレカ請求</button>
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
                <td>
                <button class="custom-btn">チャット</button>
                <button class="custom-btn">請求書⽣成</button>
                <!-- <button class="custom-btn">クレカ請求</button> -->
                </td>
            </tr>            
            
        </tbody>        
    </table>
  </div>
</template>
<script>

export default {
   data() {
    return {
      dataTable:null,
    };
  },
     mounted(){       
               
           
    },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  }
};
</script>