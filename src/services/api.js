import axios from 'axios'

export const moonshotAPI = axios.create({
  baseURL: 'https://api.moonshot.cn/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const deepseekAPI = axios.create({
  baseURL: 'https://api.deepseek.com/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器添加token
moonshotAPI.interceptors.request.use(config => {
  const apiKey = localStorage.getItem('moonshotApiKey')
  if (apiKey) {
    config.headers['Authorization'] = `Bearer ${apiKey}`
  }
  return config
})

deepseekAPI.interceptors.request.use(config => {
  const apiKey = localStorage.getItem('deepseekApiKey')
  if (apiKey) {
    config.headers['Authorization'] = `Bearer ${apiKey}`
  }
  return config
})

export class APIService {
  constructor() {
    // 从localStorage初始化
    this.initClients({
      deepseekApiKey: localStorage.getItem('deepseekApiKey'),
      moonshotApiKey: localStorage.getItem('moonshotApiKey')
    })
  }

  initClients(apiConfig) {
    if (apiConfig.deepseekApiKey) {
      localStorage.setItem('deepseekApiKey', apiConfig.deepseekApiKey)
    }
    if (apiConfig.moonshotApiKey) {
      localStorage.setItem('moonshotApiKey', apiConfig.moonshotApiKey)
    }
  }

  async askDeepseekReasoner(question) {
    if (!localStorage.getItem('deepseekApiKey')) {
      throw new Error('Deepseek API 未配置')
    }

    const response = await deepseekAPI.post('/chat/completions', {
      model: 'deepseek-reasoner',
      messages: [
        {
          role: 'user',
          content: question
        }
      ]
    })

    const result = {
      model: 'deepseek-reasoner',
      reasoning_content: response.data.choices[0].message.reasoning_content || '',
      content: response.data.choices[0].message.content || ''
    }
    
    return result
  }

  async askMoonshot(question) {
    if (!localStorage.getItem('moonshotApiKey')) {
      throw new Error('Moonshot API 未配置')
    }

    const response = await moonshotAPI.post('/chat/completions', {
      model: 'moonshot-v1-8k',
      messages: [
        {
          role: 'user',
          content: question
        }
      ]
    })

    const result = {
      model: 'moonshot-v1-8k',
      content: response.data.choices[0]?.message?.content || ''
    }
    
    return result
  }

  async askHybrid(question, reasoningContent) {
    if (!localStorage.getItem('moonshotApiKey')) {
      throw new Error('Moonshot API 未配置')
    }

    const userContent = `问题：${question}\n\n另一个AI的推理过程：${reasoningContent || '无推理过程'}`
    console.log('Hybrid user content:', userContent)

    const response = await moonshotAPI.post('/chat/completions', {
      model: 'moonshot-v1-auto',
      messages: [
        {
          role: 'system',
          content: '你是 Kimi，由 Moonshot AI 提供的人工智能助手。我会给你一个问题和另一个AI的推理过程，请你参考这个推理过程，用自己的方式回答问题。'
        },
        {
          role: 'user',
          content: userContent
        }
      ]
    })

    const result = {
      model: 'moonshot-v1-auto',
      content: response.data.choices[0]?.message?.content || ''
    }
    
    return result
  }
}
