import { Emit } from 'vue-property-decorator';
<template>
    <div class="tools-bar">
        <div v-for="(item, index) in toolsList" :key="index"  @click="selectTools(item)">{{item.name}}</div>
    </div>
</template>

<script>
export default {
    data (){
        return {
            toolsList: [
                { type: 'math', name: '表达式' },
                { type: '\\frac', name: '分数', firstLable: '分子', secondLable: '分母' },
                { type: '\\sqrt', name: '根号', firstLable: '底数', secondLable: '指数'},
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
    methods: {
        selectTools(info) {
            this.$emit('getItem', info);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
</style>
