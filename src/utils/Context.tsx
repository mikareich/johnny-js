import React, {
  createContext,
  PropsWithChildren,
  useMemo,
  useState,
} from 'react'
import useProgram, { Program, programAsString, syncProgram } from './program'
import compileProgram, { isComment } from './vm/compiler'
import VM from './vm/VirtualMachine'

export interface ContextInterface {
  vm: VM | null
  setVM: React.Dispatch<React.SetStateAction<VM | null>>
  overwriteRAM: () => void

  program: Program
  setProgram: React.Dispatch<React.SetStateAction<Program>>

  selectedAddress: number
  setSelectedAddress: React.Dispatch<React.SetStateAction<number>>
}

const Context = createContext<ContextInterface | null>(null)

function ContextProvider({ children }: PropsWithChildren<{}>) {
  const [vm, setVM] = useState<VM | null>(null)
  const [program, setProgram] = useProgram()
  const [selectedAddress, setSelectedAddress] = useState(0)

  const overwriteRAM = () => {
    if (vm) {
      const programRAM = compileProgram(programAsString(program), true)
      vm.ram = programRAM
    }
  }

  const contextMemo = useMemo(
    () => ({
      vm,
      setVM,
      program,
      setProgram,
      selectedAddress,
      setSelectedAddress,
      syncProgram,
      overwriteRAM,
    }),
    [vm, setVM, program, setProgram, selectedAddress, setSelectedAddress]
  )
  return <Context.Provider value={contextMemo}>{children}</Context.Provider>
}
export { Context, ContextProvider }
