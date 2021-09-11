<template>
  <div class="top">
    <div class="btn-container p-1">
      <div class="button-group">
        <div class="btn-group">
          <button
            type="button"
            :style="{
              outline: active === 'btc' ? '#4CAF50  solid 5px' : '',
              borderColor: active === 'btc' ? 'yellow' : '#076338',
              backgroundColor: active === 'btc' ? 'yellow' : 'white',
              color: 'green'
            }"
            class="btn btn-danger fw-bold"
            @click="fetchTransaction(0, 'btc'), getTransactionsCount('btc')"
          >
            Bitcoin
          </button>
          <button
            type="button"
            :style="{
              outline: active === 'eth' ? '#4CAF50 solid 5px' : '',
              borderColor: active === 'eth' ? 'yellow' : '#076338',
              backgroundColor: active === 'eth' ? 'yellow' : 'white',
              color: 'green'
            }"
            class="btn btn-warning fw-bold"
            @click="fetchTransaction(1, 'eth'), getTransactionsCount('eth')"
          >
            Ethereum
          </button>
        </div>
      </div>
    </div>
    <div>
      <transactions-status-count
        :allTxns="allTxns"
        :compTxns="compTxns"
        :pendTxns="pendTxns"
        :alert="alert"
      />
    </div>
  </div>
</template>

<script>
import TransactionsStatusCount from '@/components/TransactionsStatusCount'
import { btcTransactions, ethTransactions } from '../WalletTransactions'

export default {
  name: 'CurrencyButton',
  data: function () {
    return {
      active: 'btc',
      currency: '0',
      response: [],
      allTxns: 0,
      compTxns: 0,
      pendTxns: 0,
      alert: ''
    }
  },
  props: {
    method: { type: Function }
  },
  emits: ['resetPg'],

  components: {
    TransactionsStatusCount
  },

  async created() {
    await this.getTransactionsCount('btc')
  },

  methods: {
    fetchTransaction(value, str) {
      this.active = str
      this.method(value)
    },

    async getTransactionsCount(str) {
      // try {
      //   if (str == 'btc') {
      //     this.currency = 0
      //     this.response = await fetch(
      //       `https://localhost:5001/api/Transaction/get-transactions-count?Currency=${this.currency}`
      //     )
      //   } else if (str == 'eth') {
      //     this.currency = 1
      //     this.response = await fetch(
      //       `https://localhost:5001/api/Transaction/get-transactions-count?Currency=${this.currency}`
      //     )
      //   }
      //   let data = await this.response.json()
      //   if (data.status === true) {
      //     this.allTxns = data.data.total
      //     this.compTxns = data.data.completed
      //     this.pendTxns = data.data.pending
      //     this.alert = ''
      //   } else {
      //     this.alert = data.message
      //   }
      // } catch (error) {
      //   console.log(error)
      // }

      //static data
      this.allTxns =
        str === 'btc' ? btcTransactions.length : ethTransactions.length
      this.compTxns =
        str === 'btc' ? btcTransactions.length : ethTransactions.length
    }
  }
}
</script>

<style scoped>
.button-group {
  background-color: white;
  width: 12.1rem;
  padding: 0.5em;
  border-radius: 0.5rem;
}
.top {
  display: flex;
  justify-content: space-between;
}
</style>
