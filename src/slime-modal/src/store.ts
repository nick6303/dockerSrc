import { reactive, readonly } from 'vue'

export const createStore = () => {
  const state = reactive({
    modals: [],
    groups: {}
  })

  const register = (modalName: string) => {
    state.modals.push(modalName)
  }

  const show = (payload: {
    name: string
    group?: string
    params?: { [x: string]: any }
    style?: { [x: string]: string }
  }) => {
    const group = payload.group || 'global'

    if (state.groups[group] && !payload.style) {
      state.groups[group].name = payload.name
      state.groups[group].params = payload.params || {}
    } else {
      state.groups[group] = {
        name: payload.name,
        params: payload.params || {},
        style: payload.style || {}
      }
    }
  }

  const close = (groupToClose?: string) => {
    const group = groupToClose || 'global'

    if (Object.prototype.hasOwnProperty.call(state.groups, group)) {
      delete state.groups[group]
    }
  }

  const style = (styles: { [prop: string]: string }, group: string) => {
    if (state.groups[group]) {
      state.groups[group].style = styles
    } else {
      state.groups[group] = {
        name: '',
        params: {},
        style: styles
      }
    }
  }

  return {
    state: readonly(state),
    register,
    show,
    close,
    style
  }
}
