<template lang="pug">
.answerBlock.checkBoxs
  .checkBox(
    v-for="(checkBox,i) in question.options"
    :key="checkBox"
  )
    input(
      type="checkbox"
      :id="`${count}${i}${checkBox}`"
      :value="i"
      v-model="checkedList"
      @change="handleChange"
    )
    label(:for="`${count}${i}${checkBox}`")
      span
      p {{ checkBox }}
  .checkBox.other(v-if="question.needOther")
    input(
      type="checkbox" :id="`${count}-other`"
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
  name: 'Checkbox',
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
    const checkedList = ref([] as number[])
    const text = ref('')
    const count:number = props.numCount
    const handleChange = () => {
      emit('update:answers', checkedList.value)
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

    const includeOther = computed(() => checkedList.value.includes(l))

    const handleInput = (e: Event) => {
      if (includeOther.value) {
        const target = e.target as HTMLInputElement
        emit('update:context', target.value)
      }
    }
    return {
      checkedList,
      handleChange,
      handleInput,
      text,
      count
    }
  }
})
</script>
