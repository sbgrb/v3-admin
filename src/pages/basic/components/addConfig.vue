<script setup lang="ts">
import type { FormInstance } from "element-plus"
import type { configForm } from "@/pages/basic/api/type.ts"
import { ref } from "vue"
import { updateConfigTableDataApi } from "@/pages/basic/api"

const emit = defineEmits(["refresh"])
const dialogVisible = ref(false)
const urls = inject("urls") as Record<string, { add: string, edit: string }>
const name = inject("name") as Ref<string>
const urlsConfig = urls[name.value]
const reactiveForm = reactive<configForm>({
  sort: 0,
  name: ""
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive({
  sort: [
    { required: true, message: "请输入", trigger: "blur" }
  ],
  name: [
    { required: true, message: "请输入", trigger: "blur" }
  ]
})

async function submit() {
  ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      const url = reactiveForm.id ? urlsConfig.edit : urlsConfig.add
      updateConfigTableDataApi(url, reactiveForm).then((data) => {
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

function init(row: configForm) {
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
          <el-form-item label="排序" prop="sort">
            <el-input v-model.number="reactiveForm.sort" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="名称" prop="name">
            <el-input v-model="reactiveForm.name" />
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
