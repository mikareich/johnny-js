import React, { useContext } from 'react'
import '../css/Stats.css'
import { Context } from '../utils/Context'
import VM from '../utils/vm/VirtualMachine'

function Stats() {
  const { vm } = useContext(Context)!
  return (
    <section className="stats-section">
      <h1 className="section-title">Stats</h1>
      <div className="stats-container">
        <div className="stat">
          <span className="stat__title">Program Count (PC)</span>
          <span className="stat__value">{vm?.pc ?? 'N/A'}</span>
        </div>
        <div className="stat">
          <span className="stat__title">Instruction Register (IR)</span>
          <span className="stat__value">{vm?.ir ?? 'N/A'}</span>
        </div>

        <div className="stat">
          <span className="stat__title">Data Bus (DB)</span>
          <span className="stat__value">{vm?.db ?? 'N/A'}</span>
        </div>
        <div className="stat">
          <span className="stat__title">Address Bus (AB)</span>
          <span className="stat__value">{vm?.ab ?? 'N/A'}</span>
        </div>
        <div className="stat">
          <span className="stat__title">Accumulator (ACC)</span>
          <span className="stat__value">{vm?.acc ?? 'N/A'}</span>
        </div>
        <div className="stat">
          <span className="stat__title">Ram Size</span>
          <span className="stat__value">{VM.RAM_SIZE}</span>
        </div>
      </div>
    </section>
  )
}

export default Stats
