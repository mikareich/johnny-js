import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react'
import compileProgram, { isComment } from './vm/compiler'
import { prettifyCode } from './vm/encodeInstruction'
import VM from './vm/VirtualMachine'

export interface CodeLine {
  address: number
  content: string
  instruction: number
  error?: string
  breakpoint: boolean
  comment?: string
}

export interface Program {
  [address: number]: CodeLine
}

export interface ContextInterface {
  vm: VM | null
  setVM: React.Dispatch<React.SetStateAction<VM | null>>
  overwriteRAM: () => void

  program: Program
  setProgram: React.Dispatch<React.SetStateAction<Program>>
  syncProgram: () => void

  selectedAddress: number
  setSelectedAddress: React.Dispatch<React.SetStateAction<number>>
}

export const generatePlainProgram = (): Program =>
  new Array(VM.RAM_SIZE).fill(0).map((content, address) => ({
    address,
    content: '0',
    instruction: 0,
    breakpoint: false,
  }))

const Context = createContext<ContextInterface | null>(null)

function ContextProvider({ children }: PropsWithChildren<{}>) {
  const [vm, setVM] = useState<VM | null>(null)
  const [program, setProgram] = useState<Program>(generatePlainProgram())
  const [selectedAddress, setSelectedAddress] = useState(0)

  const programAsString = () =>
    Object.values(program)
      .map((line) => line.content)
      .join('\n')

  const overwriteRAM = () => {
    if (vm) {
      const programRAM = compileProgram(programAsString(), true)
      vm.ram = programRAM
    }
  }

  const syncProgram = () => {
    vm?.ram.forEach((ramIns, address) => {
      if (program[address].instruction !== ramIns) {
        program[address] = {
          ...program[address],
          instruction: ramIns,
          content: ramIns.toString(),
        }
      }
    })

    setProgram({ ...program })
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
