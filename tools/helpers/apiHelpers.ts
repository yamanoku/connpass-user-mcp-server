import type { TextContent } from "@modelcontextprotocol/sdk/types.js";
import { USERSAPI } from "../../constants.ts";
import { env } from "node:process";

const API_KEY = env.CONNPASS_API_KEY || "";

if (!API_KEY) {
  console.warn("Warning: CONNPASS_API_KEY is not set in .env file");
}

/**
 * ConnpassのAPIにリクエストを送信し、結果を取得する共通関数
 *
 * @param endpoint - APIエンドポイントのパス
 * @returns APIレスポンス
 * @throws APIリクエストが失敗した場合にエラーをスローします
 */
export const fetchConnpassAPI = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(endpoint, {
    headers: {
      "X-API-Key": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch from Connpass API: ${response.status}`);
  }

  return await response.json() as T;
};

/**
 * ユーザー関連のAPIエンドポイントを構築する関数
 *
 * @param path - APIパス（例: "attended_events", "presenter_events"など）
 * @param nickname - ユーザーニックネーム
 * @returns フルエンドポイントURL
 */
export const buildUserEndpoint = (
  path: string,
  nickname: string,
): string => {
  return `${USERSAPI}${nickname ? `/${nickname}` : ""}${
    path ? `/${path}/` : "/"
  }`;
};

/**
 * 複数ユーザーの検索エンドポイントを構築する関数
 *
 * @param nicknames - ユーザーニックネームの配列
 * @returns フルエンドポイントURL
 */
export const buildUserListEndpoint = (
  nicknames: string[],
): string => {
  return `${USERSAPI}/?nickname=${nicknames.join(",")}`;
};

/**
 * エラー処理共通関数
 *
 * @param error - 発生したエラー
 * @returns エラーメッセージを含むTextContentの配列
 */
export const handleAPIError = (error: unknown): { content: TextContent[] } => {
  console.error("Error processing API request:", error);
  return {
    content: [
      {
        type: "text",
        text:
          "情報取得中にエラーが発生しました。しばらく経ってから再試行してください。",
      },
    ],
  };
};
