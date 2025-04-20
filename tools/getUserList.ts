import type {
  ConnpassUser,
  ConnpassUserListResponse,
  FormatUsers,
} from "../types.ts";
import {
  buildUserListEndpoint,
  fetchConnpassAPI,
  formatResponse,
  formatUsersToMarkdown,
  handleAPIError,
} from "./helpers/index.ts";

/**
 * ConnpassのAPIから指定されたニックネームに基づいてユーザー情報を取得します。
 *
 * この関数はユーザーニックネームの配列を受け取り、ConnpassのAPIにリクエストを送信し、
 * イベント参加統計情報を含むフォーマット済みのユーザー情報を返します。
 *
 * @param nickname - 情報を取得するユーザーニックネームの配列
 * @returns フォーマット済みテキストコンテンツを含むオブジェクトのPromise
 *
 * @throws APIリクエストが失敗した場合にエラーをスローします
 *
 * @example
 * // "yamanoku" と "okuto_oyama" のユーザー情報を取得する
 * const result = await getUserList(['yamanoku', 'okuto_oyama']);
 */
export const getUserList = async (nickname: string[]) => {
  try {
    // https://connpass.com/api/v2/users/?nickname=hoge,fuga
    const endpoint = buildUserListEndpoint(nickname);
    const data = await fetchConnpassAPI<ConnpassUserListResponse>(endpoint);

    // Format events data for better readability
    const formattedUsers: FormatUsers[] = data.users.map(
      (user: ConnpassUser) => ({
        nickname: user.nickname,
        attended_event_count: user.attended_event_count,
        organize_event_count: user.organize_event_count,
        presenter_event_count: user.presenter_event_count,
        bookmark_event_count: user.bookmark_event_count,
      }),
    );

    // Create content using the helper function
    const markdownContent = formatUsersToMarkdown(
      `${nickname}さんのユーザー情報`,
      formattedUsers,
    );

    return formatResponse(markdownContent);
  } catch (error) {
    return handleAPIError(error);
  }
};
