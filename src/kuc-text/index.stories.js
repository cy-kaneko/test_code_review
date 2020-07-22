import Text from "./index.ts";
import { storiesOf } from "@storybook/web-components";

storiesOf("kuc-text", module)
  .add("Base", () => {
    const root = document.createElement("div");
    const text = new Text({
      value: "Orange",
      className: "hoge var",
      id: "aaaaaa",
      textalign: "righttt",
      placeholder: "hogehoge1",
      label: "フルーツ",
      requiredIcon: true,
      error: "エラーです",
      onClick: e => {
        console.log("click!!");
        console.log(e);
      },
      onChange: e => {
        console.log("change!!");
        console.log(e);
      }
    });
    root.appendChild(text);
    return root;
  })
  .add("Base2", () => {
    const root = document.createElement("div");
    const text = new Text();
    text.value = "Apple";
    text.className = "hogehoge var";
    text.id = "ididid";
    text.placeholder = "hogehoge2";
    text.prefix = "$$$";
    text.suffix = "円";
    text.textalign = "righttt";
    text.label = "フルーツ";
    text.requiredIcon = true;
    text.error = "エラーです";
    text.onChange = e => {
      console.log("change!!");
      console.log(e);
    };
    root.appendChild(text);

    const text2 = new Text();
    text2.value = "Apple";
    text2.placeholder = "hogehoge2";
    text2.prefix = "$$$";
    text2.suffix = "円";
    text2.textalign = "right";
    text2.label = "フルーツ";
    text2.requiredIcon = true;
    text2.error = "エラーです";
    text2.onClick = e => {
      console.log("click!!");
      console.log(e);
    };
    root.appendChild(text2);
    return root;
  })
  .add("Base3", () => {
    return `
      <style>
        .hoge {
          margin-top: 12px;
        }
      </style>
      <kuc-text value="aa" class="hoge" id="aaaa" placeholder="hogehoge3" prefix="$" suffix="円" textalign="right"></kuc-text>
      <kuc-text value="ss" class="hoge" id="bbb" placeholder="hoge" prefix="$" suffix="円" textalign="left" disabled></kuc-text>
      <kuc-text value="ss" class="hoge" id="bbb" placeholder="hoge" prefix="$" suffix="円" textalign="left"></kuc-text>
    `;
  });
