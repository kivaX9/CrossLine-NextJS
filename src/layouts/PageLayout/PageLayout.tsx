import React from 'react'
import styles from './PageLayout.module.scss'

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={styles.page_layout}>{children}</div>
}
