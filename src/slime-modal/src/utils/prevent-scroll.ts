let preventedScroll = false

let scrollPositionX: number
let scrollPositionY: number
let bodyLeft: string
let bodyTop: string

function getHorizontalScrollPosition(scrollTarget: Window | Element) {
  if (scrollTarget === window) {
    return window.pageXOffset || window.scrollX || document.body.scrollLeft || 0
  }
  return (scrollTarget as Element).scrollLeft
}

function getScrollPosition(scrollTarget: Window | Element) {
  if (scrollTarget === window) {
    return window.pageYOffset || window.scrollY || document.body.scrollTop || 0
  }
  return (scrollTarget as Element).scrollTop
}

function preventScroll(state: boolean) {
  const body = document.body

  if (state === true) {
    const overflowY = window.getComputedStyle(body).overflowY

    scrollPositionX = getHorizontalScrollPosition(window)
    scrollPositionY = getScrollPosition(window)

    bodyLeft = body.style.left
    bodyTop = body.style.top

    body.style.left = `-${scrollPositionX}px`
    body.style.top = `-${scrollPositionY}px`
    if (
      overflowY !== 'hidden' &&
      (overflowY === 'scroll' || body.scrollHeight > window.innerHeight)
    ) {
      body.classList.add('vact-body-force-scrollbar-reserve')
    }

    body.classList.add('vact-body-fixed')
  } else {
    body.classList.remove('vact-body-force-scrollbar-reserve')
    body.classList.remove('vact-body-fixed')

    body.style.left = bodyLeft
    body.style.top = bodyTop

    window.scrollTo(scrollPositionX, scrollPositionY)
  }
}

export default (state: boolean) => {
  if (state !== preventedScroll) {
    preventedScroll = state
    preventScroll(state)
  }
}
