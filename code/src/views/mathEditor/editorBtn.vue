import { setInterval } from 'timers';
<!--
 * @Description: 数学编辑器（符号、公式）
 * @Author: zhangkai
 * @Date: 2020-04-20 08:54:30
 * @LastEditTime: 2020-05-26 16:34:36
 * @LastEditors: zhangkai
 -->
<template>
   <div class=".editor-container">
        <div class="tools-right">
            <el-button type="primary" plain size="small" @click="showDialog('pinyin')">拼音</el-button>
            <el-button type="primary" plain size="small" @click="showDialog('formula')">公式与符号</el-button>
            <el-button type="info" plain size="small" @click="showDialog('review')">预览</el-button>
        </div>
   </div>
</template>
<script>
    export default {
        props: {
            dataKey: { // 标识数据的关键字
                type: String,
                default: '',
                required: false
            },
            content: { // 编辑器的内容
                type: String,
                default: '',
                required: true
            }
        },
        data () {
            return {
            }
        },
        mounted() {
            
        },
        methods: {
            // 展示弹框
            showDialog(key) {
                const params = {
                    dialogKey: key,
                    dataKey: this.dataKey
                }
                this.$emit('setReviewContent', this.content);
                this.$emit('getKeyFromBtn', params);
                
            },
        },
    }
</script>
<style lang="scss">
    .editor-container {
        position: relative;
        .tools-right {
            height: 43px;
            display: flex;
            align-items: center;
        }
    }
    
</style>

