<template>
  <div class="com-template" v-if="bigLoading">
    <div class="alert-content big-loading">
      <p class="page-infinite-loading">
        <mt-spinner type="snake" color="#F84F54"></mt-spinner>
      </p>
      <p class="txt">{{text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'big-loading',
  props: {
    text: String,
    bigLoading: Boolean
  }
}
</script>
