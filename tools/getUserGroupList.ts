import type {
  ConnpassGroup,
  ConnpassUserGroupListResponse,
  FormatGroups,
} from "../types.ts";
import {
  buildUserEndpoint,
  fetchConnpassAPI,
  formatGroupsToMarkdown,
  formatResponse,
  handleAPIError,
} from "./helpers/index.ts";

/**
 * Connpass APIから指定されたユーザーの所属するグループ一覧を取得します。
 *
 * この関数は、指定されたユーザーニックネームの発表イベントデータを取得し、
 * フォーマットして、MCP（Message Content Provider）で使用できるmarkdownコンテンツとして返します。
 *
 * @param nickname - グループ情報を照会するConnpassユーザーのニックネーム
 * @returns ユーザーのグループを含むフォーマット済みテキストコンテンツを持つオブジェクトを解決するPromise
 *
 * @throws API要求が失敗した場合にエラーをスローします
 *
 * @example
 * // ユーザー "yamanoku" の所属するグループ一覧を取得する
 * const events = await getUserGroupList("yamanoku");
 */
export const getUserGroupList = async (nickname: string) => {
  try {
    // https://connpass.com/api/v2/users/{nickname}/groups/
    const endpoint = buildUserEndpoint("groups", nickname);
    const data = await fetchConnpassAPI<ConnpassUserGroupListResponse>(
      endpoint,
    );

    // Format groups data for better readability
    const formattedGroup: FormatGroups[] = data.groups.map(
      (group: ConnpassGroup) => ({
        title: group.title,
        url: group.url,
        description: group.description,
        owner: group.owner_text,
        website_url: group.website_url,
        member_users_count: group.member_users_count,
      }),
    );

    // Create content using the helper function
    const markdownContent = formatGroupsToMarkdown(
      `${nickname}さんの所属グループ一覧`,
      formattedGroup,
    );

    return formatResponse(markdownContent);
  } catch (error) {
    return handleAPIError(error);
  }
};
