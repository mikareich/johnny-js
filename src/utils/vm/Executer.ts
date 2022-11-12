import { copyFileSync } from 'fs'
import { decodeInstruction } from './encodeInstruction'
import VM from './VirtualMachine'

class Executer {
  public static counterInRam(pc: number) {
    return pc >= 0 && pc < VM.RAM_SIZE
  }

  public static isHalt(instruction: number) {
    return decodeInstruction(instruction)[0] === VM.OP_CODES.HLT
  }

  public readonly vm: VM

  constructor(vm: VM, breakpoints?: number[]) {
    this.vm = vm
  }

  runNext() {
    const { pc } = this.vm
    const instruction = this.vm.ram[pc]

    // stop if program hlt or out of ram
    if (!Executer.counterInRam(pc) || Executer.isHalt(instruction)) return

    VM.runInstruction(this.vm, instruction)

    // run next instruction
    this.runNext()
  }

  run() {
    this.runNext()
  }
}

export default Executer
