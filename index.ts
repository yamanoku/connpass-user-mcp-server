#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { z } from "zod";
import DenoJSON from "./deno.json" with { type: "json" };
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
  version: DenoJSON.version,
}, {
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.registerTool(
  "get_connpass_user_list",
  {
    description: "Fetch Connpass user information",
    inputSchema: z.object({
      nickname: z.array(z.string()).describe("Connpass user ID/nickname"),
    }),
  },
  async ({ nickname }: { nickname: string[] }) => {
    return await getUserList(nickname);
  },
);

server.registerTool(
  "get_connpass_user_group_list",
  {
    description: "Fetch Connpass user group information",
    inputSchema: z.object({
      nickname: z.string().describe("Connpass user ID/nickname"),
    }),
  },
  async ({ nickname }: { nickname: string }) => {
    return await getUserGroupList(nickname);
  },
);

server.registerTool(
  "get_connpass_user_events",
  {
    description: "Fetch events for a specific Connpass user",
    inputSchema: z.object({
      nickname: z.string().describe("Connpass user ID/nickname"),
    }),
  },
  async ({ nickname }: { nickname: string }) => {
    return await getUserAttendedEvents(nickname);
  },
);

server.registerTool(
  "get_connpass_user_presenter_events",
  {
    description: "Fetch presenter events for a specific Connpass user",
    inputSchema: z.object({
      nickname: z.string().describe("Connpass user ID/nickname"),
    }),
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
