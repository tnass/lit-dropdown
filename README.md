# LitElement Dropdown

This is a demo component made with the lit-element-starter package.

It contains a Dropdown web component

To view the component run:

```bash
npm i & npm run serve
```

And then navigate to http://localhost:8000/dev/index.html

Tests can be run with:

```bash
npx playwright install
npm test
```

## Usage

The component can be used with a default button or any custom element. To initiate the dropdown as a button, a `text` attribute needs to be provided
defining the button text. If no `text` attribute is given, a custom element can be placed inside the `lit-dropdown` element which will be rendered as
the dropdown button.

Items displayed in the dropdown menu are to be defined via the `values` attribute. The attribute expects an array of strings which will represent the dropdown items.

If a preselection of any item is desired, a `preseleted` item can be passed to the component.

By default, the dropdown menu will be left aligned to the button. If instead the menu should be right aligned, a simple attribute `right` can be passed to the component.

When selecting an item, the dropdown will emit an event called `item-select`, which can be used to trigger a callback after item selection. The event delivers the
select item in its payload details (`event.detail.value`).

Custom theming is possible via custom CSS variables.

### Some example code

```
<lit-dropdown text="Button Demo" values='["Item 1", "Item 2", "Item 3", "Item 4"]'></lit-dropdown>
```

```
<lit-dropdown text="Preselected Demo" values='["Item 1", "Item 2", "Item 3", "Item 4"]' preselected="Item 2"></lit-dropdown>
```

```
<lit-dropdown text="Right Alignment Demo" values='["Item 1", "Item 2", "Item 3", "Item 4"]' right></lit-dropdown>
```

```
<lit-dropdown values='["Item 1", "Item 2", "Item 3", "Item 4"]'>
<div class="anything-button">
  <div>Anything Demo</div>
  <img src="./chevron.svg" width="16" alt=""/>
</div>
</lit-dropdown>
```
