import './globals.scss'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '游戏时光 - vgtime.com'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='zh-CN'>
    <body>{children}</body>
    </html>
  )
}
