import { useState } from 'react'
import VM from './vm/VirtualMachine'

export interface ProgramLine {
  address: number
  content: string
  instruction: number
  error?: string
  breakpoint: boolean
  comment?: string
}

export interface Program {
  [address: number]: ProgramLine
}

/** Updates program based on vm */
export const syncProgram = (vm: VM, program: Program) => {
  vm.ram.forEach((ramIns, address) => {
    if (program[address].instruction !== ramIns) {
      program[address] = {
        ...program[address],
        instruction: ramIns,
        content: ramIns.toString(),
      }
    }
  })

  return { ...program }
}

/** Generates new empty program */
export const generatePlainProgram = (): Program =>
  new Array(VM.RAM_SIZE).fill(0).map((content, address) => ({
    address,
    content: '0',
    instruction: 0,
    breakpoint: false,
  }))

/** Returns program as string */
export const programAsString = (program: Program) =>
  Object.values(program)
    .map((line) => line.content)
    .join('\n')

/** Program hook */
function useProgram() {
  const [program, setProgram] = useState<Program>(generatePlainProgram())

  return [program, setProgram] as const
}

export default useProgram
