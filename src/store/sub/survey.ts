import { MutationTree, ActionTree } from 'vuex'
import { questState,State } from '../../types'
import { sectionMock } from '../../mock'

const state:questState = {
  surveyOpen: false,
  sections: [],
}

const mutations: MutationTree<typeof state> = {
  setSurveyOpen(state, value){
    state.surveyOpen = value
  },
  ['GET_SURVEY'](state, res) {
    state.sections = res
  }
}

const actions: ActionTree<typeof state, State> = {
  setSurveyOpen({ commit },value){
    commit("setSurveyOpen",value);
  },
  // 取得問卷內容
  getSurvey: async ({ commit }) => {
    // TODO: call api and assign to state.sections
    commit('GET_SURVEY', sectionMock)
  },
  postSurvey: async({ commit }, formData) => {
    // TODO: post api and check verification
    console.log(formData,commit)
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
