'use client'
import { register } from '@/apis/client/user'
import { AppDispatch } from '@/store'
import { login } from '@/store/modules/session'
import { setUri } from '@/store/modules/sidebar'
import { FormEvent, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './index.module.scss'

export default function Register() {
  const [tooltip, setTooltip] = useState('使用手机号注册')
  const dispatch = useDispatch<AppDispatch>()
  const phoneNumberRef = useRef<HTMLInputElement>(null)
  const verificationCodeRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      // 表单校验
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        setTooltip('两次输入的密码不一样')
        return
      }
      // 发送注册请求
      const wrapper = await register(
        phoneNumberRef.current.value,
        passwordRef.current.value,
        verificationCodeRef.current.value,
      )
      if (201 !== wrapper.code) {
        setTooltip(wrapper.message)
        return
      }
      // 注册成功
      setTooltip('注册成功')
      // 自动登录
      await dispatch(login(phoneNumberRef.current.value, passwordRef.current.value))
      dispatch(setUri('user-center'))
    } catch (err: any) {
      setTooltip(err.message)
    }
  }
  return (
    <div className={styles.register}>
      <div className={styles.main}>
        <h2 className={styles.tooltip}>{tooltip}</h2>
        <form onSubmit={handleSubmit}>
          <label>手机号</label>
          <span>这是您的登录账号</span>
          <div>
            <input type="text" autoComplete="username" ref={phoneNumberRef} />
          </div>
          <label>验证码</label>
          <span>确认您的手机号</span>
          <div className={styles.code}>
            <input type="text" autoComplete="one-time-code" placeholder="请填入1111" ref={verificationCodeRef} />
            <a>获取验证码</a>
          </div>
          <label>密码</label>
          <span>请输入8位以上字母或数字</span>
          <div>
            <i></i>
            <input type="password" autoComplete="new-password" ref={passwordRef} />
          </div>
          <label>密码</label>
          <span>请再输入一次密码</span>
          <div>
            <i></i>
            <input type="password" autoComplete="new-password" ref={confirmPasswordRef} />
          </div>
          <button type="submit" className={styles.button}>
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
