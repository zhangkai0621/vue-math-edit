import { setInterval } from 'timers';
<!--
 * @Description: 数学编辑器（符号、公式）
 * @Author: zhangkai
 * @Date: 2020-04-20 08:54:30
 * @LastEditTime: 2020-05-10 09:58:26
 * @LastEditors: zhangkai
 -->
<template>
   <div>
       <el-row type="flex">
           <el-col :span="12" class="editor-container" v-loading="editorLoading">
                <!-- 加载编辑器的容器 -->
                <div id="UEditor"></div>
                <div class="tools-right">
                    <el-button type="info" plain size="small" @click="showDialog('pinyin')">拼音</el-button>
                    <el-button type="info" plain size="small" @click="showDialog('bushou')">部首</el-button>
                </div>
           </el-col>
           <el-col :span="12" class="reviewContainer" v-loading="reviewLoading">
               <span>预览区</span>
               <el-button type="primary" @click="refreshReview">刷新预览</el-button>
               <div id="reviewText" v-html="content"></div>
           </el-col>
       </el-row>

       <!-- 弹框 -->
       <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="60%">
            <pinyinTable v-if="tableShowByKey === 'pinyin'" @getPinyin="getPinyinOrBushou"></pinyinTable> 
            <bushouTable v-if="tableShowByKey === 'bushou'" @getValuefromChild="getPinyinOrBushou"></bushouTable>
        </el-dialog>
       
   </div>
</template>
<script>
    import bushouTable from './bushouTable';
    import pinyinTable from './pinyinTable';
    export default {
        components: {
            pinyinTable,
            bushouTable
        },
        data () {
            return {
                content: '',
                editorLoading: false, // 编辑是否 loading 
                editorContainer: null,
                editorContent: null,
                reviewLoading: false, // 预览区是否 loading
                dialogVisible: false,
                tableShowByKey: 'pinyin', // 表格展示的关键字
            }
        },
        
        methods: {
            // 刷新预览
            refreshReview() {
                if (this.editorContainer) {
                    const element = document.getElementById('reviewText');
                    element.innerHTML = this.content = this.editorContainer.innerHTML;
                    if (element && this.editorContainer) {
                        this.$nextTick(() => {
                            window.MathJax && window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, element], () => {
                                //to do something   公式重新渲染完成后执行这个回调函数
                                // 内容根据问号（?）占空
                                element.innerHTML = element.innerHTML.replace(/\?/g, "<input type='text'>");
                                
                            });
                        })
                        
                    }
                }
            },
            // 展示弹框
            showDialog(key) {
                this.dialogVisible = true;
                this.tableShowByKey = key;
            },
            // 获取拼音或部首
            getPinyinOrBushou(value) {
                this.editorContent = document.getElementById('ueditor_0').contentWindow.document.querySelector('body.view>p');
                this.editorContent.innerHTML += value;
                this.dialogVisible = false;
            },
        },
        mounted() {
            this.editorLoading = true;
            const timer = setInterval(() => {
                const ueditor = document.getElementById('ueditor_0');
                this.editorContainer = ueditor ? ueditor.contentWindow.document.querySelector('body.view') : null;
                if (ueditor && this.editorContainer) {
                    clearInterval(timer);
                    this.editorLoading = false;
                    // 编辑器设置键盘监听事件
                    this.editorContainer.addEventListener('keyup', () => {
                        this.$nextTick(() => {
                            this.editorContent = document.getElementById('ueditor_0').contentWindow.document.querySelector('body.view>p');
                            // 编辑器无内容则清空预览区
                            if (!this.editorContent) {
                                this.content = '';
                            }
                        })
                    })
                }
                
            }, 500)
        }
    }
</script>
<style lang="scss">
    .editor-container {
        position: relative;
        #UEditor {
            height: 200px;
        }
        .tools-right {
            height: 43px;
            display: flex;
            align-items: center;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 999;
        }
    }
    .reviewContainer {
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        .el-button--primary {
            width: 100px;
        }
        #reviewText {
            width: 100%;
            font-size: 20px;
            min-height: 200px;
            margin: 10px 0;
            p {
                margin: 0;
            }
            input {
                width: 15px;
            }
        }
    }
</style>

