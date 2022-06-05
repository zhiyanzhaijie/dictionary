<template>
  <div class="content-box">
    <p v-if="!keyword" class="tip">请输入关键词</p>
    <p v-else-if="keyword && !result.length" class="tip">抱歉，没有该关键字的搜索结果</p>

    <div v-else class="definition" v-for="(definition, index) in result">
      <!-- 音标读音 -->
      <div class="phonetics">
        <span class="phonetic" @click="handleClick(index)">
          {{ definition?.phonetics[0]?.text }}
        </span>
        <i class="iconfont icon-yinliang" @click="handleClick(index)"></i>
        <audio :src="definition?.phonetics[0]?.audio" ref="audio"></audio>
      </div>
      <div class="meanings">
        <div class="meaning" v-for="(meaning, index) in definition.meanings">
          <span class="partOfSpeech">{{ meaning.partOfSpeech }}</span>
          <span class="word-meaning">
            {{
                meaning.definitions
                  .map((definition) => definition.definition)
                  .join(" ")
            }}
          </span>
        </div>
      </div>
    </div>
    <!-- {{ result }} -->
  </div>
</template>

<script setup>
import { getData } from '../api/get';
import { watch } from 'vue'
const props = defineProps({
  keyword: String
})
const audio = $ref()

watch(() => props.keyword, (keyword) => {
  getData(keyword).then(res => {
    result = res
  }).catch(() => {
    result = []
  })

})
// data
let result = $ref([])
// method
const handleClick = (index) => {
  audio[index].currentTime = 0
  audio[index].play()
}
</script>

<style scoped lang='scss'>
::-webkit-scrollbar {
  width: 5px;
  background: var(--theme-color);
}

::-webkit-scrollbar-thumb {
  background: var(--theme-titlebackground);
  border-radius: 20px;
}

.content-box {
  display: flex;
  flex-direction: column;
  color: var(--theme-placeholder);
  border: 10px solid var(--theme-border);
  border-radius: 10px;
  height: 65vh;
  padding: 15px;
  overflow-y: scroll;
  gap: 5px;

  .tip {
    font-size: 18px;
  }

  .definition {
    margin-bottom: 10px;

    .phonetics {
      margin-bottom: 10px;

      .phonetic {
        cursor: pointer;
        border-radius: 5px;

        margin-right: 10px;

        &:hover {
          opacity: 0.8;
        }
      }

      .iconfont {
        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }
      }
    }

    &:last-child {
      .meanings {
        border-bottom: none;
      }
    }

    .meanings {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--theme-border);

      div.meaning {
        padding-bottom: 10px;

        .partOfSpeech {
          color: var(--theme-input);
          margin-right: 10px;
          background-color: var(--theme-titlebackground);
          opacity: 0.8;
          display: inline-block;
          padding-block: 3px;
          padding-inline: 5px;
          font-size: 14px;
          border-radius: 5px;
          line-height: 25px;
        }

        .word-meaning {
          line-height: 25px;
        }
      }
    }
  }
}
</style>
