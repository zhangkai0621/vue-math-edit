<!--
 * @Description: 数学公式编辑器
 * @Author: zhangkai
 * @Date: 2020-03-13 14:27:26
 * @LastEditTime: 2020-03-20 17:32:18
 * @LastEditors: zhangkai
 -->
<template>
    <div class="math-edit">
        <el-row>
            <el-col :span="12">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="数学公式" name="first">
                    <div class="tools-bar">
                        <div v-for="(item, index) in toolsList" :key="index"  @click="selectTools(item.type)">{{item.name}}</div>
                    </div>
                    <el-input type="textarea" v-model="content" class="math-content" @keyup.native="referHTML"></el-input>
                </el-tab-pane>
                <el-tab-pane label="语文拼音" name="second">语文拼音</el-tab-pane>
            </el-tabs>
            </el-col>
            <el-col :span="12" class="review">
                预览区
                <div class="review-content" v-html="content"></div>
            </el-col>
        </el-row>
        <button @click="referHTML">刷新</button>
        <button @click="reset">重置</button>



        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item :label="form.firstLable">
                    <el-input v-model="form.firstValue"></el-input>
                </el-form-item>
                <el-form-item :label="form.secondLable">
                    <el-input v-model="form.secondValue"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="confirmContent">确定</el-button>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data () {
        return {
            activeName: 'first',
            
            dialogVisible: false,
            content: '',
            form: {
                firstLable: '',
                firstValue: '',
                secondLable: '',
                secondValue: '',
            }, 
            currentContent: '', // 当前处理的数据
            currentKey: '', // 当前关键字
            type: 'fs', // fs 分数，gh 根号
            toolsList: [
                { type: 'math', name: '表达式' },
                { type: '\\frac', name: '分数' },
                { type: '\\sqrt', name: '根号' },
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
                { type: '^', name: '平方' },
                { type: '\\vert', name: '绝对值' },
                { type: '^\\circ', name: '角度' },
                { type: '\\pi', name: 'π' },
                { type: 'br', name: '换行' },
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
        },
        selectTools(type) {
            
            switch(type) {
                case 'math': 
                    this.content += ` $  $ `;
                    break;
                case '\\frac':  // 分号
                    this.dialogVisible = true;
                    this.form.firstLable = '分子';
                    this.form.secondLable = '分母';
                    this.type = 'fs';
                    this.currentKey = type;
                    break;
                case '\\sqrt': // 根号
                    this.dialogVisible = true;
                    this.form.firstLable = '开方数';
                    this.form.secondLable = '被开方数';
                    this.type = 'gh';
                    this.currentKey = type;
                    break;
                case '^': // 平方
                    this.dialogVisible = true;
                    this.form.firstLable = '底数';
                    this.form.secondLable = '指数';
                    this.type = 'pf';
                    this.currentKey = type;
                    break;
                case '\\vert': // 绝对值

                    this.content += ` $ \\vert{2}\\vert $ `;
                    break;
                case 'br': // 换行
                    this.content += `<br>`;
                    break;
                case '^\\circ': // 角度
                    this.dialogVisible = true;
                    this.form.firstLable = '角度';
                    this.type = 'jd';
                    this.currentKey = type;
                    break;
                default : // 默认
                    this.content += ` $${type}$ `
                    break;
            }
        },
        // 确定选择
        confirmContent() {
            switch (this.type) {
                case 'fs': 
                    this.currentContent = `$${this.currentKey}{${this.form.firstValue}}{${this.form.secondValue}}$`;
                    break;
                case 'gh': 
                    this.form.firstValue = this.form.firstValue == 2 ? '' : this.form.firstValue;
                    this.currentContent = `$${this.currentKey}[${this.form.firstValue}]{${this.form.secondValue}}$`;
                    break;
                case 'pf': 
                    this.currentContent = `$ {${this.form.firstValue}}${this.currentKey}{${this.form.secondValue}}$`;
                    break;
                case 'jd': 
                    this.currentContent = `$ {${this.form.firstValue}}${this.currentKey}$`;
            }
            this.content += this.currentContent;
            this.currentContent = '';
            this.form.firstValue = '';
            this.form.secondValue = '';
            this.dialogVisible = false;
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
        
    },
}
</script>
<style lang="scss" scoped>
    .math-edit {
        .tools-bar {
            width: 100%;
            min-height: 30px;
            border-bottom: 1px solid #DCDFE6;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
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
        }
        .review-content {
            font-size: 18px;
            padding: 10px 20px;
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