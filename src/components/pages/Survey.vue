<template lang="pug">
article.survey
  section.title
    img(src="@/assets/img/survey/title.png", alt="alt")
  section.sections
    .scrollBox(v-perfect-scroll)
      .section(
        v-for="(section,index) in sections"
        :key="section.id"
      )
        h5 {{section.title}}
        h6 {{section.description}}
        .questionBlock(
          v-for="(question, qi) in section.questions" :key="question.id"
          :class="question.isRequired? 'require':''"
        )
          .subject(:class="(numCount(index,qi) > 9) ?'more':''") {{ `${numCount(index,qi)}.` }}{{question.subject}}
          component(
            :is="inputType[question.type]"
            :question="question"
            :numCount="numCount(index,qi)"
            v-model:answers="formData[index].questions[qi].answers"
            v-model:context="formData[index].questions[qi].context"
            v-model:showError="formData[index].questions[qi].showError"
          )
      .buttons
        button(
          type="button"
          @click="checkValidate"
        )
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue'
import { useModal } from '../../slime-modal/src'
import { useStore } from 'vuex'
import { SurveyPost, QuestionPost } from '../../types'
import { Checkbox, Radio, Selector, Text } from '../input'

export default defineComponent({
  name: 'Survey',
  components: {
    Checkbox,
    Radio,
    Selector,
    Text
  },
  setup() {
    const modal = useModal()

    const store = useStore()
    store.dispatch('survey/getSurvey')
    const sections = computed(() => store.state.survey.sections)

    const tmp: SurveyPost[] = []
    sections.value.forEach(section => {
      const questions: QuestionPost[] = []
      section.questions.forEach(question => {
        const {
          id
        } = question
        const q = {
          id, // question id
          answers: [], // QType: 1、2、4 時，資料型態為 array
          context: '', // QType: 3 或有 "其他" 選項內容
          showError: false // for 驗證用
        }
        questions.push(q)
      })
      const obj = {
        id: section.id, // sections id
        questions
      }
      tmp.push(obj)
    })

    const formData = reactive(tmp)
    const inputType = {
      1: 'Radio',
      2: 'Checkbox',
      3: 'Text',
      4: 'Selector'
    }

    const numCount = (index:number, qi:number) => {
      let count = 0
      for (let i = 0; i < index; i++) {
        count = count + sections.value[i].questions.length
      }
      return count + qi + 1
    }

    const checkValidate = async () => {
      const arr: boolean[] = []
      for (let i = 0; i < sections.value.length; i++) {
        formData[i].questions.forEach((q, qi) => {
          const {
            isRequired,
            type
          } = sections.value[i].questions[qi]
          if (isRequired) {
            let status = !!q.answers?.length
            if (type === 3) {
              status = !!q.context
            }
            formData[i].questions[qi].showError = !status
            arr.push(status)
          }
        })
      }

      if (arr.every(Boolean)) {
        // 填完選單
        const params = {
          type: 'confirm',
          message: '别急～送出前最后确认下吧',
          formData
        }
        modal.show('alert', { params })
      } else {
        // 有必填沒填
        const params = {
          type: 'notFinish',
          message: '提醒您 您有题目尚未完成'
        }
        modal.show('alert', { params })
      }
    }

    return {
      sections,
      formData,
      inputType,
      numCount,
      checkValidate
    }
  }
})
</script>
