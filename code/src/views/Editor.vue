<!--
 * @Description: 编辑器
 * @Author: zhangkai
 * @Date: 2020-04-20 09:01:28
 * @LastEditTime: 2020-05-26 16:42:03
 * @LastEditors: zhangkai
 -->
 <template>
  <div class="editor-container">
    <el-row>
      <el-col :span="12">
        <editorBtn
          @getKeyFromBtn="getKeyFromBtn"
          data-key="first"
          :content="form.first"
          @setReviewContent="setReviewContent"
        ></editorBtn>
        <quill-editor
          class="avue-crud-ueditor"
          v-model="form.first"
          ref="myQuillEditors"
          :options="editorOption"
        ></quill-editor>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <editorBtn
          @getKeyFromBtn="getKeyFromBtn"
          data-key="second"
          :content="form.second"
          @setReviewContent="setReviewContent"
        ></editorBtn>
        <quill-editor
          class="avue-crud-ueditor"
          v-model="form.second"
          ref="myQuillEditors"
          :options="editorOption"
        ></quill-editor>
      </el-col>
    </el-row>

    <editorDialog
      :editorVisiable="editorVisiable"
      :dialogKey="dialogKey"
      :content="reviewContent"
      @getContentFromEditor="getContentFromEditor"
    ></editorDialog>
  </div>
</template>
<script>
import editorBtn from "./mathEditor/editorBtn";
import editorDialog from "./mathEditor/editorDialog";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image", "video"],
  ["clean"] // remove formatting button
];

export default {
  components: {
    editorBtn,
    editorDialog
  },
  data() {
    return {
      editorVisiable: false, // 是否显示编辑弹窗
      dialogKey: "pinyin", // 编辑弹窗的类型
      dataKey: "", // 数据的关键字
      reviewContent: "",
      form: {
        first: "",
        second: ""
      },
      editorOption: {
        placeholder: "请输入内容",
        modules: {
          toolbar: {
            container: toolbarOptions
          }
        }
      }
    };
  },
  methods: {
    // 从子编辑器获取内容
    getContentFromEditor(content) {
      this.form[this.dataKey] += content;
      this.editorVisiable = false;
    },
    getKeyFromBtn(obj) {
      if (obj.dialogKey == "review" && !this.reviewContent.length) {
        this.$message.error("无内容可预览");
        return;
      }
      this.dialogKey = obj.dialogKey;
      this.dataKey = obj.dataKey; // 用于拼音、部首、公式赋值
      this.editorVisiable = true;
    },
    // 设置预览的值
    setReviewContent(content) {
      this.reviewContent = content;
    }
  }
};
</script>
 
<style lang="scss" >
.el-row {
    margin: 50px 0;
    .ql-container.ql-snow {
        min-height: 200px;
    }
}

</style>
 