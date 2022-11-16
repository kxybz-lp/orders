<template>
  <div class="app-container">
    <el-card class="menu-card" shadow="hover">
      <ListHeader @add="handleAdd" />
      <div>订单管理</div>
      <el-row :gutter="2" v-for="(item, index) in form.meta" :key="item.key">
        <el-col :span="11" :offset="0">
          <el-input v-model="item.key" />
        </el-col>
        <el-col :span="11" :offset="0">
          <el-input v-model="item.value" />
        </el-col>
        <el-col :span="2" :offset="0">
          <el-icon v-if="index == 0" @click="addMeta" size="24"><Plus /></el-icon>
          <el-icon v-else @click="minusMeta(index)" size="24"><Minus /></el-icon>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script setup>
import ListHeader from '@/components/ListHeader.vue'
import { reactive } from 'vue'
const form = reactive({
  meta: [{ key: '', value: '' }],
})
const addMeta = () => {
  form.meta.push({ key: '', value: '' })
}
const minusMeta = (index) => {
  form.meta.splice(index, 1)
}
</script>
<style lang="scss" scoped></style>
