<template>
  <div>
    <div class="table-responsive-md">
      <table class="table table-bordered table-striped">
        <thead>
          <tr class="text-center bg-success text-light">
            <th>S/N</th>
            <th>Transaction Hash</th>
            <th>Date</th>
            <th>Receiver</th>
            <th>Amount</th>
            <th>Transaction Type</th>
          </tr>
        </thead>

        <tbody v-show="alertMessage == ''">
          <tr
            v-for="(item, index) in transactions"
            :key="item.id"
            class="text-center table-body"
            :style="{ cursor: 'pointer' }"
            @click="getTransactionByHash(item.hash)"
          >
            <th>{{ ++index }}</th>
            <td>{{ formatString(item.hash) }}</td>
            <td>{{ new Date(item.lastUpdated).toDateString() }}</td>
            <td>{{ formatString(item.receiver) }}</td>
            <td>{{ formatAmount(item.amount) }}</td>
            <td>
              {{ transactionTypeDefintion(item.transactionType) }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="alertMessage" v-show="alertMessage != ''">
        {{ alertMessage }}
      </div>
    </div>
  </div>
  <div>
    <transaction-modal
      :displayModel="displayModel"
      :transaction="transaction"
      @toggleTransactionModal="toggleTransactionModal"
    />
  </div>
</template>

<script>
import TransactionModal from '@/components/TransactionModal'
import { btcTransactions, ethTransactions } from '../WalletTransactions'

export default {
  name: 'TransactionsTable',
  data() {
    return {
      displayModel: false,
      transaction: {}
    }
  },
  props: ['transactions', 'alertMessage'],
  components: {
    TransactionModal
  },

  methods: {
    transactionTypeDefintion(transType) {
      return transType == 0 ? 'Debit' : 'Credit'
    },

    formatString(str) {
      return `${str.substring(0, 10)}...`
    },

    formatAmount(amt) {
      return Number.parseFloat(amt).toFixed(6)
    },

    toggleTransactionModal() {
      this.displayModel = !this.displayModel
    },

    getTransactionByHash(hash) {
      // fetch(
      //   `https://localhost:5001/api/Transaction/get-transaction-by-hash/${hash}`
      // )
      //   .then(response => response.json())
      //   .then(res => {
      //     this.transaction = res.data
      //   })
      // this.toggleTransactionModal()

      // static data
      const btcTxns = btcTransactions
      const ethTxns = ethTransactions
      const filterBtc = btcTxns.find(item => item.hash === hash)

      if (filterBtc) {
        this.transaction = filterBtc
        this.toggleTransactionModal()
        return
      }

      const filterEth = ethTxns.find(item => item.hash === hash)
      if (filterEth) {
        this.transaction = filterEth
        this.toggleTransactionModal()
        return
      }
    }
  }
}
</script>

<style scoped>
.alertMessage {
  font-size: 2.5rem;
  color: #c9c5c5;
}
.table-body:hover {
  background-color: #d4dbc7;
}
</style>
