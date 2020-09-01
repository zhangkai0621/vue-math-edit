### 一，使用方式
1. 在 code 目录下，使用 `npm install` 安装依赖
2. 在 code 目录下，使用`npm run serve`启动项目
3. 项目默认监听 8080 端口

### 二，功能点：
1. 实现`数学符号`以及其他`数学公式`的展示，例如分数、根式、积分等等。
2. 拼音按钮增加`拼音`的选择输入。

### 三，相关技术点：
1. 主框架：[Vue](https://cn.vuejs.org/v2/guide/) + [Element UI](https://element.eleme.cn/#/zh-CN)
2. 编辑器：百度的[UEditor](https://github.com/fex-team/ueditor)；
3. 数学公式刷新预览框架：[MathJax](https://github.com/mathjax/MathJax-src)
4. MathJax 相关语法参考：[点击查看](https://www.qianwenma.cn/2018/05/17/mathjax-yu-fa-can-kao/)

### 四，项目地址及目录结构
1. 地址：[github](https://github.com/zhangkai0621/vue-math-edit/tree/master/code)
2. 目录结构
```
- public
  - js // javascript 存放目录
  - ueditor // UEditor 源码文件
    - ueditor.config.js // 编辑器配置文件
    - kityformula-plugin // 数学公式相关源码
  - index.html 
- src
  - assets // 资源文件
  - components 
    - pinyinTable.vue // 拼音表格组件
  - router 
  - views
    - UEditor.vue // 编辑器页面
  - App.vue // 根 vue 页面
- package.json
```

### 五，一些配置的点
1. `public/index.html`文件中引入相关 js 文件，其中配置 UEditor 和 MaehJax
```
<script type="text/javascript">
    window.onload = () => {
        var ue = UE.getEditor('UEditor'); // 加载编辑器容器 <div id="UEditor"></div>
        if (MathJax) {
            // Mathjax 配置项
            MathJax.Hub.Config({
                jax: ["input/TeX", "output/HTML-CSS", "output/PreviewHTML"], //输出格式配置：latex 解析为 DOM结构
                tex2jax: {
                    inlineMath: [
                        ['$', '$']
                    ],
                    displayMath: [
                        ['$$', '$$'],
                        ["\\[", "\\]"]
                    ]
                },
                "HTML-CSS": {
                    showMathMenu: false, // 隐藏右键菜单展示
                    linebreaks: {
                        automatic: true, //超长公式换行处理（默认是false不换行）
                        width: "80%" //设置换行的点，默认是遇到等号=换行
                    }
                },
            });
        }
    }
</script>
```

2. 如果需要编辑器的更多工具，在 `public/ueditor/ueditor.config.js` 中查找`toolbars`进行相关配置。

### 六，前端渲染公式
1. 只需要将编辑器中的内容保存至数据库，前端引入 `mathjax` 或者 `laTeX` 语法渲染公式即可。
2. 不建议将编辑器内容的 html 结构存库，前端直接渲染相关 html 。数据量过大。

