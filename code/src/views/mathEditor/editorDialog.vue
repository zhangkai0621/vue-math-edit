<!--
 * @Description: 
 * @Author: zhangkai
 * @Date: 2020-05-16 16:13:43
 * @LastEditTime: 2020-05-26 16:34:50
 * @LastEditors: zhangkai
 -->
<template>
   <div class="editor-dialog">
       <!-- 弹框 -->
       <el-dialog
            title="编辑器"
            :visible.sync="dialogVisible"
            @close="sendContent('')"
            width="60%">
            <pinyinTable v-show="dialogKey === 'pinyin'" @getPinyin="sendContent"></pinyinTable> 
            <div v-show="dialogKey === 'formula'" id="UEditor"></div>
            <div v-show="dialogKey == 'review'" id="reviewText" v-html="content"></div>
            <el-button type="primary" v-if="dialogKey === 'formula'" @click="getFormulaContent">确定</el-button>
        </el-dialog>
   </div>
</template>
<script>
    
    import pinyinTable from '../../components/pinyinTable';
    export default {
        components: {
            pinyinTable,
        },
        data () {
            return {
                dialogVisible: false
            }
        },
        props: {
            dialogKey: { // 展示的类型
                type: String,
                required: true,
                default: 'pinyin'
            },
            editorVisiable: {
                type: Boolean,
                required: true,
                default: false
            },
            content: { // 编辑器的内容
                type: String,
                default: '',
                required: true
            }

        },
        watch: {
            editorVisiable: {
                handler(val) {
                    this.dialogVisible = val;
                    // 公式
                    if (val && this.dialogKey == 'formula') {
                        this.$nextTick(() => {
                            jQuery( function ($) {
                                var factory = kf.EditorFactory.create( $( `#UEditor` )[ 0 ], {
                                    render: {
                                        fontsize: 40
                                    },
                                    resource: {
                                        path: "/resource/"
                                    }
                                } );

                                factory.ready( function ( KFEditor ) {

                                    // this指向KFEditor
                                    this.execCommand( "render", "\\placeholder" );
                                    this.execCommand( "focus" );
                                    window['UEditor'] = this;
                                } );
                            });
                        })
                    }
                    // 预览
                    else if (val && this.dialogKey == 'review') {
                        this.$nextTick(() => {
                            const element = document.getElementById('reviewText');
                            window.MathJax && window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, element], () => {
                                //to do something   公式重新渲染完成后执行这个回调函数
                            });
                        })
                    }
                },
                immediate: false
            }
        },
       
        methods: {
           
            // 获取编辑器内容
            getFormulaContent() {
                if (window['UEditor']) {
                    const content = window['UEditor'].execCommand('get.source');
                    this.sendContent(`$${content}$`)
                }
                else {
                    this.$message.warning('请刷新页面');
                }
            },
            // 获取拼音或部首
            sendContent(content) {
                this.$emit('getContentFromEditor', content);
            },
        },
       
    }
</script>
<style lang="scss">
</style>