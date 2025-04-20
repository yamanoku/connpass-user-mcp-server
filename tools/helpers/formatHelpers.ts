import type { TextContent } from "@modelcontextprotocol/sdk/types.js";
import type { FormatGroups, FormatUsers } from "../../types.ts";

/**
 * 共通のレスポンス形式に整形する関数
 *
 * @param text - マークダウン形式のテキスト
 * @returns TextContentの配列を含むオブジェクト
 */
export const formatResponse = (
  text: string,
): { content: TextContent[] } => {
  return {
    content: [{ type: "text", text }],
  };
};

/**
 * イベントのマークダウン形式への変換
 *
 * @param title - タイトルテキスト
 * @param events - イベントの配列
 * @param emptyMessage - データがない場合のメッセージ
 * @returns マークダウン形式のテキスト
 */
export const formatEventsToMarkdown = <
  T extends {
    title: string;
    url: string;
    date?: string | null;
    place?: string | null;
    description?: string | null;
  },
>(
  title: string,
  events: T[],
  emptyMessage: string = "イベントが見つかりませんでした。",
): string => {
  return `
# ${title}

${
    events.length > 0
      ? events
        .map(
          (e) => `
          ## ${e.title}\n
          ${e.date ? `- 日時: ${e.date}\n` : ""}
          ${e.place ? `- 場所: ${e.place}\n` : ""}
          - URL: ${e.url}\n\n
          ${e.description || ""}\n
          `,
        )
        .join("\n")
      : emptyMessage
  }
`;
};

/**
 * ユーザー情報をマークダウン形式に変換する関数
 *
 * @param title - タイトルテキスト
 * @param users - ユーザー情報の配列
 * @param emptyMessage - データがない場合のメッセージ
 * @returns マークダウン形式のテキスト
 */
export const formatUsersToMarkdown = (
  title: string,
  users: FormatUsers[],
  emptyMessage: string = "検索したユーザーは見つかりませんでした。",
): string => {
  return `
# ${title}

${
    users.length > 0
      ? users
        .map(
          (u) => `
          - 参加イベント数: ${u.attended_event_count}\n
          - 管理イベント数: ${u.organize_event_count}\n
          - 発表イベント数: ${u.presenter_event_count}\n
          - ブックマークイベント数: ${u.bookmark_event_count}\n
          `,
        )
        .join("\n")
      : emptyMessage
  }
`;
};

/**
 * グループ情報をマークダウン形式に変換する関数
 *
 * @param title - タイトルテキスト
 * @param groups - グループ情報の配列
 * @param emptyMessage - データがない場合のメッセージ
 * @returns マークダウン形式のテキスト
 */
export const formatGroupsToMarkdown = (
  title: string,
  groups: FormatGroups[],
  emptyMessage: string = "所属グループは見つかりませんでした。",
): string => {
  return `
# ${title}

${
    groups.length > 0
      ? groups
        .map(
          (g) => `
          ## ${g.title}\n
          - URL: ${g.url}\n
          - 参加者数: ${g.member_users_count}\n
          ${g.owner ? `- 主催者: ${g.owner}\n` : ""}
          ${g.website_url ? `- サイトURL: ${g.website_url}\n\n` : "\n"}
          ${g.description || ""}\n
          `,
        )
        .join("\n")
      : emptyMessage
  }
`;
};
