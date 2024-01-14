'use client'
import styles from './index.module.scss'
import React, { FormEvent, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUri } from '@/store/modules/sidebar'
import { AppDispatch } from '@/store'
import { login } from '@/store/modules/session'

export default function Login() {
  const [tooltip, setTooltip] = useState('我的')
  const dispatch = useDispatch<AppDispatch>()
  const phoneNumberRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    dispatch(login(phoneNumberRef.current.value, passwordRef.current.value))
      .then(() => dispatch(setUri('user-center')))
      .catch(err => setTooltip(err.message))
  }
  return (
    <div className={styles.login}>
      <div className={styles.main}>
        <h2 className={styles.tooltip}>{tooltip}</h2>
        <form onSubmit={handleSubmit}>
          <label>账号</label>
          <div>
            <input type="text" placeholder="请输入用户名" autoComplete="username" ref={phoneNumberRef} />
          </div>
          <label>密码</label>
          <div>
            <input type="password" placeholder="8位以上字母或数字" autoComplete="current-password" ref={passwordRef} />
          </div>
          <button type="submit">登录</button>
        </form>
      </div>
      <div className={styles.bottom}>
        <p>还没注册或关联第三方账号？</p>
        <button type="button" onClick={() => dispatch(setUri('register'))}>
          现在注册
        </button>
      </div>
    </div>
  )
}
