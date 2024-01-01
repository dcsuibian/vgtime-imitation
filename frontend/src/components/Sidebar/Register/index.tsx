'use client'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUri } from '@/store/modules/sidebar'
import { AppDispatch } from '@/store'

export default function Register() {
  const [tooltip, setTooltip] = useState('使用手机号注册')
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className={styles.register}>
      <div className={styles.main}>
        <h2 className={styles.tooltip}>{tooltip}</h2>
        <form>
          <label>手机号</label>
          <span>这是您的登录账号</span>
          <div>
            <input type="text" />
          </div>
          <label>验证码</label>
          <span>确认您的手机号</span>
          <div className={styles.code}>
            <input type="text" />
            <a>获取验证码</a>
          </div>
          <label>密码</label>
          <span>请输入8位以上字母或数字</span>
          <div>
            <i></i>
            <input type="password" />
          </div>
          <label>密码</label>
          <span>请再输入一次密码</span>
          <div>
            <i></i>
            <input type="password" />
          </div>
          <button type="button" className={styles.button}>
            提交
          </button>
        </form>
      </div>
      <div className={styles.bottom}>
        <p>已经有账号？</p>
        <button type="button" className={styles.button} onClick={() => dispatch(setUri('login'))}>
          登录
        </button>
      </div>
    </div>
  )
}
