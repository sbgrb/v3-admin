<script setup lang="ts">
import type { Option, WordForm, WordParams } from "@/pages/basic/api/type.ts"
import { ElMessageBox } from "element-plus"
import { ref } from "vue"
import { deleteWordTableDataApi, getOptions, getWordTableDataApi } from "@/pages/basic/api"
import AddWord from "./components/addWord.vue"

const dataForm = reactive({
  keyword: "",
  categoryId: undefined as number | undefined
})

interface BasicType extends HTMLElement {
  init: (row: WordParams) => void
}
const route = useRoute()
const detailModal = ref<BasicType | null>(null)
const pageTotal = ref<number>(0)
const pageNum = ref<number>(1)
const pageSize = ref<number>(10)
const tableData = ref([])
const options = ref<Option[]>([])
provide("wordOptions", options)
function getMainList() {
  const params = {
    ...dataForm,
    pageSize: pageSize.value,
    pageNum: pageNum.value
  }
  getWordTableDataApi(params).then((data) => {
    if (data.code === 200) {
      const { records, total } = data.data
      tableData.value = records as []
      pageTotal.value = total
    } else {
      ElMessage.error(data.msg)
    }
  })
}

function getSelectOptions() {
  getOptions("/back/vocabCategory/listAll").then((data) => {
    if (data.code === 200) {
      options.value = data.data as Option[]
    } else {
      ElMessage.error(data.msg)
    }
  })
}

function searchReset() {
  pageNum.value = 1
  pageSize.value = 10
  dataForm.keyword = ""
  dataForm.categoryId = undefined
  getMainList()
}
function addForm(row: WordParams) {
  detailModal.value!.init(row)
}

function handleDelete(row: WordForm) {
  ElMessageBox.confirm(
    "确认删除?",
    "Warning",
    {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning"
    }
  ).then(() => {
    deleteWordTableDataApi(row.id).then((data) => {
      if (data.code === 200) {
        ElMessage.success(data.msg)
      } else {
        ElMessage.error(data.msg)
      }
    })
  })
}
onBeforeMount(() => {
  getSelectOptions()
})
onMounted(() => {
  getMainList()
})
watchEffect(() => {
  if (route.query.categoryId) {
    dataForm.categoryId = Number(route.query.categoryId)
  }
})
</script>

<template>
  <el-form :model="dataForm" label-width="100px">
    <el-row>
      <el-col :span="6">
        <el-form-item label="关键字">
          <el-input v-model="dataForm.keyword" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="分类">
          <el-select v-model="dataForm.categoryId">
            <el-option v-for="item in options" :key="item.id" :value="item.id" :label="item.name" />
          </el-select>
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
  </div>
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column type="index" align="center" width="80" />
    <el-table-column prop="jmdictSeq" label="词典编号" width="180" align="center" />
    <el-table-column prop="kana" label="假名" width="180" align="center" />
    <el-table-column prop="kanji" label="汉字" align="center" />
    <el-table-column prop="wallerDefinition" label="词语含义" align="center" />
    <el-table-column prop="address" label="操作" align="center">
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
  <AddWord ref="detailModal" @refresh="getMainList" />
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
