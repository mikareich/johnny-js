/* eslint-disable no-param-reassign */
import { decodeInstruction } from './encodeInstruction'
import VM from './VirtualMachine'

function microCodes(vm: VM) {
  return {
    dbToRam: () => {
      vm.ram[vm.ab] = vm.db
    },
    ramToDb: () => {
      vm.db = vm.ram[vm.ab]
    },
    dbToAcc: () => {
      vm.acc = vm.db
    },
    accToDb: () => {
      vm.db = vm.acc
    },
    dbToIr: () => {
      vm.ir = vm.db
    },
    irToAb: () => {
      const [, operand] = decodeInstruction(vm.ir)
      vm.ab = operand
    },
    irToPc: () => {
      const [, opnd] = decodeInstruction(vm.ir)
      vm.pc = opnd
    },
    pcToAb: () => {
      vm.ab = vm.pc
    },
    irToMC: () => VM.runInstruction(vm, vm.ir),
    plus: () => {
      vm.acc += vm.db
    },
    minus: () => {
      vm.acc -= vm.db
    },
    resetACC: () => {
      vm.acc = 0
    },
    incAcc: () => {
      vm.acc += 1
    },
    decAcc: () => {
      vm.acc -= 1
    },
    incPC: () => {
      vm.pc += 1
    },
    incPCIfAccZero: () => {
      if (vm.acc === 0) {
        vm.pc += 1
      }
    },
    resetIr: () => {
      vm.ir = 0
    },
  }
}

export default microCodes
