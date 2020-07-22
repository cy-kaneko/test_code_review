import {
  LitElement,
  html,
  customElement,
  property,
  queryAll
} from "lit-element";

type Item = {
  label?: string;
  value?: string;
};
type DropdownProps = {
  className?: string;
  error?: string;
  id?: string;
  label?: string;
  value?: string;
  disabled?: boolean;
  requiredIcon?: boolean;
  visible?: boolean;
  items?: Item[];
};

@customElement("kuc-dropdown")
export default class Dropdown extends LitElement {
  @property({ type: String }) error = "";
  @property({ type: String }) label = "";
  @property({ type: String }) value = "";
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) requiredIcon = false;
  @property({ type: Boolean }) visible = true;
  @property({
    type: Array,
    hasChanged(newVal: Item[]) {
      if (!Array.isArray(newVal)) {
        throw new Error("'items' property is not array");
      }
      const itemsValue = newVal.map(item => item.value);
      itemsValue.forEach((value, number, self) => {
        if (value !== undefined && self.indexOf(value) !== number) {
          throw new Error(`'items[${number}].value' property is duplicated`);
        }
      });
      return true;
    }
  })
  items: Item[] = [];

  @queryAll(".kuc-dropdown__select-menu__item")
  private _itemsEl!: HTMLLIElement[];

  private _selectorVisible = false;
  private _GUID: string;

  constructor(props?: DropdownProps) {
    super();
    this._GUID = this._generateGUID();
    if (!props) {
      return;
    }
    this.className =
      props.className !== undefined ? props.className : this.className;
    this.error = props.error !== undefined ? props.error : this.error;
    this.id = props.id !== undefined ? props.id : this.id;
    this.label = props.label !== undefined ? props.label : this.label;
    this.value = props.value !== undefined ? props.value : this.value;
    this.disabled =
      props.disabled !== undefined ? props.disabled : this.disabled;
    this.requiredIcon =
      props.requiredIcon !== undefined ? props.requiredIcon : this.requiredIcon;
    this.visible = props.visible !== undefined ? props.visible : this.visible;
    if (props.items !== undefined) {
      if (!Array.isArray(props.items)) {
        throw new Error("'items' property is not array");
      }
      const itemsValue = props.items.map(item => item.value);
      itemsValue.forEach((value, number, self) => {
        if (value !== undefined && self.indexOf(value) !== number) {
          throw new Error(`'items[${number}].value' property is duplicated`);
        }
      });
      this.items = props.items;
    }
    this.value = props.value !== undefined ? props.value : this.value;
  }

  private _generateGUID(): string {
    return (
      new Date().getTime().toString(16) +
      Math.floor(Math.random() * 0x1000).toString(16)
    );
  }

  private _getSelectedLabel() {
    let selectedItemLabel = "";
    this.items.forEach(item => {
      if (item.value === this.value) {
        selectedItemLabel = item.label === undefined ? item.value : item.label;
      }
    });
    return selectedItemLabel;
  }

  private _updateVisible() {
    if (!this.visible) {
      this.setAttribute("hidden", "");
    } else {
      this.removeAttribute("hidden");
    }
  }

  private _dispatchCustomEvent(eventName: string, detail?: object) {
    const changeEvent = new CustomEvent(eventName, {
      detail,
      bubbles: true,
      composed: true
    });
    return this.dispatchEvent(changeEvent);
  }

  private _handleClickDropdownToggle(event: MouseEvent) {
    if (!this._selectorVisible) {
      this._itemsEl.forEach((itemEl: HTMLLIElement) => {
        if (itemEl.classList.contains("kuc-dropdown__select-menu__highlight")) {
          itemEl.classList.remove("kuc-dropdown__select-menu__highlight");
        }
        if (itemEl.getAttribute("aria-checked") === "true") {
          itemEl.classList.add("kuc-dropdown__select-menu__highlight");
        }
      });
    }
    this._selectorVisible = !this._selectorVisible;
    this.requestUpdate();
  }

  private _handleBlurDropdownToggle(event: Event) {
    this._selectorVisible = false;
    this.requestUpdate();
  }

  private _handleMousedownDropdownItem(event: MouseEvent) {
    const itemEl = event.target as HTMLLIElement;
    const detail = { oldValue: this.value, value: "" };
    this._selectorVisible = false;
    if (itemEl.getAttribute("value") !== null) {
      const value = itemEl.getAttribute("value") as string;
      if (this.value !== value) {
        this.value = value;
        detail.value = this.value;
        this._dispatchCustomEvent("change", detail);
        return;
      }
    }
    this.requestUpdate();
  }

  private _handleMouseOverDropdownItem(event: Event) {
    this._itemsEl.forEach((itemEl: HTMLLIElement) => {
      if (itemEl.classList.contains("kuc-dropdown__select-menu__highlight")) {
        itemEl.classList.remove("kuc-dropdown__select-menu__highlight");
      }
    });
    const itemEl = event.currentTarget as HTMLLIElement;
    itemEl.classList.add("kuc-dropdown__select-menu__highlight");
  }

  private _handleMouseLeaveDropdownItem(event: Event) {
    const itemEl = event.currentTarget as HTMLLIElement;
    itemEl.classList.remove("kuc-dropdown__select-menu__highlight");
  }

  private _handleKeyDownDropdownToggle(event: KeyboardEvent) {
    if (!this._selectorVisible) {
      this._itemsEl.forEach((itemEl: HTMLLIElement) => {
        if (itemEl.classList.contains("kuc-dropdown__select-menu__highlight")) {
          itemEl.classList.remove("kuc-dropdown__select-menu__highlight");
        }
        if (itemEl.getAttribute("aria-checked") === "true") {
          itemEl.classList.add("kuc-dropdown__select-menu__highlight");
        }
      });
    } else {
      let highLightNumber = 0;
      switch (event.keyCode) {
        case 38: {
          this._itemsEl.forEach((itemEl: HTMLLIElement, number: number) => {
            if (
              itemEl.classList.contains("kuc-dropdown__select-menu__highlight")
            ) {
              itemEl.classList.remove("kuc-dropdown__select-menu__highlight");
              highLightNumber = number - 1;
            }
          });
          highLightNumber =
            highLightNumber <= -1 ? this._itemsEl.length - 1 : highLightNumber;
          this._itemsEl[highLightNumber].classList.add(
            "kuc-dropdown__select-menu__highlight"
          );
          break;
        }
        case 40: {
          this._itemsEl.forEach((itemEl: HTMLLIElement, number: number) => {
            if (
              itemEl.classList.contains("kuc-dropdown__select-menu__highlight")
            ) {
              itemEl.classList.remove("kuc-dropdown__select-menu__highlight");
              highLightNumber = number + 1;
            }
          });
          highLightNumber =
            highLightNumber >= this._itemsEl.length ? 0 : highLightNumber;
          this._itemsEl[highLightNumber].classList.add(
            "kuc-dropdown__select-menu__highlight"
          );
          break;
        }
        case 13: {
          this._itemsEl.forEach((itemEl: HTMLLIElement) => {
            if (
              itemEl.classList.contains("kuc-dropdown__select-menu__highlight")
            ) {
              const value = itemEl.getAttribute("value") as string;
              const detail = { oldValue: this.value, value: "" };
              this.value = value;
              detail.value = this.value;
              this._dispatchCustomEvent("change", detail);
            }
          });
          this.requestUpdate();
          break;
        }
        default:
          break;
      }
    }
  }

  private _getItemTemplate(item: Item) {
    return html`
      <li
        class="kuc-dropdown__select-menu__item"
        role="menuitem"
        tabindex=${item.value === this.value ? "0" : "-1"}
        aria-checked=${item.value === this.value ? "true" : "false"}
        value=${item.value !== undefined ? item.value : ""}
        @mousedown="${this._handleMousedownDropdownItem}"
        @mouseover="${this._handleMouseOverDropdownItem}"
        @mouseleave="${this._handleMouseLeaveDropdownItem}"
      >
        ${item.label === undefined ? item.value : item.label}
      </li>
    `;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    this._updateVisible();
    return html`
      ${this._getStyleTagTemplate()}
      <div
        class="kuc-dropdown__label"
        id="${this._GUID}-label"
        ?hidden="${!this.label}"
      >
        <span class="kuc-dropdown__label__text">${this.label}</span
        ><!--
        --><span
          class="kuc-dropdown__label__required-icon"
          aria-label="required"
          ?hidden="${!this.requiredIcon}"
          >*</span
        >
      </div>
      <button
        class="kuc-dropdown__toggle"
        id="${this._GUID}-toggle"
        aria-haspopup="true"
        aria-labelledby="${this._GUID}-label ${this._GUID}-toggle"
        aria-describedby="${this._GUID}-error"
        ?disabled="${this.disabled}"
        @click="${this._handleClickDropdownToggle}"
        @blur="${this._handleBlurDropdownToggle}"
        @keydown="${this._handleKeyDownDropdownToggle}"
      >
        <span class="kuc-dropdown__toggle__selected-item-label"
          >${this._getSelectedLabel()}</span
        >
        <span class="kuc-dropdown__toggle__icon"></span>
      </button>
      <ul
        class="kuc-dropdown__select-menu"
        role="menu"
        aria-hidden="${!this._selectorVisible}"
        ?hidden="${!this._selectorVisible}"
      >
        ${this.items.map(item => this._getItemTemplate(item))}
      </ul>
      <div
        class="kuc-dropdown__error"
        id="${this._GUID}-error"
        role="alert"
        ?hidden="${!this.error}"
      >
        ${this.error}
      </div>
    `;
  }

  private _getStyleTagTemplate() {
    return html`
      <style>
        kuc-dropdown {
          display: inline-block;
          font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
            sans-serif;
          font-size: 14px;
          color: #333;
        }
        kuc-dropdown[hidden] {
          display: none;
        }
        .kuc-dropdown__label {
          margin-top: 4px;
          margin-bottom: 8px;
        }
        .kuc-dropdown__label[hidden] {
          display: none;
        }
        .kuc-dropdown__label__required-icon {
          font-size: 20px;
          vertical-align: -3px;
          color: #e74c3c;
          margin-left: 4px;
          line-height: 1;
        }
        .kuc-dropdown__label__required-icon[hidden] {
          display: none;
        }
        .kuc-dropdown__toggle {
          width: 180px;
          height: 40px;
          box-sizing: border-box;
          box-shadow: 1px 1px 1px #fff inset;
          border: 1px solid #e3e7e8;
          color: #3498db;
          background-color: #f7f9fa;
          padding: 0 0 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .kuc-dropdown__toggle:focus {
          border: 1px solid #3498db;
        }
        .kuc-dropdown__toggle:disabled {
          background-color: #dbdcdd;
          box-shadow: none;
          cursor: not-allowed;
          color: #888;
        }
        .kuc-dropdown__toggle__selected-item-label {
          font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
            sans-serif;
          font-size: 14px;
          text-align: left;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .kuc-dropdown__toggle__icon {
          flex: none;
          width: 38px;
          height: 38px;
          background: url("data:image/svg+xml;charset=utf8,%3Csvg width='38' height='38' viewBox='0 0 38 38' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M24.2122 15.6665L25 16.1392L19.7332 21.4998H18.2668L13 16.1392L13.7878 15.6665L18.765 20.6866H19.235L24.2122 15.6665Z' fill='%233498DB'/%3E%3C/svg%3E")
            no-repeat center center transparent;
        }
        .kuc-dropdown__error {
          display: inline-block;
          width: 180px;
          padding: 4px 18px;
          box-sizing: border-box;
          background-color: #e74c3c;
          color: #ffffff;
          margin-top: 8px;
        }
        .kuc-dropdown__error[hidden] {
          display: none;
        }
        .kuc-dropdown__select-menu {
          position: absolute;
          min-width: 280px;
          margin: 0;
          padding: 8px 0;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
          background-color: #fff;
          z-index: 2000;
          list-style: none;
        }
        .kuc-dropdown__select-menu[hidden] {
          display: none;
        }
        .kuc-dropdown__select-menu__item {
          padding: 8px 16px 8px 24px;
          line-height: 1;
        }
        .kuc-dropdown__select-menu__item[aria-checked="true"] {
          background: url("data:image/svg+xml;charset=utf8,%3Csvg width='11' height='9' viewBox='0 0 11 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 5L1.5 3L4.5 5.5L9.5 0L11 1.5L4.5 8.5L0 5Z' fill='%233498DB'/%3E%3C/svg%3E")
            no-repeat 6px 10px;
          color: #3498db;
        }
        .kuc-dropdown__select-menu__highlight[role="menuitem"] {
          background-color: #e1f2f7;
        }
      </style>
    `;
  }
}
