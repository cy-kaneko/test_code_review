import { LitElement, html, svg, customElement, property } from "lit-element";

type SpinnerProps = {
  text?: string;
};

@customElement("kuc-spinner")
export default class Spinner extends LitElement {
  @property({ type: String }) text = "";

  constructor(props?: SpinnerProps) {
    super();
    if (!props) {
      return;
    }
    this.text = props.text !== undefined ? props.text : this.text;
  }

  private _getSpinnerSvgTemplate() {
    return svg`
      <svg
        class="kuc-spinner__spinner__loader"
        viewBox="0 0 50 50"
        aria-hidden="true"
      >
        <circle r="4" cx="30.43" cy="4.72" opacity="0.3" />
        <circle r="4" cx="39.85" cy="10.15" opacity="0.3" />
        <circle r="4" cx="45.28" cy="19.56" opacity="0.3" />
        <circle r="4" cx="45.28" cy="30.43" opacity="0.3" />
        <circle r="4" cx="39.85" cy="39.85" opacity="0.3" />
        <circle r="4" cx="30.44" cy="45.28" opacity="0.4" />
        <circle r="4" cx="19.56" cy="45.28" opacity="0.5" />
        <circle r="4" cx="10.15" cy="39.85" opacity="0.6" />
        <circle r="4" cx="4.7" cy="30.44" opacity="0.7" />
        <circle r="4" cx="4.7" cy="19.56" opacity="0.8" />
        <circle r="4" cx="10.15" cy="10.15" opacity="0.9" />
        <circle r="4" cx="19.56" cy="4.72" opacity="1" />
      </svg>
    `;
  }

  open() {
    const body = document.getElementsByTagName("BODY")[0];
    body.appendChild(this);
  }

  close() {
    this.parentNode && this.parentNode.removeChild(this);
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      ${this._getStyleTagTemplate()}
      <div class="kuc-spinner__spinner" aria-live="polite" role="alert">
        ${this._getSpinnerSvgTemplate()}
        <div
          class="${!this.text
            ? "kuc-spinner__spinner__text visually-hidden"
            : "kuc-spinner__spinner__text"}"
        >
          ${!this.text ? "now loading…" : this.text}
        </div>
      </div>
    `;
  }

  private _getStyleTagTemplate() {
    return html`
      <style>
        kuc-spinner {
          font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
            sans-serif;
          font-size: 14px;
          color: #333;
        }
        .kuc-spinner__spinner {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 10000;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .kuc-spinner__spinner__loader {
          width: 50px;
          height: 50px;
          animation: rotate-loading 1s steps(12) infinite;
          fill: #99ccff;
        }
        .kuc-spinner__spinner__text {
          margin: 10px 0;
        }
        .visually-hidden {
          position: absolute;
          white-space: nowrap;
          width: 1px;
          height: 1px;
          overflow: hidden;
          border: 0;
          padding: 0;
          clip: rect(0 0 0 0);
          clip-path: inset(50%);
          margin: -1px;
        }
        @keyframes rotate-loading {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      </style>
    `;
  }
}
