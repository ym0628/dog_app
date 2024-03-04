# dog_app

***アプリケーションURL***

<a href="https://dog-app-swart.vercel.app/" target="_blank">https://dog-app-swart.vercel.app/</a>


<br>

<div style="text-align: center;">
    <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3486945/80ca8022-5997-41b7-3ce1-abaefaa7c495.png" alt="" width=50% height=50%>
</div>


<br>

## 主な機能

柴犬と秋田犬、2種類の犬種にフォーカスした画像をランダムで取得しWebブラウザに出力するというシンプルな機能です。

犬の画像をランダムで取得するサービス「Dog API」のAPI機能を使い、その中から柴犬と秋田犬に絞った画像をランダムで出力する機能を実装しました。

| <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3486945/16fc0164-5fad-7a28-69c9-28918d4aea8a.png"> | <img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3486945/c9656e3d-c6be-1558-e0a0-8b25cbfd9fb8.png">               |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **柴犬画像出力**<br>ページ`/shiba`にてボタンを押すと、柴犬の画像のみをランダムで取得し、ブラウザ出力してくれます。<br>   | **秋田犬画像出力**<br>ページ`/akita`では、秋田犬のみの画像をランダムで出力してくれます。 |

<br>

全部で画面遷移するページはHOME、SHIBA、AKITAの3ページとなっております。


<br>

## 本アプリケーションの環境構築と導入手順

***本アプリケーションのリポジトリをGitHubからフォークします。***


***フォークした本アプリのリポジトリをローカルの任意のディレクトリ配下にgit cloneします。***

```terminal
$ git clone git@github.com:[YOUR_USER_NAME]/dog_app.git
```

*** npm run build します ***



## 開発でこだわったところ

開発でこだわったポイントについて。

### TypeScriptで型安全性の実現



### SSRによる読み込みの速さを追求




### コンポーネント・カスタムフックによるリファクタリング




## 使用した技術・言語

***インフラ・本番環境***
- Vercel

***フレームワーク***
- Next.js

***使用言語***
- TypeScript
- React
- JavaScript
- HTML
- CSS

***ライブラリ・API***
- Dog API
https://dog.ceo/dog-api/

## 開発者プロフィール
2022年から本格的にプログラミング学習中。プログラミングスクールRUNTEQ37期生。
Ruby on Railsを中心に学習を始め、現在はReact/TypeScript/Next.jsを使ったフロントエンド開発の技術をメインで学んでいます。

***GitHub***

<a href="https://github.com/ym0628" target="_blank">https://github.com/ym0628</a>

***X（Twitter）***

<a href="https://x.com/yuta_matsuzaka" target="_blank">https://x.com/yuta_matsuzaka</a>

## メモ

`{: align="center"} <img src="" alt="" width=50% height=50%>`

`<img src="" alt="" width=50% height=50%>`
