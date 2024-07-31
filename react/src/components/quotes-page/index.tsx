import React from 'react'
import { InternalLink } from '../internal-link'
import styles from './styles.module.css'

export function QuotesPage({
  __html,
  angularQuote,
}: {
  __html: string
  angularQuote?: Quote
}) {
  const [quote, setQuote] = React.useState<Quote>()
  React.useEffect(loadQuote, [angularQuote])
  function loadQuote() {
    if (angularQuote) fetchQuote().then(setQuote)
  }
  return (
    <div>
      <span dangerouslySetInnerHTML={{ __html }} />
      <QuoteItem quote={angularQuote} source='Angular' />
      <QuoteItem source='React' {...{ quote }} />
      <button
        className={styles.button}
        onClick={() => {
          window.dispatchEvent(new CustomEvent('quotes', { detail: 'reload' }))
        }}
      >
        Reload
      </button>
      <InternalLink />
    </div>
  )
}

QuotesPage.tag = 'quotes-page'

function fetchQuote(): Promise<Quote> {
  return fetch('https://api.quotable.io/random').then(res => res.json())
}

function QuoteItem({ quote, source }: { quote?: Quote; source: Source }) {
  return (
    <>
      <h2>{source} Quote</h2>
      {quote ? (
        <p>
          {quote.content}
          <br />- {quote.author}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

interface Quote {
  author: string
  content: string
}

type Source = 'Angular' | 'React'
