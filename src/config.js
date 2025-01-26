// 获取当前环境的 API 基础 URL
function getBaseUrl() {
  if (import.meta.env.PROD) {
    // 生产环境使用相对路径，这样可以适应不同的部署域名
    return '/api'
  }
  // 开发环境使用完整的本地开发服务器地址
  return 'http://localhost:5173/api'
}

export const config = {
  baseUrl: getBaseUrl(),
  apis: {
    moonshot: {
      baseUrl: `${getBaseUrl()}/moonshot`,
      defaultModel: 'moonshot-v1-8k'
    },
    deepseek: {
      baseUrl: `${getBaseUrl()}/deepseek`,
      defaultModel: {
        reasoner: 'deepseek-reasoner',
        chat: 'deepseek-chat'
      }
    }
  }
}
