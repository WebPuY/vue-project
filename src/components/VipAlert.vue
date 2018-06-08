<template>
  <div class="com-template" v-show="alertVip">
    <div class="alert-content vip">
      <p class="p1" v-if="!isVip">成为会员去广告：<span class="color-blue">免费</span></p>
      <p class="p1" v-if="!isVip">微信支付去广告：<span class="color-blue">0.99元</span></p>
      <p class="p1" v-if="isVip">您已经是会员，可免费去除广告！</p>
      <div class="vip-btn">
        <a class="left be-vip" v-if="!isVip">成为会员</a>
        <a class="left cancle" v-if="isVip" @click="alertVip = false">取消</a>
        <a class="right">微信支付</a>
      </div>
      <div class="close" @click="alertVip = false"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  props: {
    isVip: Boolean,
    alertVip: Boolean
  }
}
</script>
