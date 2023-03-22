<template>
  <el-dialog class="store-diaolog-form" v-model="storeDialogVal" destroyOnClose title="门店信息"
    ref="formStoreDialogRef" @dialogClosed="dialogClosed"
    :width="$store.state.isMobile? '90%' : '40%'" :close-on-click-modal="false"
    :close-on-press-escape="false" :show-close="false">
    <el-scrollbar>
      <div :class="$store.state.isMobile ? 'dialog-container' : 'dialog-container-p'">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="100px"
          :label-position="$store.state.isMobile ? 'top' : 'right'">
          <el-form-item label="营业时间" prop="business_hour">
            <el-time-picker v-model="form.business_hour" is-range :editable="false" type="timerange"
              range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" format="HH:mm"
              value-format="HH:mm" />
          </el-form-item>
          <el-form-item label="服务区域" prop="service_areas">
            <el-select v-model="form.service_areas" placeholder="选择服务区域,可多选" clearable multiple>
              <el-option :value="item.areaname" :label="item.areaname" v-for="item in areas"
                :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区域补充" prop="service_area">
            <el-input v-model="form.service_area"></el-input>
          </el-form-item>
          <el-form-item label="服务面积" prop="service_sizes">
            <el-checkbox-group v-model="form.service_sizes">
              <el-checkbox label="70-80㎡" value="70-80㎡" />
              <el-checkbox label="80-100㎡" value="80-100㎡" />
              <el-checkbox label="100㎡以上" value="100㎡以上" />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="承接项目" prop="service_projects">
            <el-checkbox-group v-model="form.service_projects">
              <el-checkbox label="半包" value="半包" />
              <el-checkbox label="全包" value="全包" />
              <el-checkbox label="单独软装" value="单独软装" />
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <!-- <el-button @click="closeFormDialog">取消</el-button> -->
        <el-button style="margin-left:15px;" type="primary" @click="handleSubmit"
          :loading="loading">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import branch from '@/api/branch'
import { useStore } from 'vuex'
import { toast } from '@/utils/utils'
const store = useStore()

// 门店信息
const storeDialogVal = ref(false)
const loading = ref(false)
const areas = ref([])
const store_id = ref(0)

const form = reactive({
  name: '',
  mobile: '',
  province_id: '',
  city_id: '',
  area_id: '',
  address: '',
  status: null,
  business_hour: ['09:00', '18:00'],
  service_areas: null,
  service_area: '',
  service_sizes: null,
  service_projects: null,
})

const rules = reactive({
  business_hour: [
    {
      type: 'array',
      required: true,
      message: '请选择营业时间',
      trigger: 'blur',
    },
  ],
  service_areas: [
    {
      type: 'array',
      required: true,
      message: '请选择服务区域',
      trigger: 'blur',
    },
  ],
  service_sizes: [
    {
      type: 'array',
      required: true,
      message: '请选择服务面积',
      trigger: 'blur',
    },
  ],
  service_projects: [
    {
      type: 'array',
      required: true,
      message: '请选择承接项目',
      trigger: 'blur',
    },
  ],
})

const handleSubmit = () => {
  if (!form.business_hour) {
    toast('请选择营业时间', 'error')
    return
  }
  if (form.service_areas.length == 0) {
    toast('请选择服务区域', 'error')
    return
  }
  if (form.service_sizes.length == 0) {
    toast('请选择服务面积', 'error')
    return
  }
  if (form.service_projects.length == 0) {
    toast('请选择承接项目', 'error')
    return
  }
  loading.value = true

  branch
    .edit(store_id.value, form)
    .then((res) => {
      if (res.code > 0) {
        toast('数据更新成功')
        storeDialogVal.value = false
      } else {
        toast(res.message, 'error')
      }
    })
    .finally(() => {
      loading.value = false
    })
}
const dialogClosed = () => {}

onMounted(() => {
  let storeInfo = store.state.storeInfo[0]
  store_id.value = storeInfo.id
  if (storeInfo.id != 1 && storeInfo.service_areas.length == 0) {
    storeDialogVal.value = true
  }
  areas.value = storeInfo.area
  for (const key in form) {
    form[key] = storeInfo[key]
  }
})
</script>
<style lang="scss">
.store-diaolog-form .el-dialog__header {
  padding-bottom: 16px;
  border-bottom: 1px solid #f5f5f5;
}
.store-diaolog-form .el-dialog__footer {
  padding-top: 20px;
  border-top: 1px solid #f5f5f5 !important;
  box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08);
}
.store-diaolog-form .el-dialog__body {
  height: 50vh;
}
.store-diaolog-form .dialog-container {
  width: 100%;
}
.store-diaolog-form .dialog-container-p {
  width: calc(100% - 30px);
}
.store-diaolog-form label {
  font-weight: 100;
  color: #000;
}
</style>