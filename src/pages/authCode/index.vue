<script setup lang="ts">
import { ElMessageBox } from "element-plus"

const dataForm = reactive({
  userName: "",
  status: ""
})

interface UserInfo {
  userName: string
  id: number
}

const tableData = reactive([])

function getMainList() {

}

function searchReset() {

}

function handleEdit(row: UserInfo) {
  console.log(row)
}

function handleDelete(row: UserInfo) {
  ElMessageBox.confirm(
    "是否删除",
    "Confirm"
  ).then(() => {
    console.log(row)
  })
}

onMounted(() => {
  getMainList()
})
</script>

<template>
  <el-form :model="dataForm" label-width="100px">
    <el-row>
      <el-col :span="6">
        <el-form-item label="用户名">
          <el-input v-model="dataForm.userName" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="状态">
          <el-input v-model="dataForm.status" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item class="hiddenButton">
          <el-button @click="getMainList()" type="primary" style="width: 75px">
            查询
          </el-button>
          <el-button @click="searchReset()" type="warning" style="width: 75px">
            重置
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column prop="date" label="日期" width="180" align="center" />
    <el-table-column prop="name" label="状态" width="180" align="center" />
    <el-table-column prop="address" label="Address" align="center" />
    <el-table-column prop="address" label="Address" align="center" />
    <el-table-column prop="address" label="操作" align="center">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">
          编辑
        </el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss">

</style>
