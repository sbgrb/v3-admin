<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus"
import type { FontParams, Option, SectionForm, SectionParams } from "@/pages/basic/api/type.ts"
import { ref } from "vue"
import { createSectionDataApi, updateSectionTableDataApi } from "@/pages/basic/api"

const emit = defineEmits(["refresh"])
const dialogVisible = ref(false)
const reactiveForm = reactive<SectionParams>({
  kana: "",
  translate: "",
  categoryId: 1
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<SectionForm>>({
  kana: [
    { required: true, message: "请输入", trigger: "blur" }
  ],
  translate: [
    { required: true, message: "请输入", trigger: "blur" }
  ],
  categoryId: [
    { required: true, message: "请输入", trigger: "change" }
  ]
})
const options = inject("sectionOptions") as Option[]
async function submit() {
  ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      const requestApi = reactiveForm.id ? updateSectionTableDataApi : createSectionDataApi
      requestApi(reactiveForm as SectionForm).then((data) => {
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
    width="500"
  >
    <el-form ref="ruleFormRef" :model="reactiveForm" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="日语" prop="kana">
            <el-input v-model="reactiveForm.kana" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="翻译" prop="translate">
            <el-input v-model="reactiveForm.translate" />
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
