<script setup lang="ts">
import type { configForm } from "@/pages/basic/api/type.ts"
import { ElMessageBox } from "element-plus"
import { ref } from "vue"
import { deleteConfigTableDataApi, getConfigTableDataApi } from "@/pages/basic/api"
import AddConfig from "./addConfig.vue"

const props = defineProps(["name", "urls"])
const router = useRouter()
interface queryFrom {
  categoryName?: string
  keyword?: string
}
interface ConfigModal extends HTMLElement {
  init: (row: configForm) => void
}
const addConfigModal = ref<ConfigModal | null>(null)
const dataForm = reactive<queryFrom>({
  categoryName: "",
  keyword: ""
})
const pageTotal = ref(0)
const pageSize = ref(10)
const pageNum = ref(1)
const tableData = ref<any>([])

function getMainList() {
  const requestUrl = props.urls.list
  if (!requestUrl) return
  const params = {
    ...dataForm,
    pageNum: pageNum.value,
    pageSize: pageSize.value
  }
  getConfigTableDataApi(requestUrl, params).then((res) => {
    if (res.code === 200) {
      tableData.value = res.data.records
    } else {
      ElMessage.error(res.msg)
    }
  })
}

function searchReset() {
  pageNum.value = 1
  pageSize.value = 10
  dataForm.categoryName = ""
  dataForm.keyword = ""
  getMainList()
}

function addForm(row: configForm = { sort: 0, name: "" }) {
  addConfigModal.value?.init(row)
}
function handleDelete(id: number) {
  ElMessageBox.confirm(
    "确认删除?",
    "Warning",
    {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning"
    }
  ).then(() => {
    deleteConfigTableDataApi(props.urls.del, id).then((res) => {
      if (res.code === 200) {
        ElMessage.success(res.msg)
        getMainList()
      } else {
        ElMessage.error(res.msg)
      }
    })
  })
}
function showDetail(id: number) {
  router.push(`/basic/${props.name}?categoryId=${id}`)
}
onMounted(async () => {
  getMainList()
})
</script>

<template>
  <el-form :model="dataForm" label-width="100px">
    <el-row>
      <el-col :span="6">
        <el-form-item label="汉字">
          <el-input v-model="dataForm.categoryName" />
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
  <div class="tabs" style="margin: 8px 0">
    <el-button @click="addForm()" type="primary">
      新增
    </el-button>
  </div>
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column type="index" align="center" width="80" />
    <el-table-column prop="sort" label="排序" align="center" />
    <el-table-column prop="name" label="名称" align="center" />
    <el-table-column prop="address" label="操作" align="center">
      <template #default="scope">
        <el-button size="small" @click="showDetail(scope.row.id)">
          详情
        </el-button>
        <el-button size="small" @click="addForm(scope.row)">
          编辑
        </el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">
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
  <AddConfig ref="addConfigModal" @refresh="getMainList" />
</template>

<style scoped lang="scss">
.pagination {
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
}
</style>
