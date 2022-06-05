<template>
  <div class="header-container">
    <h2>{{ keyword ? keyword : 'Echo!!!' }}</h2>
    <i class="iconfont" :class="isLight ? 'icon-rijianmoshi' : 'icon-dark'" @click="changeMode"></i>
    <input type="text" placeholder="search your word" v-model="keyword"
      @keyup="sendKeyword($event.target.value, $event)">
  </div>
</template>

<script setup>

const emit = defineEmits(['updatemode', 'send:keyword'])

// data 
defineProps({
  isLight: Boolean
})
const keyword = $ref('')
// method
const changeMode = () => {
  emit('updatemode')
}
const sendKeyword = (value, event) => {
  // if (event.keyCode !== 13) return
  emit('send:keyword', value)
}
</script>

<style scoped lang='scss'>
.header-container {
  display: flex;
  flex-direction: column;
  // flex-wrap: nowrap;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 30vh;
  overflow: hidden;

  h2 {
    font-size: 7vw;
    font-weight: 100;
    color: var(--theme-input);

    @media (max-width:1000px) {
      font-size: 11vw;
    }
  }

  input {
    width: 50vw;
    height: 4vh;
    outline: none;
    border: none;
    font-size: 2vw;
    color: var(--theme-placeholder);
    background-color: var(--theme-color);
    border-bottom: solid 1px var(--theme-border);

    &:focus {
      color: var(--theme-input);
      border-bottom: solid 1px var(--theme-input);
    }
  }

  >i {
    position: absolute;
    padding: 0.5vw;
    font-size: 2vw;
    top: 0;
    right: 0;
  }
}
</style>
