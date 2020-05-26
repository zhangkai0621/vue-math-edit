<!--
 * @Description: 拼音编辑
 * @Author: zhangkai
 * @Date: 2020-04-20 08:58:52
 * @LastEditTime: 2020-05-17 14:18:03
 * @LastEditors: zhangkai
 -->
<!--
    @Description: 拼音列表
    @author Zhang kai
    @date 2019/7/6
-->
<template>
    <div>
        <el-row class="input" type="flex" align="center">
            <el-col :span="2">当前拼音：</el-col>
            <el-col :span="8"><el-input v-model="inputValue"></el-input></el-col>
        </el-row>
        <table class="sel-table">
            <colgroup>
                <col width="5">
                <col width="2" v-for="(item, index) in 25" :key="index">
            </colgroup>
            <tbody>
                <tr>
                    <td>声母</td>
                    <td class="tab-con" v-for="(item, index) in oneRow" :key="index" @click="getPhonetic(item)">{{item}}</td>
                </tr>
                <tr>
                    <td rowspan="6">韵母</td>
                    <td class="tab-con" v-for="(item, index) in twoRow" :key="index" @click="getPhonetic(item)">{{item}}</td>
                </tr>
                <tr>
                    <td class="tab-con" v-for="(item, index) in threeRow" :key="index" @click="getPhonetic(item)">{{item}}</td>
                </tr>
                <tr>
                    <td class="tab-con" v-for="(item, index) in fourRow" :key="index" @click="getPhonetic(item)">{{item}}</td>
                </tr>
                <tr>
                    <td class="tab-con" v-for="(item, index) in fiveRow" :key="index" @click="getPhonetic(item)">{{item}}</td>
                </tr>
                <tr>
                    <td class="tab-con" v-for="(item, index) in sixRow" :key="index" @click="getPhonetic(item)">{{item}}</td>
                </tr>
                <tr>
                    <td class="tab-con" v-for="(item, index) in sevenRow" :key="index" @click="getPhonetic(item)">{{item}}</td>
                </tr>
            </tbody>
        </table>
        <el-row type="flex" align="middle">
            <!-- <el-col :span="3">当前拼音：</el-col>
            <el-col :span="8">
                {{info}}
            </el-col> -->
            <el-col :span="24">
                <el-button type="primary" size="small" @click="submitData">确认选择</el-button>
                <el-button type="info" plain size="small" @click="resetInfo">重置拼音</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        name:'pinyinTable',
        props: {
            focusList: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            isPinYinTableShow: { // 表格是否显示
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                // 声母
                oneRow: [
                    'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's', 'y', 'w'
                ],
                // 韵母
                twoRow: [
                    'ā', 'á', 'ǎ', 'à', 'a', 'ō', 'ó', 'ǒ', 'ò', 'o',  'ē', 'é', 'ě', 'è', 'e', 'ī', 'í', 'ǐ', 'ì', 'i',
                ],
                threeRow: [
                    'ū', 'ú', 'ǔ', 'ù', 'u', 'ǖ', 'ǘ', 'ǚ', 'ǜ', 'ü', 'āi', 'ái', 'ǎi', 'ài', 'ai', 'ēi', 'éi', 'ěi', 'èi', 'ei',
                ],
                fourRow: [
                    'ūi', 'úi', 'ǔi', 'ùi', 'ui', 'āo', 'áo', 'ǎo', 'ào', 'ao', 'ōu', 'óu', 'ǒu', 'òu', 'ou', 'iū', 'iú', 'iǔ', 'iù', 'iu',
                ],
                fiveRow: [
                    'iē', 'ié', 'iě', 'iè', 'ie', 'uē', 'ué', 'uě', 'uè', 'ue', 'ēr', 'ér', 'ěr', 'èr', 'er', 'ān', 'án', 'ǎn', 'àn', 'an',
                ],
                sixRow: [
                    'āng', 'áng', 'ǎng', 'àng', 'ang', 'ēng', 'éng', 'ěng', 'èng', 'eng', 'ēn', 'én', 'ěn', 'èn', 'en', 'īn', 'ín', 'ǐn', 'ìn', 'in',
                ],
                sevenRow: [
                    'īng', 'íng', 'ǐng', 'ìng', 'ing', 'ōng', 'óng', 'ǒng', 'òng', 'ong',  'ǖn', 'ǘn', 'ǚn', 'ǜn', 'ün', 'ūn', 'ún', 'ǔn', 'ùn', 'un',
                ],
                inputValue: '', // 输入的拼音
            }
        },
        watch: {
            isPinYinTableShow(val) {
                if (this.focusList.content) {
                    // 修改时拼音
                    this.inputValue = this.focusList.content;
                }
            },
        },
        methods: {
            getPhonetic(item) {
                this.inputValue += item;
            },
            // 确认选择
            submitData() {
                if (this.inputValue.length) {
                    const content = this.inputValue;
                    this.$emit('getPinyin', content);
                }else {
                    this.$message.error('请选择拼音！')
                }
                this.inputValue = '';
            },
            // 重置拼音
            resetInfo() {
                this.inputValue = '';
            }
        },
        created() {
            if (this.focusList.content) {
                this.inputValue = this.focusList.content;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .sel-table{
        table-layout: fixed;
        border-collapse: collapse;
        color: #333;
        text-align: center;
        border: 1px solid #d8d8d8;
        width: 60vw;
        margin-bottom: 3vh;
    }
    .sel-table td{
        height: 8vh;
        font-size: 16px;
        border: 1px solid #d8d8d8;
    }
    .sel-table td.tab-con{
        cursor: pointer;
    }
    .sel-table td.tab-con:hover{
        background: #409EFF;
        color: #fff;
    }
    .el-row--flex {
        flex-wrap: wrap;
    }
    .el-col-24 {
         margin: 2vh 0;
     }
    .el-col-8 {
        height: 4vh;
        font-size: 20px;
    }
    .el-input__inner {
        font-weight: bold;
    }
    .input {
        margin-bottom: 20px;
        .el-col-2 {
            line-height: 3;
        }
    }

</style>

