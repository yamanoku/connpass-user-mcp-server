import { McpServer } from "npm:@modelcontextprotocol/sdk@^1.9.0/server/mcp.js";
import { StdioServerTransport } from "npm:@modelcontextprotocol/sdk@^1.9.0/server/stdio.js";
import { z } from "npm:zod@^3.24.2";
import {
  getUserAttendedEvents,
  getUserGroupList,
  getUserList,
  getUserPresenterEvents,
} from "./tools/index.ts";

// MCPサーバーの初期化
const server = new McpServer({
  name: "Connpass User MCP Server",
  version: "0.1.0",
  capabilities: {
    resource: {},
    tools: {},
  },
});

server.tool(
  "get_connpass_user_list",
  "Fetch Connpass user information",
  {
    nickname: z.array(z.string()).describe("Connpass user ID/nickname"),
  },
  async ({ nickname }: { nickname: string[] }) => {
    return await getUserList(nickname);
  },
);

server.tool(
  "get_connpass_user_group_list",
  "Fetch Connpass user group information",
  {
    nickname: z.string().describe("Connpass user ID/nickname"),
  },
  async ({ nickname }: { nickname: string }) => {
    return await getUserGroupList(nickname);
  },
);

server.tool(
  "get_connpass_user_events",
  "Fetch events for a specific Connpass user",
  {
    nickname: z.string().describe("Connpass user ID/nickname"),
  },
  async ({ nickname }: { nickname: string }) => {
    return await getUserAttendedEvents(nickname);
  },
);

server.tool(
  "get_connpass_user_presenter_events",
  "Fetch presenter events for a specific Connpass user",
  {
    nickname: z.string().describe("Connpass user ID/nickname"),
  },
  async ({ nickname }: { nickname: string }) => {
    return await getUserPresenterEvents(nickname);
  },
);

// 起動
async function setMCPServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Connpass MCP Server running on stdio");
}

setMCPServer().catch((error) => {
  console.error("Fatal error in setMCPServer():", error);
  Deno.exit(1);
});
