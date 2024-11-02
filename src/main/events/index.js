import { onWindowMessage } from './window'
import { executeGraph } from './llm'

export const EVENTS = {
    'window:message': onWindowMessage,
    'llm:execute': executeGraph,
}
