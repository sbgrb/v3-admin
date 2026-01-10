<script setup lang="ts">
import BaseConfig from "@/pages/basic/components/baseConfig.vue"

const activeName = ref("1")
const FontConfig = {
  list: "/back/kanjiCategory/list",
  add: "/back/kanjiCategory/add",
  del: "/back/kanjiCategory/delete",
  edit: "/back/kanjiCategory/update",
  detail: "/back/kanjiCategory"
}

const WordConfig = {
  list: "/back/vocabCategory/list",
  add: "/back/vocabCategory/add",
  del: "/back/vocabCategory/delete",
  edit: "/back/vocabCategory/update",
  detail: "/back/vocabCategory"
}

const SelectConfig = {
  list: "",
  add: "",
  del: "",
  edit: ""
}
</script>

<template>
  <el-tabs
    v-model="activeName"
    type="card"
    class="demo-tabs"
  >
    <el-tab-pane label="汉字" name="1">
      <BaseConfig :curr-index="activeName" :urls="FontConfig" />
    </el-tab-pane>
    <el-tab-pane label="词汇" name="2">
      <BaseConfig :curr-index="activeName" :urls="WordConfig" />
    </el-tab-pane>
    <el-tab-pane label="段落" name="3">
      <BaseConfig :curr-index="activeName" :urls="SelectConfig" />
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss">

</style>
