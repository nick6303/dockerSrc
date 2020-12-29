<template lang="pug">
header#header
  article.pc
    a.logo(
      target="_blank"
      href="#")
      img(src="@/assets/img/logo.png"
    )
    section
      a(
        v-for="item in headerLinks"
        :class="`icon-${item.svg}`"
        target="_blank"
        :href="item.url"
        @click.stop="showRule"
      )
        figure
          img(:src="require(`@/assets/img/header/${item.svg}.png`)", alt="alt")
        figure
          img(:src="require(`@/assets/img/header/${item.svg}_H.png`)", alt="alt")

  article.mb
    a.logo(
      target='_blank'
      href="#"
    )
      img(src="@/assets/img/logo.png")
    a.switchBtn(
      href="#"
      @click.prevent="toggleMenu(true)")
      span

  article#mobileNav(
    :class="{ 'open' : isShowSidebar }")
    a.coverlay(
      href="#"
      @click.prevent="toggleMenu(false)")
    a.close(
      href="#"
      @click.prevent="toggleMenu(false)")
      span ►点击此处缩回选单►
    section
      a.logo(target="_blank" href="#")
        img(src="@/assets/img/logo_M.png")
      ul.top
        //- External activity links
        li(
          v-for="(list,index) in actLinks"
          :key="list.path")
          a(
            :href="list.url"
            target="_blank"
          )
            figure
              img(:src="require(`@/assets/img/header/${list.svg}.png`)", alt="alt")
            p {{ list.title }}
      ul.bottom
        //- Fixed links
        li(
          v-for="list in otherLink"
          :key="list.path")
          a(
            target="_blank"
            :href="list.url"
            @click.stop="showRule"
          )
            figure
              img(:src="require(`@/assets/img/header/${list.svg}.png`)")
            p {{ list.title }}

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useModal } from '../../slime-modal/src'

export default defineComponent({
  name: 'AppHeader',
  setup() {
    const modal = useModal()
    const isShowSidebar = ref(false)
    const toggleMenu = (bool: boolean) => {
      isShowSidebar.value = bool
    }

    const headerLinks = [
      {
        url: 'https://google.com',
        svg: 'home'
      },
      {
        url: '#',
        svg: 'rule'
      },
      {
        url: 'https://google.com',
        svg: 'service'
      }
    ]

    const actLinks = [
      // {
      //   url: 'https://google.com',
      //   title: '',
      //   svg: 'six'
      // },
      // {
      //   url: 'https://google.com',
      //   title: '',
      //   svg: 'envelope'
      // },
      // {
      //   url: 'https://google.com',
      //   title: '',
      //   svg: 'dollar'
      // },
      // {
      //   url: 'https://google.com',
      //   title: '',
      //   svg: 'discount'
      // }
    ]

    const otherLink = [
      {
        url: 'https://google.com',
        title: '官網首頁',
        svg: 'home'
      },
      {
        url: '#',
        title: '活動細則',
        svg: 'rule'
      },
      {
        url: 'https://google.com',
        title: '線上客服',
        svg: 'service'
      }
    ]

    const showRule = (event:any) => {
      if (event.target.href.indexOf('#') > -1) {
        event.preventDefault()
        modal.show('rule')
        toggleMenu(false)
      }
    }

    return {
      isShowSidebar,
      toggleMenu,
      headerLinks,
      actLinks,
      otherLink,
      showRule
    }
  }
})
</script>
