import '../css/CodeLine.css'
import React, { useEffect, useState, useContext } from 'react'
import compileProgram, { isComment } from '../utils/vm/compiler'
import VM, { OperatorNames } from '../utils/vm/VirtualMachine'
import { decodeInstruction, prettifyCode } from '../utils/vm/encodeInstruction'
import { ProgramLine } from '../utils/program'
import { Context } from '../utils/Context'

interface CodeLineProps {
  data: ProgramLine
}

function CodeLine({ data }: CodeLineProps) {
  const { selectedAddress, setSelectedAddress } = useContext(Context)!
  const { address, instruction, error, breakpoint, comment } = data
  const isSelected = selectedAddress === address

  const containerRef = React.createRef<HTMLDivElement>()

  const status = () => (error && '🛑') || (isSelected && '👉') || ''

  const [opcode, argument] = decodeInstruction(instruction)
  const operator =
    VM.OP_NAMES[opcode] &&
    VM.OP_NAMES[opcode] !== 'FETCH' &&
    VM.OP_NAMES[opcode]

  const selectCurrentLine = () => setSelectedAddress(address)

  const selectArgumentAsAddress = () => setSelectedAddress(argument)

  useEffect(() => {
    containerRef.current?.addEventListener('click', selectCurrentLine)

    return () => {
      containerRef.current?.removeEventListener('click', selectCurrentLine)
    }
  }, [])

  return (
    <div
      className={`code-line ${error && 'error'} ${isSelected && 'selected'}`}
      ref={containerRef}
    >
      <span className="code-line__status">{status()}</span>
      <span className="code-line__address">{prettifyCode(address, 3)}</span>
      <span className="code-line__raw">{prettifyCode(instruction)}</span>
      <span
        className={`code-line__operator 
        ${operator ? 'code-line__operator-definied' : ''}`}
      >
        {operator || 'N/A'}
      </span>
      {operator && (
        <a
          className="code-line__argument"
          onClick={selectArgumentAsAddress}
          href={`#${argument}`}
        >
          {prettifyCode(argument, 3)}
        </a>
      )}
      {(error || comment) && (
        <span className="code-line__comment">{error || comment}</span>
      )}
    </div>
  )
}

export default CodeLine
