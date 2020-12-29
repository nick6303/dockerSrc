<template lang="pug">
article.home
  Star(v-if="isPc")
  section.title
    img.pc(src="@/assets/img/title.png", alt="alt")
    img.mb(src="@/assets/img/title_M.png", alt="alt")
  form
    .formItem
      p 填卷人
      input(
        v-model="account"
        placeholder="请填写会员帐号"
        @keydown.enter.prevent="submit"
      )
    button.btn(
      type="button"
      @click="submit"
    ) 立即填写 ►
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import Star from './Star.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Star
  },
  setup() {
    const store = useStore()
    const account = ref('')
    const isPc = window.innerWidth > 1200

    const submit = () => {
      if (account.value) {
        // 判斷是否已填過調查或資格符不符合
        store.dispatch('survey/setSurveyOpen', true)
      }
    }
    return {
      account,
      submit,
      isPc
    }
  }
})
</script>
