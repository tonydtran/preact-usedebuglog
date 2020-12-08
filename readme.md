# preact-usedebuglog

[![react-usedebuglog.png](https://i.postimg.cc/VLpM10wN/react-usedebuglog.png)](https://postimg.cc/svP14XvF)

## Get Started
```
yarn add preact-usedebuglog
```
## Usage
First, import `DebugLogProvider` in your app root:
```
// index.js

import { h, render } from 'preact'
import App from './App'
import DebugLogProvider 'preact-usedebuglog'

render(
  <DebugLogProvider dev={process.ENV.NODE_ENV === 'development'}>
    <App />
  </DebugLogProvider>,
  document.getElementById('root')
)
```

Then, import `useDebugLog` in your component:
```
// App.js

import { useDebugLog } from 'preact-usedebuglog'

function App() {
  const c = useDebugLog('App')
  c.log('Hello, World')

  return (
    <div>
      ...
    </div>
  )
}
```

## References
### `DebugLogProvider` props:
- `dev`: Boolean, required. Set as `true` to enable logs by default in your components. Default: `false`.

### `useDebugLog` arguments:
```
const c = useDebugLog(<componentName>, <colors>, <enable>)
```
- `componentName`: String, required. Your current component name. Ex: 'MyComponent'.
- `colors`: Object, optional. Customize label color and background color. By default, `{ color: 'inherit', backgroundColor: 'blue'}`.
- `enable`: Boolean, optional. Enable logs within current component. By default, if `enable` has no value, it will take `dev` props value from `DebugLogProvider`, otherwise `enable` will locally override `dev` value.

Examples
```
const c = useDebugLog('MyComponent')
const c = useDebugLog('MyComponent', false)
const c = useDebugLog('MyComponent', { color: 'white', backgroundColor: 'gray' })
const c = useDebugLog('MyComponent', { color: '#32a852', backgroundColor: '#000000' }, true)
const c = useDebugLog('MyComponent', { color: '#32a852' }) // backgroundColor will be 'blue' by default
const c = useDebugLog('MyComponent', { backgroundColor: 'orange' }) // color will be 'inherit' by default
```

### `useDebugLog` methods:
preact-usedebuglog provides those `console` Javascript methods:
- log
- table
- info
- error
- warn
- trace

Examples
```
c.log('Hello, World')
c.table({ a: 'Hello', b: 'World' })
```
Please refer to `console` documentation if needed https://developer.mozilla.org/en-US/docs/Web/API/Console

### Command
Can by useful in production environment. Assuming you've disabled logs within the entire app by setting `dev` as `false` or you've locally disabled by doing `const c = useDebugLog('MyComponent', false)`, you can manually enable logs in a mounted component directly from your web browser console:
```
useDebugLog.<componentName>(<enable>)

Example:
useDebugLog.MyComponent(true)   // To enable logs within this component
useDebugLog.MyComponent(false)  // To disable logs within this component
```
- `enable`: Boolean, `true` by default.
