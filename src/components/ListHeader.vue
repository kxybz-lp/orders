<template>
  <el-row :gutter="0" class="list-header">
    <el-col :span="10" :offset="0">
      <el-button v-if="rule.create && rule.create === 79" v-permission="rule.create" type="primary"
        size="default" @click="$router.push('/order/add')">新增</el-button>
      <el-button v-if="rule.create && rule.create !== 79" v-permission="rule.create" type="primary"
        size="default" @click="$emit('add')">新增</el-button>
      <el-button v-if="(rule.move && !$store.state.isMobile)" color="#409eff" style="color: #fff"
        v-permission="rule.move" type="primary" size="default"
        @click="$emit('move')">批量移动</el-button>
      <el-button v-if="rule.delete" v-permission="rule.delete" type="danger" size="default"
        @click="$emit('delete')">批量删除</el-button>
      <el-button v-if="rule.sort && !$store.state.isMobile" v-permission="rule.sort" type="success"
        size="default" @click="$emit('sort')">排序</el-button>
      <el-button v-if="rule.export && !$store.state.isMobile && $store.state.adminInfo.id!=781"
        v-permission="rule.export" type="danger" size="default"
        @click="$emit('export')">导出</el-button>
      <UploadExcel v-if="(rule.import && !$store.state.isMobile)" v-permission="rule.import"
        :action="action" @success="$emit('import')" />
      <el-button v-if="(rule.download && !$store.state.isMobile)" v-permission="rule.download"
        type="warning" size="default" @click="$emit('download')">下载模板</el-button>
    </el-col>
    <el-col :span="14" :offset="0" style="height: 24px">
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
  action: {
    type: String,
    default: '',
  },
})
// const btns = computed(() => props.layout.split(','))
defineEmits(['add', 'sort', 'move', 'delete', 'export', 'import', 'download'])
</script>
<style lang="scss" scoped>
.list-header {
  margin: 0 0 20px 0;
  padding: 0 0 15px 0;
  border-bottom: 1px solid #eee;
  // align-items: center;
}
</style>
