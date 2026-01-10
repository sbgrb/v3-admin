import type { RouteRecordRaw } from "vue-router"
import { constantRoutes } from "@/router"

export const usePermissionStore = defineStore("permission", () => {
  // 可访问的路由
  const routes = ref<RouteRecordRaw[]>([])
  routes.value = constantRoutes
  return { routes }
})
