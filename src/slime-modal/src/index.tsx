import './assets/helper.sass'

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import {
  App,
  computed,
  watch,
  inject,
  defineComponent,
  defineAsyncComponent,
  resolveComponent,
  Teleport,
  Transition
} from 'vue'

import { createStore } from './store'

import __preventScroll from './utils/prevent-scroll'
import __perfectScrollBar from './utils/perfect-scrollbar'

const modalProvider = Symbol('modalProvider')
const store = createStore()

export const createModal = (folder: string) => {
  return (app: App) => {
    app.directive('perfect-scroll', __perfectScrollBar()) // directive register globaly

    // 定義模組功能
    const show = (
      comp: string,
      payload?: {
        group?: string,
        params?: { [x: string]: any },
        style?: { [x: string]: string },
      }
    ) => {
      if (!comp) throw new Error('empty modal component assign')

      const compNameWithPrefix = `${folder}-${comp}`
      const compNameUpperCamelCase = upperFirst(camelCase(compNameWithPrefix))

      if (!store.state.modals.includes(compNameWithPrefix)) {
        app.component(
          compNameWithPrefix,
          defineAsyncComponent(() =>
            import(`@/components/${folder}/${compNameUpperCamelCase}.vue`)
          )
        )
        store.register(compNameWithPrefix)
      }

      store.show({
        name: compNameWithPrefix,
        group: payload?.group,
        params: payload?.params,
        style: payload?.style
      })
    }

    const close = (group: string) => store.close(group)

    const style = (styles: { [prop: string]: string }, group = 'global') =>
      store.style(styles, group)

    // state & mutations provider
    app.provide(modalProvider, {
      state: store.state,
      style,
      show,
      close
    })
  }
}

export const useModal = (): any => inject(modalProvider) // inject provider

export default defineComponent({
  name: 'modalContainer',
  props: {
    group: {
      type: String,
      default: 'global'
    },
    // 過渡動畫
    transition: {
      type: String,
      default: 'fade'
    },
    // 是否使用遮罩
    mask: {
      type: Boolean,
      default: true
    },
    // 點擊彈窗以外的範圍會關閉彈窗
    sticky: {
      type: Boolean,
      default: false
    }
  },
  directives: {
    bodyScrollLock: {
      mounted(el) {
        disableBodyScroll(el)
      },
      unmounted(el) {
        enableBodyScroll(el)
      }
    }
  },
  setup(props, { attrs }) {
    const { groups } = store.state

    const showing = computed(
      () => !!(Object.keys(groups).length !== 0 && groups[props.group])
    )

    // prevent scrollbar when having mask
    if (props.mask) {
      watch(showing, v => {
        if (v || Object.keys(groups).length === 0) {
          __preventScroll(v)
        }
      })
    }

    return () => {
      let template = <span class="vact-modal-slot"></span> // default template

      if (showing.value) {
        const ModalComponent: any = resolveComponent(groups[props.group].name)

        template = (
          <div
            class={props.mask ? 'vact-modal-wrapper with-mask' : 'vact-modal-wrapper'}
            {...{
              ...attrs,
              style: { ...groups[props.group].style }
            }}
          >
            <ModalComponent
              v-body-scroll-lock
              {...{
                params: groups[props.group].params,
                onClose: () => store.close(props.group)
              }}
            />
          </div>
        )
      }

      return (
        <Teleport to="body">
          <Transition name={`vact-modal-${props.transition}`}>
            {template}
          </Transition>
        </Teleport>
      )
    }
  }
})
