import React, { useContext, useEffect, useState } from 'react'
import '../css/NavBar.css'
import { Context } from '../utils/Context'
import { Program } from '../utils/program'
import Button from './Button'

function NavBar() {
  const { program, setProgram } = useContext(Context)!

  const loadProgram = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'

    input.addEventListener('change', (inputEvent) => {
      const file = (inputEvent.target as HTMLInputElement).files![0]
      const reader = new FileReader()
      reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
        const raw = readerEvent.target!.result as string
        const loadedProgram = JSON.parse(raw) as Program
        setProgram(loadedProgram)
      }
      reader.readAsText(file)
    })

    input.click()
  }

  const saveProgram = () => {
    const blob = new Blob([JSON.stringify(program)], { type: 'text/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'program.json'
    a.click()
  }

  return (
    <nav className="navbar">
      <span className="navbar__item-title">⚡️ Johnny JS ⚡️</span>
      <span className="navbar__item">
        <Button asLink onClick={loadProgram}>
          📂 Load Code
        </Button>
      </span>
      <span className="navbar__item">
        <Button asLink onClick={saveProgram}>
          ✍️ Save Code
        </Button>
      </span>
      <span className="navbar__item">
        <a href="https://github.com/mikareich/johnny-js">mikareich</a>
      </span>
    </nav>
  )
}

export default NavBar
