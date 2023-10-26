import './globals.scss'
import React from 'react'
import type { Metadata } from 'next'
import styles from './layout.module.scss'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: '(仿)游戏时光 - vgtime.com'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='zh-CN'>
    <body>
    <div className={styles.main}>
      {/*<Header />*/}
      <div className={styles.container}>
        {children}
      </div>
      <Footer />
    </div>
    </body>
    </html>
  )
}
