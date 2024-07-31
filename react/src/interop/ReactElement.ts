import ReactDom from 'react-dom/client'

export class ReactElement extends HTMLElement {
  constructor(private createElement: () => JSX.Element) {
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
    ReactDom.createRoot(this).render(this.createElement())
  }
}
