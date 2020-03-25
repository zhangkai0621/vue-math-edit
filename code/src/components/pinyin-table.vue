import { log } from 'util';
<!--
    @Description: 拼音列表
    @author Zhang kai
    @date 2019/7/6
-->
<template>
    <div>
        <el-row class="input" type="flex" align="center">
            <el-col :span="4">当前拼音：</el-col>
            <el-col :span="8"><el-input v-model="pinyin"></el-input></el-col>
        </el-row>
        <el-row class="input" type="flex" align="center">
            <el-col :span="4">当前汉字：</el-col>
            <el-col :span="8"><el-input v-model="word"></el-input></el-col>
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
                pinyin: '', // 输入的拼音
                word: '', // 汉字           
            }
        },
        watch: {
            
        },
        methods: {
            getPhonetic(item) {
                this.pinyin += item;
            },
            // 确认选择
            submitData() {
                if (this.pinyin.length && this.word.length) {
                    if (this.word.length > 1) { this.$message.error('只能输入一个汉字'); return; }
                    this.$emit('getPinyin', {'pinyin':this.pinyin, 'word': this.word});
                }else {
                    this.$message.error('请输入拼音或汉字！')
                }
                this.pinyin = '';
                this.word = '';
            },
            // 重置拼音
            resetInfo() {
                this.pinyin = '';
            }
        },
        created() {
            
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
