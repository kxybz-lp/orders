<template>
  <div class="aside-list" :class="{ active: active }">
    <div class="name"><slot /></div>
    <div class="buttons">
      <el-button class="buttons-edit" text type="primary" size="small" @click.stop="$emit('edit')">
        <el-icon :size="12"><Edit /></el-icon>
      </el-button>
      <el-button class="buttons-delete" text type="primary" size="small" @click.stop="$emit('delete')">
        <el-icon :size="12"><Close /></el-icon>
      </el-button>
    </div>
  </div>
</template>
<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
})
defineEmits(['edit', 'delete'])
</script>
<style lang="scss" scoped>
.aside-list:hover,
.active {
  background-color: #e0e2ec;
}
.aside-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 8px;
  .name {
    font-size: 14px;
    color: #666;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 1;
  }
  .buttons {
    width: 60px;
    .el-button {
      width: 22px;
    }
  }
}
</style>
