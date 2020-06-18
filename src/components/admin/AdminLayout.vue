<template>
    <div>           
        <AdminMenu></AdminMenu>
        <div class="container-fluid">    
        <div class="row row-offcanvas row-offcanvas-left">
          <div class="col-xs-6 col-sm-3 sidebar-offcanvas" role="navigation">
            <Sidebar></Sidebar>
          </div>
          <div class="col-xs-12 col-sm-9 content">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">
                  <a class="toggle-sidebar">
                    <span class="fa fa-angle-double-left" data-toggle="offcanvas" title="Maximize Panel"></span>
                  </a> メニューを閉じる
                </h3>
              </div>
              <div class="panel-body">
                  <div class="content-row"> <router-view></router-view>
                  </div>
              </div>
            </div>           
          </div>
        </div>
      </div>    
      <!-- <select v-model="$i18n.locale">
            <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
          </select>        -->
    </div>
</template>
<script>
import JQuery from 'jquery'
let $ = JQuery
import AdminMenu from "../menu/AdminMenu";
import Sidebar from "../menu/Sidebar";

export default {
  data() {
    return {
      langs:['日本語','English']
    };
  },
  components: {
    AdminMenu,
    Sidebar
    
  },
  created(){
      
  },
  
  mounted() {
     $("[data-toggle=offcanvas]").click(function () {
            $(".row-offcanvas").toggleClass("active"), $(this).toggleClass("fa-angle-double-left fa-angle-double-right");
            console.log('toggle',)
        });
  },
};
</script>
