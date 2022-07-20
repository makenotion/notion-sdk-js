# GitHubのIssueをNotionに取得するサンプルコードです。

<img src="https://dev.notion.so/front-static/external/readme/images/github-notion-example@2x.png" alt="drawing" width="500"/>

## このインテグレーションについて

このNotionのインテグレーションは、指定したGithubのリポジトリのIssueをNotionのデータベースに同期します。同期するデータベースはこの[リンクのテンプレート](https://www.notion.com/367cd67cfe8f49bfaf0ac21305ebb9bf?v=bc79ca62b36e4c54b655ceed4ef06ebd) を使用してください。

このインテグレーションは、[GitHub's Octokit Library](https://github.com/octokit)を使用して作成されています。

⚠️ Notionのデータベースに追加されたIssueは同期されないので注意してください。


データベースの変更に基づいて同期する例は [こちら](https://github.com/makenotion/notion-sdk-js/tree/main/examples/database-email-update)を参考にしてください。

## ローカル環境での実行

### 1. プロジェクトのセットアップ

```zsh
# リポジトリをクローンしてください。
git clone https://github.com/makenotion/notion-sdk-js.git

# クローンしたリポジトリに移動してください。
cd notion-sdk-js/examples/github-issue-sync

# 依存関係をインストールします。
npm install
```

### 2. `.env`ファイルを同じディレクトリに作成してください。

```zsh
# GitHubのパーソナルアクセストークン 
GITHUB_KEY=<your-github-personal-access-token>

# Notion API のインテグレーションのトークン
NOTION_KEY=<your-notion-api-key>

# 同期したいデータベースのID（URLから取得がかんたんです）
NOTION_DATABASE_ID=<notion-database-id>

# リポジトリのオーナーネーム
GITHUB_REPO_OWNER=<github-owner-username>

# リポジトリの名前
GITHUB_REPO_NAME=<github-repo-name>
```
環境変数が設定できたかどうかはターミナルで`env`と実行すると確認することができます。

NotionのAPI Tokenは[こちら](https://www.notion.com/my-integrations)から作成してください。

GitHub Personal Access Token の作成は[こちら](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)から。

繰り返しになりますが、今回のインテグレーションで同期するには[このテンプレート](https://www.notion.com/367cd67cfe8f49bfaf0ac21305ebb9bf?v=bc79ca62b36e4c54b655ceed4ef06ebd)を使用してください。

### 3. 実行のコード

設定ができたらこのコードを実行してください。
```zsh
node index.js
```
