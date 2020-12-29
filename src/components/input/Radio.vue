<template lang="pug">
.answerBlock.radios
  .radio(
    v-for="(radio, i) in question.options"
    :key="radio"
  )
    input(
      type="radio"
      :id="`${count}${i}${radio}`"
      :value="i"
      v-model="active"
      @change="handleChange"
    )
    label(:for="`${count}${i}${radio}`")
      span
      p {{ radio }}
  .radio.other(v-if="question.needOther")
    input(type="radio" :id="`${count}-other`"
      :value="question.options.length"
      v-model="checkedList"
      @change="handleChange"
    )
    label(:for="`${count}-other`")
      span
      p Khác
      input(
        type="text"
        v-model="text"
        @input="handleInput"
      )
</template>
<script lang="ts">

import {
  defineComponent,
  ref,
  computed,
  toRefs,
  PropType
} from 'vue'
import { QuestionState } from '../../types'

export default defineComponent({
  name: 'radio',
  props: {
    question: {
      type: Object as PropType<QuestionState>,
      default: null
    },
    answers: {
      type: Array || String,
      default: null
    },
    context: {
      type: String,
      default: null
    },
    numCount: {
      type: Number,
      default: null
    }
  },
  setup(props, { emit }) {
    const active = ref('')
    const text = ref('')
    const count:number = props.numCount
    const handleChange = () => {
      emit('update:answers', [active.value])
      emit('update:showError', false)
      if (!includeOther.value) {
        text.value = ''
        emit('update:context', '')
      } else {
        emit('update:context', text.value)
      }
    }

    const {
      question
    } = toRefs(props)
    const l = question.value.options?.length || -1
    const includeOther = computed(() => active.value === l.toString())
    const handleInput = (e: Event) => {
      if (includeOther.value) {
        const target = e.target as HTMLInputElement
        emit('update:context', target.value)
      }
    }

    return {
      active,
      text,
      handleChange,
      handleInput,
      count
    }
  }
})

</script>
