<template>
  <div>
    <!-- 顶部名片 -->
        <div v-bind:class="['box', 'bg' + colorIndex]" v-if="position === 'top'">
            <div class="tit-img">
                 <img :src="info.headImgUrl" v-if="info.headImgUrl">
                <img src="../assets/img/img/img-2.jpg" v-else>
            </div>
            <div class="tit-mind">
                <p>{{info.realName}}<span>|</span>{{info.company}}</p>
                <p>{{info.telephone}}</p>
            </div>
            <a :href="'tel:'+info.telephone" class="phone-1"></a>
        </div>
    <!--底部名片  -->
        <div class="box-b" v-if="position === 'bottom'">
            <div class="box-t">
                <div class="bot-img">
                    <img :src="info.headImgUrl" v-if="info.headImgUrl">
                    <img src="../assets/img/img/img-6.jpg" v-else>
                </div>
                <div class="con">
                    <h3>{{info.realName}}</h3>
                    <p>{{info.company}}</p>
                    <p>{{info.sign}}</p>
                </div>
          </div>
            <div v-bind:class="['but', 'backBg' + colorIndex]">
                {{info.telephone}}
                <a :href="'tel:'+info.telephone"></a>
            </div>
        </div>
  </div>
</template>

<script>
var colorList = [{name: '青色', color: '#0dd3bb'}, {name: '橙色', color: '#f88719'}, {name: '紫色', color: '#c877da'}, {name: '绿色', color: '#49cd9d'}, {name: '蓝色', color: '#6b8cf6'}]
export default {
  name: 'busi-card',
  props: {
    position: String,
    cardInfo: Object
  },
  data () {
    return {
      colorIndex: 0,
      info: {}
    }
  },
  created () {
    let custInfo = this.$storage('custInfo')
    // 如果是分享链接（有shareCustId）进来就展示分享者的名片，否则展示自己的名片
    if (this.$route.query.shareCustId) {
      this.info = this.$parent.info
    } else if (custInfo) {
      this.info = JSON.parse(custInfo)
      for (let i = 0; i < colorList.length; i++) {
        if (colorList[i]['color'] === this.info.cardColor) {
          this.colorIndex = i
        }
      }
    } else {
      this.$http('/account/wz/info/queryCustDetail', {}, this, res => {
        if (res.attr.hasOwnProperty('custInfo')) {
          this.info = res.attr.custInfo
          this.$storage('custInfo', JSON.stringify(res.attr.custInfo))
          for (let i = 0; i < colorList.length; i++) {
            if (colorList[i]['color'] === this.info.cardColor) {
              this.colorIndex = i
            }
          }
        } else {
          this.$router.back()
        }
      })
    }
  }
}
</script>
