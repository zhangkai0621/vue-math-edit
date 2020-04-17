<!--
 * @Description: UEditor 公式编辑器
 * @Author: zhangkai
 * @Date: 2020-04-09 09:49:47
 * @LastEditTime: 2020-04-17 11:25:38
 * @LastEditors: zhangkai
 -->
<template>
   <div>
       <el-row>
           <el-col :span="12" v-loading="editorLoading">
                <!-- 加载编辑器的容器 -->
                <div id="UEditor"></div>
           </el-col>
           <el-col :span="12" class="reviewContainer" v-loading="reviewLoading">
               <span>预览区</span>
               <el-button type="primary" @click="refreshReview">刷新预览</el-button>
               <div id="reviewText" v-html="content"></div>
           </el-col>
       </el-row>
       
   </div>
</template>
<script>
    export default {
        data () {
            return {
                content: '',
                editorLoading: false, // 编辑是否 loading 
                editorContainer: null,
                editorContent: null,
                reviewLoading: false, // 预览区是否 loading
            }
        },
        
        methods: {
            refreshReview() {
                if (this.editorContent) {
                    this.content = this.editorContent.innerHTML;
                    this.$nextTick(() => {
                        const element = document.getElementById('reviewText');
                        window.MathJax && window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, element], () => {
                            //to do something   公式重新渲染完成后执行这个回调函数
                        });
                    })
                }
            },
        },
        mounted() {
                this.editorLoading = true;
                setTimeout(() => {
                    this.editorContainer = document.getElementById('ueditor_0').contentWindow.document.querySelector('body.view');
                    this.editorContent = document.getElementById('ueditor_0').contentWindow.document.querySelector('body.view>p');
                    this.editorLoading = false;
                    this.editorContainer.addEventListener('keyup', () => {
                        this.$nextTick(() => {
                            this.editorContent = document.getElementById('ueditor_0').contentWindow.document.querySelector('body.view>p');
                            // 编辑器无内容则清空预览区
                            if (!this.editorContent) {
                                this.content = '';
                            }
                        })
                    })
                }, 1500)
        }
    }
</script>
<style>
    #UEditor {
        height: 200px;
    }
    .reviewContainer {
        padding: 0 20px;
        display: flex;
        flex-direction: column;
    }
    .reviewContainer .el-button--primary {
        width: 100px;
    }
    #reviewText {
        width: 100%;
        font-size: 20px;
        min-height: 200px;
        margin: 10px 0;
    }
</style>