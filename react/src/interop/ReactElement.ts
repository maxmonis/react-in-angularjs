import ReactDom from 'react-dom/client'

export class ReactElement extends HTMLElement {
  private mutationObserver: MutationObserver

  constructor(private createElement: (props: object) => JSX.Element) {
    super()
    // Re-render the component if the element's attributes change
    this.mutationObserver = new MutationObserver(() => {
      this.unmount()
      this.render()
    })
    this.mutationObserver.observe(this, { attributes: true })
  }

  // Native HTMLElement lifecycle method which runs on init
  connectedCallback() {
    this.render()
  }

  // Native HTMLElement lifecycle method which runs on destroy
  disconnectedCallback() {
    this.unmount()
    this.mutationObserver.disconnect()
  }

  private unmount() {
    ReactDom.createRoot(this).unmount()
  }

  private render() {
    // Only render if digest cycles are not pending. This ensures we
    // don't unnecessarily re-render the component (it's especially
    // important if the component will fetch data on initialization)
    if (!this.hasPendingDigestCycle())
      ReactDom.createRoot(this).render(this.createElement(this.getProps()))
  }

  private hasPendingDigestCycle() {
    // If an attribute value starts with `{{` it's an expression
    // which Angular will evaluate in a subsequent digest cycle
    return [...this.attributes].some(a => a.value.startsWith('{{'))
  }

  private getProps() {
    return [...this.attributes].reduce<Record<string, unknown>>(
      (props, { name, value }) => {
        // Convert HTML attributes to props, ignoring Angular
        // directives along with `class` and `style` attributes
        if (!name.startsWith('ng-') && !['class', 'style'].includes(name))
          props[ReactElement.kebabToCamel(name)] =
            ReactElement.parseValue(value)
        return props
      },
      {},
    )
  }

  private static kebabToCamel(name: string) {
    // Convert kebab-case attribute name to camelCase prop name.
    // e.g. `some-sample-text` -> `someSampleText`
    return name
      .split('-')
      .map((word, i) => (i ? this.capitalize(word) : word))
      .join('')
  }

  private static parseValue(value: string): unknown {
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  private static capitalize(word: string) {
    return word[0].toUpperCase() + word.slice(1)
  }
}
