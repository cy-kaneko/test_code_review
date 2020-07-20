# Overview

Checkbox は、複数選択のチェックボックスを表示します。

```KUCComponentRenderer {"id":"_render"}
var component = new Checkbox({
  value :  'Orange',
  visible : true,
  items : [
    { 
      label: 'orange',
      value: 'Orange' 
    },
    { 
      label: 'apple',
      value: 'Apple' 
    },
  ]
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
|itemLayout|string|"horizontal"|選択肢の並べ方|以下を指定できる<br>"horizontal" : 横並び<br>"vertical" : 縦並び|
|label|string|""|コンポーネントの説明ラベル|未指定、あるいは空文字の場合、label は表示されない|
|borderVisible|boolean|true|選択肢を囲う枠線の表示/非表示設定||
|disabled|boolean|false|コンポーネントの選択可/不可設定||
|requiredIcon|boolean|false|コンポーネントの必須アイコン表示/非表示設定||
|visible|boolean|true|コンポーネントの表示/非表示設定||
|items|Array\<Item\>|[]|表示する選択肢一覧|items が配列ではない場合、エラーを出力する|
|Item.label|string|null|各選択肢のテキスト|Item.label が未指定の場合、UI 上は Item.value の値が表示される|
|Item.value|string|null|各選択肢の値|Item.value の値が重複した場合、エラーを出力する|
|value|Array\<string\>|""|選択されている値|value が配列以外の時、エラーを出力する<br>配列内の値が重複した場合、エラーを出力する|
|onChange|function|null|値が変更されたときのイベントハンドラ設定|引数には MouseEvent と KeyboardEvent の event オブジェクトをとる|

## Constructor

Checkbox(options)     
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
var checkbox = new kintoneUIComponent.Checkbox({
  label: 'Fruit',
  requiredIcon: true,
  items: [
    { 
      label: 'orange',
      value: 'Orange'
    },
    { 
      label: 'apple',
      value: 'Apple'
    }
  ],
  value: ['Orange'],
  itemLayout: 'horizontal',
  error: 'Error occurred!',
  className: 'options-class',
  id: 'options-id',
  visible: true,
  disabled: false,
  borderVisible: true,
  onChange: function(event) {
    console.log(event);
  } 
});
space.appendChild(checkbox);
```
