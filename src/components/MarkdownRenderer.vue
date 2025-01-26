<template>
  <div class="markdown-content" v-html="renderedContent"></div>
</template>

<script setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import mk from 'markdown-it-katex'
import 'katex/dist/katex.min.css'

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
}).use(mk)

const renderedContent = computed(() => {
  return md.render(props.content || '')
})
</script>

<style>
.markdown-content {
  font-size: 14px;
  line-height: 1.6;
}

.markdown-content p {
  margin-bottom: 1em;
}

.markdown-content ul {
  list-style-type: disc;
  padding-left: 2em;
  margin-bottom: 1em;
}

.markdown-content li {
  margin-bottom: 0.5em;
}

.markdown-content strong {
  font-weight: 600;
}
</style>
