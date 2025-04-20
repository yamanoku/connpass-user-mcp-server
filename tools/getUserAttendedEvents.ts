import type {
  ConnpassAttendedEventsResponse,
  ConnpassEvent,
  FormatEvents,
} from "../types.ts";
import {
  buildUserEndpoint,
  fetchConnpassAPI,
  formatEventsToMarkdown,
  formatResponse,
  handleAPIError,
} from "./helpers/index.ts";

/**
 * ConnpassユーザーのイベントAPIから参加イベントを取得し、マークダウン形式にフォーマットします。
 *
 * この関数は、指定されたConnpassユーザーが参加したイベントを取得し、
 * MCP (Microsoft Copilot)での表示に適した読みやすいマークダウン構造にデータを変換します。
 *
 * @param nickname - イベントを取得するConnpassのユーザー名
 * @returns フォーマットされたテキストコンテンツを含むオブジェクトを解決するPromise
 * @throws fetch操作が失敗した場合、エラーをログに記録してエラーメッセージを返します
 *
 * @example
 * // ユーザー "yamanoku" のイベントを取得する
 * const events = await getAttendedEvents("yamanoku");
 */
export const getUserAttendedEvents = async (nickname: string) => {
  try {
    // https://connpass.com/api/v2/users/{nickname}/attended_events/
    const endpoint = buildUserEndpoint("attended_events", nickname);
    const data = await fetchConnpassAPI<ConnpassAttendedEventsResponse>(
      endpoint,
    );

    // Format events data for better readability
    const formattedEvents: FormatEvents[] = data.events.map(
      (event: ConnpassEvent) => ({
        title: event.title,
        url: event.url,
        date: event.started_at,
        place: event.place,
        description: event.description,
      }),
    );

    // Create content using the helper function
    const markdownContent = formatEventsToMarkdown(
      `${nickname}さんのConnpassイベント情報`,
      formattedEvents,
      "参加するイベントが見つかりませんでした。",
    );

    return formatResponse(markdownContent);
  } catch (error) {
    return handleAPIError(error);
  }
};
