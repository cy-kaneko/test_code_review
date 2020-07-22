import { LitElement, html, customElement, property } from "lit-element";

type TextProps = {
  className?: string;
  error?: string;
  id?: string;
  label?: string;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  textAlign?: "left" | "right";
  value?: string;
  disabled?: boolean;
  requiredIcon?: boolean;
  visible?: boolean;
  onChange?: (event?: Event) => void;
  onClick?: (event?: MouseEvent) => void;
};

@customElement("kuc-text")
export default class Text extends LitElement {
  @property({ type: String }) error = "";
  @property({ type: String }) label = "";
  @property({ type: String }) placeholder = "";
  @property({ type: String }) prefix = "";
  @property({ type: String }) suffix = "";
  @property({ type: String }) textAlign = "left";
  @property({ type: String }) value = "";
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) requiredIcon = false;
  @property({ type: Boolean }) visible = true;

  private _onChange?: (event?: Event) => void;
  private _onClick?: (event?: MouseEvent) => void;
  private _GUID: string;

  constructor(props?: TextProps) {
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
    this.placeholder =
      props.placeholder !== undefined ? props.placeholder : this.placeholder;
    this.prefix = props.prefix !== undefined ? props.prefix : this.prefix;
    this.suffix = props.suffix !== undefined ? props.suffix : this.suffix;
    this.textAlign =
      props.textAlign !== undefined ? props.textAlign : this.textAlign;
    this.value = props.value !== undefined ? props.value : this.value;
    this.disabled =
      props.disabled !== undefined ? props.disabled : this.disabled;
    this.requiredIcon =
      props.requiredIcon !== undefined ? props.requiredIcon : this.requiredIcon;
    this.visible = props.visible !== undefined ? props.visible : this.visible;
    this._onClick = props.onClick;
    this._onChange = props.onChange;
  }

  set onChange(callback: ((event?: Event) => void) | undefined) {
    this._onChange = callback;
    this.requestUpdate();
  }

  get onChange(): ((event?: Event) => void) | undefined {
    return this._onChange;
  }

  set onClick(callback: ((event?: MouseEvent) => void) | undefined) {
    this._onClick = callback;
    this.requestUpdate();
  }

  get onClick(): ((event?: MouseEvent) => void) | undefined {
    return this._onClick;
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

  private _handleClickInput(event: MouseEvent) {
    typeof this._onClick === "function" && this._onClick(event);
  }

  private _handleChangeInput(event: Event) {
    const targetEl = event.target as HTMLInputElement;
    this.value = targetEl.value;
    typeof this._onChange === "function" && this._onChange(event);
  }

  createRenderRoot() {
    return this;
  }

  render() {
    this._updateVisible();
    return html`
      ${this._getStyleTagTemplate()}
      <div class="kuc-text__text">
        <label
          class="kuc-text__text__label"
          for="${this._GUID}-label"
          ?hidden=${!this.label}
        >
          <span class="kuc-text__text__label__text">${this.label}</span
          ><!--
          --><span
            class="kuc-text__text__label__required-icon"
            aria-label="required"
            ?hidden=${!this.requiredIcon}
            >*</span
          >
        </label>
        <div class="kuc-text__text__input-form">
          <span
            class="kuc-text__text__input-form__prefix"
            ?hidden="${!this.prefix}"
            >${this.prefix}</span
          ><!--
          --><input
            class="kuc-text__text__input-form__input"
            id="${this._GUID}-label"
            placeholder=${this.placeholder}
            textAlign=${this.textAlign}
            type="text"
            value=${this.value}
            aria-invalid="${this.error !== ""}"
            aria-describedBy="${this._GUID}-error"
            @click="${this._handleClickInput}"
            @change="${this._handleChangeInput}"
            ?disabled="${this.disabled}"
          /><!--
          --><span
            class="kuc-text__text__input-form__suffix"
            ?hidden="${!this.suffix}"
            >${this.suffix}</span
          >
        </div>
        <div
          class="kuc-text__text__error"
          id="${this._GUID}-error"
          role="alert"
          ?hidden=${!this.error}
        >
          ${this.error}
        </div>
      </div>
    `;
  }

  private _getStyleTagTemplate() {
    return html`
      <style>
        kuc-text {
          font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
            sans-serif;
          font-size: 14px;
          color: #333;
          display: inline-block;
        }
        kuc-text[hidden] {
          display: none;
        }
        .kuc-text__text {
          display: inline-block;
        }
        .kuc-text__text__label {
          display: inline-block;
          margin-top: 4px;
          margin-bottom: 8px;
        }
        .kuc-text__text__label[hidden] {
          display: none;
        }
        .kuc-text__text__label__required-icon {
          font-size: 20px;
          vertical-align: -3px;
          color: #e74c3c;
          margin-left: 4px;
          line-height: 1;
        }
        .kuc-text__text__label__required-icon[hidden] {
          display: none;
        }
        .kuc-text__text__input-form__prefix {
          padding-right: 4px;
        }
        .kuc-text__text__input-form__input {
          width: 180px;
          height: 40px;
          padding: 0 8px;
          border: 1px solid #e3e7e8;
          box-sizing: border-box;
          font-size: 14px;
          font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
            sans-serif;
          box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
        }
        .kuc-text__text__input-form__input[textAlign="left"] {
          text-align: left;
        }
        .kuc-text__text__input-form__input[textAlign="right"] {
          text-align: right;
        }
        .kuc-text__text__input-form__input:focus {
          border: 1px solid #3498db;
        }
        .kuc-text__text__input-form__input:disabled {
          color: #888;
          background-color: #dbdcdd;
          box-shadow: none;
          cursor: not-allowed;
        }
        .kuc-text__text__input-form__suffix {
          padding-left: 4px;
        }
        .kuc-text__text__error {
          padding: 4px 18px;
          box-sizing: border-box;
          background-color: #e74c3c;
          color: #ffffff;
          margin-top: 8px;
        }
        .kuc-text__text__error[hidden] {
          display: none;
        }
      </style>
    `;
  }
}
