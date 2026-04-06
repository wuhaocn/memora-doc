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

export const toEditorHtml = (value) => {
  if (!value || !value.trim()) {
    return '<p></p>'
  }

  const trimmed = value.trim()
  if (/<[a-z][\s\S]*>/i.test(trimmed)) {
    return trimmed
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
  return html || '<p></p>'
}

export const summarizePlainText = (value, maxLength = 180) => {
  const normalized = (value || '').replace(/\s+/g, ' ').trim()
  if (!normalized) {
    return ''
  }
  return normalized.length > maxLength ? normalized.slice(0, maxLength) : normalized
}
