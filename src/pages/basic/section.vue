<script setup lang="ts">
import type { FontParams } from "@/pages/basic/api/type.ts"
import { ElMessageBox } from "element-plus"
import { ref } from "vue"
import AddFont from "./components/addFont.vue"

const dataForm = reactive({
  kanji: ""
})

interface BasicType extends HTMLElement {
  init: () => void
}

const detailModal = ref<BasicType | null>(null)

const tableData = reactive([])

function getMainList() {

}

function searchReset() {

}
function addForm(row: FontParams) {
  detailModal.value!.init(row)
}

function handleDelete(row: FormData) {
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
        <el-form-item label="汉字">
          <el-input v-model="dataForm.kanji" />
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
    <el-table-column type="index"></el-table-column>
    <el-table-column prop="假名" label="Date" width="180" align="center" />
    <el-table-column prop="汉字" label="Name" width="180" align="center" />
    <el-table-column prop="定义" label="Address" align="center" />
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
  <AddFont ref="detailModal" @refer-list="getMainList" />
</template>

<style scoped lang="scss">
.btns {
  margin: 8px 0;
}
</style>
