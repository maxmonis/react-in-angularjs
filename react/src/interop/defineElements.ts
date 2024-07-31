import React from 'react'
import { elements } from './elements'
import { ReactElement } from './ReactElement'

const createElement = (element: React.ElementType, props: object) =>
  React.createElement(element, props)

/**
 * Defines a custom HTML element for each of the components
 * which we need to expose to the Angular app
 */
export function defineElements() {
  for (const element of elements)
    customElements.define(
      element.tag,
      class extends ReactElement {
        constructor() {
          super(props => createElement(element, props))
        }
      },
    )
}
