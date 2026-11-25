import * as React from 'react'

import * as config from '@/lib/config'
import { GitHubIcon } from '@/lib/icons/github'
import { LinkedInIcon } from '@/lib/icons/linkedin'
import { MoonIcon } from '@/lib/icons/moon'
import { SunIcon } from '@/lib/icons/sun'
import { TwitterIcon } from '@/lib/icons/twitter'
import { useDarkMode } from '@/lib/use-dark-mode'

import styles from './styles.module.css'

export function FooterImpl() {
  const { hasMounted, isDarkMode, toggleDarkMode } = useDarkMode()

  // busuanzi (不蒜子) site page-view counter
  // note: the script must not be removed on cleanup, otherwise its callback
  // fails to remove its own script tag and hides the counter again
  React.useEffect(() => {
    if (document.getElementById('busuanzi-script')) return

    const script = document.createElement('script')
    script.id = 'busuanzi-script'
    script.src =
      'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  const onToggleDarkMode = React.useCallback(
    (e: any) => {
      e.preventDefault()
      toggleDarkMode()
    },
    [toggleDarkMode]
  )

  return (
    <footer className={styles.footer}>
      <div className={styles.copyrightGroup}>
        <div id='busuanzi_container_site_pv' className={styles.busuanzi}>
          本站总访问量 <span id='busuanzi_value_site_pv' /> 次
        </div>

        <div className={styles.copyright}>Copyright 2021 {config.author}</div>
      </div>

      <div className={styles.settings}>
        {hasMounted && (
          <a
            className={styles.toggleDarkMode}
            href='#'
            role='button'
            onClick={onToggleDarkMode}
            title='Toggle dark mode'
          >
            {isDarkMode ? <MoonIcon /> : <SunIcon />}
          </a>
        )}
      </div>

      <div className={styles.social}>
        {config.twitter && (
          <a
            className={styles.twitter}
            href={`https://x.com/${config.twitter}`}
            title={`X @${config.twitter}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <TwitterIcon />
          </a>
        )}

        {config.github && (
          <a
            className={styles.github}
            href={`https://github.com/${config.github}`}
            title={`GitHub @${config.github}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <GitHubIcon />
          </a>
        )}

        {config.linkedin && (
          <a
            className={styles.linkedin}
            href={`https://www.linkedin.com/in/${config.linkedin}`}
            title={`LinkedIn ${config.author}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <LinkedInIcon />
          </a>
        )}
      </div>
    </footer>
  )
}

export const Footer = React.memo(FooterImpl)
