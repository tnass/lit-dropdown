import { LitElement } from 'lit';
export declare class LitDropdown extends LitElement {
    static styles: import("lit").CSSResult;
    right: boolean;
    preselected?: string;
    text?: string;
    values: string[];
    protected _activeValue?: string;
    protected _isMenuOpen: boolean;
    private _buttonElement;
    private _menuElement;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    private _renderButton;
    private _renderMenu;
    private _toggleOpen;
    private _handleButtonClick;
    private _handleMenuItemClick;
    private _handleCloseMenu;
    private _dispatchSelectEvent;
    private _getButtonHeight;
    private _getButtonWidthDiffMenuWidth;
}
declare global {
    interface HTMLElementTagNameMap {
        'lit-dropdown': LitDropdown;
    }
}
//# sourceMappingURL=lit-dropdown.d.ts.map