import type {
  ConnpassEvent,
  ConnpassPresenterEventsResponse,
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
 * Connpass APIから指定されたユーザーが発表者だったイベントを取得します。
 *
 * この関数は、指定されたユーザーニックネームの発表イベントデータを取得し、
 * フォーマットして、MCP（Message Content Provider）で使用できるmarkdownコンテンツとして返します。
 *
 * @param nickname - 発表イベントを取得するConnpassユーザーのニックネーム
 * @returns ユーザーの発表イベントを表示するmarkdownテキストとしてフォーマットされたTextContentアイテムの配列を含むオブジェクトを解決するPromise
 *
 * @throws APIリクエストが失敗した場合、エラーをスローします
 *
 * @example
 * // ユーザー "yamanoku" の発表したイベントを取得する
 * const events = await getUserPresenterEvents("yamanoku");
 */
export const getUserPresenterEvents = async (nickname: string) => {
  try {
    // https://connpass.com/api/v2/users/{nickname}/presenter_events/
    const endpoint = buildUserEndpoint("presenter_events", nickname);
    const data = await fetchConnpassAPI<ConnpassPresenterEventsResponse>(
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
      `${nickname}さんの発表イベント情報`,
      formattedEvents,
      "発表しているイベントが見つかりませんでした。",
    );

    return formatResponse(markdownContent);
  } catch (error) {
    return handleAPIError(error);
  }
};
