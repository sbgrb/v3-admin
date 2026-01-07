<script setup lang="ts">
const emit = defineEmits(["refresh"])
const dialogVisible = ref(false)
const reactiveForm = reactive({
  title: ""
})

function subFinish() {
  emit("refresh")
}

function init() {
  console.log("hi")
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
    <el-form :model="reactiveForm" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="录入">
            <el-input v-model="reactiveForm.title" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
