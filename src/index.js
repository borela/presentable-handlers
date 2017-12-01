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

import { Component } from 'react'

const HANDLER_IDENTIFIER = /^on[A-Z]\w*/

function filterHandlers(presentableProps) {
  let handlers = {}, props = {}
  for (let propName in presentableProps.props) {
    if (HANDLER_IDENTIFIER.test(propName))
      handlers[propName] = presentableProps.props[propName]
    else
      props[propName] = presentableProps.props[propName]
  }
  presentableProps.props = props
  presentableProps.handlers = handlers
}

export function presentableHandlers(targetComponent:Class<Component<*>>) {
  let prototype = targetComponent.prototype

  let oldComponentWillMount = prototype.componentWillMount
  prototype.componentWillMount = function() {
    filterHandlers(this.props.presentable)
    if (oldComponentWillMount)
      oldComponentWillMount()
  }

  let oldComponentWillUpdate = prototype.componentWillUpdate
  prototype.componentWillUpdate = function(nextProps, nextState) {
    filterHandlers(nextProps)
    if (oldComponentWillUpdate)
      oldComponentWillUpdate(nextProps, nextState)
  }

  return targetComponent
}

export default presentableHandlers
