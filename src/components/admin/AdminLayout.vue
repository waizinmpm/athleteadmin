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
                    <span class="fa fa-angle-double-left" data-toggle="offcanvas" title="Maximize Panel">
                      <!-- <span id="menu_txt" style="font-size: 14px;margin-left: 10px;">{{$t('menu.close_menu')}}</span> -->
                      <span class="menu_txt" style="font-size: 14px;margin-left: 10px;">メニューを閉じる</span>
                     </span>
                  </a>
                </h3>
              </div>
              <div class="panel-body">
                  <div class="content-row"> <router-view @chatStarted="onChatStarted"></router-view>
                  </div>
              </div>
            </div>           
          </div>
        </div>
      </div>    
      <!-- <select v-model="$i18n.locale">
            <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
          </select>        -->
		<!-- chatbox -->
		<ChatComponent v-if="currentUser" ref="refChatComponent"  />
		<!-- end chatbox -->
    </div>
</template>
<script>
import JQuery from 'jquery'
let $ = JQuery
import AdminMenu from "../menu/AdminMenu";
import Sidebar from "../menu/Sidebar";
import ChatComponent from '../ChatComponent';
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      langs:['日本語','English']
    };
  },
  components: {
    AdminMenu,
	Sidebar,
	ChatComponent,    
  },
  created(){
      
  },
  
  mounted() {
     $("[data-toggle=offcanvas]").click(function () {
            $(".row-offcanvas").toggleClass("active"), $(this).toggleClass("fa-angle-double-left fa-angle-double-right");
            console.log('toggle',)
            if($(this).children('.menu_txt').text() == 'メニューを閉じる'){
                $(this).children('.menu_txt').text('メニューを開く');
            } else {
                $(this).children('.menu_txt').text('メニューを閉じる');
            }
        });
  },
  computed: {
    ...mapGetters(["currentUser",]),
  },
  methods: {
    onChatStarted(payload) {
      this.$refs.refChatComponent.isToggled = true;
      this.$refs.refChatComponent.getMessage(payload);
    },
  },
};
</script>
