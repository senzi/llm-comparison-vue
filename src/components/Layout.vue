<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">LLM 答案对比分析</h1>
        <button
          @click="showSettings = true"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <cog-icon class="h-5 w-5 mr-2" />
          配置
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="space-y-8">
        <!-- Error Alert -->
        <div v-if="store.error" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <exclamation-circle-icon class="h-5 w-5 text-red-400" aria-hidden="true" />
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">发生错误</h3>
              <div class="mt-2 text-sm text-red-700">
                <p>{{ store.error }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Section -->
        <section class="bg-white shadow rounded-lg p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">问题输入</h2>
          <textarea
            v-model="questionText"
            rows="4"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="请输入您要测试的问题..."
          ></textarea>
          <div class="mt-4 flex justify-end">
            <button
              @click="submitQuestion"
              :disabled="!questionText.trim()"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              提交
            </button>
          </div>
        </section>

        <!-- Results Section -->
        <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- DeepSeek Reasoner -->
          <div class="bg-white shadow rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">DeepSeek Reasoner</h3>
            <div v-if="store.loading.reasoner" class="flex justify-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
            <template v-else>
              <div class="prose max-w-none">
                <!-- 推理过程（可折叠） -->
                <div class="mb-4">
                  <button 
                    @click="showReasoning = !showReasoning"
                    class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    <chevron-right-icon 
                      class="h-4 w-4 mr-1 transform transition-transform duration-200"
                      :class="{ 'rotate-90': showReasoning }"
                    />
                    推理过程
                  </button>
                  <div 
                    v-show="showReasoning"
                    class="mt-2 pl-5 border-l-2 border-gray-200"
                  >
                    <markdown-renderer :content="store.results.reasoner?.reasoning_content || '暂无数据'" />
                  </div>
                </div>
                <!-- 最终答案 -->
                <div>
                  <h4 class="text-sm font-medium text-gray-700">最终答案</h4>
                  <div class="mt-2">
                    <markdown-renderer :content="store.results.reasoner?.content || '暂无数据'" />
                  </div>
                </div>
              </div>
            </template>
          </div>

          <!-- Moonshot -->
          <div class="bg-white shadow rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Moonshot 直接回答</h3>
            <div v-if="store.loading.chat" class="flex justify-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
            <template v-else>
              <div class="prose max-w-none">
                <div class="text-sm text-gray-500">
                  <markdown-renderer :content="store.results.chat?.content || '暂无数据'" />
                </div>
              </div>
            </template>
          </div>

          <!-- Hybrid Reasoning -->
          <div class="bg-white shadow rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">混合推理(reasoning_content => kimi)</h3>
            <div v-if="store.loading.hybrid" class="flex justify-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
            <template v-else>
              <div class="prose max-w-none">
                <h4 class="text-sm font-medium text-gray-700 mt-4">最终答案</h4>
                <div class="mt-2 text-sm text-gray-500">
                  <markdown-renderer :content="store.results.hybrid?.content || '暂无数据'" />
                </div>
              </div>
            </template>
          </div>
        </section>
      </div>
    </main>

    <!-- Settings Modal -->
    <settings-modal
      :is-open="showSettings"
      @close="showSettings = false"
      @save="handleSettingsSave"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CogIcon, ExclamationCircleIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { useMainStore } from '../stores/main'
import SettingsModal from './SettingsModal.vue'
import MarkdownRenderer from './MarkdownRenderer.vue'

const store = useMainStore()
const showSettings = ref(false)
const questionText = ref('')
const showReasoning = ref(false)  // 控制推理过程的显示/隐藏

const submitQuestion = () => {
  if (!questionText.value.trim()) return
  store.submitQuestion(questionText.value)
}

const handleSettingsSave = (settings) => {
  store.updateApiConfig(settings)
  showSettings.value = false
}
</script>
