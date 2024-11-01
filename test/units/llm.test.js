import LLM from '../../src/main/llm'

describe('test response', () => {
  const llm = new LLM()
  test('response', async () => {
    const response = await llm.generateResponse('Hello')
    expect(response).not.toBeNull()
  })
})
