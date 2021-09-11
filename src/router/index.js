import { createRouter, createWebHashHistory } from 'vue-router'
import Transactions from '../views/Transactions.vue'

const routes = [
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
