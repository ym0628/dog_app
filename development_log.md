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


## Dog APIを取得する実装

続いて、DogApiによる画像取得の機能を実装します。

***柴犬の画像は19枚しかなかった***

- このAPIの使い方がよく分からないので、自力で画像枚数を調べたところ、柴犬画像のidは`1~19`までであることがわかった。
- これをもとに1〜19までのidをランダムで生成する関数`const random`を定義しました。
- いったん`console.log`で出力してみます。
- 場所はいったん、Homeページコンポーネントの外に配置しました。
- メソッド`Math.random`は0未満の小数点以下の数値をランダムで生成するJavaScriptの標準メソッド。
- メソッド`Math.floor`は小数点以下の数値を整数に直すJavaScriptの標準メソッドとなります。
- TypeScriptはJavaScriptの上位互換であるため、素のJavaScript構文も使用できます。
- ただし`var`は現在はあまり使われないようなので、`const`で定義しました。


```tsx
const random = Math.floor( Math.random() * 19 ) + 1;
console.log( random );
```

<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3486945/9fa9a97f-c1e8-123c-8faa-96c31a017407.jpeg" alt="" width=50% height=50%>

<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3486945/47bf7b61-2a9d-e95f-6bb3-e8f0dc78fbd0.jpeg" alt="" width=50% height=50%>

- 上記のように、最小値が1、最大値が19までのランダムな数値を取得することができました。
- この変数を、dog apiのURLのid部分に式展開して代入すれば良さそうです。

***わかった！URLはこれだ！***

- やはり上記のやり方は違うっぽい。
- このURLがが正しいようだ。
- https://dog.ceo/api/breed/shiba/images/random/1
- URLの`rondom`は文字通りランダムに取得する。
- 最後の`1`は返してくれるJSON情報の数を表しているようだ。
- 返すのはランダムな1枚だけでよいので、`1`とすれば良さそうだ。
- 一旦、先に実装したランダムな数値を返す`Math.random`ロジックはコメントアウトしておきます。


***DogApiによる画像取得***

- ボタンを押すとAPIから画像を取得するようにしたい
- まずはbuttonタグにonClick属性を付与し、そこに関数を渡す
- 関数はfetchDogImageとして、APIからURLを取ってくる
- 上記の正しいURLにアクセスすると、APIが叩かれてJSON形式のデータがレスポンスされる。

```json
{
    "message":["https:\/\/images.dog.ceo\/breeds\/shiba\/shiba-13.jpg"],
    "status":"success"
}
```

- レスポンスのJSONデータを`result`変数に代入
- `console.log(result.mesasge[0]);`とすることで、URLだけを抽出できた。


<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3486945/7ae155cf-771b-9da8-ef36-afac5b1f72ea.jpeg" alt="" width=50% height=50%>



***今回のコミット内容***

- 未使用のコンポーネントの`import文`を削除
- `DogApi`による画像URLの取得機能を実装
    - 関数`fetchDogImage`を定義
    - ランダムな数値を取得する`Math.random`ロジックは一旦コメントアウト







<br><br>
<br><br>

## マークダウン記事執筆でよく使うタグ

`**<font color="Orange">見出し2</font>**`

`<img src="" alt="" width=50% height=50%>`

`<a href="" target="_blank">テキスト</a>`

