import React from 'react'
import LegendItem from "./legend-item"

export default () => {
  return (
    <div className="rightsidenav">
    <h3>Legend</h3>
    <ul className="legend">
      <LegendItem type="Class"/>
      <LegendItem type="Interface"/>
      <LegendItem type="Method"/>
      <LegendItem type="Accessor"/>
      <LegendItem type="Constructor"/>
    </ul>
  </div>
  )
}
