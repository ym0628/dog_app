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

### ***柴犬の画像は19枚しかなかった***

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

### ***わかった！URLはこれだ！***

- やはり上記のやり方は違うっぽい。
- このURLがが正しいようだ。
- https://dog.ceo/api/breed/shiba/images/random/1
- URLの`rondom`は文字通りランダムに取得する。
- 最後の`1`は返してくれるJSON情報の数を表しているようだ。
- 返すのはランダムな1枚だけでよいので、`1`とすれば良さそうだ。
- 一旦、先に実装したランダムな数値を返す`Math.random`ロジックはコメントアウトしておきます。


### ***DogApiによる画像取得***

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



***ここまでののコミット内容***

- 未使用のコンポーネントの`import文`を削除
- `DogApi`による画像URLの取得機能を実装
    - 関数`fetchDogImage`を定義
    - ランダムな数値を取得する`Math.random`ロジックは一旦コメントアウト


<br>

### ***handleClick関数を定義***

- `onClick`属性から渡す関数を`fetchDogImage`から`handleClick`に変更します。
- 新たに定義した`handleClick`の中で`fetchDogImage`を呼び出すようにします。
- 最初から`handleClick`で定義しても良い気はするけれど、まぁ、これまでに学習した通りにやります。
- たぶん、このようにする理由としては、Clickに対するイベント処理と、画像を取得するというイベント、それぞれの役割を明確に分ける意味合いが強いというと思います。
- 定義する場所は、一旦、ページコンポーネント`Home`の外側に記述しておきます。
- 本来は中の方が良さそうだけれど、一旦、`fetchDogImage`と同じ場所に定義しておきます。必要なら後でリファクタリングします。
- `console.log(result.message[0]);`としていた`fetchDogImage`の出力をコメントアウトします。
- コメントアウトした代わりに、`return result.message[0];`として結果を返すだけにして、出力は`handleClick`のほうに記述します。
- 一旦、こんな感じに仕上がりました。


```typescript
const fetchDogImage = async () => {
  const res = await fetch("https://dog.ceo/api/breed/shiba/images/random/1");
  const result = await res.json();
  // console.log(result.message[0]);
  return result.message[0];
};

const handleClick = async () => {
  const dogImage = await fetchDogImage();
  console.log(dogImage);
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>今日のHACHI</h1>
      <img src="https://images.dog.ceo/breeds/shiba/shiba-1.jpg" alt="shiba image" />
      <button onClick={handleClick}>ワンワン !</button>
    </div>
  );
};
```

- なお、`async`や`await`といったメソッドはJavaScriptの機能。
- 使い方については、こちらの記事が参考になりました。


https://www.sejuku.net/blog/69618


***ここまでののコミット内容***

- 【Add】DogApiによる画像URLの取得機能を実装02
  - `handleClick`関数を定義
  - `onClick`の渡す関数を`fetchDogImage`から`handleClick`に変更
  - ここまでの開発記録を更新


<br>

### ***APIによる画像取得の関数にTypeScriptで型を指定する***

- `fetchDogImage`に対して、TypeScriptで型を指定します。
- この実装は、TypeScriptの特長を生かして静的型付けをすることで、保守性・セキュリティ性を高める意味があります。
- まずは`interface SearchDogImage `という関数を定義し、そこに`キー`と`データ型`を記述していきます。
- 場所はページコンポーネント関数の外側上に配置します。
- ここで定義して`SearchDogImage`は`Generics(ジェネリックス)`と呼ばれ、複数のデータ型を含んだお手製の関数として利用できます。
- `fetchDogImage`のアロー関数の引数?にPromiseメソッドを記述します。
- そして`<SearchDogImage>`とすることで、その関数で定義されたデータ型のものだけを呼び出せるように制限を設けることができます。
- このように記述することで、コンパイル〜ブラウザ出力となる前にエラーに気づけるようになる、といったメリットが生まれます。


```typescript
interface SeachDogImage {
  message: string;
  status: string;
}

const fetchDogImage = async (): Promise<SeachDogImage> => {
  const res = await fetch("https://dog.ceo/api/breed/shiba/images/random/1");
  const result = await res.json();
  return result.message[0];
};
```

***ここまでののコミット内容***
- 【Add】DogApiによる画像URLの取得機能を実装03
  - 型注釈`interface SearchDogImage`を定義
  - `fetchDogImage`関数に`Promise`型でジェネリックス`SearchDogImage`を指定
  - ここまでの開発記録を`development_log.md`に追記

<br>

### ***ボタンクリックの度にAPIで画像を取得 & 出力する実装***

- 状態変数を取り扱うためのReact機能`useState`をここで扱います。
- `useState`の使い方については、こちらの記事が大変参考になりました。

https://zenn.dev/pu_ay/articles/99df8c9175a5f0


- ボタンを押すたびにAPI取得した画像を更新出力する実装します。
- まずはreturn文の`<img src>`タグに状態変数`dogImageUrl`を定義します。

```tsx
<img src={dogImageUrl} alt="shiba image" />
```

- `React`関数の`useState`を定義します。（これはuseStateを記述すると自動補完されます。）
- 記述する場所はページコンポーネント関数の内部です。（ただし、return文の中に直接ロジックを記述するのはNGです。）
- `useState`の引数はいったん空の状態で実装しておきます。（のちに実装するSSRを実現する際にココの第二引数の空配列に変数を記述する予定です。）
- `useState`の引数の中身をを一旦、空の状態にしておく際は、ダブルクォーテーション`（""）`をつけないとエラーになるので注意が必要です。

```tsx
import { useState } from "react";

//　中略

const [dogImageUrl, setDogImageUrl] = useState("");
```

- 最後に、ボタンを押した時に状態変化する配列の変数`setDogImageUrl`に対して、取得した画像`dogImageUrl`を代入して呼び出すよう、`handleClick`関数に記述していきます。


```tsx
const handleClick = async () => {
  const dogImage = await fetchDogImage();
  setDogImageUrl(dogImage);
};
```


***エラーが発生***

- この実装をしているときにエラーが発生。
- ボタンをクリックすると画像が出力されるはずがエラー表示がでてChromeから怒られてしまいました。

```console
VM406 index.tsx:16 Uncaught (in promise) 
ReferenceError: fetchDogImage is not defined
```
- 理由は先に実装していた関数の記述場所が問題だったようです。
- はじめはページコンポーネント関数`Home`の外側に記述していたのですが、それだとダメっぽいです。
- 画像を取得する`fetchDogImage`と、クリック時の挙動を指示する`handleClick`。
- それぞれの関数を、`Homeコンポーネントの中`に記述してあげることで、無事に画像取得ができました。
- これまで、Chromeのコンソール上でしか、挙動を確認していなかったのが理由なのか、この実装をやるまで気付きませんでした。
- 以下のようにコードの記述場所を修正してことなきを得ました。

```tsx
const Home: NextPage = () => {
  const [dogImageUrl, setDogImageUrl] = useState("");

  const fetchDogImage = async (): Promise<SeachDogImage> => {
    const res = await fetch("https://dog.ceo/api/breed/shiba/images/random/1");
    const result = await res.json();
    return result.message[0];
  };
  
  const handleClick = async () => {
    const dogImage = await fetchDogImage();
    // console.log(dogImage);
    setDogImageUrl(dogImage);
  };
  
  return (
    <div className={styles.container}>
      <h1>今日のHACHI</h1>
      <img src={dogImageUrl} alt="shiba image" />
      <button onClick={handleClick}>ワンワン !</button>
    </div>
  );
};

export default Home;
```

<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3486945/8bf9fd3a-537b-77d5-a620-fa6e206d2f52.jpeg" alt="" width=50% height=50%>

この状態から、ボタンを押すと、、、
こうなります。

<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3486945/6d7d871c-d2e2-153c-b40e-58c0258f7b5c.jpeg" alt="" width=50% height=50%>

- ひとまず、画像の出力まで成功しました。
- ここでコミット・プルリクエストをしておきます。



### デプロイ先のVercelでエラーが発生


```
Type error: Argument of type 'SeachDogImage' is not assignable to 
parameter of type 'SetStateAction<string>'.
```

```
型エラー: 'SeachDogImage' 型の引数は、'SetStateAction<string>' 型の
パラメータに割り当てることができません。
```


<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3486945/5e4294d1-4cd4-faab-1d3d-3a3348b0ebba.jpeg" alt="" width=50% height=50%>


この問題については別記事としてまとめました。

https://qiita.com/ym0628/items/6b17d441d48716ccce02

<br>

## `SSR（サーバーサイドレンダリング）`を使い、サイトのロード時にもAPIを走らせ画像を出力する

- ここまでに、ボタンクリックを発火タイミングとした画像取得・出力のイベントを実装することができました。
- しかしながら現状、index.tsxページが読み込まれた段階では、ボタンをクリックしていないので、画像は出力されません。

<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3486945/4bbf3830-9e8a-4f0c-9a62-15405b144503.jpeg" alt="" width=50% height=50%>

- ページアクセス時に固定の画像を置くこともできますが、今回はページロード・リロード時にもAPIが走るように実装していきます。
- せっかくNext.jsフレームワークを使っているので、特長のひとつでもあるサーバーサイドレンダリング（SSR）機能を用いていきます。


<br>

順番としてはこんな感じで行っていきます。

:::note warn
- `SSR`で`getServerSideProps`関数を実装
- `IndexPageProps`と命名した`interface`を実装
- `Home関数コンポーネント`に`initialCatImageUrl`を指定し、リロード時にAPIが走るように実装
:::


<br>

### `SSR`で`getServerSideProps`関数を実装


- まずはNext.jsが提供するメソッド`getServerSideProps`を定義します。
- 場所はHomeページコンポーネントの外側に記述します。今回は、最下部付近に実装しました。

```tsx
export const getServerSideProps: GetServerSideProps = async () => {};
```

- なお、`export`をつけないといけない理由はよく分かりません🙇
- `GetServerSideProps`を記述すると、自動的に`import {  GetServerSideProps, NextPage } from "next";`が補完されます。
- `GetServerSideProps`はこれだけで一種の型なのだそうです。


https://www.commte.co.jp/learn-nextjs/getServerSideProps


### `interface`で`GetServerSideProps`に渡すデータ型を指定する

- 続いて先にもやった通り、SSRにも型付けを行っていきます。命名は`IndexPageProps`とします。
- これもジェネリクスと言える、、、、のだと思います。
- `GetServerSideProps`の後につづけて`<IndexPageProps>`と記述することで、ジェネリクスの型が引数みたいに渡され、`IndexPageProps`で定義したデータ型だけを受け付けるvalidationみたいなものが出来上がる、、、みたいなニュアンスで覚えておきます。🙇

```tsx
export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
 // ここに実行したいイベント処理を記述します。
};
```

- そして定義したジェネリクス型にはこのように記述し、string型のみを受け取るように指定します。
- データ型のキー命名は`initialDogImageUrl`としました。
- 先に行った`interface SearchDogImage`と同じ要領です。

```tsx
interface IndexPageProps {
  initialDogImageUrl: string;
}
```

### `getServerSideProps`関数にイベント処理を記述する

- ここまでできたら、土台が出来上がりみたいな感じです。
- 定義した`getServerSideProps`に対して先と同じように画像を取得（フェッチ）してくる構文を記述します。
- これは先に実装した`handleClick`に記述したやつをコピペでOK。

```tsx
export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const dogImage = await fetchDogImage();
```
- ただし、上記で画像をフェッチしてきただけではブラウザには何も映りません。
- return文を記述する必要があります。
- 書き方には決まりがあり、`props: {};`と記述する必要があるそうです。
- そして、`IndexPageProps`で定義した変数`initialDogImageUrl`をここで持ってきて、フェッチ画像`dogImage`を代入すればOKです。
- 以下のようになりました。


```tsx
interface IndexPageProps {
  initialDogImageUrl: string;
}

//中略
// Run API even when page loads with SSR
export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const dogImage = await fetchDogImage();
  return {
    props: {
      initialDogImageUrl: dogImage,
    },
  };
};
```

- と、これで完成したかのように見えますが、これだとうまくいきません。

<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3486945/07282db6-7217-72ec-43b0-004d96f8c9fa.jpeg" alt="" width=50% height=50%>


<br>

### `Home関数コンポーネント`に`initialCatImageUrl`を指定し、リロード時にAPIが走るように実装

- 今回は、サイトがレンダリングされたタイミングで、handleClickと同じように画像を出力したいので、SSRで`getServerSideProps`を定義し、それに対応した型`IndexPageProps`を定義し、最終的に`initialDogImageUrl`という変数に`dogImage`を代入しました。
- これらを最後にどうするかというと、ページ出力元であるページコンポーネント関数`Home`にこれらの関数を渡してあげなければならないのです。
- 修正前と修正後をコードを記載します。


```tsx
//修正前
const Home: NextPage = () => {
  const [dogImageUrl, setDogImageUrl] = useState("");
  
  //中略
};
```

```tsx
//修正後
const Home: NextPage<IndexPageProps> = ( {initialDogImageUrl} ) => {
  const [dogImageUrl, setDogImageUrl] = useState(initialDogImageUrl);
  
  //中略
};
```

<br>

### その他修正〜`fetchDogImage`関数をページコンポーネントの外側に配置〜

- なぜか、上記実装では`fetchDogImage`が`getServerSideProps`で読み取ってくれませんでした。
- 結論からいうと、`fetchDogImage`関数を、これまでページコンポーネント関数`Home`の内側に記述していたのですが、それが良くなかったようです。

```diff_tsx
interface IndexPageProps {
  initialDogImageUrl: string;
}

+ const fetchDogImage = async (): Promise<string> => {
+   const res = await fetch("https://dog.ceo/api/breed/shiba/images/random/1");
+   const result = await res.json();
+   return result.message[0];
+ };

const Home: NextPage<IndexPageProps> = ( {initialDogImageUrl} ) => {
  const [dogImageUrl, setDogImageUrl] = useState(initialDogImageUrl);
```


- ページコンポーネントの外側に配置を移したら、うまくSSRが実行され、サイトのアクセス・リロードの時にもAPIが走って画像が動的に出力されるようになりました。


<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3486945/d7696a47-6cc6-bb43-21ea-19797e957e44.jpeg" alt="" width=50% height=50%>

- 以上で、Webアプリケーションの実装はおおむね完成しました。
- ここまで実装したメインページ`~/pages/index.tsx`のソースコード全体を掲載します。

```tsx
// ~/pages/index.tsx

import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {  GetServerSideProps, NextPage } from "next";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

// interface SearchDogImage {
//   message: string;
//   status: string;
// }

interface IndexPageProps {
  initialDogImageUrl: string;
}

const fetchDogImage = async (): Promise<string> => {
  const res = await fetch("https://dog.ceo/api/breed/shiba/images/random/1");
  const result = await res.json();
  return result.message[0];
};

const Home: NextPage<IndexPageProps> = ( {initialDogImageUrl} ) => {
  const [dogImageUrl, setDogImageUrl] = useState(initialDogImageUrl);

  const handleClick = async () => {
    const dogImage = await fetchDogImage();
    setDogImageUrl(dogImage);
  };
  
  return (
    <div className={styles.container}>
      <h1>今日のHACHI</h1>
      <img src={dogImageUrl} alt="shiba image" />
      <button onClick={handleClick}>ワンワン !</button>
    </div>
  );
};

// Run API even when page loads with SSR
export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const dogImage = await fetchDogImage();
  return {
    props: {
      initialDogImageUrl: dogImage,
    },
  };
};

export default Home;
```

- 以上で柴犬の画像を出力する個人開発Webアプリ開発の本編は終了となります。

<br><br><br>


## 追加機能とリファクタリングとスタイリングを考える

- 続いては、これまで学んだ技術の中から、やってみたいことにチャレンジしていきます。
- 具体的には、`リファクタリング`と、`CSS`による`スタイリング`です。
- Reactの自己学習で学んだ`コンポーネント化による保守性の維持`、`useCallback`などのパフォーマンス向上の機能が使えるかなど。そしてスタイルにおいては、`CSS module`を用いて、もう少し凝った見た目にチャレンジしていきます。

<br>


### これから挑戦してみたい事をまとめる

追加したい機能やリファクタリング内容、スタイリングのグレードアップなど、やりたい事について一旦、まとめておきます。

<br>

- ***追加機能***
    - indexページにアクセスした時に、いい感じのロゴマークを最初に出してみたい。
    - 柴犬画像のAPIだけでなく、秋田犬の画像取得するページ`~/pages/akita.tsx`を作成

<br>

- ***リファクタリング***
    - ボタンクリックのイベント処理`handleClick`に対して`useCallback`を適用する。
    - https://dog.ceo/api/breed/akita/images/random/1
    - index.tsxページのreturn文のスタイルをコンポーネントで分けて保存する。
    - 柴犬・秋田犬に関するスタイルを `components` ディレクトリにまとめる。

<br>

- ***スタイリング***
    - レスポンシブデザインを適用させる。
    - 画像取得ボタンのデザインをもう少しリッチにしたい。
    - 柴犬ページの背景色、秋田犬ページの背景色をuseEffectで切り替える。

<br>


### 自分の作ったコードに対して、`useCallback`を使い`パフォーマンス向上のリファクタリング`ができるか？

- コンポーネント外の場所にイベントを処理を書く場合、引数に渡す変数が多くなりがち。
- よって、コンポーネントの内側（return文の直上）にイベント処理のコードを書きたいのですが、、、。
- それだと、ページが再レンダリングされた時、メソッドも再生成されてしまい、パフォーマンスが比較的悪くなるというデメリットがある。
- それを回避したい場合は、`useCallBack`という`Reactがサポートする機能`を使ってあげる事で、再レンダリング時の無駄なメソッド再生成を防ぐ事が出来る。
- `React`学習をこれまでやってきたなかで`useCallback`について学んできたので、実際に個人開発で使ってみたいと思いました。
- しかし、今回作成している画像をAPIで取得するというWebアプリケーションにおいては、その使い所があるのかは、イマイチ分からないです。
- これは自身のネットワークに対する基礎知識が不足するところであり、恥ずかしい限りだが、いろいろ調べたり、試したりしてみたいと思います。
- 自分の現状のコーディング上、Homeページコンポーネント内部に実装しているイベント処理は`handleClick`です。
- このイベント処理に対して`useCallback`を使って余計な際レンダリングを防ぐリファクタリングができるか試してみます。


<br>

- 現在、index.tsxページにアクセすると、もろもろのファイルが読み込まれます。これ自体は普通。

<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3486945/3383eb9e-68f3-097b-1e5c-478bd2d3b0cb.png" alt="" width=50% height=50%>

- APIで画像を取得するボタンを押すと、、、

<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3486945/94910a40-aaa2-db54-9243-b26ab623a8d8.png" alt="" width=50% height=50%>

- 画像URLだけが呼び出される感じになっています。

<br>

### 読み取り速度を確認

- useCallbackなし

<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3486945/943d464d-890d-bcf7-78b9-2149b6a44ff9.png" alt="useCallbackなし" width=50% height=50%>


- useCallbackあり

<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3486945/29bc4d3f-4ac0-d110-ae0b-a93e38d67066.png" alt="useCallbackあり" width=50% height=50%>


- うーん、、、。さほど良い影響を与えると思えなくもないですが、よく分かりません。
- 一応こんな感じにコーディングしてみたのですが、これで合っているのか分からない。。。
- useCallbackの第二引数の空配列には何かいれないと意味がないと思っているのですが、どうなんでしょうか。。。

```tsx
import { useCallback, useState } from "react";

// 中略

  const handleClick = useCallback( async () => {
    const dogImage = await fetchDogImage();
    setDogImageUrl(dogImage);
  }, []);
```



<br>

### `useCallback`いらねぇんじゃね？

- useCallback必要なさそうな気もします。。。
- このAPIを叩くhandleClickでは画像を引っ張ってくるだけですし、、、。
- 現状、ヘッダーやフッターなどは実装していないため、他にレンダリングするコンポーネントもない状況。
- 結論、useCallbackを使うほどの実装はないよなぁ、、、と考えました。
- 一旦、上記コードで先に進めることにします。


<br>

### 追加機能を実装

- 柴犬画像のAPIだけでなく、秋田犬の画像取得するページ`~/pages/akita.tsx`を作成してみます。
- `useEffect`を用いて柴犬ページと秋田犬ページとで、背景色を変えます。
- それぞれのページに遷移するリンクを設置します。
- 画面遷移として、トップページindex.tsxをSHIBAの画像出力ページではなく、サイトトップとしての役割に置き換えます。
- index.tsx => トップページとして、SHIBAページとAKITAページへのリンクを置く
- 追加の遷移先としてshiba.tsxとakita.tsxファイルを作成
- 上記のようにした後に、リファクタリングとして各種コンポーネントやHooksに切り出します。

<br>

***useEffectで背景色をベージュに変更その他***

- `indexページにuseEffectで背景色を定義`
- `h1タグのタイトルを「SHIBA」に変更`
- `コメントアウトしていたhandleClick 関数を削除`



いったん、この内容でコミットしておきます。

<br>

***Headerコンポーネントを作成しリンクを設置***

- Headerと命名するコンポーネントを作成します。中身は各ページへのリンク群です。
- indexページに秋田犬ページへのリンクボタンを設置


:::note warn
LinkコンポーネントはNext.jsの機能であり、Reactではないので注意。
:::

参考になった動画はコチラ

https://www.youtube.com/watch?v=qrF3AbAx_9c&list=PLwM1-TnN_NN6fUhOoZyU4iZiwhLyISopO&index=6

**<font color="Orange">動画07分14秒から</font>**

- まずはヘッダーリンクを作成していきます。
- CSSスタイリングでかなり苦戦したが、何とか意図するものはできました。
- 以下がコミットしたコード。

```tsx
// Header.tsx

import Link from "next/link";
import styles from "@/components/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">SHIBA</Link>
      <Link href="/akita">AKITA</Link>
    </header>
  );
}

export { Header }
```

:::note alert
ここでめちゃめちゃ躓きました💧
- `const Header = () => {}`のように、アロー関数で表現する時は、関数の外、最終行あたりに`export`文を入れないとエラーになるので注意。
- `Link`コンポーネントは`import Link from "next/link";`としないと使えないので注意。
:::



```css
/* components/Header.module.css */

.header {
  border-bottom: 1px, sienna;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
}

.header a {
  display: inline-block;
  color: brown;
  padding: 5px 12px;
  text-decoration: none;
  transition: background-color .50s;
}

.header > a:hover {
  background-color: lightblue;
}
```

:::note alert
- `border-bottom: 1px, sienna;`の箇所はたぶん設置場所を間違えている気がするので、後で直します。
- 今回は.headerクラスを命名したのですが、一口にheaderクラスといっても、その中の子要素としてaタグが使われていたりします。
- 親である`.header`に対して`:hover`を適用させようとしても、行全体、すなわち`.header`クラスの全体に対してhoverが当たってしまい、変な感じになってしまいました。
- 上記のように、classの親子関係を理解しておかないと、スタイルが当たらなくて沼にハマってしまうので肝に銘じておきます。
:::


```tsx
import { Header } from "@/components/Header";

// 中略

  return (
    <div className={styles.container}>
      <Header />
      <h1>今日のSHIBA</h1>
      <img src={dogImageUrl} alt="shiba image" />
      <button onClick={handleClick}>ワンワン !</button>
    </div>

// 中略
```

:::note alert
`<Header />`の配置場所によってスタイルが当たらないことがあるので注意
:::


<br>

***pages/akita.tsxファイルを作成***

続いて、新たに秋田犬のページを作成します。主に以下のような事を実施します。

- indexページをコピペしてakita.tsxファイルを作成
- 秋田犬ページ用に、コードを修正












<br><br>
<br><br>

## マークダウン記事執筆でよく使うタグ

`**<font color="Orange">見出し2</font>**`

`<img src="" alt="" width=50% height=50%>`

`<a href="" target="_blank">テキスト</a>`

