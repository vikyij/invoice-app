import { setupServer } from 'msw/node'
import { requestHandlers } from './requestHandlers'

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...requestHandlers)
