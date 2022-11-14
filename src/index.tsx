import './css/variables.css'
import './css/index.css'

import React, { useContext, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import VM from './utils/vm/VirtualMachine'
import { Context, ContextProvider } from './utils/Context'
import ActionBar from './components/ActionBar'
import NavBar from './components/NavBar'
import NewInstruction from './components/NewInstruction'
import Stats from './components/Stats'
import Terminal from './components/Terminal'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

function App() {
  const { setVM, setSelectedAddress, program } = useContext(Context)!

  useEffect(() => {
    // set up the VM
    const vm = new VM()
    setVM(vm)

    // load current line from url hash if present
    const { hash } = window.location

    if (hash) {
      const address = Number(hash.slice(1))
      setSelectedAddress(address)
    }
  }, [])

  return (
    <div className="App">
      <NavBar />
      <Terminal />
      <Stats />
      <NewInstruction />
      <ActionBar />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
