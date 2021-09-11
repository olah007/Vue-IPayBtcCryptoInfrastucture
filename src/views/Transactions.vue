<template>
  <div class="container layout">
    <div class="row">
      <side-nav />
      <div class="col-md-10 col-sm-12 section">
        <Header
          title="Transaction History"
          :method="fetchTransaction"
          @resetPage="resetPage"
        />
        <div class="main content">
          <div class="row">
            <transactions-table
              :transactions="transactions"
              :alertMessage="alertMessage"
            />
          </div>
          <div class="pagination">
            <v-pagination
              v-model="pageNumber"
              :pages="pages"
              :range-size="1"
              active-color="#d4dbc7"
              @update:modelValue="updateHandler"
            />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import SideNav from '@/components/SideNav'
import TransactionsTable from '@/components/TransactionsTable'
import Footer from '@/components/Footer'

import VPagination from '@hennge/vue3-pagination'
import '@hennge/vue3-pagination/dist/vue3-pagination.css'
import { btcTransactions, ethTransactions } from '../WalletTransactions'

export default {
  name: 'Transactions',
  static: {
    pageSize: 3
  },
  data: function () {
    return {
      pageNumber: 1,
      totalCount: 1,
      transactions: [],
      alertMessage: '',
      currency: 0
    }
  },

  components: {
    Header,
    SideNav,
    TransactionsTable,
    Footer,
    VPagination
  },

  async created() {
    await this.fetchTransaction(0)
  },

  methods: {
    async fetchTransaction(value) {
      // try {
      //   let data = await fetch(
      //     `https://localhost:5001/api/Transaction/fetch-transactions?PageNumber=${this.pageNumber}&PageSize=${this.$options.static.pageSize}&Currency=${value}`
      //   )
      //   data = await data.json()
      //   if (data.status != true) {
      //     return (this.alertMessage = 'No available transactions')
      //   } else if (data.data.transactionList.length == 0) {
      //     return (this.alertMessage = 'No available transactions')
      //   } else {
      //     this.transactions = data.data.transactionList
      //     this.totalCount = data.data.transactionCount
      //     this.currency = value
      //     this.alertMessage = ''
      //   }
      // } catch (error) {
      //   console.log(error)
      // }

      //static data
      // this.transactions = value === 0 ? btcTransactions : ethTransactions
      this.totalCount =
        value === 0 ? btcTransactions.length : ethTransactions.length
      this.currency = value
      const nextCount =
        this.$options.static.pageSize + this.$options.static.pageSize
      if (value === 0) {
        if (this.pageNumber == 1) {
          this.transactions = []
          for (let index = 0; index < this.$options.static.pageSize; index++) {
            this.transactions.push(btcTransactions[index])
          }
          return
        } else {
          this.transactions = []
          for (
            let index = this.$options.static.pageSize;
            index < btcTransactions.length;
            index++
          ) {
            this.transactions.push(btcTransactions[index])
          }
          return
        }
      } else {
        if (this.pageNumber == 1) {
          this.transactions = []
          for (let index = 0; index < this.$options.static.pageSize; index++) {
            this.transactions.push(ethTransactions[index])
          }
          return
        }
        if (this.pageNumber == 2) {
          this.transactions = []
          for (
            let index = this.$options.static.pageSize;
            index < nextCount;
            index++
          ) {
            this.transactions.push(ethTransactions[index])
          }
          return
        }
        if (this.pageNumber == 3) {
          this.transactions = []
          for (let index = nextCount; index < ethTransactions.length; index++) {
            this.transactions.push(ethTransactions[index])
          }
          return
        }
      }
    },

    updateHandler(pageNumber) {
      this.pageNumber = pageNumber
      if (this.currency == 0) {
        this.fetchTransaction(0)
      } else if (this.currency == 1) {
        this.fetchTransaction(1)
      }
    },

    resetPage() {
      this.pageNumber = 1
    }
  },

  computed: {
    pages() {
      let result = parseInt(
        Math.ceil(this.totalCount / this.$options.static.pageSize)
      )
      return result
    }
  }
}
</script>

<style scoped>
.layout {
  background-color: #f1f1ec;
  max-width: 100vw;
  padding: 1em 1em 1em 1.5em;
}

.row {
  height: 95%;
}

.content {
  border-color: white;
  border-radius: 1em;
  background-color: white;
  height: 42em;
}

.main {
  max-width: 97%;
  margin-left: 1em;
}

.pagination {
  justify-content: center;
}
.section {
  height: 56em;
}
</style>
