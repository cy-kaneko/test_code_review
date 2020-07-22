import { LitElement, html, customElement, property } from "lit-element";

type TextAreaProps = {
  className?: string;
  error?: string;
  id?: string;
  label?: string;
  value?: string;
  disabled?: boolean;
  requiredIcon?: boolean;
  visible?: boolean;
};

type CustomEventDetail = {
  value: string;
  oldValue?: string;
};

@customElement("kuc-textarea")
export default class TextArea extends LitElement {
  @property({ type: String }) error = "";
  @property({ type: String }) label = "";
  @property({ type: String }) value = "";
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) requiredIcon = false;
  @property({ type: Boolean }) visible = true;

  private _GUID: string;

  constructor(props?: TextAreaProps) {
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

  private _handleFocusTextarea(event: FocusEvent) {
    const detail: CustomEventDetail = { value: this.value };
    this._dispatchCustomEvent("focus", detail);
    this.requestUpdate();
  }

  private _handleChangeTextarea(event: Event) {
    event.stopPropagation();
    const targetEl = event.target as HTMLInputElement;
    const detail: CustomEventDetail = { value: "", oldValue: this.value };
    this.value = targetEl.value;
    detail.value = this.value;
    this._dispatchCustomEvent("change", detail);
    this.requestUpdate();
  }

  private _dispatchCustomEvent(eventName: string, detail?: CustomEventDetail) {
    const event = new CustomEvent(eventName, {
      detail,
      bubbles: true,
      composed: true
    });
    return this.dispatchEvent(event);
  }

  createRenderRoot() {
    return this;
  }

  render() {
    this._updateVisible();
    return html`
      ${this._getStyleTagTemplate()}
      <label
        class="kuc-textarea__label"
        for="${this._GUID}-label"
        ?hidden="${!this.label}"
      >
        <span class="kuc-textarea__label__text">${this.label}</span
        ><!--
        --><span
          class="kuc-textarea__label__required-icon"
          aria-label="required"
          ?hidden="${!this.requiredIcon}"
          >*</span
        >
      </label>
      <textarea
        id="${this._GUID}-label"
        class="kuc-textarea__textarea"
        .value=${this.value}
        aria-describedBy="${this._GUID}-error"
        aria-invalid="${!this.error}"
        @change="${this._handleChangeTextarea}"
        @focus="${this._handleFocusTextarea}"
        ?disabled="${this.disabled}"
      ></textarea>
      <div
        class="kuc-textarea__error"
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
        kuc-textarea {
          font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
            sans-serif;
          font-size: 14px;
          color: #333;
          display: inline-block;
        }
        kuc-textarea[hidden] {
          display: none;
        }
        .kuc-textarea__label {
          display: inline-block;
          margin-top: 4px;
          margin-bottom: 8px;
        }
        .kuc-textarea__label[hidden] {
          display: none;
        }
        .kuc-textarea__label__required-icon {
          font-size: 20px;
          vertical-align: -3px;
          color: #e74c3c;
          margin-left: 4px;
          line-height: 1;
        }
        .kuc-textarea__label__required-icon[hidden] {
          display: none;
        }
        .kuc-textarea__textarea {
          display: block;
          border: 1px solid #e3e7e8;
          box-sizing: border-box;
          font-size: 14px;
          font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
            sans-serif;
          box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
          min-width: 299px;
          min-height: 125px;
          padding: 8px;
          resize: both;
        }
        .kuc-textarea__textarea:focus {
          border-color: #3498db;
          box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
          border: 1px solid #3498db;
          background-color: #fff;
          color: #333;
        }
        .kuc-textarea__textarea:disabled {
          color: #888;
          background-color: #dbdcdd;
          box-shadow: none;
          cursor: not-allowed;
          resize: none;
        }
        .kuc-textarea__error {
          padding: 4px 18px;
          box-sizing: border-box;
          background-color: #e74c3c;
          color: #ffffff;
          margin-top: 8px;
        }
        .kuc-textarea__error[hidden] {
          display: none;
        }
      </style>
    `;
  }
}
