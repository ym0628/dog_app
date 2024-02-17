# error_handling.md

TypeScriptエラー`Argument of type is not '関数名' assignable to parameter ...`解決までの道のり

## 開発環境

- Next.js ver.14
- Vercel
- TypeScript
- React
- npm


## エラーの内容と発生の経緯

- DogApiというサービスを使い、犬画像をランダムで取得するAPIを実装し、ブラウザ画面に出力するというWebアプリケーションを作成しております。
- APIで取得するJSON形式のデータに対して、TypeScriptで型注釈を付けることで、保守性を高めたいと思いました。
- 具体的には画像を取得してくる`fetchDogImage`にてAPIを叩き、変数`result`を返し、画像URLを取得します。
- ボタンクリック時に発動するように、`handleClick`を定義し、その中で`setDogImageUrl(dogImage);`として画面に出力するようにしました。
- なお、ボタンを押すたびに画像がランダムで出力する状態変化が起こるため、Reactの`useState`を用いて、状態変数`setDogImageUrl`に取得した画像を代入してブラウザに出力するという流れを作っています。
- `localhost:3000/`で挙動を確認した際はうまく画像が表示されたので、そのままコミット〜プルリクエストまで行ったところ、そのタイミングでエラーに気づきます。
- デプロイ先であるVercelにて、エラーによりデプロイに失敗したようです。
- 以下がエラーメッセージ。

```
Type error: Argument of type 'SeachDogImage' is not assignable to 
parameter of type 'SetStateAction<string>'.

👇👇 翻訳 👇👇

型エラー: 'SeachDogImage' 型の引数は、'SetStateAction<string>' 型の
パラメータに割り当てることができません。
```

<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3486945/5e4294d1-4cd4-faab-1d3d-3a3348b0ebba.jpeg" alt="" width=50% height=50%>


- よくよく、コードを見ると、VScode上で、ここの記述に赤い線が入ってエラーを指摘してくれていることに気付きませんでした。
- これでは何のためにTypeScriptを使って型付けをおこなっているのか分かりません💦

<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3486945/1c06bf21-69a4-23e2-18a0-743254603f91.jpeg" alt="代替テキスト" width=50% height=50%>



## エラーを解決した方法

- 実装した型注釈に問題があると思われます。
- 以下のように`interface SearchDogImage`という型注釈の関数を作り、
- Promiseで`SearchDogImage`を呼び出すことで、特定のデータ型だけを受け付けるようにしています。

```tsx
interface SearchDogImage {
  message: string;
  status: string;
}

const fetchDogImage = async (): Promise<SearchDogImage> => {
```

- 上記のコードで、`Promise`をジェネリクスではなく、普通の`string`に変えると、
- `setDogImageUrl(dogImage);`のエラーは消えました。
- また、`interface SearchDogImage`の型注釈の実装も、今回はstring型ひとつしか扱わないので、不要っちゃ不要であるため、コメントアウトしちゃいます。
- 以下のように一旦、コードを修正しました。

```tsx
// interface SearchDogImage {
//   message: string;
//   status: string;
// }

// const random = Math.floor( Math.random() * 19 ) + 1;
// console.log( random );

const Home: NextPage = () => {
  const [dogImageUrl, setDogImageUrl] = useState("");

  const fetchDogImage = async (): Promise<string> => {
    const res = await fetch("https://dog.ceo/api/breed/shiba/images/random/1");
    const result = await res.json();
    return result.message[0];
  };
  
  const handleClick = async () => {
    const dogImage = await fetchDogImage();
    setDogImageUrl(dogImage);
  };
```



## エラーについて調査〜参考サイト紹介〜

- エラーが何を言っているのかよく分からないため、調べます。
- なお、筆者はお金をケチっているためChatGPT未契約。
- エラー文言にある`SetStateAction<string>`とな何なのでしょうか？


### `SetStateAction<string>`とは？

- `SetStateAction`は`React`の機能らしい。
- 状態変数に関する変更前の値を利用するメソッドらしいが、あまり理解できず断念。
- 一旦、上記のコードで動いたので先に進むことにします。
- まぁ一応`Promise<string>`でstring型のデータだけを受け付けるようにはしてある？のでいいかな、、、（適当、動けばいいと思っているやつ）




### 参考サイト

https://typescript-jp.gitbook.io/deep-dive/main/interpreting-errors

https://zenn.dev/dev63/articles/6f2de87b534f5c

https://ja.react.dev/reference/react/useReducer#dispatch

https://typescriptbook.jp/reference/generics/type-parameter-constraint




## まとめ

- 今回はエラーが出た時の対処法についてまとめました。
- 最適解ではないことは重々承知ですが、ひとまずこれでOKと考えておきます。
- `「サバイバルTypeScript」`で問題にチャレンジできるらしいので暇なときにやってみます。

https://github.com/type-challenges/type-challenges?tab=readme-ov-file



<br><br><br><br><br><br>

## 【メモ】記事投稿でよく使うマークダウン記法

`## <font color="seablue">シーブルー</font>`

`### <font color="salmon">サーモンピンク</font>`

`<img src="" alt="代替テキスト" width=50% height=50%>`

`<a href="" target="_blank">テキスト</a>`

`***<font color="Red">動画05分20秒付近から</font>***`

