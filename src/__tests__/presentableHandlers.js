// Licensed under the Apache License, Version 2.0 (the “License”); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

import clone from 'clone'
import presentableHandlers from '..'
import React, { Component } from 'react'
import { shallow } from 'enzyme'

const ALMOST_HANDLERS = { on: 1, once: 2, one: 3 }
const NORMAL_HANDLERS = { onSomeEventA: 4, onSomeEventB: 5, onSomeEventC: 6 }
const NORMAL_PROPS = { somePropA: 7, somePropB: 8, somePropC: 9 }
const SINGLE_CHAR_HANDLERS = { onA: 10, onB: 11, onC: 12 }
const SINGLE_CHAR_PROPS = { a: 13, b: 14, c: 15 }
const STATE = { a: 16, b: 17, c: 18 }
const PRESENTABLE_DATA = {
  props: {
    ...ALMOST_HANDLERS,
    ...NORMAL_HANDLERS,
    ...NORMAL_PROPS,
    ...SINGLE_CHAR_HANDLERS,
    ...SINGLE_CHAR_PROPS
  },
  state: STATE
}

class SomePresenter extends Component {
  render() {
    return <div>Ctrine!</div>
  }
}

let DecoratedPresenter = presentableHandlers(SomePresenter)

describe('Decorator “presentableHandlers” applied on “SomePresenter”', () => {
  it('has the same constructor', () => {
    const WRAPPER = shallow(<DecoratedPresenter presentable={clone(PRESENTABLE_DATA)}/>)
    const INSTANCE = WRAPPER.instance()
    expect(INSTANCE instanceof SomePresenter)
      .toBe(true)
    expect(Object.getPrototypeOf(INSTANCE).constructor)
      .toBe(SomePresenter)
  })

  it('extracts event handlers from props', () => {
    const WRAPPER = shallow(<SomePresenter presentable={clone(PRESENTABLE_DATA)}/>)
    const INSTANCE = WRAPPER.instance()

    let { handlers, props, state } = INSTANCE.props.presentable

    expect(state)
      .toEqual(STATE)

    expect(props)
      .toEqual({
        ...ALMOST_HANDLERS,
        ...SINGLE_CHAR_PROPS,
        ...NORMAL_PROPS
      })

    expect(handlers)
      .toEqual({
        ...SINGLE_CHAR_HANDLERS,
        ...NORMAL_HANDLERS
      })
  })
})
