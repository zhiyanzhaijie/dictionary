

<template>
  <div class="container" :class="isLight ? 'light-mode' : ''">
    <main>
      <Header :is-light="isLight" @updatemode="changeMode" @send:keyword="updateKeyword" />
      <Definition :keyword="keyword" />
    </main>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Definition from './components/Main.vue'
let isLight = $ref(false)
let keyword = $ref('')
const changeMode = () => {
  isLight = !isLight
}
const updateKeyword = (value) => {
  keyword = value
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background: var(--theme-color);
  overflow: hidden;

  main {
    max-width: 1000px;
    width: 70vw;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    // justify-content: space-around;
    // // align-items: center;
  }
}
</style>
