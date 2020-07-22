import { LitElement, html, customElement, property } from "lit-element";

type Item = { value?: string; label?: string };
type CheckboxProps = {
  className?: string;
  error?: string;
  id?: string;
  itemLayout?: "horizontal" | "vertical";
  label?: string;
  borderVisible?: boolean;
  disabled?: boolean;
  requiredIcon?: boolean;
  visible?: boolean;
  items?: Item[];
  value?: string[];
  onChange?: (event?: MouseEvent | KeyboardEvent) => void;
};

@customElement("kuc-checkbox")
export default class Checkbox extends LitElement {
  @property({ type: String }) error = "";
  @property({ type: String }) itemLayout: "horizontal" | "vertical" =
    "horizontal";
  @property({ type: String }) label = "";
  @property({ type: Boolean }) borderVisible = true;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) requiredIcon = false;
  @property({ type: Boolean }) visible = true;
  @property({
    type: Array,
    hasChanged(newVal: Item[], _oldVal) {
      if (!Array.isArray(newVal)) {
        throw new Error("'items' property is not array");
      }
      const checkedList: string[] = [];
      newVal.forEach((item, index) => {
        if (
          checkedList.indexOf(item.value === undefined ? "" : item.value) > -1
        ) {
          throw new Error(
            `'items[${index}].value' is duplicated! You can specify unique one.`
          );
        }
        checkedList.push(item.value === undefined ? "" : item.value);
      });
      return true;
    }
  })
  items: Item[] = [];
  @property({
    type: Array,
    hasChanged(newVal: string[], _oldVal) {
      if (!Array.isArray(newVal)) {
        throw new Error("'value' property is not array");
      }
      const checkedList: string[] = [];
      newVal.forEach((value, index) => {
        if (checkedList.indexOf(value === undefined ? "" : value) > -1) {
          throw new Error(
            `'value[${index}]' is duplicated! You can specify unique one.`
          );
        }
        checkedList.push(value === undefined ? "" : value);
      });
      return true;
    }
  })
  value: string[] = [];

  private _onChange?: (params?: MouseEvent | KeyboardEvent) => void;
  private _GUID: string;

  constructor(props?: CheckboxProps) {
    super();
    this._GUID = this._generateGUID();
    if (!props) {
      return;
    }
    this.className =
      props.className !== undefined ? props.className : this.className;
    this.error = props.error !== undefined ? props.error : this.error;
    this.id = props.id !== undefined ? props.id : this.id;
    this.itemLayout =
      props.itemLayout !== undefined ? props.itemLayout : this.itemLayout;
    this.label = props.label !== undefined ? props.label : this.label;
    this.borderVisible =
      props.borderVisible !== undefined
        ? props.borderVisible
        : this.borderVisible;
    this.disabled =
      props.disabled !== undefined ? props.disabled : this.disabled;
    this.requiredIcon =
      props.requiredIcon !== undefined ? props.requiredIcon : this.requiredIcon;
    this.visible = props.visible !== undefined ? props.visible : this.visible;
    if (!Array.isArray(props.items)) {
      throw new Error("'items' property is not array");
    }
    const checkedItemsList: string[] = [];
    props.items.forEach((item, index) => {
      if (
        checkedItemsList.indexOf(item.value === undefined ? "" : item.value) >
        -1
      ) {
        throw new Error(
          `'items[${index}].value' is duplicated! You can specify unique one.`
        );
      }
      checkedItemsList.push(item.value === undefined ? "" : item.value);
    });
    this.items = props.items !== undefined ? props.items : this.items;
    if (!Array.isArray(props.value)) {
      throw new Error("'value' property is not array");
    }
    const checkedValueList: string[] = [];
    props.value.forEach((value, index) => {
      if (checkedValueList.indexOf(value === undefined ? "" : value) > -1) {
        throw new Error(
          `'value[${index}]' is duplicated! You can specify unique one.`
        );
      }
      checkedValueList.push(value === undefined ? "" : value);
    });
    this.value = props.value !== undefined ? props.value : this.value;
    this._onChange = props.onChange;
  }

  set onChange(
    callback: ((event?: MouseEvent | KeyboardEvent) => void) | undefined
  ) {
    this._onChange = callback;
    this.requestUpdate();
  }

  get onChange(): ((event?: MouseEvent | KeyboardEvent) => void) | undefined {
    return this._onChange;
  }

  private _generateGUID(): string {
    return (
      new Date().getTime().toString(16) +
      Math.floor(Math.random() * 0x1000).toString(16)
    );
  }

  private _updateVisible() {
    if (!this.visible) {
      this.setAttribute("hidden", "");
    } else {
      this.removeAttribute("hidden");
    }
  }

  private _updateValue(event: MouseEvent | KeyboardEvent) {
    const itemEl = event.currentTarget as HTMLDivElement;
    const inputEl = itemEl.firstElementChild as HTMLInputElement;
    const value = inputEl.value;
    const index = this.value.indexOf(value);
    if (index > -1) {
      this.value.splice(index, 1);
    } else {
      this.value.push(value);
    }
    typeof this._onChange === "function" && this._onChange(event);
    this.requestUpdate();
  }

  private _handleClickItem(event: MouseEvent) {
    if (this.disabled) {
      return;
    }
    event.preventDefault();
    this._updateValue(event);
  }

  private _handleKeyUpItem(event: KeyboardEvent) {
    if (this.disabled || event.keyCode !== 32) {
      return;
    }
    this._updateValue(event);
  }

  createRenderRoot() {
    return this;
  }

  private _getItemTemplate(item: Item, index: number) {
    return html`
      <div
        class="kuc-checkbox__group__select-menu__item"
        itemLayout="${this.itemLayout}"
        tabindex="${this.disabled ? -1 : 0}"
        @click="${this._handleClickItem}"
        @keyup="${this._handleKeyUpItem}"
      >
        <input
          type="checkbox"
          aria-describedby="${this._GUID}-error"
          id="${this._GUID}-item-${index}"
          class="kuc-checkbox__group__select-menu__item__input"
          name=${this.label !== undefined ? this.label : ""}
          value=${item.value !== undefined ? item.value : ""}
          ?disabled="${this.disabled}"
          ?checked=${item.value !== undefined
            ? this.value.indexOf(item.value) > -1
            : false}
        />
        <label
          for="${this._GUID}-item-${index}"
          class="kuc-checkbox__group__select-menu__item__label"
          >${item.label === undefined ? item.value : item.label}</label
        >
      </div>
    `;
  }

  render() {
    this._updateVisible();
    return html`
      ${this._getStyleTagTemplate()}
      <fieldset class="kuc-checkbox__group">
        <legend
          class="kuc-checkbox__group__label"
          ?hidden="${this.label === ""}"
        >
          <span class="kuc-checkbox__group__label__text">${this.label}</span
          ><!--
          --><span
            class="kuc-checkbox__group__label__required-icon"
            aria-label="required"
            ?hidden="${!this.requiredIcon}"
            >*</span
          >
        </legend>
        <div
          class="kuc-checkbox__group__select-menu"
          ?borderVisible=${this.borderVisible}
          itemLayout="${this.itemLayout}"
        >
          ${this.items.map((item, index) => this._getItemTemplate(item, index))}
        </div>
        <div
          class="kuc-checkbox__error"
          role="alert"
          aria-invalid="true"
          id="${this._GUID}-error"
          ?hidden="${this.error === ""}"
        >
          ${this.error}
        </div>
      </fieldset>
    `;
  }

  private _getStyleTagTemplate() {
    return html`
      <style>
        kuc-checkbox {
          font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
            sans-serif;
          font-size: 14px;
          color: #333;
          display: inline-block;
        }
        kuc-checkbox[hidden] {
          display: none;
        }
        .kuc-checkbox__group {
          border: none;
          padding: 0px;
          height: auto;
          display: inline-block;
        }
        .kuc-checkbox__group__label {
          display: inline-block;
          padding: 4px 0 8px 0;
          white-space: nowrap;
        }
        .kuc-checkbox__group__label[hidden] {
          display: none;
        }
        .kuc-checkbox__group__label__required-icon {
          font-size: 20px;
          vertical-align: -3px;
          color: #e74c3c;
          margin-left: 4px;
          line-height: 1;
        }
        .kuc-checkbox__group__label__required-icon[hidden] {
          display: none;
        }
        .kuc-checkbox__group__select-menu[itemLayout="vertical"] {
          min-width: 233px;
        }
        .kuc-checkbox__group__select-menu[borderVisible] {
          border-color: #e3e7e8;
          border-width: 1px;
          border-style: solid;
          padding: 4px 0 0 4px;
        }
        .kuc-checkbox__group__select-menu__item {
          margin-bottom: 4px;
          margin-right: 16px;
          padding: 4px;
          border: 1px solid transparent;
          position: relative;
          white-space: normal;
          word-wrap: normal;
          display: inline-block;
          height: 24px;
        }
        .kuc-checkbox__group__select-menu__item[itemLayout="vertical"] {
          display: block;
        }
        .kuc-checkbox__group__select-menu__item:focus {
          border: 1px solid #3498db;
        }
        .kuc-checkbox__group__select-menu__item[tabIndex="-1"]:focus {
          border: 1px solid transparent;
        }
        .kuc-checkbox__group__select-menu__item__input {
          display: none;
          cursor: pointer;
        }
        .kuc-checkbox__group__select-menu__item__input:hover
          + .kuc-checkbox__group__select-menu__item__label {
          color: #666;
        }
        .kuc-checkbox__group__select-menu__item__input
          + .kuc-checkbox__group__select-menu__item__label::before {
          position: absolute;
          top: 50%;
          left: -30px;
          box-sizing: border-box;
          margin-top: -11px;
          width: 21px;
          height: 21px;
          box-shadow: 1px 1px 3px #f5f5f5 inset, -1px -1px 3px #f5f5f5 inset;
          content: "";
        }
        .kuc-checkbox__group__select-menu__item__input:not(:checked)
          + .kuc-checkbox__group__select-menu__item__label::before {
          background: url("data:image/svg+xml;charset=utf8,%3Csvg width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='1' y='1' width='19' height='19' rx='1' fill='white' stroke='%23D8D8D8' stroke-width='2'/%3E%3C/svg%3E")
            no-repeat center center #fff;
        }
        .kuc-checkbox__group__select-menu__item__input:checked
          + .kuc-checkbox__group__select-menu__item__label::before {
          background: url("data:image/svg+xml;charset=utf8,%3Csvg width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='1' y='1' width='19' height='19' rx='1' fill='white' stroke='%233498DB' stroke-width='2'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5 11L6.5 9L9.5 11.5L14.5 6L16 7.5L9.5 14.5L5 11Z' fill='%233498DB'/%3E%3C/svg%3E")
            no-repeat center center #fff;
        }
        .kuc-checkbox__group__select-menu__item__input:checked
          + .kuc-checkbox__group__select-menu__item__label::after {
          position: absolute;
          top: 50%;
          left: -30px;
          margin-top: -11px;
          box-sizing: border-box;
          width: 21px;
          height: 21px;
          background: url("data:image/svg+xml;charset=utf8,%3Csvg width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='1' y='1' width='19' height='19' rx='1' fill='white' stroke='%233498DB' stroke-width='2'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5 11L6.5 9L9.5 11.5L14.5 6L16 7.5L9.5 14.5L5 11Z' fill='%233498DB'/%3E%3C/svg%3E")
            no-repeat center center #fff;
          content: "";
        }
        .kuc-checkbox__group__select-menu__item__input[disabled]
          + .kuc-checkbox__group__select-menu__item__label {
          color: #bababa;
          cursor: not-allowed;
        }
        .kuc-checkbox__group__select-menu__item__input[disabled]:checked
          + .kuc-checkbox__group__select-menu__item__label::before {
          background: url("data:image/svg+xml;charset=utf8,%3Csvg width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='1' y='1' width='19' height='19' rx='1' fill='white' stroke='%23D8D8D8' stroke-width='2'/%3E%3C/svg%3E")
            no-repeat center center #fff;
        }
        .kuc-checkbox__group__select-menu__item__input[disabled]:checked
          + .kuc-checkbox__group__select-menu__item__label::after {
          background: url("data:image/svg+xml;charset=utf8,%3Csvg width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='1' y='1' width='19' height='19' rx='1' fill='white' stroke='%23D8D8D8' stroke-width='2'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5 11L6.5 9L9.5 11.5L14.5 6L16 7.5L9.5 14.5L5 11Z' fill='%23D8D8D8'/%3E%3C/svg%3E")
            no-repeat center center#fff;
        }
        .kuc-checkbox__group__select-menu__item__label {
          cursor: pointer;
          position: relative;
          margin-left: 32px;
          display: inline-block;
          vertical-align: middle;
          white-space: nowrap;
        }
        .kuc-checkbox__error {
          padding: 4px 18px;
          box-sizing: border-box;
          background-color: #e74c3c;
          color: #f6f6f6;
          margin: 8px 0;
        }
        .kuc-checkbox__error[hidden] {
          display: none;
        }
      </style>
    `;
  }
}
