import React, { useContext, useState, useEffect } from 'react'
import '../css/Terminal.css'
import { CodeLine as ICodeLine, Context } from '../utils/Context'
import compileProgram from '../utils/vm/compiler'
import VM from '../utils/vm/VirtualMachine'
import CodeLine from './CodeLine'

function Terminal() {
  const { selectedAddress, program } = useContext(Context)!

  const refs: React.RefObject<HTMLLIElement>[] = Object.values(program).reduce(
    (acc, value) => {
      acc[value.address] = React.createRef()
      return acc
    },
    {}
  )

  useEffect(() => {
    // scroll to selected line
    const selectedLine = refs[selectedAddress]
    selectedLine.current?.scrollIntoView({
      block: 'center',
    })

    // save as hash in url
    window.location.hash = selectedAddress.toString()
  }, [selectedAddress])

  return (
    <section>
      <h1>Memory</h1>
      <div className="code-line">
        <span className="code-line__status">⚡️</span>
        <span className="code-line__address">ADR</span>
        <span className="code-line__raw">RAW</span>
        <span className="code-line__operator code-line__operator-definied">
          ENCODED
        </span>
      </div>
      <div className="terminal-outer">
        <ol className="terminal">
          {Object.values(program).map((line, address) => (
            <li
              ref={refs[address]}
              className="terminal__program__line"
              key={line.address.toString()}
            >
              <CodeLine data={line} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Terminal
