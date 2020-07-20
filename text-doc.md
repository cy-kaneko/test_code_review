# Overview

Text は、単一行のテキストを表示します。

```KUCComponentRenderer {"id":"_render"}
var component = new Text({
  label: 'Fruit',
  visible: true
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
|placeholder|string|""|空欄時に入力例として表示されるテキスト||
|prefix|string|""|Text の前に表示されるテキスト||
|suffix|string|""|Text の後に表示されるテキスト||
|textAlign|string|"left"|表示するテキストの位置|以下を指定できる<br>"left" : 左寄せ<br>"right" : 右寄せ|
|value|string|""|選択されている値|value が未指定の場合、何も更新されない|
|disabled|boolean|false|コンポーネントの編集可/不可設定||
|requiredIcon|boolean|false|コンポーネントの必須アイコン表示/非表示設定||
|visible|boolean|true|コンポーネントの表示/非表示設定||
|onChange|function|null|値が変更された場合のイベントハンドラ設定| 引数には Event の event オブジェクトをとる|
|onClick|function|null|クリック時のイベントハンドラ設定| 引数には MouseEvent の event オブジェクトをとる|

## Constructor

Text(options)  
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
var text = new kintoneUIComponent.Text({
  label: 'Fruit',
  requiredIcon: true,
  value: 'Apple',
  placeholder: 'Apple',
  prefix: '$',
  suffix: 'yen',
  textAlign: 'left',
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
space.appendChild(text);
```
