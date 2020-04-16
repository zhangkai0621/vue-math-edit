<!--
 * @Description: UEditor 公式编辑器
 * @Author: zhangkai
 * @Date: 2020-04-09 09:49:47
 * @LastEditTime: 2020-04-16 17:48:19
 * @LastEditors: zhangkai
 -->
<template>
   <div>
       <el-row>
           <el-col :span="12">
                <!-- 加载编辑器的容器 -->
                <div id="UEditor"></div>
           </el-col>
           <el-col :span="12">
               <span>预览区</span>
               <textarea v-model="content" id="reviewContainer"></textarea>
           </el-col>
       </el-row>
       
   </div>
</template>
<script>
    export default {
        data () {
            return {
                content: '',
            }
        },
        
        methods: {
            editKeyup() {
                console.log('keyup');
                this.$nextTick(() => {
                    const element = document.getElementById('reviewContainer');
                    window.MathJax && window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, element], () => {
                        //to do something   公式重新渲染完成后执行这个回调函数
                    });
                })
            }
        },
        mounted() {
            this.$nextTick(() => {
                setTimeout(() => {
                    const container = document.getElementById('ueditor_0').contentWindow.document.querySelector('body.view');
                    const content = document.getElementById('ueditor_0').contentWindow.document.querySelector('body.view>p');
                    console.log(container);
                    container.addEventListener('keyup', () => {
                        this.content = content.innerHTML;
                    })
                }, 1500)
            })
        }
    }
</script>
<style>
    #UEditor {
        height: 200px;
    }
    #reviewContainer {
        width: 80%;
        font-size: 20px;
        min-height: 200px;
    }
</style>