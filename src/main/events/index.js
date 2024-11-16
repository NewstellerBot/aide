import { onWindowMessage } from './window'
import { executeGraph } from './llm'
import { getFlows } from './database'

export const EVENTS = {
  'window:message': onWindowMessage,
  'llm:execute': executeGraph,
  'db:getFlows': getFlows,
}
