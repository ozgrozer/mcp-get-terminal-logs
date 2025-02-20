const { z } = require('zod')
const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js')
const {
  StdioServerTransport
} = require('@modelcontextprotocol/sdk/server/stdio.js')

const getTerminalLogs = require('./getTerminalLogs')

const server = new McpServer({
  version: '1.0.0',
  name: 'Get Terminal Logs'
})

server.tool(
  'getTerminalLogs',
  { directoryPath: z.string() },
  async ({ directoryPath }) => {
    try {
      const logs = await getTerminalLogs({ directoryPath })
      return {
        content: [{ type: 'text', text: logs }]
      }
    } catch (err) {
      console.log(err.message)
    }
  }
)

const run = async () => {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

run()
