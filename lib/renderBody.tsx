import React, { Fragment } from 'react'
import Link from 'next/link'
import { Text } from 'slate'

// eslint-disable-next-line no-use-before-define
type Children = Leaf[]

type Leaf = {
  type: string
  value?: {
    url: string
    alt: string
  }
  children?: Children
  url?: string
  [key: string]: unknown
}

const serialize = (children?: Children, wrapInParagraph: boolean = true): React.ReactNode[] =>
  children?.map((node, i) => {
    if (Text.isText(node)) {
      let text: React.ReactNode = node.text

      if (text === "\n") {
        return <br key={i} />
      }
      if (text === "") {
        return <br key={i} />
      }

      if (node.bold) {
        text = <strong key={i}>{text}</strong>
      }

      if (node.code) {
        text = <code key={i}>{text}</code>
      }

      if (node.italic) {
        text = <em key={i}>{text}</em>
      }

      if (node.underline) {
        text = (
          <u style={{ textDecoration: 'underline' }} key={i}>
            {text}
          </u>
        )
      }

      if (node.strikethrough) {
        text = (
          <del style={{ textDecoration: 'line-through' }} key={i}>
            {text}
          </del>
        )
      }

      return <Fragment key={i}>{text}</Fragment>
    }

    if (!node) {
      return null
    }

    switch (node.type) {
      case 'h1':
        return <h1 key={i}>{serialize(node?.children)}</h1>
      case 'h2':
        return <h2 key={i}>{serialize(node?.children)}</h2>
      case 'h3':
        return <h3 key={i}>{serialize(node?.children)}</h3>
      case 'h4':
        return <h4 key={i}>{serialize(node?.children)}</h4>
      case 'h5':
        return <h5 key={i}>{serialize(node?.children)}</h5>
      case 'h6':
        return <h6 key={i}>{serialize(node?.children)}</h6>
      case 'quote':
        return <blockquote key={i}>{serialize(node?.children)}</blockquote>
      case 'ul':
        return <ul className='list-disc list-inside' key={i}>{serialize(node?.children)}</ul>
      case 'ol':
        return <ol className='list-decimal list-inside' key={i}>{serialize(node.children)}</ol>
      case 'li':
        return <li className='leading-7 text-left' key={i}>{serialize(node.children, false)}</li>
      case 'link':
        return (
          <Link
            key={i}
            href={node.url as any}
          >
            {serialize(node?.children)}
          </Link>
        )

      default:
        return wrapInParagraph ? <p className='leading-7 text-left [&:not(:first-child)]:mt-6' key={i}>{serialize(node?.children)}</p> : serialize(node?.children)
    }
  }) || []

export default serialize
