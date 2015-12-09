# ux-column-select

An Angular module to scroll to a column.

## Installation

This module currently only works with Browserify. To install:

```bash
npm install --save @unumux/ux-column-select
```

Then include it in your Angular project by inserting the dependency in your app

```javascript
var app = angular.module("app", [require("@unumux/ux-column-select")]);
```

## Usage

This module provides two directives, `ux-column-select` and `ux-column-select-controls`.

### ux-column-select

The `ux-column-select` directive should be used on the container of your columns. The columns should be direct children of the container, and the container should have a set width and `overflow: scroll;` or `overflow: auto` on it.

Example:
```html
<div class="container" ux-column-select>
    <div class="column"></div>
    <div class="column"></div>
    <div class="column"></div>
    <div class="column"></div>
    <div class="column"></div>
</div>
```

```css
.container {
    width: 400px;
    white-space: nowrap;
    overflow: auto;
}

.column {
    width: 200px;
    white-space: normal;
    display: inline-block;
}
```

### ux-column-select-controls

This directive should be on the container for the controls. It provides 2 scope variables and 2 scope functions. The scope variables are previousDisabled and nextDisabled, and can be used with ng-disabled to control the disabled state. The 2 scope functions are onNext and onPrevious, and should be used with ng-click to change the active column.

Example:
```html
<div ux-column-select-controls>
    <button ng-click="onPrevious()" ng-disabled="previousDisabled">Previous</button>
    <button ng-click="onNext()" ng-disabled="nextDisabled">Next</button>
</div>
```

## Development

Unit tests can be run with `npm test`.
