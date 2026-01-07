<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus"
import type { BasicResponse, FontForm, FontParams } from "@/pages/basic/api/type.ts"
import { createFontDataApi } from "@/pages/basic/api"

const emit = defineEmits(["refresh"])
const dialogVisible = ref(false)
const reactiveForm = reactive<FontForm>({
  kana: "",
  kanji: "",
  wallerDefinition: ""
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<FontForm>>({
  kana: [
    { required: true, message: "请输入", trigger: "blur" }
  ],
  kanji: [
    { required: true, message: "请输入", trigger: "blur" }
  ],
  wallerDefinition: [
    { required: true, message: "请输入", trigger: "blur" }
  ]
})

async function submit() {
  ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      createFontDataApi(reactiveForm).then((data: BasicResponse) => {
        if (data.code === 200) {
          ElMessage.success(data.message)
          emit("refresh")
        } else {
          ElMessage.error(data.message)
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
    width="500"
  >
    <el-form ref="ruleFormRef" :model="reactiveForm" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="假名" prop="kana">
            <el-input v-model="reactiveForm.kana" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="汉字" prop="kanji">
            <el-input v-model="reactiveForm.kanji" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="定义" prop="wallerDefinition" :rules="[]">
            <el-input v-model="reactiveForm.wallerDefinition" />
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
