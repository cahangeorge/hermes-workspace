import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import {
  CLAUDE_API,
  CLAUDE_DASHBOARD_URL,
  ensureGatewayProbed,
  getCapabilities,
  getGatewayMode,
} from '../../server/gateway-capabilities'

export const Route = createFileRoute('/api/gateway-status')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // Allow unauthenticated access — this endpoint only returns
        // public capability/probe info, not user data.
        void request
        const capabilities = await ensureGatewayProbed()
        return json({
          capabilities,
          mode: getGatewayMode(),
          claudeUrl: CLAUDE_API,
          dashboardUrl: CLAUDE_DASHBOARD_URL,
          gateway: {
            available: capabilities.health || capabilities.chatCompletions,
            url: CLAUDE_API,
          },
          dashboard: capabilities.dashboard,
        })
      },
    },
  },
})
