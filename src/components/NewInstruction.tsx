import React, { useContext, useState, useEffect } from 'react'
import '../css/NewInstruction.css'
import { Context } from '../utils/Context'
import compileProgram, { addressInRange, isComment } from '../utils/vm/compiler'
import { prettifyCode } from '../utils/vm/encodeInstruction'

function NewInstruction() {
  const { program, setProgram, setSelectedAddress, selectedAddress } =
    useContext(Context)!
  const [content, setContent] = useState('000')

  const updateAddress = (newAddress: number) => {
    if (!addressInRange(newAddress)) return
    setSelectedAddress(newAddress)
  }

  const updateProgram = () => {
    let instruction
    let error

    try {
      ;[instruction] = compileProgram(content)
    } catch (e) {
      error = (e as Error).message
      ;[instruction] = compileProgram(content, true)
    }

    program[selectedAddress] = {
      address: selectedAddress,
      content,
      instruction,
      error,
      breakpoint: false,
      comment: isComment(content) ? content : undefined,
    }

    setProgram({ ...program })
  }

  useEffect(updateProgram, [content])
  useEffect(() => {
    setContent(program[selectedAddress].content)
  }, [selectedAddress])

  return (
    <div className="newInstruction">
      <p>Enter a new instruction:</p>
      <form className="instruction-form">
        <input
          type="text"
          className="instruction-form__address"
          placeholder="Address"
          value={prettifyCode(selectedAddress, 3)}
          onChange={(e) => updateAddress(Number(e.target.value))}
        />
        <input
          type="text"
          className="instruction-form__content"
          placeholder="Instruction"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </form>
    </div>
  )
}

export default NewInstruction
