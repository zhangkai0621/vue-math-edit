<!--
 * @Description: 数学公式编辑器
 * @Author: zhangkai
 * @Date: 2020-03-13 14:27:26
 * @LastEditTime: 2020-05-10 10:19:39
 * @LastEditors: zhangkai
 -->
<template>
    <div class="math-edit">
        <el-row>
            <el-col :span="14">
                <el-tabs v-model="activeName" @tab-click="handleClick" >
                <el-tab-pane label="数学公式" name="first">
                     <el-button type="primary" @click="dialogVisible = true">选择公式</el-button>
                     <!-- 工具栏 -->
                    <div class="tools-bar">
                        <div v-for="(tool, i) in commTools" :key="i"  @click="chooseTool(tool, index)">{{tool.name}}</div>
                    </div>
                    <el-input 
                        type="textarea" 
                        v-model="content" 
                        class="math-content" 
                        ></el-input>
                </el-tab-pane>
                <el-tab-pane label="语文拼音" name="second">
                    <pinyinTable @getPinyin="getPinyin"></pinyinTable>
                </el-tab-pane>
            </el-tabs>
            </el-col>
            <el-col :span="10" class="review">
                预览区
                <div class="review-content" v-html="content"></div>
            </el-col>
        </el-row>
        <button @click="referHTML">刷新</button>
        <button @click="reset">重置</button>
        <button @click="createWord">生成word</button>
        <a :href="downHref" download="123.txt" id="download" style="display: none;">点击下载</a>

        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            @close="dialogClose"
            width="50%">
            <div v-for="(item, index) in data" :key="index">
                <!-- 工具栏 -->
                <div class="tools-bar">
                    <div v-for="(tool, i) in toolsList" :key="i"  @click="selectTools(tool, index)">{{tool.name}}</div>
                </div>
                <!-- 输入框 -->
                <el-form ref="form"  v-show="item.type.length">
                    <el-form-item :label="item.firstLable">
                        <el-input v-model="item.firstValue"></el-input>
                        <el-button type="info" @click="insideInput('firstValue', index)">嵌套输入</el-button>
                    </el-form-item>
                    <el-form-item :label="item.secondLable" v-if="item.isShowSecond">
                        <el-input v-model="item.secondValue"></el-input>
                        <el-button type="info" @click="insideInput('secondValue', index)">嵌套输入</el-button>
                    </el-form-item>
                </el-form>
            </div>
            
            <el-button type="primary" @click="confirmContent">确定</el-button>
        </el-dialog>
    </div>
</template>
<script>
import pinyinTable from '../components/pinyinTable.vue';
export default {
    components: {
        pinyinTable
    },
    data () {
        return {
            activeName: 'first',
            dialogVisible: false,
            content: '',
            data: [
                {
                    type: '', // 类型
                    firstLable: '', 
                    firstValue: '', // 第一个值
                    secondLable: '', 
                    secondValue: '', // 第二个值
                    isShowSecond: true, // 是否显示第二个值
                    nest: '', // 嵌套位置
            },
            ],
            index: 0, // 当前点击的选项
            currentString: '',
            downHref: '', // 下载地址

            // 普通数学工具
            commTools: [
                { type: '  ', name: '表达式' },
                { type: '+', name: '加' },
                { type: '-', name: '减' },
                { type: '\\times', name: '乘' },
                { type: '\\div', name: '除' },
                { type: '=', name: '等于' },
                { type: '\\lt', name: '小于' },
                { type: '\\gt', name: '大于' },
                { type: '\\leq', name: '小于等于' },
                { type: '\\geq', name: '大于等于' },
                { type: '\\neq', name: '不等于' },
                { type: '\\pm', name: '加减' },
                { type: '\\pi', name: 'π' },
                { type: '\\bigodot', name: '圆' },
                { type: '\\because', name: '因为' },
                { type: '\\therefore', name: '所以' },
                { type: '\\triangle', name: '三角形' },
                { type: '<br>', name: '换行' },
            ],

            toolsList: [
                { type: '\\frac', name: '分数', firstLable: '分子', secondLable: '分母', isShowSecond: true},
                { type: '\\sqrt', name: '开方', firstLable: '开方数', secondLable: '被开方数', isShowSecond: true},
                { type: '^', name: '平方' , firstLable: '底数', secondLable: '指数' , isShowSecond: true},
                { type: '_', name: '下标' , firstLable: '正常值', secondLable: '角标值' , isShowSecond: true},
                { type: '\\vert', name: '绝对值' ,firstLable: '数值', secondLable: '' , isShowSecond: false},
                { type: '^\\circ', name: '角度' , firstLable: '数值' , secondLable: '' ,isShowSecond: false},
                { type: 'cases', name: '方程组' , firstLable: '第一个方程' , secondLable: '第二个方程' ,isShowSecond: true},
            ]
        }
    },
    mounted() {
        this.$nextTick(() => {
             window.MathJax && window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.querySelector('.math-edit')],() => {
                //to do something   公式重新渲染完成后执行这个回调函数
            });
        })
    },
    watch: {
        content(newValue) {
            this.referHTML();
        }
    },
    methods: {
        handleClick(tab, event) {
            // console.log(tab, event);
            this.content = '';
        },
        // 选择工具
        chooseTool(content, index) {
            switch(content.type) {
                case '<br>': 
                    this.content += ` ${content.type} `;
                    break;
                case '\\triangle': // 三角形
                    this.content += ` $${content.type} ABC$ `;
                    break;
                case '\\bigodot':  // 圆
                    this.content += ` $${content.type} P$ `;
                    break;
                default: 
                    this.content += ` $${content.type}$ `;
                    break;
            }
            
        },
        // 获取公式类型
        selectTools(content, index) {
            this.dialogVisible = true;
            this.data[index].type = content.type;
            this.data[index].firstLable = content.firstLable;
            this.data[index].secondLable = content.secondLable;
            this.data[index].isShowSecond = content.isShowSecond;
        },
        // 嵌套输入
        // type 第几个输入框
        // index 第几项
        insideInput(type, index) {
            this.data.push({ type: '', firstLable: '', firstValue: '', secondLable: '', secondValue: '', isShowSecond: true, nest:''});
            this.data[index].nest = type;
        },
        // 确定选择
        confirmContent() {
            // 具有嵌套
            // 从上往下遍历拼凑数据，遍历嵌套的部分
            for (let i = this.data.length - 1; i > 0; i--) {
                let nest = this.data[i - 1].nest;
                let type = this.data[i].type; // 公式类型
                let firstValue = this.data[i].firstValue;
                let secondValue = this.data[i].isShowSecond ? this.data[i].secondValue : '';
                this.data[i - 1][nest] = this.getValue(type, firstValue, secondValue)
            }
            let nest = this.data[0].nest;
            let type = this.data[0].type; // 公式类型
            let firstValue = this.data[0].firstValue;
            let secondValue = this.data[0].isShowSecond ? this.data[0].secondValue : '';
            // this.data[0][nest] = this.getValue(type, firstValue, secondValue)
            
            this.currentString = this.getValue(type, firstValue, secondValue);
            console.log('data', this.data);
            this.content += `$${this.currentString}$`;
            this.dialogClose();
        },
        // 获取值
        getValue(type, firstValue, secondValue) {
            switch(type) {
                case '\\frac': // 分数
                    return `${type}{${firstValue}}{${secondValue}}`;
                    break;
                case '\\sqrt': // 开方
                    return `${type}[${firstValue}]{${secondValue}}`;
                    console.log('开方', this.data[i - 1][nest]);

                    break;
                case '^\\circ': // 角度
                    return `${firstValue}${type}`;
                    break;
                case '\\vert': // 绝对值
                    return `${type}${firstValue}${type}`;
                    break;
                default: 
                    return `{${firstValue}}${type}{${secondValue}}`;
                    break;
            }
        },
        dialogClose() {
            this.dialogVisible = false;
            this.currentString = '';
            this.data = [{type: '', firstLable: '', firstValue: '', secondLable: '', secondValue: '', isShowSecond: true, nest:''}];
        },
        // 刷新数据
        referHTML() {
            this.$nextTick(() => {
                window.MathJax && window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementsByClassName('review-content')],function(){
                    //to do something   公式重新渲染完成后执行这个回调函数
                });
            })
        },
        reset() {
            this.content = '';
        },
        // 生成 word
        createWord() {
           
            this.$axios({
                method: "post",
                //headers: { "content-type": "application/x-www-form-urlencoded" },//局部更改
                url: "http://192.168.0.225:3000/mathjax",
                type: 'json',
                params: {
                    'mathString': this.content
                }
            }).then(res => {
                this.downHref = 'http://192.168.0.225:3000' + res.data.url;
                document.getElementById('download').click();
            });
        },

        // ------------------------------------语文---------------------------------
        // 获取拼音数据
        getPinyin(value) {
            let pinyin = value.pinyin;
            let word = value.word;
            this.content += `<div class='chinese'>
                <span class='pinyin'>${pinyin}</span>
                <span class='word'>${word}
                    <span class='border-dashed-across'></span>
                    <span class='border-dashed-vertical'></span>
                </span>
                
            </div>`
        }
    },
}
</script>
<style lang="scss">
    @font-face { 
        font-family: KT; /*这里是说明调用来的字体名字*/ 
        src: url('../assets/font/hanyiKaiTi.ttf'); /*这里是字体文件路径*/ 
    }
    .math-edit {
        .tools-bar {
            width: 100%;
            min-height: 30px;
            border-bottom: 1px solid #DCDFE6;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            margin: 20px 0;
            >div {
                padding: 2px 10px;
                margin: 10px;
                text-align: center;
                border: 1px solid #EBEEF5;
                color: #409EFF;
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
            }
        }
        .math-content {
            margin-top: 20px;
            font-size: 18px;
            textarea {
                min-height: 200px !important;
            }
        }
        .review {
            .review-content {
                font-size: 18px;
                padding: 10px 20px;
                display: flex;

            }
            .chinese {
                width: 70px;
                height: 100px;
                background: #e1e1e1;
                margin: 0 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                
                span.pinyin {
                    width: 100%;
                    height: 30px;
                    text-align: center;
                    border: 1px solid #999;
                    border-bottom: none;
                    user-select: none;
                }
                span.word {
                    width: 100%;
                    height: 70px;
                    line-height: 70px;
                    background: #fff;
                    color: #333;
                    font-size: 52px;
                    text-align: center;
                    border: 1px solid #C75252;
                    font-family: KT !important;
                    user-select: none;
                    position: relative;
                    // 横线
                
                    .border-dashed-across {
                        display: inline-block;
                        width: 100%;
                        height: 1px;
                        border-top: 1px dashed #C75252;
                        position: absolute;
                        top: 50%;
                        left: 0;
                    }
                    // 竖线
                    .border-dashed-vertical {
                        display: inline-block;
                        width: 1px;
                        height: 70px;
                        border-left: 1px dashed #C75252;
                        position: absolute;
                        top: 0;
                        left: 50%;
                    }
                }
            }
        }
        
        .el-form-item__content {
            display: flex;
            justify-content: space-between;
            .el-input {
                width: 60%;
            }
        }
    }

    /* MathJax v2.7.5 from 'cdnjs.cloudflare.com' */
    .mjx-chtml {
        outline: 0;
    }
    .MJXc-display {
        overflow-x: auto;
        overflow-y: hidden;
    }
    
</style>