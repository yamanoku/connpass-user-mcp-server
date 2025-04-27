<p align="center">
  <img src="./logo.png" alt="Connpass User MCP Serverロゴ" width="200" height="200">
</p>

<h1 align="center">Connpass User MCP Server</h1>

[Connpass](https://connpass.com/)のユーザー情報や参加イベント情報等を取得するModel
Context Protocol (MCP)サーバーです。

## セットアップ

1. （Connpass APIキーをすでに取得済の場合はスキップ）Connpass
   APIキーの発行をしてもらいます。詳細については[connpassのAPI利用について](https://help.connpass.com/api/)を参照してください。
2. このリポジトリをクローンします。
3. 必要な環境変数を設定します。`.env.example` を `.env` にコピーして、Connpass
   APIキーを設定します。

```bash
cp .env.example .env
# .envファイルを編集してCONNPASS_API_KEYを設定
```

4. サーバーを起動します。

### Denoでの起動（推奨）

```json
"connpass-user-mcp-server": {
  "command": "wsl.exe",
  "args": [
    "/home/user/.deno/bin/deno",
    "--allow-net=connpass.com",
    "--env-file=/home/user/connpass-mcp-server/.env",
    "--allow-read",
    "--allow-env",
    "/home/user/connpass-mcp-server/index.ts"
  ]
}
```

### Node.jsでの起動

1. MCPサーバーを起動するために必要な依存関係をインストールします。

```bash
npm ci
```

2. TypeScriptをビルドします。

```bash
npm run build
```

3. MCPクライアントの設定ファイル側にビルドしたファイルを指定します。

```json
"connpass-user-mcp-server": {
  "command": "wsl.exe",
  "args": [
    "/home/user/.local/share/mise/installs/node/22.14.0/bin/node",
    "--env-file=/home/user/connpass-mcp-server/.env",
    "/home/user/connpass-mcp-server/dist/index.js"
  ]
}
```

### Dockerでの起動

Dockerfileを使用してサーバーを起動することもできます。

1. Dockerイメージをビルドします。

```bash
docker build -t connpass-user-mcp-server .
```

2. コンテナを起動します。APIキーは環境変数として渡します。

```bash
docker run -e CONNPASS_API_KEY=XXXXXXXXXXXXXXXX connpass-user-mcp-server
```

MCPクライアントの設定ファイルでは、`docker`コマンドを指定します。

```json
"connpass-user-mcp-server": {
  "command": "docker",
  "args": [
    "run",
    "-e",
    "CONNPASS_API_KEY=XXXXXXXXXXXXXXXX",
    "connpass-user-mcp-server"
  ]
}
```

### `npx`での起動（非推奨）

[@yamanoku/connpass-user-mcp-server](https://www.npmjs.com/package/@yamanoku/connpass-user-mcp-server)にてパッケージを提供しているため、リポジトリをクローンせずに`npx`でMCPサーバーの起動が可能です。

```json
"connpass-user-mcp-server": {
  "command": "wsl.exe",
  "args": [
    "bash",
    "-c",
    "CONNPASS_API_KEY=XXXXXXXXXXXXXXXX /home/user/.local/share/mise/installs/node/22.14.0/bin/npx -y @yamanoku/connpass-user-mcp-server",
  ]
},
```

**ただし`npx`でMCPサーバーを起動するのはサプライチェーン攻撃などのセキュリティ的な懸念があるため非推奨としています。**

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

### Denoでのテスト

Connpass APIの統合テストを実行します：

```bash
deno task test
```

## 謝辞

このOSSはGPT-4o Image Generationによってロゴを製作、Claude 3.7
Sonnetによって実装、ドキュメントのサンプルを提案いただきました。感謝申し上げます。

## ライセンス

[MIT License](./LICENSE)
