import {LitDropdown} from '../lit-dropdown.js';

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('lit-dropdown', () => {
  test('is defined', () => {
    const el = document.createElement('lit-dropdown');
    assert.instanceOf(el, LitDropdown);
  });

  test('renders with default button', async () => {
    const el = (await fixture(
      html`<lit-dropdown
        text="Button Demo"
        .values=${['Item 1', 'Item 2', 'Item 3']}
      ></lit-dropdown>`
    )) as LitDropdown;
    assert.shadowDom.equal(
      el,
      `
       <section>
         <button id="button" class="lit-dropdown-button">
           Button Demo
         </button>
         <ul id="menu" class="lit-dropdown-menu" style="visibility:hidden;transform:translate(0px, 0px);">
           <li class="lit-dropdown-item">
             <a>Item 1</a>
           </li>
           <li class="lit-dropdown-item">
             <a>Item 2</a>
           </li>
           <li class="lit-dropdown-item">
             <a>Item 3</a>
           </li>
        </ul>
      </section>
      `
    );
  });

  test('handles button click', async () => {
    const el = (await fixture(
      html`<lit-dropdown text="Button Demo"></lit-dropdown>`
    )) as LitDropdown;
    const button = el.shadowRoot!.querySelector('button')!;
    button.click();
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
     <section>
       <button id="button" class="lit-dropdown-button">
         Button Demo
       </button>
       <ul id="menu" class="lit-dropdown-menu" style="visibility: visible; transform: translate(0px, 40px);">
      </ul>
    </section>
    `
    );
  });

  test('handles item click', async () => {
    const el = (await fixture(
      html`<lit-dropdown
        text="Button Demo"
        .values=${['Item 1']}
      ></lit-dropdown>`
    )) as LitDropdown;
    const button = el.shadowRoot!.querySelector('button')!;
    button.click();
    await el.updateComplete;
    const item = el.shadowRoot!.querySelector('a')!;
    item.click();
    await el.updateComplete;

    assert.shadowDom.equal(
      el,
      `
     <section>
       <button id="button" class="lit-dropdown-button">
         Button Demo
       </button>
         <ul id="menu" class="lit-dropdown-menu" style="visibility: hidden; transform: translate(0px, 40px);">
           <li class="lit-dropdown-item lit-dropdown-item--active">
             <a>Item 1</a>
           </li>
        </ul>
      </ul>
    </section>
    `
    );
  });
});
