<template>
  <!-- <transition name="router-fade" mode="out-in"> -->
      <router-view></router-view>
  <!-- </transition> -->
</template>

<script>
export default {
  name: 'app',
  created () {
    let signId = this.$route.query.signId || ''
    if (signId) {
      this.$storage('signId', signId)
    }
  }
}
</script>
<style>
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .25s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0.1;
	}
</style>
