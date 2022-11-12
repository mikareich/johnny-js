import { decodeInstruction, encodeInstruction } from './encodeInstruction'
import VM, { OperatorNames } from './VirtualMachine'

export function isComment(line: string): boolean {
  return line.trim().startsWith(VM.COMMENT_CHARACTER)
}

export function addressInRange(address: number): boolean {
  return address >= 0 && address < VM.RAM_SIZE
}

/** converts program string into readable ram object
 * @param program program string
 * @example
 * const programStr = `
 * # this is a comment
 * tst 10
 * jmp 3
 *
 * jmp 5
 * `;
 */
// TODO: Better error feedback
function compileProgram(program: string, ignoreErrors?: boolean): number[] {
  const ram: number[] = new Array(VM.RAM_SIZE).fill(0)
  const lines = program.split('\n')
  let address = 0 // updates after valid instruction

  // compile lines
  lines.forEach((line, index) => {
    // skip first and last line if empty
    if (line.trim() === '' && (index === 0 || index === lines.length)) return

    // return null if line is comment
    if (isComment(line)) {
      ram[address] = 0
      address += 1
      return
    }

    const lineElements = line.trim().split(' ')

    const [firstElement, secondElement] = lineElements

    const firstValueAsNumber = Number(firstElement)
    const firstValueAsOPCode: number | undefined =
      VM.OP_CODES[firstElement as OperatorNames] ||
      VM.OP_CODES[firstElement.toUpperCase() as OperatorNames]
    const firstValueAsAddress = addressInRange(firstValueAsNumber)
      ? firstValueAsNumber
      : undefined

    const secondValueAsNumber = Number(secondElement)
    const secondValueAsAddress = addressInRange(secondValueAsNumber)
      ? secondValueAsNumber
      : undefined

    // if opcode and value
    if (firstValueAsOPCode && secondValueAsAddress) {
      ram[address] = encodeInstruction(firstValueAsOPCode, secondValueAsAddress)
      address += 1
      return
    }

    // if first element is a opcode
    if (firstValueAsOPCode && !secondValueAsNumber) {
      ram[address] = encodeInstruction(firstValueAsOPCode, 0)
      address += 1
      return
    }

    // if first element is a valid number
    if (firstValueAsAddress || firstValueAsNumber < VM.MAX_NUMERIC_VALUE) {
      ram[address] = firstValueAsNumber
      address += 1
      return
    }

    // if first element is a valid combination of opcode and value
    const decodedFirstElement = decodeInstruction(firstValueAsNumber)
    const firstValueAsOPCodeAndValue =
      decodedFirstElement[0] >= 0 &&
      decodedFirstElement[0] <= 10 &&
      addressInRange(decodedFirstElement[1])

    if (firstValueAsOPCodeAndValue) {
      ram[address] = firstValueAsNumber
      address += 1
      return
    }

    // line is invalid
    if (!ignoreErrors) {
      throw new Error(`Invalid line at address ${index}: ${line}`)
    }

    ram[address] = 0
    address += 1
  })

  return ram
}

export default compileProgram
