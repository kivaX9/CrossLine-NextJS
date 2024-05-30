import React from 'react'
import style from './Authlayout.module.scss'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={style.authLayout}>{children}</div>
}
