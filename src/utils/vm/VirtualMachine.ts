import { decodeInstruction } from './encodeInstruction'
import macroCodes from './macroCodes'
import microCodes from './microCodes'

const OP_NAMES = [
  'FETCH',
  'TAKE',
  'ADD',
  'SUB',
  'SAVE',
  'JMP',
  'TST',
  'INC',
  'DEC',
  'NULL',
  'HLT',
] as const

export type OperatorNames = typeof OP_NAMES[number]

const OP_CODES = {
  FETCH: 0,
  TAKE: 1,
  ADD: 2,
  SUB: 3,
  SAVE: 4,
  JMP: 5,
  TST: 6,
  INC: 7,
  DEC: 8,
  NULL: 9,
  HLT: 10,
} as const

export type OperatorCodes = typeof OP_CODES[OperatorNames]

class VM {
  /** Max. numeric value the vm can handle */
  public static MAX_NUMERIC_VALUE = 20000

  /** Comment syntax character */
  public static COMMENT_CHARACTER = ';'

  /** operator names for macro */
  public static OP_NAMES: typeof OP_NAMES = OP_NAMES

  /** operator codes for macro */
  public static OP_CODES: {
    [key in OperatorNames]: OperatorCodes
  } = OP_CODES

  /** Slots of the ram */
  public static RAM_SIZE = 999

  /** Runs given instruction */
  public static runInstruction(vm: VM, instruction: number) {
    const [opcode] = decodeInstruction(instruction)
    vm.ir = instruction
    vm.macroCodes[opcode]()
  }

  /** init macro codes */
  public macroCodes: ReturnType<typeof macroCodes>

  /** init micro codes */
  public microCodes: ReturnType<typeof microCodes>

  /** Programm counter */
  public pc: number = 0

  /** Instruction register */
  public ir: number = 0

  /** Accumulator */
  public acc: number = 0

  /** Busses */
  public db: number = 0

  public ab: number = 0

  /** Memory */
  public ram: number[] = new Array(VM.RAM_SIZE).fill(0)

  /** Init vm */
  constructor() {
    this.microCodes = microCodes(this)
    this.macroCodes = macroCodes(this)
  }

  /** Resets vm */
  reset() {
    this.pc = 0
    this.ir = 0
    this.acc = 0
    this.db = 0
    this.ab = 0
    this.ram = new Array(VM.RAM_SIZE).fill(0)
  }

  fillRam(ram: number[]) {
    ram.forEach((instruction, index) => {
      this.ram[index] = instruction
    })
  }
}

export default VM
