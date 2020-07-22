import Notification from "./index.ts";
import { storiesOf } from "@storybook/web-components";

storiesOf("notification", module).add("Base", () => {
  const root = document.createElement("div");
  const notification = new Notification({
    text: "不正です!!",
    type: "info"
  });

  const button = document.createElement("button");
  button.textContent = "open";
  button.addEventListener("click", function() {
    notification.open();
  });
  root.appendChild(button);

  const button2 = document.createElement("button");
  button2.textContent = "close";
  button2.addEventListener("click", function() {
    notification.close();
  });
  root.appendChild(button2);

  return root;
});
