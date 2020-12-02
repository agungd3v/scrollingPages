# scrollingPages

scrollingPages is a Javascript library for to make it easier for you to create web or mobile pages with a slider model.

## Installation

clone this repository and paste the js file in the js folder

```bash
<script src="./scrollingPages/js/scrollingPages.js"></script>
```

## Template

```python
<div>
  <div class="section">
    <h1>Section 1</h1>
  </div>
  <div class="section">
    <h1>Section 2</h1>
  </div>
  <div class="section">
    <h1>Section 3</h1>
  </div>
  <div class="section">
    <h1>Section 4</h1>
  </div>
</div>
```

## Usage

```python
basic usage

new ScrollPages({
  section: '.section'
})
```

Basically it will fill up the page and provide navigation on the right in white.

### Customize

You can modify some parts based on the available objects below.

| Object | Type | default |
| ------ | ------ | ------ |
| section | string | false |
| navigation | object | true |
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
