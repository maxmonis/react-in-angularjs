import ReactDom from 'react-dom/client'

export class ReactElement extends HTMLElement {
  constructor(private createElement: (props: object) => JSX.Element) {
    super()
  }

  // Native HTMLElement lifecycle method which runs on init
  connectedCallback() {
    this.render()
  }

  // Native HTMLElement lifecycle method which runs on destroy
  disconnectedCallback() {
    this.unmount()
  }

  private unmount() {
    ReactDom.createRoot(this).unmount()
  }

  private render() {
    ReactDom.createRoot(this).render(this.createElement(this.getProps()))
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
