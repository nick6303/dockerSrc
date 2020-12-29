<template lang="pug">
section.alert
  .pen(:class="{finish: type=== 'finish'}")
    p(v-html='message')
  button.close(
    type="button"
    @click="$emit('close')"
  )
  .buttons(v-if="showConfirm")
    button.btn(
      type="button"
      @click="$emit('close')"
    ) 修改
    button.btn(
      type="button"
      @click="send"
    ) 确认送出
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { SurveyPost } from '../../types'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'alert',
  props: {
    params: Object
  },
  setup(props) {
    const root = ref(null)
    const store = useStore()

    const showConfirm = ref(false)
    const type = ref('')
    const message = ref('')

    const send = async () => {
      const formData:SurveyPost[] = props.params?.formData
      await store.dispatch('survey/postSurvey', formData)

      showConfirm.value = false
      type.value = 'finish'

      message.value = '感谢您的耐心填写 若有符合资格彩金将于每周三派发'
    }

    onMounted(() => {
      message.value = props.params?.message.toString()
      type.value = props.params?.type.toString()
      showConfirm.value = (type.value === 'confirm')
    })

    return {
      root,
      showConfirm,
      message,
      type,
      send
    }
  }
})
</script>
