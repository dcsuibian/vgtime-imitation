import './globals.scss'
import React from 'react'
import type { Metadata } from 'next'
import styles from './layout.module.scss'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: '(仿)游戏时光 - vgtime.com',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <Header /> {/* Header必须写在外面，才能在页面滚动时较好地居中 */}
        <Sidebar />
        <div className={styles.main}>
          <div className={styles.container}>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
