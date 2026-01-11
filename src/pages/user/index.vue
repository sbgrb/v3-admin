<script setup lang="ts">
import { reactive, ref } from "vue"
import { getCurrentUserApi } from "@/pages/user/api"

const dataForm = reactive({
  phone: ""
})
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const tableData = ref([])

function getMainList() {
  getCurrentUserApi({ ...dataForm, pageSize: pageSize.value, pageNum: currentPage.value }).then((data) => {
    if (data.code === 200) {
      tableData.value = data.data.records as []
      total.value = data.data.total
    } else {
      ElMessage.error(data.msg)
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
    <el-table-column prop="phone" label="手机号" align="center" />
    <el-table-column prop="expirationTime" label="到期时间" align="center" />
  </el-table>
  <div class="pagination">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="total"
      :page-sizes="[10, 20, 30, 40]"
      @size-change="getMainList"
      @current-change="getMainList"
      background layout="prev, pager, next"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
