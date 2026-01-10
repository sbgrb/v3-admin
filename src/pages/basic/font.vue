<script setup lang="ts">
import type { FontForm, FontParams } from "@/pages/basic/api/type.ts"
import { ElMessageBox } from "element-plus"
import { ref } from "vue"
import { deleteTableDataApi, getFontTableDataApi } from "@/pages/basic/api"
import AddFont from "./components/addFont.vue"

interface BasicType extends HTMLElement {
  init: (row: FontParams) => void
}

const dataForm = reactive({
  kanjiChar: ""
})
const pageTotal = ref<number>(0)
const pageNum = ref<number>(1)
const pageSize = ref<number>(10)
const detailModal = ref<BasicType | null>(null)
const tableData = ref([])
function getMainList() {
  const params = {
    ...dataForm,
    pageSize: pageSize.value,
    pageNum: pageNum.value
  }
  getFontTableDataApi(params).then((data) => {
    if (data.code === 200) {
      const { records, total } = data.data
      tableData.value = records as []
      pageTotal.value = total
    } else {
      ElMessage.error(data.msg)
    }
  })
}
function upload() {

}

function searchReset() {
  pageNum.value = 1
  pageSize.value = 10
  getMainList()
}

function addForm(row: FontParams) {
  detailModal.value!.init(row)
}

function handleDelete(row: FontForm) {
  ElMessageBox.confirm(
    "确认删除?",
    "Warning",
    {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning"
    }
  ).then(() => {
    deleteTableDataApi(row.id).then((data) => {
      if (data.code === 200) {
        ElMessage.success(data.msg)
      } else {
        ElMessage.error(data.msg)
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
        <el-form-item label="汉字">
          <el-input v-model="dataForm.kanjiChar" />
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
    <el-button type="primary" @click="addForm({})">
      新增
    </el-button>
    <el-button type="primary" @click="upload">
      导入
    </el-button>
  </div>
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column type="index" />
    <el-table-column label="汉字" prop="kanjiChar" width="120" align="center" />
    <el-table-column label="音读" prop="onyomi" width="120" align="center" />
    <el-table-column label="训读" prop="kunyomi" width="120" align="center" />
    <el-table-column label="含义" prop="meanings" width="120" align="center" />
    <el-table-column label="显示含义" prop="displayMeanings" align="center" />
    <el-table-column label="完整含义" prop="fullDisplayMeanings" align="center" />
    <el-table-column prop="address" label="操作" align="center" width="160">
      <template #default="scope">
        <el-button size="small" @click="addForm(scope.row)">
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
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      :total="pageTotal"
      :page-sizes="[10, 20, 30, 40]"
      @size-change="getMainList"
      @current-change="getMainList"
      background layout="prev, pager, next"
    />
  </div>
  <AddFont ref="detailModal" @refer-list="getMainList" />

</template>

<style scoped lang="scss">
.btns {
  margin: 8px 0;
}

.pagination {
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
}
</style>
