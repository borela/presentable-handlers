Decorator to filter presentable‘s event handlers into their own variable.

## Installation

```sh
npm install --save presentable-handlers
```

## Usage

```js
import React, { Component } from 'react'
import { defaultPresenter, presentable } from 'presentable'
import presentableHandlers from 'presentable-handlers'

@presentableHandlers
class SomePresenter extends Component {
  render() {
    let {
      instance, state, props,
      // All event handlers are grouped into this property and removed from
      // “props”.
      handlers
    } = this.props.presentable
    return <div>Ctrine!</div>
  }
}

@presentable
@defaultPresenter(SomePresenter)
class SomeComponent extends Component {}
```
