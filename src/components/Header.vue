<template>
  <div class="main top-header">
    <div>
      <label for="trans-history" class="form-label mt-1 mb-4 fw-bold h4">{{
        title
      }}</label>
      <div>
        <currency-button :method="fetchTransact" />
      </div>
    </div>
  </div>
</template>

<script>
import CurrencyButton from '@/components/CurrencyButton'

export default {
  name: 'Header',
  props: {
    title: String,
    method: { type: Function }
  },

  emits: ['resetPage'],

  components: {
    CurrencyButton
  },

  methods: {
    fetchTransact(value) {
      this.$emit('resetPage')
      this.method(value)
    }
  }
}
</script>

<style scoped>
.main {
  max-width: 97%;
  margin-left: 1em;
}

.top-header {
  height: 10em;
}
</style>
