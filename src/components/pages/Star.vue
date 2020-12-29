<template lang="pug">
#bg
  canvas#canvas

</template>

<script type="ts">
import { defineComponent, onMounted } from 'vue'
const Dots = function() {
  // 画布相关
  this.canvas
  this.ctx
  // 绘制点相关
  this.x
  this.y
  this.r
  // 移动相关
  this.sx
  this.sy
}

Dots.prototype = {
  speed: function() {
    this.sx = Math.random() * 255 - 127
    this.sy = Math.random() * 150 - 75
    if (Math.pow(this.sx, 2) + Math.pow(this.sy, 2) < 1225) {
      this.speed()
    }
  },
  init: function(canvas) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    // 初始化出現的位置(x,y)
    this.x = this.canvas.width / 2
    this.y = this.canvas.height / 2
    this.r = Math.random() * 4 + 2 // 隨機生成 2~6px 的半徑值
    // 隨機確定點的移動速度與方向 速度值在 (-3, 3) 之間 提高數值可加快速度
    this.speed()

    // 在canvas中生成點
    this.ctx.beginPath() // 開始繪製canvas
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    // 繪製圓形 (註解:Math.PI=180deg)
    // https://www.w3school.com.cn/tags/canvas_arc.asp
    this.ctx.fillStyle = 'rgba(255,255,255,.8)' // 選擇顏色
    this.ctx.fill() // 填入顏色
    this.ctx.closePath() // 結束繪製canvas
  },
  // 更新点位置
  update: function() {
    // 移動點的位置
    this.x = this.x + this.sx
    this.y = this.y + this.sy
    // 點超出canvas範圍時另其"重生"
    // if (this.x < 0 || this.x > this.canvas.width) {
    //     this.init(this.canvas);
    // }
    // if (this.y < 0 || this.y > this.canvas.height) {
    //     this.init(this.canvas);
    // }
    // 生成新的點
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.r + 0.5, 0, 2 * Math.PI)
    this.ctx.fill()
    this.ctx.closePath()
  }
}

var Main = function() {
  var dotsArr = []

  var maxDotsNum = 300 // 最多可同時出現多少點
  var dotsNum = 300 // 初始產生的點的數量
  var overNum = 0 // 超出最大數量的點的數量

  var bg = document.getElementById('bg')
  var canvas = document.getElementById('canvas')
  var ctx = canvas.getContext('2d')

  var width = parseInt(window.innerWidth)
  var height = parseInt(window.innerHeight)
  var cssText = 'width: ' + width + 'px; height: ' + height + 'px;'

  // 設置背景和canvas的寬高
  bg.setAttribute('style', cssText)
  canvas.setAttribute('style', cssText)
  canvas.width = (width * 2).toString()
  canvas.height = (height * 2).toString()

  // 生成點-初始
  for (var i = 0; i < dotsNum; i++) {
    var dot = new Dots()
    dotsArr.push(dot)
    dot.init(canvas)
  }

  addDot() // 每隔100毫秒生成一個新的點
  function addDot() {
    // 生成新的點
    createDot()
    // 當點的數量大於最大限制時停止生成新的點
    if (dotsNum > maxDotsNum) { return }
    setTimeout(function() {
      addDot()
    }, 100)
  }

  // 生成新的點
  function createDot() {
    var dot = new Dots()
    dotsArr.push(dot)
    dotsNum += 1
    dot.init(canvas)
  }

  // 製作動畫
  var requestAnimFrame = requestAnimationFrame 
  // || webkitRequestAnimationFrame || oRequestAnimationFrame || msRequestAnimationFrame
  requestAnimFrame(animateUpdate) // 兼容不同瀏覽器的requestAnimationFrame
  function animateUpdate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height) // 清空canvas中原有的内容
    // 更新點的位置 數量超出最大值時捨棄舊的點
    if (dotsNum > maxDotsNum) {
      overNum = dotsNum - maxDotsNum
    }
    // 捨棄舊的點
    for (var i = overNum; i < dotsNum; i++) {
      dotsArr[i].update()
    }
    requestAnimFrame(animateUpdate)
  }
}

export default defineComponent({
  setup() {
    onMounted(() => {
      setTimeout(() => {
        Main()
      }, 500)
    })

    return {}
  }
})
</script>
