# Test assignment v4

This project includes a brand-new library X for widgets initialization. It includes basic examples of widget handling with tests written in Jest.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [License](#license)

## Introduction

This project showcases a system for managing widgets on a web page. It includes the following main components:
- `X` class: Manages widget initialization and destruction.
- `Widget` class: A base class for creating widgets.
- `WidgetA, WidgetB, WidgetC` class: An example widget that extends `Widget`.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/widget-project.git
    ```
2. Navigate to the project directory:
    ```sh
    cd widget-project
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Install http-server:
    ```sh
    npm install -g http-server
    ```
5. Run http-server in your project folder:
   ```sh
   http-server
   ```

## Usage

### HTML Structure

The HTML file (`index.html`) includes:
- widgets with the `widget` attribute set to the corresponding widget path:

```html
    <div id="root" class="widget-container">
        <div class="widget-container__widget" widget="widgets/a">
            <div class="widget-container__widget" widget="widgets/b"></div>
        </div>
        <div></div>
        <div class="widget-container__widget" widget="widgets/c"></div>
    </div>
```
- action buttons:
```html
    <div class="actions-container">
        <button class="actions-container__button actions-container__button--init" id="init">Init</button>
        <button class="actions-container__button actions-container__button--destroy" id="destroy">Destroy</button>
        <button class="actions-container__button actions-container__button--done" id="done">Done</button>
        <button class="actions-container__button actions-container__button--fail" id="fail">Fail</button>
    </div>
```
- and info section:
```html
    <div id="info" class="info-container">
        <h1 class="info-container__header">Selected Node Info:</h1>
        <p class="info-container__row"><b>Relative node: </b><span id="nodeSelector"></span></p>
        <div class="info-container__row">
            <p><b>Node Info: </b></p><pre><code id="nodeInfo"></code></pre>
        </div>
    </div>
```

### JavaScript Usage
The X class has two primary methods for managing widgets: `init` and `destroy`.
```js
X {
    init(target, callback);
    destroy(target);
}
```

Each widget (for example `WidgetA`) should extend the base Widget class:
```js
Widget {
    init(target, done);
    destroy(target);
}
```


## Testing

This project includes tests written in Jest. To run the tests, follow these steps:

1. **Install Jest**:
   If you haven't already, install Jest as a development dependency:
    ```sh
    npm install --save-dev jest
    ```

2. **Run Tests**:
   Use the following command to run the tests:
    ```sh
    npm test
    ```