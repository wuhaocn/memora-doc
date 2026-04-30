const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const inlineMarkdownToHtml = (value) => {
  const escaped = escapeHtml(value)
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
}

const closeListIfNeeded = (html, listType) => {
  if (!listType) {
    return html
  }
  return `${html}</${listType}>`
}

const HTML_LIKE_PATTERN = /<[a-z][\s\S]*>/i
const TEXT_NODE = 3
const ELEMENT_NODE = 1
const BLOCKED_TAGS = new Set(['script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'link', 'meta'])
const ALLOWED_TAGS = new Set([
  'article',
  'blockquote',
  'br',
  'code',
  'div',
  'em',
  'figure',
  'figcaption',
  'h1',
  'h2',
  'h3',
  'hr',
  'img',
  'li',
  'ol',
  'p',
  'pre',
  'section',
  'span',
  'strong',
  'ul',
])
const GLOBAL_ALLOWED_ATTRS = new Set(['class'])
const TAG_ALLOWED_ATTRS = {
  div: new Set(['data-type', 'data-diagram-type', 'data-content', 'data-width', 'data-height']),
  img: new Set(['src', 'alt', 'title']),
}

const isSafeUrl = (value, { allowDataImage = false } = {}) => {
  const normalized = value.trim()
  if (!normalized) {
    return false
  }

  const lowerValue = normalized.toLowerCase()
  if (lowerValue.startsWith('javascript:') || lowerValue.startsWith('vbscript:')) {
    return false
  }
  if (lowerValue.startsWith('data:')) {
    return allowDataImage && /^data:image\//i.test(normalized)
  }

  return true
}

const sanitizeNode = (node, ownerDocument) => {
  if (node.nodeType === TEXT_NODE) {
    return ownerDocument.createTextNode(node.textContent || '')
  }

  if (node.nodeType !== ELEMENT_NODE) {
    return ownerDocument.createDocumentFragment()
  }

  const tagName = node.tagName.toLowerCase()
  if (BLOCKED_TAGS.has(tagName)) {
    return ownerDocument.createDocumentFragment()
  }

  if (!ALLOWED_TAGS.has(tagName)) {
    const fragment = ownerDocument.createDocumentFragment()
    Array.from(node.childNodes).forEach((childNode) => {
      fragment.appendChild(sanitizeNode(childNode, ownerDocument))
    })
    return fragment
  }

  const sanitizedElement = ownerDocument.createElement(tagName)
  const allowedAttrs = TAG_ALLOWED_ATTRS[tagName] || new Set()

  Array.from(node.attributes).forEach((attribute) => {
    const attrName = attribute.name.toLowerCase()
    if (attrName.startsWith('on')) {
      return
    }
    if (!GLOBAL_ALLOWED_ATTRS.has(attrName) && !allowedAttrs.has(attrName)) {
      return
    }

    const attrValue = attribute.value || ''
    if (attrName === 'src' && !isSafeUrl(attrValue, { allowDataImage: true })) {
      return
    }

    sanitizedElement.setAttribute(attribute.name, attrValue)
  })

  Array.from(node.childNodes).forEach((childNode) => {
    sanitizedElement.appendChild(sanitizeNode(childNode, ownerDocument))
  })
  return sanitizedElement
}

export const sanitizeRichHtml = (value) => {
  const normalized = (value || '').trim()
  if (!normalized) {
    return ''
  }

  if (typeof DOMParser === 'undefined' || typeof document === 'undefined') {
    return escapeHtml(normalized)
  }

  const parser = new DOMParser()
  const parsedDocument = parser.parseFromString(`<body>${normalized}</body>`, 'text/html')
  const safeDocument = document.implementation.createHTMLDocument('')
  const container = safeDocument.createElement('div')

  Array.from(parsedDocument.body.childNodes).forEach((node) => {
    container.appendChild(sanitizeNode(node, safeDocument))
  })

  return container.innerHTML
}

export const toEditorHtml = (value) => {
  if (!value || !value.trim()) {
    return '<p></p>'
  }

  const trimmed = value.trim()
  if (HTML_LIKE_PATTERN.test(trimmed)) {
    return sanitizeRichHtml(trimmed) || '<p></p>'
  }

  const lines = trimmed.split('\n')
  let html = ''
  let listType = null
  let inCodeBlock = false
  let codeBuffer = []

  const flushCodeBlock = () => {
    if (!inCodeBlock) {
      return
    }
    html += `<pre><code>${escapeHtml(codeBuffer.join('\n'))}</code></pre>`
    inCodeBlock = false
    codeBuffer = []
  }

  lines.forEach((line) => {
    const rawLine = line.replace(/\r/g, '')
    const trimmedLine = rawLine.trim()

    if (trimmedLine.startsWith('```')) {
      if (listType) {
        html = closeListIfNeeded(html, listType)
        listType = null
      }
      if (inCodeBlock) {
        flushCodeBlock()
      } else {
        inCodeBlock = true
      }
      return
    }

    if (inCodeBlock) {
      codeBuffer.push(rawLine)
      return
    }

    if (!trimmedLine) {
      if (listType) {
        html = closeListIfNeeded(html, listType)
        listType = null
      }
      return
    }

    const headingMatch = trimmedLine.match(/^(#{1,3})\s+(.+)$/)
    if (headingMatch) {
      if (listType) {
        html = closeListIfNeeded(html, listType)
        listType = null
      }
      const level = headingMatch[1].length
      html += `<h${level}>${inlineMarkdownToHtml(headingMatch[2])}</h${level}>`
      return
    }

    const blockquoteMatch = trimmedLine.match(/^>\s+(.+)$/)
    if (blockquoteMatch) {
      if (listType) {
        html = closeListIfNeeded(html, listType)
        listType = null
      }
      html += `<blockquote><p>${inlineMarkdownToHtml(blockquoteMatch[1])}</p></blockquote>`
      return
    }

    const orderedMatch = trimmedLine.match(/^\d+\.\s+(.+)$/)
    if (orderedMatch) {
      if (listType !== 'ol') {
        if (listType) {
          html = closeListIfNeeded(html, listType)
        }
        html += '<ol>'
        listType = 'ol'
      }
      html += `<li>${inlineMarkdownToHtml(orderedMatch[1])}</li>`
      return
    }

    const unorderedMatch = trimmedLine.match(/^[-*]\s+(.+)$/)
    if (unorderedMatch) {
      if (listType !== 'ul') {
        if (listType) {
          html = closeListIfNeeded(html, listType)
        }
        html += '<ul>'
        listType = 'ul'
      }
      html += `<li>${inlineMarkdownToHtml(unorderedMatch[1])}</li>`
      return
    }

    if (listType) {
      html = closeListIfNeeded(html, listType)
      listType = null
    }
    html += `<p>${inlineMarkdownToHtml(trimmedLine)}</p>`
  })

  if (listType) {
    html = closeListIfNeeded(html, listType)
  }
  flushCodeBlock()
  return sanitizeRichHtml(html) || '<p></p>'
}

export const summarizePlainText = (value, maxLength = 180) => {
  const normalized = (value || '').replace(/\s+/g, ' ').trim()
  if (!normalized) {
    return ''
  }
  return normalized.length > maxLength ? normalized.slice(0, maxLength) : normalized
}
