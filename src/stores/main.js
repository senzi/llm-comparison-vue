import { defineStore } from 'pinia'
import { ref } from 'vue'
import { APIService } from '../services/api'

export const useMainStore = defineStore('main', () => {
  const apiService = new APIService()
  
  const question = ref('')
  const loading = ref({
    reasoner: false,
    chat: false,
    hybrid: false
  })
  const results = ref({
    reasoner: null,
    chat: null,
    hybrid: null
  })
  const error = ref(null)

  // 在创建 store 时初始化 API 客户端
  const initializeFromLocalStorage = () => {
    const config = {
      deepseekApiKey: localStorage.getItem('deepseek_api_key'),
      moonshotApiKey: localStorage.getItem('moonshot_api_key')
    }
    if (config.deepseekApiKey || config.moonshotApiKey) {
      updateApiConfig(config)
    }
  }

  function updateApiConfig(config) {
    try {
      console.log('Updating API config:', config)
      apiService.initClients(config)
      error.value = null
    } catch (err) {
      console.error('Error updating API config:', err)
      error.value = err.message
    }
  }

  async function submitQuestion(questionText) {
    if (!questionText.trim()) return

    question.value = questionText
    error.value = null
    
    // 重置结果
    results.value = {
      reasoner: null,
      chat: null,
      hybrid: null
    }

    // 调用 Deepseek Reasoner
    loading.value.reasoner = true
    try {
      results.value.reasoner = await apiService.askDeepseekReasoner(questionText)
    } catch (err) {
      console.error('Error calling DeepSeek Reasoner:', err)
      error.value = err.message
    } finally {
      loading.value.reasoner = false
    }

    // 调用 Moonshot
    loading.value.chat = true
    try {
      results.value.chat = await apiService.askMoonshot(questionText)
    } catch (err) {
      console.error('Error calling Moonshot:', err)
      error.value = err.message
    } finally {
      loading.value.chat = false
    }

    // 调用 Hybrid，传入思维链内容
    loading.value.hybrid = true
    try {
      console.log('Reasoner result:', results.value.reasoner)
      results.value.hybrid = await apiService.askHybrid(
        questionText,
        results.value.reasoner?.reasoning_content
      )
    } catch (err) {
      console.error('Error calling Hybrid:', err)
      error.value = err.message
    } finally {
      loading.value.hybrid = false
    }
  }

  // 立即初始化
  initializeFromLocalStorage()

  return {
    question,
    loading,
    results,
    error,
    updateApiConfig,
    submitQuestion
  }
})
