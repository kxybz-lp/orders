<template>
  <div class="app-container">
    <div><button @click="set">设置cookie</button><button @click="get">获取cookie</button><button @click="remove">删除cookie</button></div>
    <p style="margin-bottom:100px">home1</p>
    <p style="margin-bottom:100px">home1</p>
    <p style="margin-bottom:100px">home1</p>
    <p style="margin-bottom:100px">home1</p>
    <p style="margin-bottom:100px">home1</p>
    <p style="margin-bottom:100px">home1</p>
    <p style="margin-bottom:100px">home1</p>
    <p style="margin-bottom:100px">home1</p>
    <p style="margin-bottom:100px">home1</p>
    <p style="margin-bottom:100px">home1</p>
    <p style="margin-bottom:100px">home1</p>
    <p style="margin-bottom:100px">home1</p>
  </div>
</template>

<script setup>
import { useCookies } from '@vueuse/integrations/useCookies'
const cookies = useCookies()
const set = () => {
  cookies.set('token', 'liping888')
}
const get = () => {
  console.log(cookies.get('token'))
}
const remove = () => {
  cookies.remove('token')
  console.log('remove')
}
</script>

<style lang='scss' scoped>
</style>