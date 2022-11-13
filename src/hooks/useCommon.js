import { reactive, ref, computed, nextTick } from 'vue'
import { toast, showModal } from '@/utils/utils'

// 列表，分页，搜索，删除，修改状态，排序
export function useInitTable(opt = {}) {
  const loading = ref(false)
  // 搜索与请求参数
  let params = null
  // 重置表单方法
  let resetParams = null
  if (opt.params) {
    params = reactive({ ...opt.params })
    resetParams = () => {
      for (const key in opt.params) {
        params[key] = opt.searchForm[key]
      }
      // getData()
    }
  }
  const count = ref(0)
  const dataList = ref([])
  // opt.api  数据请求的模型
  // opt.onGetListSuccess 数据请求成功后的回调
  const getData = () => {
    loading.value = true
    opt.api
      .getList(params)
      .then((res) => {
        if (res.code > 0) {
          if (opt.onGetListSuccess && typeof opt.onGetListSuccess == 'function') {
            opt.onGetListSuccess(res)
          } else {
            count.value = res.result.count
            dataList.value = res.result.data
          }
        } else {
          toast(res.message || 'Error', 'error')
        }
      })
      .finally(() => {
        loading.value = false
      })
  }
  //获取数据
  getData()
  //切换分页码
  const handleCurrentChange = (page) => {
    params.page = page
    getData()
  }

  //设置状态
  const handleSwitch = (val, row) => {
    row.statusLoading = true
    opt.api
      .status(row.id, { status: val })
      .then((res) => {
        if (res.code > 0) {
          toast('数据更新成功')
          row.status = val
        } else {
          toast(res.message, 'error')
        }
      })
      .finally(() => {
        row.statusLoading = false
      })
  }

  // 排序
  const sortChange = (column, prop, order) => {
    params.page = 1
    params.sort = column.order == 'descending' ? column.prop + ' desc' : column.prop + ' asc'
    getData()
  }

  // 多选选中ID
  // 批量删除
  // 批量修改状态

  // 删除
  const handleDelete = (id) => {
    showModal('确认要删除该数据吗？')
      .then((res) => {
        opt.api.delete(id).then((res) => {
          if (res.code > 0) {
            toast('数据删除成功')
            getData()
          } else {
            toast(res.message, 'error')
          }
        })
      })
      .catch((err) => console.log(err))
  }

  return {
    loading,
    count,
    dataList,
    params,
    getData,
    resetParams,
    handleCurrentChange,
    handleSwitch,
    sortChange,
    handleDelete,
  }
}

// 新增，修改
export function useInitForm(opt = {}) {
  const editId = ref(0)
  const drawerTitle = computed(() => (editId.value ? '用户修改' : '用户新增'))
  const formDrawerRef = ref(null)
  const formRef = ref(null)
  const form = reactive({ ...opt.form })
  // const rules = opt.rules || {}

  // 新增
  const handleAdd = () => {
    editId.value = 0
    formDrawerRef.value.openDrawer()
  }
  // 编辑，重要内容请求服务器获取item
  const handleEdit = (row) => {
    editId.value = row.id

    formDrawerRef.value.openDrawer()
    // 页面渲染后赋值，解决关闭弹窗resetFields无效问题
    nextTick(() => {
      form.name = row.name
      form.password = ''
      form.role_id = row.role_id
      form.status = row.status
      form.branch_id = row.branch_id.split(',').map((o) => parseInt(o))
    })
  }

  // 提交
  const handleSubmit = () => {
    formRef.value.validate((valid) => {
      if (!valid) return
      formDrawerRef.value.showLoading()
      if (editId.value) {
        opt.api
          .edit(editId.value, form)
          .then((res) => {
            if (res.code > 0) {
              toast('数据更新成功')
              formDrawerRef.value.closeDrawer()
              opt.getData()
            } else {
              toast(res.message, 'error')
            }
          })
          .finally(() => {
            formDrawerRef.value.hideLoading()
          })
      } else {
        opt.api
          .create(form)
          .then((res) => {
            if (res.code > 0) {
              toast('数据新增成功')
              formDrawerRef.value.closeDrawer()
              opt.getData()
            } else {
              toast(res.message, 'error')
            }
          })
          .finally(() => {
            formDrawerRef.value.hideLoading()
          })
      }
    })
  }
  // 弹窗关闭重置表单
  const drawerClosed = () => {
    if (!formRef.value) return
    formRef.value.resetFields()
  }

  return {
    drawerTitle,
    formDrawerRef,
    formRef,
    form,
    // rules,
    editId,
    handleAdd,
    handleEdit,
    handleSubmit,
    drawerClosed,
  }
}
