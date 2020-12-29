import { Plugin, DefineComponent } from 'vue'
interface ModalState {
  modals: string[]
  groups: {
    [group: string]: {
      name: string
      params: { [x: string]: any } | {}
      style: { [x: string]: string } | {}
    }
  }
}

export function createModal(folder: string): Plugin

export function useModal(): {
  state: ModalState
  show: (
    comp: string,
    payload?: {
      group?: string
      params?: { [x: string]: any }
      style?: { [x: string]: string }
    }
  ) => void
  close: (group?: string) => void
  style: (styles: { [prop: string]: string }, group: string) => void
}

declare const modalContainer: DefineComponent
export default modalContainer
