# Overview

Button は、ボタンを表示します。

```KUCComponentRenderer {"id":"_render"}
var component = new Button({
  text: 'Submit',
  type: 'submit',
  visible : true
});
```
***
# Specification

## Property

使用できるプロパティの一覧です。プロパティを指定して値を更新することができます。

| Name| Type| Default | Description |　Remark |
| :--- | :--- | :--- | :--- | :--- |
|className|string|""|コンポーネントの class 名||
|id|string|""|コンポーネントの id 名||
|text|string|""|ボタンに表示するテキスト||
|type|string|"normal"|ボタンのデザインタイプ|以下を指定できる<br>"normal" : Gray(#F7F9FA)<br>"submit" : Blue(#3498DB)<br>"alert" : Red(#E74C3C)<br>"save" : Green(#91C36C)|
|disabled|boolean|false|コンポーネントの編集可/不可設定||
|visible|boolean|true|コンポーネントの表示/非表示設定||
|onClick|function|null|クリック時のイベントハンドラ設定|引数には MouseEvent の event オブジェクトをとる|

## Constructor

Dropdown(options)     
使用できるコンストラクタの一覧です。

### Parameter
| Name| Type| Default | Description |Remark|
| :--- | :--- | :--- | :--- | :--- |
|options|object|{}|コンポーネントのプロパティを含む JSON オブジェクト|options 内の値は必須でない|

***
# Sample Code

全てのパラメータを指定した場合のサンプルコードです。

```javascript
var header = kintone.app.getHeaderMenuSpaceElement();
var button = new kintoneUIComponent.Button({
    text: 'Submit',
    type: 'submit',
    className: 'options-class',
    id: 'options-id',
    visible: true,
    disabled: false,
    onClick: function(event) {
      console.log(event);
    }
});
header.appendChild(button);
```
