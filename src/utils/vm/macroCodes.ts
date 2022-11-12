import VM from './VirtualMachine'

function macroCodes(vm: VM) {
  return {
    [VM.OP_CODES.FETCH]: () => {
      vm.microCodes.pcToAb()
      vm.microCodes.ramToDb()
      vm.microCodes.dbToIr()
      // vm.microCodes.irToMC();
      vm.microCodes.incPC()
    },
    [VM.OP_CODES.TAKE]: () => {
      vm.microCodes.resetACC()
      vm.microCodes.irToAb()
      vm.microCodes.ramToDb()
      vm.microCodes.plus()
      vm.microCodes.incPC()
    },
    [VM.OP_CODES.ADD]: () => {
      vm.microCodes.irToAb()
      vm.microCodes.ramToDb()
      vm.microCodes.plus()
      vm.microCodes.incPC()
    },
    [VM.OP_CODES.SUB]: () => {
      vm.microCodes.irToAb()
      vm.microCodes.ramToDb()
      vm.microCodes.minus()
      vm.microCodes.incPC()
    },
    [VM.OP_CODES.SAVE]: () => {
      vm.microCodes.irToAb()
      vm.microCodes.accToDb()
      vm.microCodes.dbToRam()
      vm.microCodes.incPC()
      vm.microCodes.resetIr()
    },
    [VM.OP_CODES.JMP]: () => {
      vm.microCodes.irToPc()
      vm.microCodes.resetIr()
    },
    [VM.OP_CODES.TST]: () => {
      vm.microCodes.irToAb()
      vm.microCodes.ramToDb()
      vm.microCodes.dbToAcc()
      vm.microCodes.incPCIfAccZero()
      vm.microCodes.incPC()
      vm.microCodes.resetIr()
    },
    [VM.OP_CODES.INC]: () => {
      vm.microCodes.resetACC()
      vm.microCodes.irToAb()
      vm.microCodes.ramToDb()
      vm.microCodes.plus()
      vm.microCodes.incAcc()
      vm.microCodes.accToDb()
      vm.microCodes.dbToRam()
      vm.microCodes.incPC()
      vm.microCodes.resetIr()
    },
    [VM.OP_CODES.DEC]: () => {
      vm.microCodes.resetACC()
      vm.microCodes.irToAb()
      vm.microCodes.ramToDb()
      vm.microCodes.plus()
      vm.microCodes.decAcc()
      vm.microCodes.accToDb()
      vm.microCodes.dbToRam()
      vm.microCodes.incPC()
      vm.microCodes.resetIr()
    },
    [VM.OP_CODES.NULL]: () => {
      vm.microCodes.irToAb()
      vm.microCodes.ramToDb()
      vm.microCodes.incPC()
      vm.microCodes.resetIr()
    },
    [VM.OP_CODES.HLT]: () => {
      vm.microCodes.incPC()
      vm.microCodes.resetIr()
    },
  }
}

export default macroCodes
