import React, { useContext } from 'react'
import '../css/ActionBar.css'
import { Context } from '../utils/Context'
import { generatePlainProgram, syncProgram } from '../utils/program'
import Executer from '../utils/vm/Executer'
import VM from '../utils/vm/VirtualMachine'
import Button from './Button'

function ActionBar() {
  const { vm, program, overwriteRAM, setProgram } = useContext(Context)!

  const resetRAM = () => {
    setProgram(generatePlainProgram())
    vm?.reset()
  }

  const runRAM = () => {
    if (!vm) return

    vm?.reset()
    overwriteRAM()

    const executer = new Executer(vm)
    executer.run()

    setProgram(syncProgram(vm, program))
  }

  return (
    <div className="action-bar">
      <Button color="error" onClick={resetRAM}>
        Reset RAM
      </Button>
      <Button onClick={runRAM}>Run RAM</Button>
    </div>
  )
}

export default ActionBar
