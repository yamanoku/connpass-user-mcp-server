#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  getUserAttendedEvents,
  getUserGroupList,
  getUserList,
  getUserPresenterEvents,
} from "./tools/index.ts";
import process from "node:process";

// MCPサーバーの初期化
const server = new McpServer({
  name: "Connpass User MCP Server",
  version: "0.1.1",
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
  process.exit(1);
});
