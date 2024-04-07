import {LitElement, html, css} from 'lit';
import {customElement, property, state, query} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';

@customElement('lit-dropdown')
export class LitDropdown extends LitElement {
  static override styles = css`
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

  @property({type: Boolean})
  right = false;

  @property({type: String})
  preselected?: string;

  @property({type: String})
  text?: string;

  @property({type: Array})
  values: string[] = [];

  @state()
  protected _activeValue?: string;

  @state()
  protected _isMenuOpen = false;

  @query('#button')
  private _buttonElement!: HTMLElement;

  @query('#menu')
  private _menuElement!: HTMLElement;

  override connectedCallback() {
    super.connectedCallback();
    window.document.addEventListener('click', this._handleCloseMenu);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.document.removeEventListener('click', this._handleCloseMenu);
  }

  override firstUpdated() {
    if (this.preselected !== undefined) {
      this._activeValue = this.preselected;
    }
  }

  override render() {
    return html`
      <section>${this._renderButton()} ${this._renderMenu()}</section>
    `;
  }

  private _renderButton() {
    return this.text === undefined
      ? html`
          <button
            id="button"
            class="lit-dropdown-button--blank"
            @click=${this._handleButtonClick}
          >
            <slot></slot>
          </button>
        `
      : html`
          <button
            id="button"
            class="lit-dropdown-button"
            @click=${this._handleButtonClick}
          >
            ${this.text}
          </button>
        `;
  }

  private _renderMenu() {
    const menuOpenStateStyles = {
      visibility: this._isMenuOpen ? 'visible' : 'hidden',
      transform: `translate(${
        this.right ? this._getButtonWidthDiffMenuWidth() : 0
      }px, ${this._getButtonHeight()}px)`,
    };
    return html`
      <ul
        id="menu"
        class="lit-dropdown-menu"
        @click=${this._handleMenuItemClick}
        style=${styleMap(menuOpenStateStyles)}
      >
        ${this.values.map(
          (value) =>
            html`
              <li
                class="lit-dropdown-item ${classMap({
                  'lit-dropdown-item--active': value === this._activeValue,
                })}"
              >
                <a>${value}</a>
              </li>
            `
        )}
      </ul>
    `;
  }

  private _toggleOpen() {
    this._isMenuOpen = !this._isMenuOpen;
  }

  private _handleButtonClick = (e: Event) => {
    this._toggleOpen();
    e.stopPropagation();
  };

  private _handleMenuItemClick = (e: Event) => {
    if ((e.target as HTMLElement).tagName.toUpperCase() === 'a'.toUpperCase()) {
      const nextActiveValue = (e.target as HTMLElement).textContent!;
      if (nextActiveValue !== this._activeValue) {
        this._activeValue = nextActiveValue;
        this._dispatchSelectEvent(nextActiveValue);
      }
      this._toggleOpen();
      e.stopPropagation();
    }
  };

  private _handleCloseMenu = () => {
    if (this._isMenuOpen) {
      this._toggleOpen();
    }
  };

  private _dispatchSelectEvent(value: string) {
    const selectEvent = new CustomEvent('item-select', {
      detail: {value},
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(selectEvent);
  }

  private _getButtonHeight() {
    return this._buttonElement?.getBoundingClientRect().height || 0;
  }

  private _getButtonWidthDiffMenuWidth() {
    return (
      this._buttonElement?.getBoundingClientRect().width -
        this._menuElement?.offsetWidth || 0
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-dropdown': LitDropdown;
  }
}
