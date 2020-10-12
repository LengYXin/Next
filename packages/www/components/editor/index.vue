<template>
  <div class="quillWrapper">
    <!-- <slot name="toolbar"></slot> -->
    <div :id="id" ref="quillContainer"></div>
    <!-- <input
      v-if="useCustomImageHandler"
      id="file-upload"
      ref="fileInput"
      type="file"
      accept="image/*"
      style="display:none;"
      @change="emitImageInfo($event)"
    />-->
    <toolbar
      @submit="onSubmit"
      :rules="rules"
      :buttonText="buttonText"
      :quill="quill"
    >
      <slot></slot>
      <template slot="submit">
        <slot name="submit"></slot>
      </template>
    </toolbar>
  </div>
</template>

<script>
// https://www.vue2editor.com/guide.html#installation
import Quill from "quill";
import defaultToolbar from "./helpers/default-toolbar";
import oldApi from "./helpers/old-api";
import mergeDeep from "./helpers/merge-deep";
import MarkdownShortcuts from "./helpers/markdown-shortcuts";
import lodash from "lodash";
import toolbar from "./toolbar.vue";
export default {
  components: { toolbar },
  name: "VueEditor",
  mixins: [oldApi],
  props: {
    buttonText: {
      type: String,
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
    id: {
      type: String,
      default: "quill-container",
    },
    placeholder: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
    },
    editorToolbar: {
      type: Array,
      default: () => [],
    },
    editorOptions: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    useCustomImageHandler: {
      type: Boolean,
      default: false,
    },
    useMarkdownShortcuts: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    quill: null,
  }),
  watch: {
    value(val) {
      if (val != this.quill.root.innerHTML && !this.quill.hasFocus()) {
        this.quill.root.innerHTML = val;
      }
    },
    disabled(status) {
      this.quill.enable(!status);
    },
  },
  mounted() {
    this.registerCustomModules(Quill);
    this.registerPrototypes();
    this.initializeEditor();
  },
  beforeDestroy() {
    this.quill = null;
    delete this.quill;
  },
  methods: {
    onSubmit(data) {
      this.$emit("submit", data);
    },
    initializeEditor() {
      this.setupQuillEditor();
      this.checkForCustomImageHandler();
      this.handleInitialContent();
      this.registerEditorEventListeners();
      this.$emit("ready", this.quill);
    },
    setupQuillEditor() {
      let editorConfig = {
        debug: false,
        modules: this.setModules(),
        theme: "snow",
        placeholder: this.placeholder ? this.placeholder : "",
        readOnly: this.disabled ? this.disabled : false,
      };
      this.prepareEditorConfig(editorConfig);
      this.quill = new Quill(this.$refs.quillContainer, editorConfig);
    },
    setModules() {
      let modules = {
        // LENG
        // toolbar: this.editorToolbar.length
        //   ? this.editorToolbar
        //   : defaultToolbar,
        toolbar: [],
        // 只能写文字
        clipboard: {
          matchers: [
            [
              Node.ELEMENT_NODE,
              (node, delta) => {
                if (
                  delta &&
                  delta.ops.some((item) => lodash.isObject(item.insert))
                ) {
                  return { ops: [] };
                }
                delta.ops = lodash.map(delta.ops, (item) => {
                  lodash.unset(item, "attributes");
                  return item;
                });
                return delta;
              },
            ],
          ],
        },
        // 只能写文字
      };
      if (this.useMarkdownShortcuts) {
        Quill.register("modules/markdownShortcuts", MarkdownShortcuts, true);
        modules["markdownShortcuts"] = {};
      }

      return modules;
    },
    prepareEditorConfig(editorConfig) {
      if (
        Object.keys(this.editorOptions).length > 0 &&
        this.editorOptions.constructor === Object
      ) {
        if (
          this.editorOptions.modules &&
          typeof this.editorOptions.modules.toolbar !== "undefined"
        ) {
          // We don't want to merge default toolbar with provided toolbar.
          delete editorConfig.modules.toolbar;
        }
        mergeDeep(editorConfig, this.editorOptions);
      }
    },
    registerPrototypes() {
      Quill.prototype.getHTML = function () {
        return this.container.querySelector(".ql-editor").innerHTML;
      };
      Quill.prototype.getWordCount = function () {
        return this.container.querySelector(".ql-editor").innerText.length;
      };
    },
    registerEditorEventListeners() {
      this.quill.on("text-change", this.handleTextChange);
      this.quill.on("selection-change", this.handleSelectionChange);
      this.listenForEditorEvent("text-change");
      this.listenForEditorEvent("selection-change");
      this.listenForEditorEvent("editor-change");
    },
    listenForEditorEvent(type) {
      this.quill.on(type, (...args) => {
        this.$emit(type, ...args);
      });
    },
    handleInitialContent() {
      if (this.value) this.quill.root.innerHTML = this.value; // Set initial editor content
    },
    handleSelectionChange(range, oldRange) {
      if (!range && oldRange) this.$emit("blur", this.quill);
      else if (range && !oldRange) this.$emit("focus", this.quill);
    },
    handleTextChange(delta, oldContents) {
      if (!this.quill) {
        return;
      }
      let editorContent =
        this.quill.getHTML() === "<p><br></p>" ? "" : this.quill.getHTML();
      this.$emit("input", editorContent);
      if (this.useCustomImageHandler)
        this.handleImageRemoved(delta, oldContents);
    },
    handleImageRemoved(delta, oldContents) {
      const currrentContents = this.quill.getContents();
      const deletedContents = currrentContents.diff(oldContents);
      const operations = deletedContents.ops;
      operations.map((operation) => {
        if (operation.insert && operation.insert.hasOwnProperty("image")) {
          const { image } = operation.insert;
          this.$emit("image-removed", image);
        }
      });
    },
    checkForCustomImageHandler() {
      this.useCustomImageHandler === true ? this.setupCustomImageHandler() : "";
    },
    setupCustomImageHandler() {
      let toolbar = this.quill.getModule("toolbar");
      toolbar.addHandler("image", this.customImageHandler);
    },
    customImageHandler(image, callback) {
      this.$refs.fileInput.click();
    },
    emitImageInfo($event) {
      const resetUploader = function () {
        var uploader = document.getElementById("file-upload");
        uploader.value = "";
      };
      let file = $event.target.files[0];
      let Editor = this.quill;
      let range = Editor.getSelection();
      let cursorLocation = range.index;
      this.$emit("image-added", file, Editor, cursorLocation, resetUploader);
    },
  },
};
</script>

<style lang="less">
.ql-editor {
  min-height: 100px;
  max-height: 500px;
  font-size: 16px;
  text-align: justify;
  word-break: break-all;
}

.ql-snow .ql-stroke.ql-thin,
.ql-snow .ql-thin {
  stroke-width: 1px !important;
}
.quillWrapper {
  animation: antFadeIn 0.3s;
}
.quillWrapper .ql-snow.ql-toolbar {
  // padding-top: 8px;
  // padding-bottom: 4px;
  // LENG
  // display: none;
  padding: 0;
  height: 1px;
  overflow: hidden;
  border-bottom: none;
}
/* .quillWrapper .ql-snow.ql-toolbar button {
  margin: 1px 4px;
} */
.quillWrapper .ql-snow.ql-toolbar .ql-formats {
  margin-bottom: 10px;
}

.ql-snow .ql-toolbar button svg,
.quillWrapper .ql-snow.ql-toolbar button svg {
  width: 22px;
  height: 22px;
}

.quillWrapper .ql-editor ul[data-checked="false"] > li::before,
.quillWrapper .ql-editor ul[data-checked="true"] > li::before {
  font-size: 1.35em;
  vertical-align: baseline;
  bottom: -0.065em;
  font-weight: 900;
  color: #222;
}

.quillWrapper .ql-snow .ql-stroke {
  stroke: rgba(63, 63, 63, 0.95);
  stroke-linecap: square;
  stroke-linejoin: initial;
  stroke-width: 1.7px;
}

.quillWrapper .ql-picker-label {
  font-size: 15px;
}

.quillWrapper .ql-snow .ql-active .ql-stroke {
  stroke-width: 2.25px;
}

.quillWrapper .ql-toolbar.ql-snow .ql-formats {
  vertical-align: top;
}

.ql-picker {
  &:not(.ql-background) {
    position: relative;
    top: 2px;
  }

  &.ql-color-picker {
    svg {
      width: 22px !important;
      height: 22px !important;
    }
  }
}

.quillWrapper {
  & .imageResizeActive {
    img {
      display: block;
      cursor: pointer;
    }

    & ~ div svg {
      cursor: pointer;
    }
  }
  svg {
    width: 15px !important;
    height: 15px !important;
    // fill: rgba(65, 65, 65, 0.9);
  }
}

button.ql-active svg {
  fill: white;
  fill: rgba(97, 97, 97, 0.98) !important;
}

.quillWrapper .ql-snow.ql-toolbar button {
  margin: 1px 2px;
  display: flex;
  padding: 3px;
  justify-content: center;
  align-items: center;
}

.ql-snow.ql-toolbar button,
.ql-snow .ql-toolbar button {
  display: flex;
  padding: 3px;
  margin: 1px 3px !important;
  justify-content: center;
  width: 30px !important;
  height: 30px !important;
  border-radius: 3px;
}

.ql-toolbar button.ql-active {
  background: rgba(85, 85, 97, 0.9) !important;
  background: rgba(203, 201, 201, 0.9) !important;
}

.quillWrapper .ql-toolbar {
  padding-bottom: 4px;
  display: flex;
  align-items: center;
  flex-flow: row wrap;
}
.quillWrapper .ql-editor.ql-blank::before {
  color: rgba(0, 0, 0, 0.3);
  font-style: normal;
}
</style>
