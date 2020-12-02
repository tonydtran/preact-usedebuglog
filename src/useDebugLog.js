import { useState, useEffect, useContext } from 'preact/hooks'
import { DebugLogContext } from './Context'

export const useDebugLog = (componentName, isEnabled) => {
  if (!componentName || typeof componentName !== 'string') {
    throw new Error('A componentName must be provided')
  }

  const { dev } = useContext(DebugLogContext)
  const flagged = typeof isEnabled === 'boolean'
  const [enable, setEnable] = useState(flagged ? isEnabled : dev)

  useEffect(() => {
    window.useDebugLog = window.useDebugLog || {}
    window.useDebugLog = {
      ...window.useDebugLog,
      [componentName]: (makeEnable = true) => {
        setEnable(makeEnable)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof isEnabled === 'boolean') {
      setEnable(isEnabled)
    } else {
      if (dev !== enable) setEnable(dev)
    }
  }, [isEnabled])

  const log = (...args) => {
    enable && console.log(`%c[${componentName}]`, 'background-color: blue', ...args)
  }

  const table = (...args) => {
    enable && console.log(`%c[${componentName}]`, 'background-color: blue', 'console.table:')
    enable && console.table(...args)
  }

  const info = (...args) => {
    enable && console.info(`%c[${componentName}]`, 'background-color: blue', ...args)
  }

  const error = (...args) => {
    enable && console.error(`%c[${componentName}]`, 'background-color: blue', ...args)
  }

  const warn = (...args) => {
    enable && console.warn(`%c[${componentName}]`, 'background-color: blue', ...args)
  }

  const trace = () => {
    enable && console.log(`%c[${componentName}]`, 'background-color: blue', 'console.trace:')
    enable && console.trace()
  }

  enable
    ? console.log(`%c[useDebugLog]%c Debug for %c${componentName} %cenabled`, 'background-color: green;', 'color: inherit;', 'font-weight: bold', 'color: green;')
    : console.log(`%c[useDebugLog]%c Debug for %c${componentName} %cdisabled`, 'background-color: green;', 'color: inherit;', 'font-weight: bold', 'color: orange;')

  return {
    log,
    table,
    info,
    error,
    warn,
    trace
  }
}
