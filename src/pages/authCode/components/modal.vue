<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus"
import type { addForm, authForm, authParams } from "../api/api.ts"
import { generateApi } from "../api/api.ts"

const emit = defineEmits(["refresh"])
const dialogVisible = ref(false)

const reactiveForm = reactive<addForm>({
  count: undefined,
  duration: undefined,
  other: undefined
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<authForm>>({
  count: [
    { required: true, message: "请输入", trigger: "blur" }
  ],
  duration: [
    { required: true, message: "请输入", trigger: "blur" }
  ]
})
const props = { value: "duration", label: "name" }
const options = [
  {
    duration: -1,
    name: "永久"
  },
  {
    duration: 3,
    name: "3天"
  },
  {
    duration: 7,
    name: "7天"
  },
  {
    duration: 30,
    name: "30天"
  },
  {
    duration: 0,
    name: "其他"
  }
]

function submit() {
  ruleFormRef.value?.validate((valid) => {
    if (reactiveForm.duration === 0 && !reactiveForm.other) {
      ElMessage.warning("请输入有效时间")
      return
    }
    if (valid) {
      generateApi(reactiveForm).then((data) => {
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

function init(row: authParams | null) {
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
          <el-form-item label="数量" prop="count">
            <el-input-number v-model="reactiveForm.count" :min="1" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="期限" prop="duration">
            <el-radio-group v-model="reactiveForm.duration" :options="options" :props="props" />
            <el-input-number v-if="reactiveForm.duration === 0" v-model="reactiveForm.other" :min="1" />
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
