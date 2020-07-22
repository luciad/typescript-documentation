import React from 'react'
import LegendItem from "./legend-item"

export default () => {
  return (
    <div className="right-sidebar">
    <h3>Legend</h3>
    <ul className="legend">
      <LegendItem type="Flag"/>
      <LegendItem type="External module"/>
      <LegendItem type="Class"/>
      <LegendItem type="Interface"/>
      <LegendItem type="Constructor"/>
      <LegendItem type="Accessor"/>
      <LegendItem type="Method"/>
      <LegendItem type="Property"/>
      <LegendItem type="Function"/>
      <LegendItem type="Enumeration"/>
      <LegendItem type="Enumeration member"/>
      <LegendItem type="Event"/>
    </ul>
  </div>
  )
}
