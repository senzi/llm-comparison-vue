import OpenAI from 'openai'
import { config } from '../config'

export class APIService {
  constructor() {
    this.deepseekClient = null
    this.moonshotClient = null
  }

  initClients(apiConfig) {
    console.log('Initializing API clients with config:', apiConfig)
    if (apiConfig.deepseekApiKey) {
      this.deepseekClient = new OpenAI({
        baseURL: config.apis.deepseek.baseUrl,
        apiKey: apiConfig.deepseekApiKey,
        dangerouslyAllowBrowser: true
      })
    }

    if (apiConfig.moonshotApiKey) {
      console.log('Setting up Moonshot client')
      this.moonshotClient = new OpenAI({
        baseURL: config.apis.moonshot.baseUrl,
        apiKey: apiConfig.moonshotApiKey,
        dangerouslyAllowBrowser: true
      })
    }
  }

  async askDeepseekReasoner(question) {
    if (!this.deepseekClient) {
      throw new Error('DeepSeek API 未配置')
    }

    const completion = await this.deepseekClient.chat.completions.create({
      model: config.apis.deepseek.defaultModel.reasoner,
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: question }
      ],
    })

    return {
      reasoning_content: completion.choices[0]?.message?.content || '',
      content: completion.choices[0]?.message?.content || ''
    }
  }

  async askMoonshot(question) {
    if (!this.moonshotClient) {
      console.error('Moonshot client is null')
      throw new Error('Moonshot API 未配置')
    }

    console.log('Calling Moonshot API')
    const completion = await this.moonshotClient.chat.completions.create({
      model: config.apis.moonshot.defaultModel,
      messages: [
        { 
          role: "system", 
          content: "你是 Kimi，由 Moonshot AI 提供的人工智能助手。"
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.3
    })

    return {
      content: completion.choices[0]?.message?.content || ''
    }
  }

  async askHybrid(question, reasoningContent) {
    if (!this.moonshotClient) {
      throw new Error('Moonshot API 未配置')
    }

    const completion = await this.moonshotClient.chat.completions.create({
      model: config.apis.moonshot.defaultModel,
      messages: [
        { 
          role: "system", 
          content: "你是 Kimi，由 Moonshot AI 提供的人工智能助手。我会给你一个问题和另一个AI的推理过程，请你参考这个推理过程，用自己的方式回答问题。"
        },
        {
          role: "user",
          content: `问题：${question}\n\n另一个AI的推理过程：${reasoningContent || '无推理过程'}`
        }
      ],
      temperature: 0.3
    })

    return {
      model: config.apis.moonshot.defaultModel,
      content: completion.choices[0]?.message?.content || ''
    }
  }
}
