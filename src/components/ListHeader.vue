<template>
  <el-row :gutter="0" class="list-header">
    <el-col :md="9" :offset="0">
      <el-button v-if="rule.create" v-permission="rule.create" type="primary" size="small" @click="$emit('add')">新增</el-button>
      <el-button v-if="rule.delete" v-permission="rule.delete" type="danger" size="small" @click="$emit('delete')">批量删除</el-button>
      <el-button v-if="rule.sort" v-permission="rule.sort" type="success" size="small" @click="$emit('sort')">排序</el-button>
      <el-button v-if="rule.export" v-permission="rule.export" type="danger" size="small" @click="$emit('export')">导出</el-button>
      <UploadExcel v-if="rule.import" v-permission="rule.import" @success="$emit('import')" />
      <el-button v-if="rule.download" v-permission="rule.download" type="warning" size="small" @click="$emit('download')">下载模板</el-button>
    </el-col>
    <el-col :md="15" :offset="0" style="height: 24px">
      <slot />
    </el-col>
  </el-row>
</template>
<script setup>
import UploadExcel from './UploadExcel.vue'

const props = defineProps({
  rule: {
    type: Object,
    default: null,
  },
})
// const btns = computed(() => props.layout.split(','))
defineEmits(['add', 'sort', 'delete', 'export', 'import', 'download'])
</script>
<style lang="scss" scoped>
.list-header {
  margin: 0 0 20px 0;
  padding: 0 0 15px 0;
  border-bottom: 1px solid #eee;
  align-items: center;
}
</style>
