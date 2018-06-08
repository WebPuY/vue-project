<template>
  <div class="v-simple-cropper">
    <!-- <slot>
      <button @click="upload">上传图片</button>
    </slot> -->
    <input class="file" ref="file" type="file" accept="image/*" @change="uploadChange">
    <div class="v-cropper-layer" ref="layer">
      <div class="layer-header">
        <button id="cancel" @click="cancelHandle">取消</button>
        <span v-show="disabled">上传中请稍等...</span>
        <button id="confirm" @click="confirmHandle" :disabled="disabled">裁剪</button>
      </div>
      <img ref="cropperImg">
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'
export default {
  name: 'v-simple-cropper',
  props: {
    initParam: Object,
    successCallback: {
      type: Function,
      default: () => {
        this.cancelHandle()
      }
    }
  },
  data () {
    return {
      cropper: {},
      filename: '',
      disabled: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let cropperImg = this.$refs['cropperImg']
      this.cropper = new Cropper(cropperImg, {
        aspectRatio: 1 / 1,
        dragMode: 'move'
      })
    },
    upload () {
      this.$refs['file'].click()
    },
    uploadChange (e) {
      let file = e.target.files[0]
      this.filename = file['name']
      let URL = window.URL || window.webkitURL
      this.$refs['layer'].style.display = 'block'
      this.cropper.replace(URL.createObjectURL(file))
    },
    cancelHandle () {
      this.cropper.reset()
      this.$refs['layer'].style.display = 'none'
      this.$refs['file'].value = ''
    },
    confirmHandle () {
      let cropBox = this.cropper.getCropBoxData()
      let cropCanvas = this.cropper.getCroppedCanvas({
        width: cropBox.width,
        height: cropBox.height
      })
      let imgData = cropCanvas.toDataURL('image/jpeg')
      // let formData = new window.FormData()
      // formData.append('fileType', this.initParam['fileType'])
      // formData.append('img', imgData)
      // formData.append('originalFilename', this.filename)
      // window.$http(this.initParam['uploadURL'], formData, {
      //   method: 'post',
      //   headers: {'Content-Type': 'multipart/form-data'}
      // }).then((res) => {
      //   this.successCallback(res.data)
      //   this.cancelHandle()
      // })
      this.disabled = true
      this.$http(this.initParam['uploadURL'], {img: imgData, originalFilename: this.filename, fileType: this.initParam.fileType}, this, res => {
        this.disabled = false
        this.successCallback(res)
        this.cancelHandle()
      }, false, res => {
        this.disabled = false
        this.successCallback(res)
        this.cancelHandle()
      })
    }
  }
}
</script>

<style>
.v-simple-cropper .file {
  display: none;
}
.v-cropper-layer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 99999;
  display: none;
}
.layer-header{
  background: #f2f2f2;
}
.layer-header button{
  background: none;
  width: 1.4rem;
  height: .6rem;
  border: none;
}
.layer-header #confirm{
  color: #F84F54;
  float: right;
}
</style>
