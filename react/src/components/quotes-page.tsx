import React from 'react'
import { InternalLink } from './internal-link'

export function QuotesPage({ angularQuote }: { angularQuote?: Quote }) {
  const [quote, setQuote] = React.useState<Quote>()
  React.useEffect(loadQuote, [angularQuote])
  function loadQuote() {
    if (angularQuote) fetchQuote().then(setQuote)
  }
  return (
    <div>
      <h1>Quotes</h1>
      <QuoteItem quote={angularQuote} source='Angular' />
      <QuoteItem source='React' {...{ quote }} />
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
