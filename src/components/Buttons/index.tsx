import { useState } from 'react'
import { type InputHTMLAttributes, type PropsWithChildren } from 'react'
import Processing from '@components/Icon/Processing'

export interface Props extends InputHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset' | undefined
  styling?: 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link'
  isLoading?: boolean
  isDisabled?: boolean
  isThrottled?: boolean
  delay?: number
  className?: string
}

const Button = ({ type = 'button', styling, isLoading, isDisabled, isThrottled, className = '', children, delay = 1000, ...rest }: PropsWithChildren<Props>) => {
  let btnClass = ''
  const [lastClick, setLastClick] = useState(0)
  const [throttled, setThrottled] = useState(false)

  const handleClick = (func: ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined, e: React.MouseEvent<HTMLButtonElement>) => {
    if (func) {
      const now = Date.now()
      if (!isThrottled || (isThrottled && now - lastClick >= delay)) {
        func(e)
        setLastClick(now)
        if (isThrottled) {
          setThrottled(true)
          setTimeout(() => { setThrottled(false) }, delay)
        }
      }
    }
  }

  if (styling === 'primary') {
    btnClass = 'btn-primary'
  } else if (styling === 'secondary') {
    btnClass = 'btn-secondary'
  } else if (styling === 'success') {
    btnClass = 'btn-success'
  } else if (styling === 'danger') {
    btnClass = 'btn-danger'
  } else if (styling === 'warning') {
    btnClass = 'btn-warning'
  } else if (styling === 'info') {
    btnClass = 'btn-info'
  } else if (styling === 'light') {
    btnClass = 'btn-light'
  } else if (styling === 'dark') {
    btnClass = 'btn-dark'
  } else if (styling === 'link') {
    btnClass = 'btn-link'
  }

  return (
    <button
      type={type}
      disabled={isDisabled ?? throttled} // Disable button if isDisabled or throttled
      className={` ${btnClass} ${className}`}
      onClick={(e) => { handleClick(rest.onClick, e) }}
    >
      {isLoading && <Processing className={`-mt-1 mr-1 ${styling === 'primary' ? 'text-white' : ''}`}></Processing>}{children}
    </button>
  )
}

export default Button
