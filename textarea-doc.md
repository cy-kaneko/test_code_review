# Overview

TextArea は、複数行のテキストを表示します。

```KUCComponentRenderer {"id":"_render"}
var component = new TextArea({
  label: 'Fruit',
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
|error|string|""|エラーに表示するテキスト| 未指定、あるいは空文字 の場合、error は表示されない|
|id|string|""|コンポーネントの id 名||
|label|string|""|コンポーネントの説明ラベル|未指定、あるいは空文字の場合、label は表示されない|
|value|string|""|表示されるテキスト||
|disabled|boolean|false|コンポーネントの編集可/不可設定||
|requiredIcon|boolean|false|コンポーネントの必須アイコン表示/非表示設定||
|visible|boolean|true|コンポーネントの表示/非表示設定||
|onChange|function|null|値が変更された時のイベントハンドラ設定|引数には Event の event オブジェクトをとる|
|onClick|function|null|クリック時のイベントハンドラ設定|引数には MouseEvent の event オブジェクトをとる|

## Constructor

TextArea(options)     
使用できるコンストラクタの一覧です。

### Parameter
| Name| Type| Default | Description |Remark|
| :--- | :--- | :--- | :--- | :--- |
|options|object|{}|コンポーネントのプロパティを含む JSON オブジェクト|options 内の値は必須でない|

***
# Sample Code

全てのパラメータを指定した場合のサンプルコードです。

```javascript
var space = kintone.app.record.getSpaceElement('space');
var textarea = new kintoneUIComponent.TextArea({
  label: 'Fruit',
  requiredIcon: true,
  value: 'Apple',
  error: 'Error occurred!',
  className: 'options-class',
  id: 'options-id',
  visible: true,
  disabled: false,
  onChange: function(event) {
    console.log(event);
  },
  onClick: function(event) {
    console.log(event);
  }
});
space.appendChild(textarea);
```
