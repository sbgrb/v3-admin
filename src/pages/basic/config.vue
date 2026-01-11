<script setup lang="ts">
import BaseConfig from "@/pages/basic/components/baseConfig.vue"

const activeName = ref("font")
const font = {
  list: "/back/kanjiCategory/list",
  add: "/back/kanjiCategory/add",
  del: "/back/kanjiCategory/delete",
  edit: "/back/kanjiCategory/update",
  detail: "/back/kanjiCategory"
}

const word = {
  list: "/back/vocabCategory/list",
  add: "/back/vocabCategory/add",
  del: "/back/vocabCategory/delete",
  edit: "/back/vocabCategory/update",
  detail: "/back/vocabCategory"
}

provide("urls", { font, word })
provide("name", activeName)

const SelectConfig = {
  list: "/back/articleCategory/list",
  add: "/back/articleCategory/add",
  del: "/back/articleCategory/delete",
  edit: "/back/articleCategory/update"
}
</script>

<template>
  <el-tabs
    v-model="activeName"
    type="card"
    class="demo-tabs"
  >
    <el-tab-pane label="汉字" name="font">
      <BaseConfig :name="activeName" :urls="font" />
    </el-tab-pane>
    <el-tab-pane label="词汇" name="word">
      <BaseConfig :name="activeName" :urls="word" />
    </el-tab-pane>
    <el-tab-pane label="段落" name="section">
      <BaseConfig :name="activeName" :urls="SelectConfig" />
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss">

</style>
