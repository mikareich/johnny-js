import Executer from '../Executer'
import VM from '../VirtualMachine'

const createVM = (ram: number[]) => {
  const vm = new VM()
  vm.fillRam(ram)
  return vm
}

// calculation commands: add, sub, inc, dec
// program commands: jmp, hlt, take, fetch
// test commands: tst

describe('Executes calculation commands', () => {
  test('Executes add command', () => {
    const vm = createVM([1003, 2004, 4005, 5, 11]) // 5 + 11 @[5]

    const executer = new Executer(vm)
    executer.run()

    expect(vm.ram[5]).toBe(16)
  })
  test('Executes sub command', () => {
    const vm = createVM([1003, 3004, 4005, 16, 5]) // 16 - 5 @[5]

    const executer = new Executer(vm)
    executer.run()

    expect(vm.ram[5]).toBe(11)
  })

  test('Executes inc command', () => {
    const vm = createVM([7001]) // +1 @[1]

    const executer = new Executer(vm)
    executer.run()

    expect(vm.ram[1]).toBe(1)
  })

  test('Executes dec command', () => {
    const vm = createVM([8001, 2]) // 2 - 1 @[1]

    const executer = new Executer(vm)
    executer.run()

    expect(vm.ram[1]).toBe(1)
  })
})

describe('Executes program/test commands', () => {
  test('Executes take command', () => {
    const vm = createVM([1001, 10]) // acc = 10

    const executer = new Executer(vm)
    executer.run()

    expect(vm.acc).toBe(10)
  })

  test('Executes jmp command', () => {
    const vm = createVM([5002, 10000, 7003]) // inc @[2] if success

    const executer = new Executer(vm)
    executer.run()

    expect(vm.ram[3]).toBe(1)
  })

  test('Halts program', () => {
    const vm = createVM([1, 2, 3, 4, 10000])

    const executer = new Executer(vm)
    executer.run()

    expect(vm.pc).toBe(4)
  })
})
