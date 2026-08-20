/* eslint-disable @next/next/no-img-element */
import { createElement, Fragment } from 'react'
import escapeHTML from 'escape-html'

// Lexical text format bitmask flags
const IS_BOLD = 1
const IS_ITALIC = 1 << 1
const IS_STRIKETHROUGH = 1 << 2
const IS_UNDERLINE = 1 << 3
const IS_CODE = 1 << 4

type Components = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: (props: any) => React.ReactNode
}

type Props = {
  // Aceita o objeto lexical ({ root: { children } }) ou um array de nós (uso recursivo)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any
  components?: Components
  className?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderText(node: any, i: number, components?: Components, className?: string) {
  let text = (
    <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} className={className} />
  )

  const format: number = typeof node.format === 'number' ? node.format : 0

  if (format & IS_BOLD) {
    text = components?.strong ? (
      <components.strong key={i}>{text}</components.strong>
    ) : components?.b ? (
      <components.b key={i}>{text}</components.b>
    ) : (
      <strong key={i}>{text}</strong>
    )
  }

  if (format & IS_CODE) {
    text = components?.code ? (
      <components.code key={i}>{text}</components.code>
    ) : (
      <code key={i}>{text}</code>
    )
  }

  if (format & IS_ITALIC) {
    text = components?.em ? (
      <components.em key={i}>{text}</components.em>
    ) : components?.i ? (
      <components.i key={i}>{text}</components.i>
    ) : (
      <em key={i}>{text}</em>
    )
  }

  if (format & IS_UNDERLINE) {
    text = (
      <span style={{ textDecoration: 'underline' }} key={i}>
        {text}
      </span>
    )
  }

  if (format & IS_STRIKETHROUGH) {
    text = (
      <span style={{ textDecoration: 'line-through' }} key={i}>
        {text}
      </span>
    )
  }

  return <Fragment key={i}>{text}</Fragment>
}

export default function RichText({ content, components, className }: Props) {
  const nodes: unknown[] = Array.isArray(content) ? content : content?.root?.children

  if (!Array.isArray(nodes)) {
    return null
  }

  return (
    <>
      {nodes.map((node: any, i: number) => {
        if (!node) {
          return null
        }

        if (node.type === 'text' || typeof node.text === 'string') {
          return renderText(node, i, components, className)
        }

        if (node.type === 'linebreak') {
          return <br key={i} />
        }

        const children = <RichText content={node.children} components={components} />

        switch (node.type) {
          case 'heading': {
            const tag: string = node.tag || 'h2'
            return components?.[tag]
              ? createElement(components[tag], { key: i }, children)
              : createElement(tag, { key: i }, children)
          }
          case 'list': {
            const tag: string = node.tag === 'ol' || node.listType === 'number' ? 'ol' : 'ul'
            return components?.[tag]
              ? createElement(components[tag], { key: i }, children)
              : createElement(tag, { key: i }, children)
          }
          case 'listitem':
            return components?.li ? (
              <components.li key={i}>{children}</components.li>
            ) : (
              <li key={i}>{children}</li>
            )
          case 'quote':
            return components?.blockquote ? (
              <components.blockquote key={i}>{children}</components.blockquote>
            ) : (
              <blockquote key={i}>{children}</blockquote>
            )
          case 'link':
          case 'autolink': {
            const href = escapeHTML(node.fields?.url || node.url || '#')
            const newTab = node.fields?.newTab
            const rel = newTab ? 'noopener noreferrer' : undefined
            const target = newTab ? '_blank' : undefined
            return components?.a ? (
              <components.a href={href} target={target} rel={rel} key={i}>
                {children}
              </components.a>
            ) : (
              <a href={href} target={target} rel={rel} key={i}>
                {children}
              </a>
            )
          }
          case 'upload': {
            const url = node.value?.url
            const alt = node.value?.alt || ''
            if (!url) {
              return null
            }
            return components?.img ? (
              <components.img src={url} alt={alt} key={i} />
            ) : (
              <img src={url} alt={alt} key={i} />
            )
          }
          case 'paragraph':
          default:
            return components?.p ? (
              <components.p key={i}>{children}</components.p>
            ) : (
              <p key={i}>{children}</p>
            )
        }
      })}
    </>
  )
}
