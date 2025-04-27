<p align="center">
  <img src="./logo.png" alt="Connpass User MCP Serverロゴ" width="200" height="200">
</p>

<h1 align="center">Connpass User MCP Server</h1>

[Connpass](https://connpass.com/)のユーザー情報や参加イベント情報等を取得するModel
Context Protocol (MCP)サーバーです。

## セットアップ

1. （Connpass APIキーをすでに取得済の場合はスキップ）Connpass
   APIキーの発行をしてもらいます。詳細については[connpassのAPI利用について](https://help.connpass.com/api/)を参照してください。
2. 必要な環境変数を設定します。`.env.example` を `.env` にコピーして、Connpass
   APIキーを設定します。

```bash
cp .env.example .env
# .envファイルを編集してCONNPASS_API_KEYを設定
```

3. サーバーを起動します。以下はClaude Desktopでの起動方法の例です。

```json
"connpass-user-mcp-server": {
  "command": "wsl.exe",
  "args": [
    "/home/user/.deno/bin/deno",
    "--allow-net=connpass.com",
    "--env-file=/home/user/connpass-mcp-server/.env",
    "--allow-read",
    "--allow-env",
    "/home/user/connpass-mcp-server/connpass-user-mcp-server.ts"
  ]
}
```

## 機能

以下のMCPサーバーのToolsを提供しています：

### Tools

- **get_connpass_user_list** - Connpassユーザーの基本情報を取得します
  - パラメータ: `nickname` (Connpassユーザー名/ニックネームの配列)
  - 取得情報:
    参加イベント数、管理イベント数、発表イベント数、ブックマークイベント数

- **get_connpass_user_group_list** -
  Connpassユーザーが所属するグループ一覧を取得します
  - パラメータ: `nickname` (Connpassユーザー名/ニックネーム)
  - 取得情報: グループ名、URL、説明、参加者数など

- **get_connpass_user_events** -
  Connpassユーザーが参加したイベント情報を取得します
  - パラメータ: `nickname` (Connpassユーザー名/ニックネーム)
  - 取得情報: イベント名、日時、場所、URL、説明

- **get_connpass_user_presenter_events** -
  Connpassユーザーが発表者として参加したイベント情報を取得します
  - パラメータ: `nickname` (Connpassユーザー名/ニックネーム)
  - 取得情報: イベント名、日時、場所、URL、説明

## プロンプト例

次のようなプロンプトをLLMへ渡すことが可能です：

- 「yamanoku, okuto_oyamaさんのConnpassユーザー情報を教えて」
- 「yamanokuさんの参加するConnpassイベント情報を教えて」
- 「yamanokuさんの発表したConnpassイベント一覧を表示して」
- 「yamanokuさんのConnpass所属グループを一覧表示して」

## テスト

Connpass APIの統合テストを実行します：

```bash
deno task test
```

## 謝辞

このOSSはClaude 3.7
Sonnetによって実装、ドキュメントのサンプルを提案いただきました。感謝申し上げます。

## ライセンス

[MIT License](./LICENSE)

