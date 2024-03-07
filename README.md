# dog_app

***URL***

<a href="https://dog-app-swart.vercel.app/" target="_blank">https://dog-app-swart.vercel.app/</a>

***GitHubソースコード***

<a href="https://github.com/ym0628/dog_app" target="_blank">https://github.com/ym0628/dog_app</a>



<br>

<div style="text-align: center;">
    <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3486945/80ca8022-5997-41b7-3ce1-abaefaa7c495.png" alt="" width=50% height=50%>
</div>


<br>

## 主な機能

柴犬と秋田犬、2種類の犬種にフォーカスした画像をランダムで取得しWebブラウザに出力するというシンプルなアプリケーションです。

犬の画像をランダムで取得するサービス「Dog API」を用いて、柴犬と秋田犬に絞った画像をランダムで出力する機能を実現しました。

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3486945/16fc0164-5fad-7a28-69c9-28918d4aea8a.png"> | <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3486945/c9656e3d-c6be-1558-e0a0-8b25cbfd9fb8.png">               |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **柴犬画像出力**<br>ページ`/shiba`にてボタンを押すと、柴犬の画像のみをランダムで取得し、ブラウザ出力してくれます。<br>   | **秋田犬画像出力**<br>ページ`/akita`では、秋田犬のみの画像をランダムで出力してくれます。 |

<br>

全部で画面遷移するページはHOME、SHIBA、AKITAの3ページとなっております。


<br>

## 本アプリケーションの環境構築と導入手順

***本アプリケーションのリポジトリをGitHubからフォークします。***

https://github.com/ym0628/dog_app

```
// GitHub

Create a new fork
```


***フォークした本アプリのリポジトリをローカルの任意のディレクトリ配下にgit cloneします。***

```terminal
$ git clone git@github.com:[YOUR_USER_NAME]/dog_app.git
```

***npmをインストールします。***

```terminal
$ npm install
```

***ローカル開発環境でサーバーを起動します。***

```terminal
$ npm run dev
```

***3000番ポートでブラウザからアクセスします。***

```terminal
http://localhost:3000/
```


<br>

## 開発でこだわったところ

開発でこだわったポイントについて。

<br>

### TypeScriptで型安全性の実現

本アプリケーションでの主要な言語として、`TypeScript`を採用しました。

TypeScriptがサポートする`静的型付け`の用い、コードの安全性を高め、エラーの発見がしやすいように実装しています。

ページ遷移時の画像取得APIを実行するロジックの過程で`interface IndexPageProps`というジェネリクスを定義することで、再利用可能な型注釈を実現しました。


```tsx
interface IndexPageProps {
  initialDogImageUrl: string;
}

// <Omit the middle sentence...>

const Shiba: NextPage<IndexPageProps> = ( {initialDogImageUrl} ) => {};
```


<br>

### JavaScript「async」、React「useCallback」を使い、余分な再レンダリングを防止

APIを叩いて画像を取得するロジックの実装においては、余計な際レンダリングを防ぐための実装を施しました。<br>

JavaScript関数である「async」「await」を使って非同期処理を施しているのはもちろん、React関数「useCallback」を使い、再レンダリングを防止するロジックも実装。<br>

UI/UXの強化を意識した作りとなっています。<br>


<br>

### SSRによる読み込みの速さを追求

フロントエンド開発において採用される`Next.js`の特色である`SSR（サーバーサイドレンダリング）`も実装しています。

ページに遷移した際、同時に画像取得APIを実行するロジックを実装するにあたり、できる限りブラウザ出力までの処理を高速化する必要がありました。

そこで、APIによる動的な画像の出力をサーバーサイド側で行ってくれる`SSR`を定義することで、`UI/UX`の向上を実現することができました。


```tsx
// shiba.tsx

import { GetServerSideProps, NextPage } from "next";

const fetchDogImage = async (): Promise<string> => {
  const res = await fetch("https://dog.ceo/api/breed/shiba/images/random/1");
  const result = await res.json();
  return result.message[0];
};

// <Omit the middle sentence...>

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const dogImage = await fetchDogImage();
  return {
    props: {
      initialDogImageUrl: dogImage,
    },
  };
};
```



<br>

### コンポーネント・カスタムフックによるリファクタリングで保守性を強化

個人開発ではありますが、実務における複数人・大規模な開発を想定し、できる限りの保守性を求めたリファクタリングを行いました。

ページコンポーネントの`return`構文内では、`<Header />`や`<Image />`など、それぞれのプロパティをコンポーネント化し、コードが冗長にならないような工夫をしています。

また、`~/hooks/useBgBeige.tsx`などをはじめとしたカスタムフックを定義することで、関数の再利用性を高めたリファクタリングを実施しました。


```tsx
// ~/pages/index.tsx

// <Omit the middle sentence...>

  return (
    <div className={styles.container}>
      <Header />
      <Headline title="今日のSHIBA" />
      <Image
        src={dogImageUrl}
        alt="shiba image"
        width={300}
        height={300}
        priority
      />
      <button onClick={handleClick}>ワンワン !</button>
    </div>
  );
```

```tsx
// ~/hooks/useBgBeige.tsx

import { useEffect } from "react";

export const useBgBeige = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "beige";
    return () => {
      document.body.style.backgroundColor = "";
    }
  }, []);
};
```

<br>

## 使用した技術・言語

***インフラ・本番環境***
- Vercel

***フレームワーク***
- Next.js 14.1.0

***使用言語***
- TypeScript
- React
- JavaScript
- HTML
- CSS（CSS Modules）

***ライブラリ・API***
- Dog API
https://dog.ceo/dog-api/


<br>

## 開発者プロフィール
2022年から本格的にプログラミング学習中。プログラミングスクールRUNTEQ37期生。
Ruby on Railsを中心に学習を始め、現在はReact/TypeScript/Next.jsを使ったフロントエンド開発の技術をメインで学んでいます。

***GitHub***

<a href="https://github.com/ym0628" target="_blank">https://github.com/ym0628</a>

***X（Twitter）***

<a href="https://x.com/yuta_matsuzaka" target="_blank">https://x.com/yuta_matsuzaka</a>


<br>

## メモ

```
<div style="text-align: center;">
    <img src="" alt="" width=50% height=50%>
</div>
```

```
<img src="" alt="" width=50% height=50%>
```