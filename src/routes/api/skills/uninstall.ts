import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../../server/auth-middleware'
import {
  BEARER_TOKEN,
  ensureGatewayProbed,
  dashboardFetch,
  CLAUDE_DASHBOARD_URL,
} from '../../../server/gateway-capabilities'

export const Route = createFileRoute('/api/skills/uninstall')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        try {
          const body = (await request.json()) as {
            skillId?: string
            name?: string
          }
          const name = (body.name || body.skillId || '').trim()
          if (!name) {
            return json(
              { ok: false, error: 'name or skillId required' },
              { status: 400 },
            )
          }

          const capabilities = await ensureGatewayProbed()
          if (!capabilities.dashboard.available) {
            return json(
              {
                ok: false,
                error:
                  `Dashboard is not available at ${CLAUDE_DASHBOARD_URL}. ` +
                  'Start it with `hermes dashboard` to enable skill install/uninstall.',
              },
              { status: 503 },
            )
          }

          const response = await dashboardFetch('/api/skills/uninstall', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
            signal: AbortSignal.timeout(30_000),
          })

          const result = await response.json()
          return json(result, { status: response.status })
        } catch (error) {
          return json(
            {
              ok: false,
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to uninstall skill',
            },
            { status: 500 },
          )
        }
      },
    },
  },
})
