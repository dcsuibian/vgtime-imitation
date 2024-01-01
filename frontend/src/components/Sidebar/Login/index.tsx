'use client'
import styles from './index.module.scss'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUri } from '@/store/modules/sidebar'
import { AppDispatch } from '@/store'

export default function Login() {
  const [tooltip, setTooltip] = useState('我的')
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div className={styles.login}>
      <div className={styles.main}>
        <h2 className={styles.tooltip}>{tooltip}</h2>
        <form>
          <label>账号</label>
          <div>
            <input type="text" placeholder="请输入用户名" />
          </div>
          <label>密码</label>
          <div>
            <input type="password" placeholder="8位以上字母或数字" />
          </div>
          <button type="button">登录</button>
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
