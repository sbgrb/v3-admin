<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus"
import type { BasicResponse, FontForm, FontParams, Option, OptionalKey } from "@/pages/basic/api/type.ts"
import { createFontDataApi, updateTableDataApi } from "@/pages/basic/api"

const emit = defineEmits(["refresh"])
const dialogVisible = ref(false)
const reactiveForm = reactive<OptionalKey<FontForm, "id">>({
  kanjiChar: "",
  onyomi: "",
  kunyomi: "",
  displayMeanings: "",
  fullDisplayMeanings: "",
  meanings: "",
  categoryId: 1
})
const options = inject("fontOptions") as Option[]
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<FontForm>>({
  kanjiChar: [
    { required: true, message: "请输入", trigger: "blur" }
  ],
  onyomi: [
    { required: true, message: "请输入", trigger: "blur" }
  ],
  kunyomi: [
    { required: true, message: "请输入", trigger: "blur" }
  ],
  displayMeanings: [
    { required: true, message: "请输入", trigger: "blur" }
  ],
  fullDisplayMeanings: [
    { required: true, message: "请输入", trigger: "blur" }
  ],
  meanings: [
    { required: true, message: "请输入", trigger: "blur" }
  ],
  categoryId: [
    { required: true, message: "请输入", trigger: "change" }
  ]
})

async function submit() {
  ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      const requestApi = reactiveForm.id != null ? updateTableDataApi : createFontDataApi
      requestApi(reactiveForm as FontForm).then((data: BasicResponse) => {
        if (data.code === 200) {
          ElMessage.success(data.msg)
          dialogVisible.value = false
          emit("refresh")
        } else {
          ElMessage.error(data.msg)
        }
      })
    }
  })
}

function init(row: FontParams) {
  Object.assign(reactiveForm, row)
  dialogVisible.value = true
}

defineExpose({
  init
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    title="新增"
    width="600"
  >
    <el-form ref="ruleFormRef" :model="reactiveForm" :rules="rules" label-width="140px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="汉字" prop="kanjiChar">
            <el-input v-model="reactiveForm.kanjiChar" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="音读" prop="onyomi">
            <el-input v-model="reactiveForm.onyomi" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="训读" prop="kunyomi">
            <el-input v-model="reactiveForm.kunyomi" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="显示含义" prop="displayMeanings">
            <el-input v-model="reactiveForm.displayMeanings" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="完整显示含义" prop="fullDisplayMeanings">
            <el-input v-model="reactiveForm.fullDisplayMeanings" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="含义" prop="meanings">
            <el-input v-model="reactiveForm.meanings" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="分类" prop="categoryId">
            <el-select v-model="reactiveForm.categoryId" placeholder="请选择">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="submit">
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
