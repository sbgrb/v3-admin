<script setup lang="ts">
import { getCurrentUserApi } from "@/pages/user/api"

const dataForm = reactive({
  phone: ""
})
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// interface UserInfo {
//   userName: string
//   id: number
// }

const tableData = reactive([])

function getMainList() {
  getCurrentUserApi({ ...dataForm, pageSize: pageSize.value, pageNum: currentPage.value }).then((data) => {
    if (data.code === 200) {
      ElMessage.success(data.message)
      tableData.concat(data.data as [])
      total.value = data.total
    } else {
      ElMessage.error(data.message)
    }
  })
}

function searchReset() {
  pageSize.value = 1
  currentPage.value = 10
  getMainList()
}

onMounted(() => {
  getMainList()
})
</script>

<template>
  <el-form :model="dataForm" label-width="100px">
    <el-row>
      <el-col :span="6">
        <el-form-item label="手机号">
          <el-input v-model="dataForm.phone" />
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
    <el-table-column prop="date" label="Date" width="180" align="center" />
    <el-table-column prop="name" label="Name" width="180" align="center" />
    <el-table-column prop="address" label="Address" align="center" />
    <el-table-column prop="address" label="Address" align="center" />
  </el-table>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    :page-sizes="[10, 20, 30, 40]"
    @size-change="getMainList"
    @current-change="getMainList"
    background layout="prev, pager, next"
  />
</template>

<style scoped lang="scss">

</style>
