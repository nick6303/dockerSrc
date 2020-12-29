<template lang="pug">
section.rule
  button.close(
    type="button"
    @click="$emit('close')"
  )
  figure.title
    img.pc(src="@/assets/img/rule/title.png", alt="alt")
    img.mb(src="@/assets/img/rule/title_M.png", alt="alt")
  .scrollBox(v-perfect-scroll)
    p
      span 活动时间：
      | 北京时间xx月xx日中午12点至xx月xx日中午12点止
    p
      span 活动资格：
      | 2020月01月至活动开始前，累积存款次数达3次，累计存款额达1,000以上
    p
      span 活动方式：
      | 于活动时间内填写完毕即可获得彩金
    table
      tr
        th 资格
        th 彩金
      tr
        td 一般会员
        td 12,345
      tr
        td VIP会员
        td 12,345
    p 活动细则：
    ul
      li 周计算区间：北京时间每周X中午12点至隔周X中午12点止。
      li 派发时间：每周三19点前，系统将自动派发至符合资格会员主账户。
      li 彩金打码2倍即可出款。
      li 活动期间，每人仅需填写一次。
      li 会员的存款次数及活动资格由迪拜皇宫系统自动统计，如有异议，依迪拜皇宫查询结果为准。
      li 彩金一经派发即无法放弃与取消。
      li 每位会员、每个IP、每个手机号码、每个电子邮箱地址、每一组银行帐号只能享有一次优惠，   若发现重复注册或同IP多帐号现象，则视为同一人，此IP下所有帐号迪拜皇宫有权拒绝派送彩金
      li 参与此活动即表示同意
        b 《迪拜皇宫活动声明》
        | ，迪拜皇宫拥有最终解释权。
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ModalRule',
  setup() {
    return {
    }
  }
})
</script>
