<template>
  <el-row :gutter="0" class="list-header">
    <el-col :md="8" :offset="0">
      <el-button v-permission="ruleid" type="primary" size="small" @click="$emit('add')">新增</el-button>
    </el-col>
    <el-col :md="16" :offset="0" style="height: 24px">
      <slot />
    </el-col>
    <!-- <el-col :md="16" :offset="0" style="height: 24px">
      <el-form :model="model" ref="searchRef" label-width="0px" size="small">
        <el-form-item label="">
          <el-select v-model="model.role_id" placeholder="选择角色" clearable @clear="getData">
            <el-option :value="item.id" :label="item.name" v-for="item in roleList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="model.name" placeholder="输入用户名" clearable @clear="getData"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="$emit('getData')">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-col> -->
  </el-row>
</template>
<script setup>
defineProps({
  ruleid: {
    type: Number,
    default: '',
  },
})
defineEmits(['add'])
</script>
<style lang="scss" scoped>
.list-header {
  margin: 0 0 20px 0;
  padding: 0 0 15px 0;
  border-bottom: 1px solid #eee;
  align-items: center;
}
</style>
