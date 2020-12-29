<template lang="pug">
.answerBlock
  .selector
    template(v-if="isMobile")
      select(
        v-model="selected"
        @change="handleChange"
        @click="toggleSelect"
      )
        option(
          value=""
          disabled
          selected
          hidden
        ) 请选择
        option(
          v-for="(option, i) in question.options"
          :key="option"
          :value="i"
        ) {{ option }}
    template(v-else)
      span(
        @click="toggleSelect"
      ) {{ selectedText ? selectedText : '请选择' }}
      ul
        li(
          v-for="(option, i) in question.options"
          :key="option"
          :value="i.toString()"
          @click="handleChange"
        ) {{ option }}

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Selector',
  props: {
    question: {
      type: Object,
      default: null
    },
    answers: {
      type: Array || String,
      default: null
    }
  },
  setup(props, { emit }) {
    const selectedText = ref('')
    const selected = ref('')

    const u = navigator.userAgent
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    const isMobile = isAndroid || isiOS

    const toggleSelect = () => {
      document.querySelector('.selector')?.classList.toggle('open')
    }

    const handleChange = (event:any) => {
      document.querySelector('.selector')?.classList.remove('open')
      selectedText.value = event.target.innerText
      selected.value = event.target.value
      emit('update:answers', [selected.value])
      emit('update:showError', false)
    }

    return {
      isMobile,
      selectedText,
      selected,
      handleChange,
      toggleSelect
    }
  }
})
</script>
