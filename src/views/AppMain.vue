<template lang="pug">
main
  Survey(v-if="surveyOpen")
  Home(v-else)
ModalContainer.modules
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import ModalContainer from '../slime-modal'
import { Home, Survey } from '../components/pages'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'AppMain',
  components: {
    ModalContainer,
    Home,
    Survey
  },
  setup() {
    const store = useStore()
    const surveyOpen = computed(() => store.state.survey.surveyOpen)
    return {
      surveyOpen
    }
  }
})
</script>
