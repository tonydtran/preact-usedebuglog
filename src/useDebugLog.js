import { useState, useEffect, useContext, useCallback } from 'preact/hooks'
import { DebugLogContext } from './Context'

export const useDebugLog = (componentName, arg2, arg3) => {
  const { dev } = useContext(DebugLogContext)
  const [state, setState] = useState({
    enable: null,
    color: 'inherit',
    backgroundColor: 'blue'
  })

  const debugFunction = useCallback(() => {
    window.useDebugLog = window.useDebugLog || {}
    window.useDebugLog = {
      ...window.useDebugLog,
      [componentName]: (makeEnable = true) => {
        setState({
          ...state,
          enable: makeEnable
        })
        makeEnable
          ? console.log(`%c[useDebugLog]%c Debug for %c${componentName} %cenabled`, 'background-color: green;', 'color: inherit;', 'font-weight: bold', 'color: green;')
          : console.log(`%c[useDebugLog]%c Debug for %c${componentName} %cdisabled`, 'background-color: green;', 'color: inherit;', 'font-weight: bold', 'color: orange;')
      }
    }
  }, [componentName, state])

  const updateState = useCallback((arg2, arg3) => {
    if (!componentName || typeof componentName !== 'string') {
      throw new Error('A componentName must be provided')
    }
    if (arg2 && (typeof arg2 !== 'boolean' && typeof arg2 !== 'object')) {
      throw new Error(
        'Second argument must be a boolean (enable/disable debug) or a object (set label colors)'
      )
    }
    if (arg2 && typeof arg2 === 'object') {
      if ((arg2.color && typeof arg2.color !== 'string')) {
        throw new Error(
          '"color" value must be a string'
        )
      }
      if ((arg2.backgroundColor && typeof arg2.backgroundColor !== 'string')) {
        throw new Error(
          '"backgroundColor" value must be a string'
        )
      }
    }
    if (arg3 && typeof arg3 !== 'boolean') {
      throw new Error('Third argument must be a boolean (enable/disable debug)')
    }


    let color
    let backgroundColor
    if (typeof arg2 === 'object') {
      color = arg2.color ? arg2.color : 'inherit'
      backgroundColor = arg2.backgroundColor ? arg2.backgroundColor : 'blue'
    }

    let enable = dev
    const flagged = [arg2, arg3].find(element => typeof element === 'boolean')
    if (typeof flagged === 'boolean') {
      enable = flagged
    }

    if (color !== state.color || backgroundColor !== state.backgroundColor || enable !== state.enable) {
      setState({ color, backgroundColor, enable })

      if (typeof enable === 'boolean') {
        enable
          ? console.log(`%c[useDebugLog]%c Debug for %c${componentName} %cenabled`, 'background-color: green;', 'color: inherit;', 'font-weight: bold', 'color: green;')
          : console.log(`%c[useDebugLog]%c Debug for %c${componentName} %cdisabled`, 'background-color: green;', 'color: inherit;', 'font-weight: bold', 'color: orange;')
      }
    }
  }, [componentName, dev, state.backgroundColor, state.color, state.enable])

  useEffect(() => {
    debugFunction()
  }, [debugFunction])

  useEffect(() => {
    updateState(arg2, arg3)
  }, [arg2, arg3, updateState])

  const log = (...args) => {
    state.enable && console.log(`%c[${componentName}]`, `background-color: ${state.backgroundColor}; color: ${state.color};`, ...args)
  }

  const table = (...args) => {
    state.enable && console.log(`%c[${componentName}]`, `background-color: ${state.backgroundColor}; color: ${state.color};`, 'console.table:')
    state.enable && console.table(...args)
  }

  const info = (...args) => {
    state.enable && console.info(`%c[${componentName}]`, `background-color: ${state.backgroundColor}; color: ${state.color};`, ...args)
  }

  const error = (...args) => {
    state.enable && console.error(`%c[${componentName}]`, `background-color: ${state.backgroundColor}; color: ${state.color};`, ...args)
  }

  const warn = (...args) => {
    state.enable && console.warn(`%c[${componentName}]`, `background-color: ${state.backgroundColor}; color: ${state.color};`, ...args)
  }

  const trace = () => {
    state.enable && console.log(`%c[${componentName}]`, `background-color: ${state.backgroundColor}; color: ${state.color};`, 'console.trace:')
    state.enable && console.trace()
  }

  return {
    log,
    table,
    info,
    error,
    warn,
    trace
  }
}
