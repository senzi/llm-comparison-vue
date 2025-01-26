# LLM 答案对比分析

一个基于 Vue 3 + Vite 的工具，用于对比不同 LLM 模型的回答质量和推理过程。目前支持 DeepSeek 和 Moonshot AI 的对比分析。

## 功能特点

- 🤖 支持多个 LLM 模型对比
  - DeepSeek Reasoner：提供详细的推理过程
  - Moonshot AI：直接回答
  - 混合推理：将 DeepSeek 的推理过程提供给 Moonshot，生成更全面的答案

- 🎨 现代化的用户界面
  - 响应式设计，支持移动端和桌面端
  - 优雅的加载动画
  - 可折叠的推理过程展示
  - Markdown 和 LaTeX 公式渲染

- ⚙️ 便捷的配置管理
  - API Key 本地存储
  - 开发/生产环境自适应的 API 代理配置

## 技术栈

- Vue 3 + Vite
- Tailwind CSS
- Headless UI
- Pinia 状态管理
- OpenAI API 客户端
- KaTeX 数学公式渲染

## 快速开始

1. 克隆项目
```bash
git clone [your-repo-url]
cd llm-comparison-vue
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 构建生产版本
```bash
npm run build
```

## 使用说明

1. 点击右上角的"配置"按钮，设置 DeepSeek 和 Moonshot 的 API Key
2. 在输入框中输入你的问题
3. 点击"提交"按钮，等待结果
4. 查看三个模块的不同回答：
   - DeepSeek Reasoner：包含推理过程（可折叠）和最终答案
   - Moonshot 直接回答：简洁的答案
   - 混合推理：结合 DeepSeek 的推理过程的 Moonshot 回答

## 注意事项

- API Key 存储在浏览器的 localStorage 中，请注意安全性
- 确保有稳定的网络连接以访问 API
- 部分复杂的数学公式可能需要一定的加载时间

## License

MIT
