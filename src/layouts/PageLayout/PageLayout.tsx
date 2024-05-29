import React from 'react'

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div style={{ marginTop: '70px' }}>{children}</div>
}
