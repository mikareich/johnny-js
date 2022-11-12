import macroCodes from './macroCodes'
import VM, { OperatorCodes } from './VirtualMachine'

/** Splits assemlby command asm and opnd */
export function decodeInstruction(data: number): [OperatorCodes, number] {
  const opcode = Number(String(data).slice(0, -3)) as OperatorCodes
  const operand = Number(String(data).slice(-3))

  if (!Object.values(VM.OP_CODES).includes(opcode)) {
    return [VM.OP_CODES.FETCH, data]
  }

  return [opcode, operand]
}

/** Encodes opcode and operand to instruction */
export function encodeInstruction(opcode: number, operand: number) {
  return opcode * 1000 + operand
}

/** Prettify code */
export function prettifyCode(code: number, digitLength = 5): string {
  return '0'.repeat(digitLength - String(code).length) + code
}
