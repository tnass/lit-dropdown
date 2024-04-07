var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
let LitDropdown = class LitDropdown extends LitElement {
    constructor() {
        super(...arguments);
        this.right = false;
        this.values = [];
        this._isMenuOpen = false;
        this._handleButtonClick = (e) => {
            this._toggleOpen();
            e.stopPropagation();
        };
        this._handleMenuItemClick = (e) => {
            if (e.target.tagName.toUpperCase() === 'a'.toUpperCase()) {
                const nextActiveValue = e.target.textContent;
                if (nextActiveValue !== this._activeValue) {
                    this._activeValue = nextActiveValue;
                    this._dispatchSelectEvent(nextActiveValue);
                }
                this._toggleOpen();
                e.stopPropagation();
            }
        };
        this._handleCloseMenu = () => {
            if (this._isMenuOpen) {
                this._toggleOpen();
            }
        };
    }
    connectedCallback() {
        super.connectedCallback();
        window.document.addEventListener('click', this._handleCloseMenu);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        window.document.removeEventListener('click', this._handleCloseMenu);
    }
    firstUpdated() {
        if (this.preselected !== undefined) {
            this._activeValue = this.preselected;
        }
    }
    render() {
        return html `
      <section>${this._renderButton()} ${this._renderMenu()}</section>
    `;
    }
    _renderButton() {
        return this.text === undefined
            ? html `
          <button
            id="button"
            class="lit-dropdown-button--blank"
            @click=${this._handleButtonClick}
          >
            <slot></slot>
          </button>
        `
            : html `
          <button
            id="button"
            class="lit-dropdown-button"
            @click=${this._handleButtonClick}
          >
            ${this.text}
          </button>
        `;
    }
    _renderMenu() {
        const menuOpenStateStyles = {
            visibility: this._isMenuOpen ? 'visible' : 'hidden',
            transform: `translate(${this.right ? this._getButtonWidthDiffMenuWidth() : 0}px, ${this._getButtonHeight()}px)`,
        };
        return html `
      <ul
        id="menu"
        class="lit-dropdown-menu"
        @click=${this._handleMenuItemClick}
        style=${styleMap(menuOpenStateStyles)}
      >
        ${this.values.map((value) => html `
              <li
                class="lit-dropdown-item ${classMap({
            'lit-dropdown-item--active': value === this._activeValue,
        })}"
              >
                <a>${value}</a>
              </li>
            `)}
      </ul>
    `;
    }
    _toggleOpen() {
        this._isMenuOpen = !this._isMenuOpen;
    }
    _dispatchSelectEvent(value) {
        const selectEvent = new CustomEvent('item-select', {
            detail: { value },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(selectEvent);
    }
    _getButtonHeight() {
        return this._buttonElement?.getBoundingClientRect().height || 0;
    }
    _getButtonWidthDiffMenuWidth() {
        return (this._buttonElement?.getBoundingClientRect().width -
            this._menuElement?.offsetWidth || 0);
    }
};
LitDropdown.styles = css `
    :host {
      position: relative;
      display: inline-flex;
      flex-flow: column wrap;
    }

    .lit-dropdown-button {
      border-style: var(--lit-dropdown-border-style, solid);
      border-width: var(--lit-dropdown-border-width, 1px);
      border-color: var(--lit-dropdown-border-color, black);
      border-radius: var(--lit-dropdown-border-radius, 5px);
      color: var(--lit-dropdown-color, black);
      background-color: var(--lit-dropdown-background-color, white);
      padding: var(--lit-dropdown-padding, 5px);
      height: 2.5rem;
      min-width: var(--lit-dropdown-min-width, 12rem);
      cursor: pointer;
    }

    .lit-dropdown-button--blank {
      appearance: none;
      border-radius: 0;
      text-align: inherit;
      background: none;
      box-shadow: none;
      padding: 0;
      cursor: pointer;
      border: none;
      color: inherit;
      font: inherit;
    }

    .lit-dropdown-menu {
      border-style: var(--lit-dropdown-border-style, solid);
      border-width: var(--lit-dropdown-border-width, 1px);
      border-color: var(--lit-dropdown-border-color, black);
      border-radius: var(--lit-dropdown-border-radius, 5px);
      background-color: var(--lit-dropdown-background-color, white);
      display: block;
      position: absolute;
      inset: 0 auto auto 0;
      margin: 0;
      margin: 0;
      padding: 0;
      text-indent: 0;
      list-style-type: none;
      overflow: hidden;
      visibility: hidden;
    }

    .lit-dropdown-item {
      color: var(--lit-dropdown-color, black);
    }

    .lit-dropdown-item:hover {
      background-color: var(--lit-dropdown-background-hover-color, lightgrey);
    }

    .lit-dropdown-item--active {
      font-weight: bold;
      color: var(--lit-dropdown-active-color, --lit-dropdown-color, black);
      background-color: var(
        --lit-dropdown-background-active-hover-color,
        --lit-dropdown-background-hover-color,
        lightgrey
      );
    }

    .lit-dropdown-item a {
      display: block;
      padding: 0.3rem 0.75rem;
      cursor: pointer;
    }
  `;
__decorate([
    property({ type: Boolean })
], LitDropdown.prototype, "right", void 0);
__decorate([
    property({ type: String })
], LitDropdown.prototype, "preselected", void 0);
__decorate([
    property({ type: String })
], LitDropdown.prototype, "text", void 0);
__decorate([
    property({ type: Array })
], LitDropdown.prototype, "values", void 0);
__decorate([
    state()
], LitDropdown.prototype, "_activeValue", void 0);
__decorate([
    state()
], LitDropdown.prototype, "_isMenuOpen", void 0);
__decorate([
    query('#button')
], LitDropdown.prototype, "_buttonElement", void 0);
__decorate([
    query('#menu')
], LitDropdown.prototype, "_menuElement", void 0);
LitDropdown = __decorate([
    customElement('lit-dropdown')
], LitDropdown);
export { LitDropdown };
//# sourceMappingURL=lit-dropdown.js.map