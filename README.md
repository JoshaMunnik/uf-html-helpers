# HTML helpers

## Usage

To load the html helpers directly, use the following script tag:

```html
<script src="https://cdn.jsdelivr.net/gh/JoshaMunnik/uf-html-helpers@master/dist/uf-html-helpers.js"></script>
```

## Introduction

This project contains the compiled version of only the html helpers part from
[npm package @ultraforce/ts-dom-lib](https://www.npmjs.com/package/@ultraforce/ts-dom-lib)

The source can be found in the 
[@ultraforce/ts-dom-lib GitHub repository](https://github.com/JoshaMunnik/ts-dom-lib).

## Attributes

All the html helpers only use `data-uf-*` attributes and do not apply any styles.

Some helpers offer to possibility to add/remove/toggle css classes.

Note: unless specified otherwise, the value of data attributes are not used.

## Showing and hiding 

Some helpers will show or hide a html element. They use the same attributes to control the 
visibility.

If `data-uf-show-classes` and/or `data-uf-hide-classes` is set, the values are added and removed
to the css class list of the element depending on the visible state.

If no `data-uf-show-classes` and `data-uf-hide-classes` is set, the method checks for
`data-uf-display-value`. It can have the following values:
- `"auto"` (default), the first time an element is hidden, a copy is made of the current `display` 
  value. The next time an element is shown, this value is used to show the element.
- `"disabled"`, the `display` style is not changed.
- in all other cases the value is assigned to the `display` style when showing the element.

If the `data-uf-display-value` attribute is not set, the code uses `"auto"`.

The code will assign `"none"` to the `display` style when hiding the element.

## Table

### Filter

Create an input element with the attribute `data-uf-filter-table`; the value of the attribute is
used as a selector that selects one or more table elements. If multiple tables are selected, the
filter gets applied to each table.

Rows containing cells that match the filter will be shown. Rows and cells are skipped when:
- a `tr` contains the attribute `data-uf-header-row`,
- a cell (`td` or `th`) contains the attribute `data-uf-no-filter`,
- if a cell within the first row with the `data-uf-header-row` contains the
  attribute `data-uf-no-filter` then all cells in that column are skipped.

A row is hidden by adding the attribute `data-uf-row-no-match` to the row. 

Upon loading the filter code will add a css style to hide all elements with that data attribute:
```css
[data-uf-row-no-match] {
    display: none !important;
}
```

### Sorting

To add support sorting to a table, the following is required:
- add `data-uf-table-sorting` to a `table` element to add sorting support.
- the table should contain at least one header row with `th` elements.
- add `data-uf-header-row` attribute to the `tr` tag containing the `th` elements that should
  be clicked upon.
- add `data-uf-sort-type` attribute to each `th` element that should be clicked upon. Use one
  of the following values: `"text"`, `"date"`, `"number"`. If the attribute is not set, the column
  will not be used for sorting the table.
- the `th` element that contains a `data-uf-sort-type` attribute should also contain
  a `button` child element. The sorting code will add a clicked listener to this button.

Add `data-uf-sort-ascending` and `data-uf-sort-descending` attributes to the `table` element
to specify one or more css classes to add to the `th` element that is used for sorting. When
missing, no css classes will be set.

Add `data-uf-storage-id` to the table element to store the selected column choice in the local
storage and use it when the page with table is shown again. The value of this attribute is used as 
key to store the data with. Make sure to use a unique value for each table.

By default, the class uses the `textContent` from a `td` to get the value.
Add `data-uf-sort-value` to a `td` to provide an alternative value to use when sorting.

Add `data-uf-sort-location` to a `tr` to specify the location of the row in the table. Use one
of the following values: `"top"`, `"middle"` (default), `"bottom"`.
If there are multiple table rows for a location, they will still be sorted within that location.

When the rows are resorted the class will dispatch an event `"tableSorted"` on the `table` element.

## Event actions

Add `data-uf-event-action` to an element to perform an action when certain events are triggered. Use
one of the following action values:
- `"remove-from-dom"`: Removes the target(s) from the DOM.
- `"hide"`: Hides the target(s) ([see showing and hiding](#showing-and-hiding)).
- `"show"`: Shows the target(s) ([see showing and hiding](#showing-and-hiding)).
- `"toggle"`: Shows the target(s) if their display is set to none, hides them otherwise.
- `"toggle-class"`: Toggles the classes set with `data-uf-event-data` at the target(s).
- `"remove-from-class"`: Removes the classes set with `data-uf-event-data` from the target(s).
- `"add-to-class"`: Adds the classes set with `data-uf-event-data` from the target(s).
- `"show-modal"`: Shows the target(s) as modal dialog. If the target is not a dialog element,
  nothing happens.
- `"show-non-modal"`: Shows the target(s) as non-modal dialog. If the target is not a dialog 
  element, nothing happens.
- `"close"`: Closes the target. If the target is not a dialog element, nothing happens.
- `"set-attribute"`: Sets the attribute specified in `data-uf-event-attribute` to the value
  specified in `data-uf-event-data` at the target(s).
- `"reload"`: Reloads the page. This action replaces the last history entry with the current page.
  If the page as loaded after of a POST action, this will remove the POST data.
- `"set-value"`: Sets the value of the target(s) to the value specified in `data-uf-event-data`.
  The target(s) must be an input, textarea or select element. If no value is specified, the
  target will be set to an empty string or unchecked state. To set checkbox to a checked state
  use the values 'true', '1' or 'checked'. After setting the value, the code will fire a
  `"change"` and (when applicable) an `"input"` event.
- `"set-text"`: Sets the inner text content of the target(s) to the value specified in
  `data-uf-event-data`.
- `"set-html"`: Sets the inner HTML content of the target(s) to the value specified in
  `data-uf-event-data`.

Use `data-uf-event-events` to specify the events that should trigger the action. The value is one or
multiple events separated by a space. This attribute is required; when missing, nothing happens.

Use `data-uf-event-target` to specify another target then element itself. The value can either
be a dom selector (for one or multiple elements) or one of the predefined values:
- `"_self"`: The clickable element itself (default unless action is `"close"`).
- `"_parent"`: The parent element of the clickable element.
- `"_next"`: The next sibling of the clickable element.
- `"_previous"`: The previous sibling of the clickable element.
- `"_grandparent"`: The parent element of the parent of the clickable element.
- `"_dialog"`: The nearest parent dialog element that contains the clickable element (default when
  action is `"close"`).

If `data-uf-event-target` is missing, the `"_self"` value is used as default unless the action
is `"close"` than `"_dialog"` is used as default.

Use `data-uf-event-data` to specify data used by some of the actions.

Use `data-uf-event-attribute` to specify the attribute to set in case of the 
`"set-attribute"` action.

Use `data-uf-event-state` to specify the state to check when listening for events that have
a `newState` property. Use this attribute with the value "open" together with the "toggle" event
to perform an action when for example a dialog is being opened.

Use `data-uf-event-key` to specify the key that should be pressed to trigger the action.
See https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key for possible values.

Use `data-uf-event-prevent-default` to prevent the default action of the event if an action
was triggered. The value of the attribute is ignored.

Use `data-uf-click-action`, `data-uf-click-target`, `data-uf-click-data` and
`data-uf-click-attribute` as shortcuts for `"click"` events.

Use `data-uf-load-action`, `data-uf-load-target`, `data-uf-load-data` and
`data-uf-load-attribute` to perform actions when the document is loaded.

It is possible to specify multiple actions by adding a postfix to the data attributes:
('-1', '-2', etc., till '-20'). The postfix should be added to all data attributes. The postfix
works for `data-uf-event-xxxx`, `data-uf-click-xxxx`, `data-uf-load-xxxx`,

```html
<button
  data-uf-event-action="hide" data-uf-event-events="click" data-uf-event-target="_parent"
  data-uf-event-action-1="hide" data-uf-event-events-1="click" data-uf-event-target-1="#some-id"
  data-uf-event-action-2="hide" data-uf-event-events-2="click" data-uf-event-target-2="#another-id"
>
  Hide elements
</button>
```

```html
<dialog
  data-uf-event-action="toggle" 
  data-uf-event-events="open close"
  data-uf-event-target="#indicator"
>
....
</dialog>
```

## Styling actions

Add `data-uf-click-styling-selector` to an element to toggle its css classes. The value of the data 
attribute is a selector that selects one or more clickable elements. 

Set the css classes to toggle as value of `data-uf-click-styling-classes`.

Note that `data-uf-click-styling-selector` targets a clickable element, which is different from the 
`data-uf-click-action` which is used within a clickable element.

## Collapse and expand details

Add `data-uf-details-collapse` to a `<details>`; the value is a selector that points to one or more
clickable elements. When the clickable element is clicked, the `<details>` will collapse.

Add `data-uf-details-expand` to a `<details>`; the value is a selector that points to one or more
clickable elements. When the clickable element is clicked, the `<details>` will expand (open).

## Dialog

Add `data-uf-show-dialog` attribute to a clickable element. The value of the data element should
be a selector of a dialog element (the selector should only return a single element). When the 
clickable element is clicked, the following actions are performed:
1. For every data attribute in the clickable element, the code checks if the dialog contains
   one or more child elements referencing the same data attribute. For each found element, if the
   element is an `<input>`, `<select>` or `<textarea>` the value of the data element gets assigned 
   to the value or checked property of the element.
   Else the value of the data element gets assigned to the inner text of the found element.
   Data attributes starting with `data-uf-` are ignored.
2. The dialog is shown.

```html
<button data-uf-show-dialog="#dialog" data-user-name="User Name" data-user-id="123">
Show dialog
</button>
...
<dialog id="dialog">
  ...
  <p>Edit the user <span data-user-name></span></p>
  ...
  <input type="hidden" name="user-id" data-user-id />
  ...
</dialog>
```

## Form

### Toggle fields

These helper can be used to make html forms more dynamic by changing styles, visibility and 
enabled states based on input elements value and valid state.

Use a combination of `data-uf-toggle-XXXX` at an element that should be updated. It alters the
element depending on the conditions set with the data attributes.

If a targeted form element is a radio button, this class will install listeners on all radio
buttons with the same name. When a radio button fires a change event, the code will 
dispatch a change event to all other radio buttons in the same group. This fixes the issue that
radio buttons do not fire a change event when they are unselected.

The following data attributes can be added:

- `data-uf-toggle-type` = 
    - `"value"` (default) = it is assumed the selector points to an input element, its value is 
      compared to the values set with `data-uf-toggle-value` or `data-uf-toggle-values`. If no 
      values are set, the input element is considered valid if the value is not empty.
    - `"valid"` = the html5 validation result is used.
    - `"property"` = works like 'value' but check the value of a property instead of the value of
      the element.
    - `"auto"` = select the type based on certain conditions:
        - `"value"` is selected if 'data-uf-toggle-value' or 'data-uf-toggle-values' is used or if 
          the input element is a file input element.
        - `"property"` is selected if the selector points to an input element that is checkbox or 
          radio button.
        - `"valid"` is used in all other cases.

    If the selector points to a form, the type is forced to `"valid"` since a form does not have 
    a value.

    If `"auto"` is used and the selector points to a checkbox or radio button and no values have
    been set, `true` is used for the values list.

- `data-uf-toggle-property` = string (default = 'checked')
  The property of the input element to get the value from.

- `data-uf-toggle-selector` = string (default = '')
  To select the element or elements to check. If multiple elements are selected, the first
  element is used in case any of the other options use `"auto"`.

  Use empty text to select the parent form this element is contained in.

- `data-uf-toggle-change` = 
    - `"enable"` = update the disabled property.
    - `"visible"` = see {@link UFHtmlHelper} on how the element is shown or hidden.
    - `"none"` = the elements state is unaltered (except for css classes as set with
      `data-uf-toggle-class` and `data-uf-toggle-class-match`).
    - `"auto"` (default) = use `"none`" if one or more css classes have been defined via 
      `data-uf-toggle-classes` and/or `data-uf-toggle-classes-match`. If the element is an input,
      button or select element use `"enable"`. In all other cases use `"visible"`.

- `data-uf-toggle-required` = 
    - `""` (default) = do not change required state
    - `"match"` = turns on the required state if there is a match.
    - `"no-match"` = turns off the required state if there is a match.

- `data-uf-toggle-classes` = string (one or more css class names separated by a space)
  The css classes to add when the elements pointed to by the selector do not match the condition.
  When the elements match the condition, the css classes get removed.

- `data-uf-toggle-classes-match` = string (one or more css class names separated by a space)
  The css classes to add when the elements pointed to by the selector do match the condition.
  When the elements no longer match the condition, the css classes get removed.

- `data-uf-toggle-condition` = `"any"`, `"all"` (default), `"none"`
 
  Determines the condition the elements must match. With `"any"` only one element must either be
  valid or be equal to the one of the specified values. With `"all"` all elements must either be
  valid or be equal to one of the specified values. `"none"` is the reverse of `"all"`, none of
  the elements must be valid or be equal to any of the specified values.

- `data-uf-toggle-compare` = `equal` (default), `contain`, `inside`, `lt`, `lte`, `gt`, `gte`
  
  Determines how to compare the value of an element with the values:
    - `equal` = the value of the element must be equal to one of the values.
    - `contain` = part of the value of the element must equal one of the values (case incentive).
    - `inside` = part of one of the values must equal the value of the element (case incentive).
    - `lt` = the value of the element must be less than one of the values (numeric).
    - `lte` = the value of the element must be less than or equal to one of the values (numeric).
    - `gt` = the value of the element must be greater than one of the values (numeric).
    - `gte` = the value of the element must be greater than or equal to one of the values (numeric).
  
- `data-uf-toggle-value` = string (single value)
  Alias for `data-uf-toggle-values`. If `data-uf-toggle-values` is also specified, this
  attribute will be ignored.

- `data-uf-toggle-values` = string
  Contains multiple values separated by the separator text as set by
  `data-uf-toggle-values-separator`.

- `data-uf-toggle-values-separator` = string (default = ',').
  Separator string to split the value of `data-uf-toggle-values` with.

- `data-uf-toggle-target` = string (default = '')
  When specified, apply the toggle to the target element(s) instead of the element itself.
  Possible values:
    - `""` = apply to the element itself (default).
    - `"_parent"` = apply to the parent element of the element.
    - `"_next"` = apply to the next sibling of the element.
    - `"_previous"` = apply to the previous sibling of the element.
    - `"_grandparent"` = apply to the parent of the parent of the element.
    - any other value is interpreted as a selector and can select one or multiple elements.

### Submit management

Add `data-uf-manage-submit` attribute to a `<form>` to link the valid state of the form
(using html5 validation) to the enabled state of the submit buttons within the form. The submit
buttons will only be enabled when all required fields are valid.

The value of `data-uf-manage-submit` is not used and can be set to anything.

```html
<form data-uf-manage-submit>
  ...
  <input type="submit" value="Submit" />
  ...
</form>
```

## Image preview

To create an image preview, add an image element `<img>` with the attribute `data-uf-image-preview`
containing a selector that selects an input element of type file. Whenever a new file is
selected the image element will be updated with a preview of the image.

To show information about the selected file, add div/span elements with one of the following
attributes: `data-uf-image-name`, `data-uf-image-width`, `data-uf-image-height`,
`data-uf-image-size`, `data-uf-image-type`.
The attribute should contain the selector for the input element of type file. Whenever a file is
selected, the contents of the element is updated with the correct data.

The file input element should support only a single file selection. This class will only use
the first file in the list of selected files.

```html
<input type="file" id="file" />
<img data-uf-image-preview="#file" alt="preview" src="" />
<div>
  Image information:<br/> 
    name = <span data-uf-image-name="#file"></span>,<br/> 
    <span data-uf-image-width="#file"></span> x <span data-uf-image-height="#file"></span>,<br/>
    <span data-uf-image-size="#file"></span> bytes
</div>
```

## Refresh page

Add `data-uf-page-refresh` to clickable elements (anchors or buttons) to automatically refresh
the page after the user clicks on the element. The value of `data-uf-page-refresh` is the
delay in milliseconds before the refresh is executed.

## Popup

Add `data-uf-popup-content` to an element to convert it into a floater. The value of the
attribute should point to one or more clickable elements. The floater will be shown when the
user clicks on one of the clickable elements.

Add `data-uf-popup-position` the element to adjust the position of the floater relative to the
clickable element:
- `"vertical"` will place the floater before or after the clickable element at the same vertical
  position.
- `"horizontal"` will place the floater above or below to the clickable element at the same
  horizontal position.
- `"overlap"` will place the floater so that it overlaps the clickable element.

Use `data-uf-popup-hide` to control when the floater is hidden:
- `"tree"` will hide the floater the user clicks outside the floater and any related other floaters
- `"always"` will hide the floater when the user clicks outside the floater

Use `data-uf-popup-transition` to use a certain transition animation:
- `"none"` will not use any transition animation.
- `"fade"` will use a fade transition animation.
- `"slide-vertical"` will use a vertical slide transition animation.
- `"slide-horizontal"` will use a horizontal slide transition animation.

User `data-uf-popup-delta-x` and `data-uf-popup-delta-y` to adjust the position of the floater
relative to the clickable element. Its value is a positive or integer value that is added to
the position of the floater.

Once a floater is content is processed, the `data-uf-popup-content` attribute is removed.

## Select url

Add `data-uf-select-url` to a `<select>` (single value, drop down) to load a new page when the
user changes the dropdown value. Use macro '$value$' in the attribute value to use the
selected value in the url.

```html
<p>Select a user to get information for.</p>
<select data-uf-select-url="https://example.com/userinfo?userid=$value$">
  <option value="1">First User</option>
  <option value="2">Second User</option>
```

```html
<p>Select a page to jump to:</p>
<select data-uf-select-url="$value$">
  <option value="https://example.com/about">About</option>
  <option value="https://example.com/contact">Contact</option>
```

## Link

Add `data-uf-share-hover` to `<a>` to add the value as css class when the user hovers over
an anchor that points to the same href. Only anchors with the data attribute and the same href
will be updated.

```html
<a href="https://example.com" data-uf-share-hover="hover">Example</a>
<a href="https://example.com" data-uf-share-hover="hover">Also example</a>
```

## General filter

This helper class adds support for a filter to show or hide children within some container.

Create an input element with the attribute `data-uf-filter-input` containing a selector
that selects one or more elements that contain child elements that should be shown or hidden
based on the value of the input element.

A child element is hidden if any part of `innerText` does not match the value of the input
element (case-insensitive matching).

Add the attribute `data-uf-no-filter` to a child element to skip it from filtering.

Add the attribute `data-uf-filter-group` with some value to a child element to group the
child elements using the same value. If any of the child elements in the group matches the
filter, all the child elements in the group will be shown.

A child element is hidden by adding the attribute `data-uf-filter-no-match` to the child element.

This class will add a css style to hide all elements with that data attribute
(using `display: none`).

## Grid sorting

This helper adds sorting capability to some container.

Add `data-uf-grid-sorting` to a container element to add sorting of children support. The class
assumes the children are organized in some sort of grid structure.

A container using sorting has two groups of children:
- control elements, that can be clicked upon to determine which element to sort on.
- sortable group of elements that will be reordered within their parent container.

Add `data-uf-sort-ascending` and `data-uf-sort-descending` attributes to the container
to specify one or more css classes to add to the control element that has been selected to
sort the data on. When one of the attributes is missing, no css classes will be set.

Add `data-uf-storage-id` to the container element to store the selected controller choice in the
local storage and use it when the page with the container is shown again. The value of this
attribute is used as key to store the data with.

Add `data-uf-sort-control` to child elements that are the control elements. The values of
`data-uf-sort-ascending` and `data-uf-sort-descending` will be added to or removed from css
classes of this element (even if there is a separate clickable child element). The value of
this attribute can be one of the following:
- `none` - to not sort the children
- `text` - to sort the children as text
- `number` - to sort the children as numbers
- `date` - to sort the children as dates

Add `data-uf-sort-button` to a child element of a control element to specify the element that
can be clicked upon to sort the children. This attribute is optional, when missing the header
element itself will be used as clickable element.

Add `data-uf-sort-key` to specify an id for a control element. This attribute is optional, when
missing the relative sibling index of the control element will be used. With relative indexes,
the first control element has index 0, the second control element 1, etc. The key is used to
link the data elements to the correct control element.

The control elements can have sibling elements in between that do not use any of the attributes.
These will be ignored, they are also not used when determining the relative sibling index.

The class supports two different ways of sorting the children:
- related sortable elements are placed in containers. The containers are reordered in the parent
  depending on the selected control element. For example a table row with table data entries.
- related sortable elements are siblings. All elements are placed in the same parent. The class
  will reorder the elements in the parent keeping the siblings together.

To use containers, add `data-uf-item-container` to each container. The containers should not
have other elements in between them. The class will reorder the containers in the parent.

To use siblings, either set `data-uf-group-size` with the container element or
add `data-uf-item-group` to the sibling elements.

With `data-uf-group-size` the children of the grid element (that are not using
`data-uf-grid-control`, `data-uf-item-container` and `data-uf-item-group`) are split into
groups using the value of `data-uf-group-size`. It is also possible to place the child elements
in a separate container (that is a child element of the grid). Add `data-uf-grid-body` to
the container element that contains the children.

With `data-uf-item-group` the value of the attribute determines which group the siblings belong
to. Each group should use a unique value. When using `data-uf-item-group` make sure the sibling
elements do not have any other elements in between them. When reordering only the elements
using `data-uf-item-group` are reordered.

Add `data-uf-sort-key` to a sortable element to link it to one of the controls. When missing the
relative sibling index of the element will be used. With `data-uf-item-group` the index is
relative to the first element with a certain group value.

By default, the class uses the `innerText` from the element to determine the value for.
Add `data-uf-sort-value` to provide an alternative value to use when sorting.

When the elements are resorted because of a click on one of the controls, the class will dispatch
an event `"sorted"` at the container element.

When elements are resorted (either the container elements or the grouped elements), the elements
are reinserted at the first element inside the parent. Elements can have different parents;
the elements with the same parent will be reordered within that parent starting at the position
of the first element. This allows for data to be grouped and be sorted within their group.