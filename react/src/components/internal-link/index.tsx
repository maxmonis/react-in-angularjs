export function InternalLink(props: { text: string }) {
  return <a href='#!/phones'>{props.text}</a>
}

InternalLink.tag = 'internal-link'
