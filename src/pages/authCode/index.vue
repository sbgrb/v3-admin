<script setup lang="ts">
import type { authCodeLine, authCodeParams, authParams } from "@/pages/authCode/api/api.ts"
import { ElMessageBox } from "element-plus"
import { reactive, ref } from "vue"
import { deleteGenerateApi, getCurrentCodeApi } from "@/pages/authCode/api/api.ts"

import Detail from "./components/modal.vue"

const dataForm = reactive<authCodeParams>({})

interface BasicType extends HTMLElement {
  init: (row: authCodeParams) => void
}
const DetailModal = ref<BasicType | null>(null)
const tableData = reactive<authCodeLine[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
function getMainList() {
  getCurrentCodeApi({ ...dataForm, pageSize: pageSize.value, pageNum: currentPage.value }).then((res) => {
    if (res.code === 200) {
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

function handleDetail(row: authCodeParams) {
  DetailModal.value!.init(row)
}

function handleDelete(row: authParams) {
  ElMessageBox.confirm(
    "是否删除",
    "Confirm"
  ).then(() => {
    deleteGenerateApi(row.id as number).then((res) => {
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
        <el-form-item label="邀请码">
          <el-input v-model="dataForm.code" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="状态">
          <el-select v-model="dataForm.status">
            <el-option value="0" label="未使用" />
            <el-option value="1" label="已使用" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="使用人手机号">
          <el-input v-model="dataForm.useMemberPhone" />
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
    <el-table-column prop="code" label="邀请码" width="180" align="center" />
    <el-table-column prop="duration" label="有效期（天）" width="180" align="center" />
    <el-table-column prop="status" label="状态" width="180" align="center" />
    <el-table-column prop="useMemberPhone" label="使用用户" width="180" align="center" />
    <el-table-column prop="useTime" label="使用时间" width="180" align="center" />
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

  <Detail ref="DetailModal" @finish="getMainList" />
</template>

<style scoped lang="scss">
.btns {
  margin: 16px 0;
}
.pagination {
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
}
</style>
