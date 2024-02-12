# dog_app of development_log

dog_appの開発記録をここに残します。


## 参考サイト

https://www.youtube.com/watch?v=MZclBqhCB6A



## 環境構築の流れ

流れとしては、次のように開発環境を構築していきます。

1. 最初にローカルでNext.jsをインストール
2. .gitignoreなどは自分で作る必要はない（Next.jsはでデフォルトで記述済み）
3. 次にGit管理するためにリモートリポジトリへプッシュする。


## Next.jsをインストール

```terminal
$ cd ~/workspace/create
$ npx create-next-app@latest --typescript
```

Next.jsインストール時に聞かれる項目については以下のように回答しました。

- `✔ What is your project named? … dog_app`
- `✔ Would you like to use ESLint? … No / Yes`
- `✔ Would you like to use Tailwind CSS? … No / Yes`
- `✔ Would you like to use `src/` directory? … No / Yes`
- `✔ Would you like to use App Router? (recommended) … No / Yes`
- `✔ Would you like to customize the default import alias (@/*)? … No / Yes`

- pageRouterを使います。
- TailwindCSSは使いません。
- Homeディレクトリを@で表現してくれるインポートエイリアス機能は変更したくないのでNoを選択します。




## Gitバージョン管理

今までとは逆で、最初にローカルで作ったリポジトリをリモートへプッシュするという手順を取っていきます。

```terminal
$ cd ~/workspace/create/dog_app
$ git branch （mainブランチは既に生成されています。）
$ git remote add origin git@github.com:******/cat_app.git
$ git branch -M main （マスターブランチを「main」とすることを定義するみたいな感じ）
$ git push -u origin main （ローカルで作ったリポジトリをリモートにプッシュしてGitHubにリモートリポジトリを作る。）
$ npm run dev （localhost:3000でサーバーが起動することを確認します。）
$ git checkout -b dev（開発用のブランチを作成します。）
```


## dog APIについて調査

犬画像を取得するAPIを提供するこちらのサイトを使用させていただきます。

https://dog.ceo/dog-api/


- たぶん無料で使えるっぽいのですが、よく分からないのでいろいろ調べてみました。
- 今回は柴犬の画像だけをランダムに取得するAPIを利用したいと思っています。（完全に好み）
- どうやら、自力で柴犬を画像の数を調べてみたら、19枚あるようです。
- `https://images.dog.ceo/breeds/${dogName}/${dogName}-${number}.jpg`

https://images.dog.ceo/breeds/shiba/shiba-1.jpg

また、既に同じWebアプリを開発されている方の記事を見つけてしまいました。もろ被ってしまいましたが、こちらの開発記事も参考にさせていただきます。

https://zenn.dev/likr/articles/6be53ca64f29aa035f07


## メインとなるindex.tsxの雛形を作成

***メモ***

- index.tsxページをメインとしてここに実装していきます。
- 今回はpageRouterを使ったファイルシステムルーティングを採用しています。
- pagesディレクトリ配下にindex.tsxがデフォルトで作成されていますが、こちらの既存のコードごっそり削除して、イチから作っていきます。
- アロー関数でページコンポーネントを表現する時は型注釈（NextPage）を指定してあげる必要があるっぽいです。
- アロー関数にする時は、ページ最下部に`export default Home;`が必要になるみたいです。


***ここまでのコミット内容***

- メインとなる`index.tsx`の雛形を作成
- `index.tsx`の既存コードを削除してHomeコンポーネントをアロー関数で定義
- 不要な`_document.tsx`を削除
- `Home.module.css`のコードを全て削除して最低限のスタイルだけ定義
- `globals.css`のスタイルも全て削除
- ここまでの開発ログを更新


<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3486945/83ec94a4-fb6e-7b80-7ff2-76c689774a7d.jpeg" alt="" width=50% height=50%>


***参考記事***

https://typescriptbook.jp/tutorials/nextjs











<br><br>
<br><br>

## マークダウン記事執筆でよく使うタグ

`**<font color="Orange">見出し2</font>**`

`<img src="" alt="" width=50% height=50%>`

`<a href="" target="_blank">テキスト</a>`

