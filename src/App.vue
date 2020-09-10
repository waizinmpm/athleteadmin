<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
$logofont:30px;
$mainheaderfont: 20px;
$headerfont: 18px;
$textfont: 12px;
$padding: 15px;
$border:10px;
$borderradius1:25px;
$borderradius2:3px;
$bordercolor:#e7e7e7;
$colors:( 
primary: #84BE3F, primary-ligtht:#1A74C0, primary-dark:#233977, 
second:#FB8C00, secondary-light:#a5a5a5, 
text-color:#000, 
errorcolor:red, 
bordercolor:#dee2e6, 
tablecolor:#b4c574, 
listcolor:#f5f5f5, 
buttoneditcolor:#f5ecd1, 
buttonchangecolor:#d1f5df, 
buttondeletecolor:#ffcdd5, 
buttonenablecolor:#cbddf3);

@function color($color-name) {
    @return map-get($colors, $color-name)
}


$desktop: 1000px;
@mixin desktop {
    @media(max-width: #{$desktop}) {
        @content;
    }
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.txt-vertical-ellipsis {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

body {
    // background-color: #fefefe;
    h5 {
        font-size: 16px;
    }
    h3 {
        font-size: 20px;
    }
    .bg-color {
        background-color: color(primary);
    }
    .custom-btn {
        border-radius: none !important;
        color: color(text-color);
        width: 100px;
        padding: 5px 0;
    }
    .edit {
        background-color: color(buttoneditcolor);
    }
    .change {
        background-color: color(buttonchangecolor);
    }
    .delete {
        background-color: color(buttondeletecolor);
    }
    .enable {
        background-color: color(buttonenablecolor);
    }
    .main-header {
        color: color(primary)
    }
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .navbar-header {
            float: left;
        }
        .logo {
            padding: 15px 15px;
            font-size: $logofont;
            color: color(primary);
            font-weight: bold;
            cursor: pointer;
        }
        .sub-brand {
            color: color(secondary-light);
            margin-bottom: 0px;
            margin-top: -20px;
        }
        nav {
            position: relative;
            ul.nav_links {
                list-style: none;
                li {
                    display: inline-block;
                    padding: 0 20px;
                }
            }
        }
        .attr-nav {
            // float: right;
            display: inline-block;
            margin-left: 40px;
            margin-right: 0px;
        }
        a {
            display: inline-block;
            // margin: 20px 0 0 0;
            padding: 5px 10px;
            font-weight: 600;
            text-transform: uppercase;
            border-radius: $borderradius2;
        }
        .member {
            border: 2px solid color(primary);
            color: color(primary);
        }
        .login {
            border: 2px solid color(second);
            color: color(second);
        }
    }
    .searchdiv {
        display: table;
        width: 100%;
        border: 1px solid #CCCCCC;
        background: #fff;
        border-radius: 4px;
        padding: 20px 19px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        ul {
            display: contents;
            vertical-align: middle;
            li {
                width: 48.74%;
                float: left;
                line-height: 1.3;
                border: 1px solid #CCCCCC;
                border-radius: $borderradius2;
                padding: 10px 20px;
                font-size: $textfont;
                display: block;
                color: color(secondary-light);
                cursor: pointer;
                position: relative;
                transition: opacity 300ms ease;
                margin-bottom: 10px;
                &:first-child {
                    margin-right: 7px;
                }
                &:last-child {
                    margin-bottom: 0px;
                    width: 100%;
                }
            }
        }
    }
    .searchbtn {
        background-color: color(primary);
        color: #fff;
        width: 150px;
        padding: 10px 0;
    }
    .search-btn {
        background-color: color(primary);
        color: #fff;
        width: 90px;
        border-radius: 0px !important;
        margin-left: 10px;
    }
    .drop-icon {
        // position: relative;
        &::after {
            font-family: 'FontAwesome';
            content: "\f107";
            position: absolute;
            right: 0px;
            cursor: pointer;
            transition: opacity 300ms ease;
            width: 18px;
            height: 18px;
        }
    }
    /*innerbanner*/
    .inner-banner {
        display: block;
        background: url(/images/bg.png) no-repeat center 0;
        // height: 300px;
        .overlay {
            background: rgba(0, 0, 0, 0.5);
            padding: 50px 0px;
            .advanced-search {
                background-color: #fff;
                padding: 16px;
                border-radius: 3px;
                outline: none;
                max-width: 960px;
            }
        }
    }
    /*modal*/
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        display: table;
        transition: opacity 0.3s ease;
        .modal-wrapper {
            display: table-cell;
            vertical-align: middle;
            .modal-container {
                width: 800px;
                margin: 0px auto;
                background-color: #fff;
                border-radius: 2px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
                transition: all 0.3s ease;
                .head-wrap {
                    padding: 16px 0px;
                    .cross-btn {
                        position: relative;
                        top: -30px;
                        right: 10px;
                        font-size: 20px;
                        background: transparent;
                        border: none;
                        color: #807979;
                        display: flex;
                        float: right;
                    }
                }
                .modal-header {
                    // display: flex;
                    // align-items: flex-start;
                    // justify-content: space-between;
                    display: block;
                    padding: 16px 16px;
                    border-bottom: 1px solid color(bordercolor);
                    border-top-left-radius: calc(0.3rem - 1px);
                    border-top-right-radius: calc(0.3rem - 1px);
                    .firstwrapper {
                        display: flex;
                        width: 100%;
                        .topcard {
                            display: flex;
                            border-radius: 4px;
                            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
                            padding: 10px;
                            width: 50%;
                            max-width: 98rem;
                            &:first-child {
                                margin-right: 10px;
                            }
                            .imgwrap {
                                vertical-align: middle;
                                text-align: center;
                                margin-right: 10px;
                                img {
                                    width: 80px;
                                    height: 80px;
                                    border-radius: 50%;
                                    margin-right: 5px;
                                    object-fit: cover;
                                }
                            }
                        }
                    }
                }
            }
            .modal-body {
                padding: 0px !important;
                // .slide-next-leave-active,
                // .slide-next-enter-active,
                // .slide-prev-enter-active,
                // .slide-prev-leave-active {
                //     transition: .5s;
                // }
                // .slide-next-enter,
                // .slide-next-leave,
                // .slide-prev-leave-to {
                //     transform: translate(150%, 0);
                // }
                // .slide-next-leave-to,
                // .slide-prev-enter,
                // .slide-prev-leave {
                //     transform: translate(-150%, 0);
                // }
                .tabs {
                    display: flex;
                    position: relative;
                    background: #fff;
                    color: color(text-color);
                    height: 60px;
                    // box-shadow: 0 3px 3px -2px rgba(0, 0, 0, .2), 0 3px 4px 0 rgba(0, 0, 0, .14), 0 1px 7px 0 rgba(0, 0, 0, .12);
                    border-bottom: 1px solid color(bordercolor);
                    overflow-x: scroll;
                    .active {
                        color: red;
                    }
                }
                .tabs::-webkit-scrollbar {
                    width: 0 !important;
                    height: 0 !important;
                }
                .tabitem {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 135px;
                    cursor: pointer;
                    text-transform: uppercase;
                    font-size: 14px;
                }
                .slider {
                    position: absolute;
                    bottom: 0px;
                    height: 2px;
                    width: 135px;
                    background: color(primary);
                    transition: .5s ease;
                }
                .tabcontainer {
                    height: 500px;
                    position: relative;
                    min-height: 100%;
                    width: 100%;
                    touch-action: none;
                }
                .tabpane {
                    position: relative;
                    width: 100%;
                    // font-size: 32px;
                    display: flex;
                    // align-items: center;
                    // justify-content: center;
                    // height: 300px;
                    height: 500px;
                    overflow: auto;
                    padding: 0px 16px;
                    text-align: left;
                    .form-wrap {
                        padding-bottom: 10px;
                        .bd {
                            border: 1px solid #ced4da;
                            border-bottom: 0;
                        }
                        .bd-all {
                            border: 1px solid #ced4da;
                        }
                        .form-left {
                            background: #f2f7ff;
                            padding: 10px 10px 0px 10px;
                        }
                        .form-right {
                            padding: 10px;
                            border-left: 1px solid #ced4da;
                        }
                        .lists-tb {
                            ul {
                                display: block !important;
                                list-style-type: circle !important;
                                border-bottom: none !important;
                                margin-left: 20px;
                            }
                        }
                    }
                }
            }
        }
    }
    /*bootnav*/
    .bootsnav {
        border-radius: 0px;
        background-color: #fff;
        border: none;
        border-bottom: solid 1px #e0e0e0;
        .container {
            position: relative;
            .attr-nav {
                float: right;
            }
            .navbar-header {
                float: left;
                .navbar-brand {
                    width: 260px;
                    padding: 15px 15px;
                    font-size: $logofont;
                    color: color(primary);
                    font-weight: bold;
                }
                .sub-brand {
                    color: #a5a5a5;
                    margin-bottom: 0px;
                }
            }
        }
    }
    .bor-l {
        line-height: 1.3;
        padding-top: 2px;
        position: relative;
        padding-left: 12px;
        margin-bottom: 19px;
        .card-title {
            color: #333333;
            font-weight: bold;
            font-size: $headerfont;
        }
        &:before {
            content: "";
            width: 4px;
            height: 25px;
            background-color: color(primary-ligtht);
            position: absolute;
            top: 0;
            left: 0;
        }
        &:after {
            content: "";
            width: 4px;
            height: 12.5px;
            background-color: color(primary-dark);
            position: absolute;
            bottom: 0;
            left: 0;
        }
    }
     ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.44, rgb(187, 205, 243)), color-stop(0.72, rgb(130, 157, 190)), color-stop(0.86, rgb(148, 170, 200)));
    }
    // .active {
    //     background-color: red;
    // }
    table.striped>tbody>tr:nth-child(odd) {
        background-color: #eeeeee !important;
    }
    table.highlight>tbody>tr:hover {
        background-color: #eeeeee !important;
    }
    table>tbody>tr.selected {
        background-color: #F5F5F5 !important;
    }
    table>thead>tr {
        background-color: color(tablecolor);
        color: #fff;
    }
    .page-link {
        color: color(tablecolor) !important;
    }
    .page-item.active .page-link {
        z-index: 3;
        color: #fff !important;
        background-color: color(tablecolor) !important;
        border-color: color(tablecolor) !important;
    }
    .page-link:focus {
        box-shadow: none !important;
    }
    .td-btn>span {
        width: 80px;
        display: inline-block;
    }
    .mx-table-date th {
        text-align: center !important;
    }
    .datepicker-wrapper {
        table>thead>tr {
            background-color: #e6e9ed;
            color: #000;
        }
        .datepicker {
            display: block;
            width: 100%;
        }
    }
}






// edit button toggle
.btn-common {
    position: relative;
    width: 75px;
    height: 29px;
    padding: 0 12px;
    border-color: #A6A6A6 !important;
    background-color: #fff;
    box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.15);
    border-radius: 20px;
    color: #000  !important;
    vertical-align: middle;
    line-height: 28px;
    text-align: left;    
}
.btn-common .down-icon {
    position: absolute;
    right: 5px;
    font-size: 20px;
    transition: all ease .3s;
    border-left: 2px solid #A6A6A6;
}
.scout-box {
    position: relative;
    display: flex;
}
.scout-txt {
    min-width: 90px;
}
.scout-toggle {
    position: absolute;
    color: #333;
    width: 200px;
    padding: 20px 20px 0 20px;
    top: 40px;
    left: 30px;
    background: #fff;
    z-index: 999;
    transform: scaleY(0);    
    transform-origin: top;
    transition: transform 0.4s ease;
    box-shadow: 0 0.2rem 2rem rgba(0, 0, 0, 0.15);
    text-align: left;
}
.scout-toggle:before {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    top: -10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-style: solid;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent #fff transparent;
}
.scout-expand {
    transform: scaleY(1);
}
.custion-radio:checked {
    position: absolute;
    left: -9999px;
}

.custion-radio:checked + .custom-radio-lable {
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    line-height: 30px;
    display: inline-block;
}

.custion-radio:checked + .custom-radio-lable:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 24px;
    height: 24px;
    border: 1px solid #aab2bd;
    border-radius: 100%;
    background: #fff;
}

.custion-radio:checked + .custom-radio-lable:after {
    content: "";
    width: 12px;
    height: 12px;
    background: #91A8BF;
    position: absolute;
    top: 6px;
    left: 6px;
    border-radius: 100%;
    transition: all 0.2s ease;
    opacity: 1;
    transform: scale(1);
}

.custion-radio:not(:checked) {
    position: absolute;
    left: -9999px;
}

.custion-radio:not(:checked) + .custom-radio-lable {
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    line-height: 30px;
    display: inline-block;
}

.custion-radio:not(:checked) + .custom-radio-lable:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 24px;
    height: 24px;
    border: 1px solid #aab2bd;
    border-radius: 100%;
    background: #fff;
}

.custion-radio:not(:checked) + .custom-radio-lable:after {
    content: "";
    width: 12px;
    height: 12px;
    background: #91A8BF;
    position: absolute;
    top: 6px;
    left: 6px;
    border-radius: 100%;
    transition: all 0.2s ease;
    opacity: 0;
    transform: scale(0);
}
[contenteditable] {
  outline: 0px solid transparent;
}
// edit button toggle

.inner-wrapper {
    padding: 20px 20px 0 20px;
    border: 1px solid #9b9898;
    border-radius: 5px;
    margin-bottom: 20px;
}
.custom-checkbox-label {
    padding-left: 10px;
    line-height: 20px;
    font-weight: 400;
    position: relative;
    margin-bottom: 0;
    vertical-align: top;
    cursor: pointer;
}
.custom-check-label-post {
    position: absolute;
    top: 0;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    left: 35px;
}
.custom-checkbox {
    height: 20px!important;
    width: 20px!important;
    margin: 0!important;
}
// table
.tbl-wxs {
    width: 80px;
}
.tbl-ws {
    width: 100px;
}
.tbl-wm {
    width: 130px;
}
.tbl-wl {
    width: 160px;
}
.tbl-wxl {
    width: 200px;
}
.tbl-w110 {
    width: 110px;
}
.text-left {
    text-align: left !important;
}


// padding & margin
.mb-0 {
    margin-bottom: 0;
}
</style>
