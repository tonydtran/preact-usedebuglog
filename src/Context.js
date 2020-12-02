import { h, createContext } from 'preact'

export const DebugLogContext = createContext()

const DebugLogProvider = ({ dev = false, children }) => {
  return (
    <DebugLogContext.Provider value={{ dev }}>
      {children}
    </DebugLogContext.Provider>
  )
}

export default DebugLogProvider
