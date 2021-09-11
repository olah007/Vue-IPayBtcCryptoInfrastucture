<template>
  <div id="overlay" v-if="displayModel">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-success text-light">
          <h5 class="modal-title fw-bold trans-detail h4">
            Transaction Details
          </h5>
          <button
            type="button"
            class="close"
            @click="$emit('toggleTransactionModal')"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="trans-detail">
            <div class="row">
              <label for="trans-hash" class="form-label fw-bold col-lg-3"
                >View Transaction:</label
              >
              <span class="col-lg-9"
                ><u
                  ><a
                    class="text-primary"
                    :href="
                      viewTransact(
                        transaction.currency,
                        transaction.receiver,
                        transaction.hash
                      )
                    "
                    target="_blank"
                    >Click to view transaction</a
                  ></u
                ></span
              >
            </div>
            <div class="row">
              <label for="sender" class="form-label fw-bold col-lg-3"
                >Sender:</label
              >
              <span class="col-lg-9">{{
                checkSender(transaction.sender)
              }}</span>
            </div>
            <div class="row">
              <label for="receiver" class="form-label fw-bold col-lg-3"
                >Receiver:</label
              >
              <span class="col-lg-9">{{ transaction.receiver }}</span>
            </div>
            <div class="row">
              <label for="amount" class="form-label fw-bold col-lg-3 col-md-6"
                >Amount:</label
              >
              <span class="col-lg-9 col-md-6">{{
                formatStr(transaction.amount)
              }}</span>
            </div>
            <div class="row">
              <label
                for="trans-fee"
                class="form-label fw-bold col-lg-3 col-md-6"
                >Transaction Fee:</label
              ><span class="col-lg-9 col-md-6">{{
                modifyStr(transaction.transactionFee)
              }}</span>
            </div>
            <div class="row">
              <label
                for="trans-type"
                class="form-label fw-bold col-lg-3 col-md-6"
                >Transaction Type:</label
              ><span class="col-lg-9 col-md-6">{{
                transactionTypeDefintion(transaction.transactionType)
              }}</span>
            </div>
            <div class="row">
              <label for="currency" class="form-label fw-bold col-lg-3 col-md-6"
                >Currency:</label
              >
              <span class="col-lg-9 col-md-6">{{
                currencyType(transaction.currency)
              }}</span>
            </div>
            <div class="row">
              <label
                for="confirmed"
                class="form-label fw-bold col-lg-3 col-md-6"
                >Transaction Confirmed:</label
              ><span class="col-lg-9 col-md-6">{{
                transaction.confirmed
              }}</span>
            </div>
            <div class="row">
              <label
                for="date-created"
                class="form-label fw-bold col-lg-3 col-md-6"
                >Date Created:</label
              ><span class="col-lg-9 col-md-6"
                >{{ new Date(transaction.creationDate).toDateString() }} &nbsp;
                {{
                  new Date(transaction.creationDate).toLocaleTimeString()
                }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionModal',
  props: ['displayModel', 'transaction'],
  emits: ['toggleTransactionModal'],
  methods: {
    transactionTypeDefintion(transType) {
      return transType == 0 ? 'Debit' : 'Credit'
    },
    modifyStr(str) {
      if (str == 0) {
        return (str = 'N/A')
      }
      return Number.parseFloat(str).toFixed(6)
    },
    formatStr(str) {
      return Number.parseFloat(str).toFixed(6)
    },
    currencyType(currency) {
      return currency == 0 ? 'Bitcoin' : 'Ethereum'
    },
    checkSender(sender) {
      return sender != '' ? sender : 'N/A'
    },
    viewTransact(currency, receiver, hash) {
      if (currency == 0) {
        if (receiver.substring(0, 2) == 'tb') {
          return `https://tbtc.bitaps.com/${hash}`
        } else {
          return `https://btc.bitaps.com/${hash}`
        }
      } else {
        return `https://rinkeby.etherscan.io/tx/${hash}`
      }
    }
  }
}
</script>

<style scoped>
#overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}

span {
  font-weight: 450;
}

.modal {
  display: block !important;
}

.modal-title {
  margin-left: 35%;
}

.modal-dialog {
  overflow-y: initial !important;
}

.modal-body {
  height: 52vh;
  overflow-y: auto;
}
</style>
