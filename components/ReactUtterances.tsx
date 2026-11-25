'use client'

import * as React from 'react'

import styles from './styles.module.css'

export type MappingType =
  | 'pathname'
  | 'url'
  | 'title'
  | 'og:title'
  | 'issue-number'
  | 'issue-term'

export type Theme =
  | 'github-light'
  | 'github-dark'
  | 'preferred-color-scheme'
  | 'github-dark-orange'
  | 'icy-dark'
  | 'dark-blue'
  | 'photon-dark'

export interface ReactUtterancesProps {
  repo: string
  issueMap: MappingType
  issueTerm?: string
  issueNumber?: number
  label?: string
  theme: Theme
}

export function ReactUtterances({
  repo,
  issueMap,
  issueTerm,
  issueNumber,
  label,
  theme
}: ReactUtterancesProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  // only the initial theme is used for the first injection; later changes
  // are pushed to the existing iframe via postMessage
  const initialThemeRef = React.useRef(theme)
  const [pending, setPending] = React.useState(true)

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // avoid injecting a duplicate utterances iframe on re-mounts
    container.replaceChildren()
    setPending(true)

    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.async = true
    script.defer = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('repo', repo)
    script.setAttribute('theme', initialThemeRef.current)

    if (label) {
      script.setAttribute('label', label)
    }

    if (issueMap === 'issue-number') {
      script.setAttribute('issue-number', String(issueNumber))
    } else if (issueMap === 'issue-term') {
      script.setAttribute('issue-term', issueTerm ?? 'title')
    } else {
      script.setAttribute('issue-term', issueMap)
    }

    script.onload = () => setPending(false)
    container.appendChild(script)
  }, [repo, issueMap, issueTerm, issueNumber, label])

  React.useEffect(() => {
    const iframe = document.querySelector(
      'iframe.utterances-frame'
    ) as HTMLIFrameElement | null

    iframe?.contentWindow?.postMessage(
      { type: 'set-theme', theme },
      'https://utteranc.es/'
    )
  }, [theme])

  return (
    <div className={styles.comments}>
      {pending && <p>Loading Comments...</p>}

      <div className={styles.utterances} ref={containerRef} />
    </div>
  )
}
