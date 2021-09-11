<template>
  <div class="txn-section">
    <div class="txn-count" v-show="alert == ''">
      <div>
        <p class="fw-bold">Total</p>
        <p class="text-center fw-bold h4">{{ allTxns }}</p>
      </div>
      <div>
        <p class="fw-bold">Completed</p>
        <p class="text-center fw-bold h4">{{ compTxns }}</p>
      </div>
      <div>
        <p class="fw-bold pending">Pending</p>
        <p class="text-center fw-bold h4">{{ pendTxns }}</p>
      </div>
    </div>
    <div v-show="alert != ''">
      <p class="fw-bold text-danger h4">{{ alert }}/p></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionsStatusCount',
  props: ['allTxns', 'compTxns', 'pendTxns', 'alert']
}
</script>

<style scoped>
.txn-count {
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 1rem;
  margin: 0.7rem;
}
</style>
