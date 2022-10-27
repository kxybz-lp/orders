<template>
  <div class="layout-common">
    <el-container>
      <el-aside width="200px">
        <el-scrollbar>
          <el-menu default-active="2" background-color="var(--color)" text-color="#fff"
            active-text-color="#fff">
            <el-menu-item index="1">
              <el-icon>
                <setting />
              </el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-sub-menu index="2">
              <template #title>
                <el-icon>
                  <location />
                </el-icon>
                <span>用户管理</span>
              </template>
              <el-menu-item index="1-1">管理员列表</el-menu-item>
              <el-menu-item index="1-2">角色列表</el-menu-item>
              <el-menu-item index="1-3">菜单列表</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="header-left">
            <el-icon>
              <fold />
            </el-icon>
          </div>
          <div class="header-right">
            <el-icon>
              <full-screen />
              <!-- <copy-document /> -->
            </el-icon>
            <el-dropdown>
              <span class="el-dropdown-link">
                西双版纳公司
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>修改密码</el-dropdown-item>
                  <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <div class="main">
            <el-dropdown>
              <span class="el-dropdown-link">
                西双版纳公司
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>修改密码</el-dropdown-item>
                  <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'layout',
  components: {},
  setup() {},
}
</script>
<style scoped lang="scss">
.layout-common {
  height: 100%;
  overflow: hidden;
  .el-container {
    height: 100%;
  }
  .el-aside {
    height: 100%;
    background-color: var(--color);
  }
  .el-header {
    background-color: #fff;
    box-sizing: border-box;
    color: #0c0c0c;
  }
  .el-main {
    background-color: #f0f2f5;
    overflow-y: hidden;
    padding: 0;
  }
  .main {
    height: 100%;
    overflow-y: auto;
    background: #f0f2f5;
  }
  .el-menu-item.is-active {
    background-color: #02333b !important;
    color: #fff !important;
  }
  .el-menu-item:hover,
  :deep(.el-submenu__title:hover) {
    background: #02333b !important;
    color: #fff !important;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    .el-icon {
      font-size: 16px;
      color: var(--color);
      cursor: pointer;
    }
    .el-dropdown {
      margin-left: 15px;
      .el-dropdown-link {
        position: relative;
        top: -3px;
        .el-icon--right {
          position: relative;
          top: 3px;
        }
      }
    }
  }
}
</style>
