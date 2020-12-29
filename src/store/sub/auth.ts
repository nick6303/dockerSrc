import { MutationTree, ActionTree } from 'vuex'
import { AuthState, State } from '../../types'

const SET_VALIDATION = 'SET_VALIDATION' // 設定驗證結果文字

const state: AuthState = {
  validation:''
}

const mutations: MutationTree<typeof state> = {
  [ SET_VALIDATION](state, value) {
    state.validation = value
  }
}

const actions: ActionTree<typeof state, State> = {
  resetValidation: ({ commit }) => {
    commit(SET_VALIDATION, '')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
