import OpenAI from 'openai'
import dotenv from 'dotenv'
dotenv.config()

class LLM {
  constructor() {
    const OPENAPI_KEY = process.env.OPENAPI_KEY
    if (!OPENAPI_KEY) {
      throw new Error('OPENAPI_KEY not found')
    }

    this.openai = new OpenAI({ apiKey: OPENAPI_KEY })
  }

  async generateResponse(input) {
    return await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: input },
      ],
    })
  }
}

export default LLM
