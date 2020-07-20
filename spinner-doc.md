# Overview

Spinner は、ローディングスピナーを表示します。

```KUCComponentRenderer {"id":"_render"}
var component = new Spinner({
});
```
***
# Specification

## Property

使用できるプロパティの一覧です。プロパティを指定して値を更新することができます。

| Name| Type| Default | Description |　Remark |
| :--- | :--- | :--- | :--- | :--- |
|text|string|""|ローダーアイコン下部に表示するテキスト|text が未指定もしくは空文字の場合*は、初期値を表示する|

\* textが未指定もしくは空文字の場合は、アクセシビリティを考慮して、visually-hidden classを付与し、"now loading…"の文言を視覚的に見えない状態で表示します

## Constructor

Spinner(options)     
使用できるコンストラクタの一覧です。

### Parameter
| Name| Type| Default | Description |Remark|
| :--- | :--- | :--- | :--- | :--- |
|options|object|{}|コンポーネントのプロパティを含む JSON オブジェクト|options 内の値は必須でない|

## Method
使用できるメソッドの一覧です。

### open()
コンポーネントを表示する

#### Parameter
none

#### Return
none

### close()
コンポーネントを非表示にする

#### Parameter
none

#### Return
none

***
# Sample Code

全てのパラメータを指定した場合のサンプルコードです。

```javascript
var spinner = new kintoneUIComponent.Spinner({
  text: 'now loading...'
});
spinner.open();
spinner.close();
```
