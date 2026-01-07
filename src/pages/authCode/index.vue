<script setup lang="ts">
import { ElMessageBox } from "element-plus"
import { deleteGenerateApi, getCurrentUserApi } from "@/pages/authCode/api.ts"

const dataForm = reactive({
  userName: "",
  status: ""
})

interface UserInfo {
  userName: string
  id: number
}

const tableData = reactive([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
function getMainList() {
  getCurrentUserApi({ ...dataForm, pageSize: pageSize.value, pageNum: currentPage.value }).then((res) => {
    if (res.code === 200) {
      ElMessage.success(res.message)
      tableData.concat(res.data as [])
    } else {
      ElMessage.error(res.message)
    }
  })
}

function searchReset() {
  currentPage.value = 1
  pageSize.value = 10
  getMainList()
}

function handleDetail(row: UserInfo) {
  console.log(row)
}

function handleDelete(row: UserInfo) {
  ElMessageBox.confirm(
    "是否删除",
    "Confirm"
  ).then(() => {
    deleteGenerateApi(row.id).then((res) => {
      if (res.code === 200) {
        ElMessage.success(res.message)
        getMainList()
      } else {
        ElMessage.error(res.message)
      }
    })
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
  <div class="btns">
    <el-button type="primary" @click="handleDetail({})">
      生成邀请码
    </el-button>
  </div>
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column prop="date" label="日期" width="180" align="center" />
    <el-table-column prop="name" label="状态" width="180" align="center" />
    <el-table-column prop="address" label="操作" align="center">
      <template #default="scope">
        <el-button size="small" @click="handleDetail(scope.row)">
          编辑
        </el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
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
