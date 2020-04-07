import React from "react"
import Summary from "./summary"

export default () => {
  return (
    <div>
    <dir> @this/is/the/package/and/module</dir>
  <dir>$filePath$</dir>
  <h1>$itemName$</h1>
  <h5>$type$</h5>
  <ul className="hierarchy">
    <li>Hierarchy 1
      <ul className="hierarchy">
        <li>Hierarchy 2
          <ul className="hierarchy">
            <li>Hierarchy 3</li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
  <p>$superRelevantItems$</p>
  <hr/>
  <p>$itemDescription$</p>
  <h2>Overview</h2>
  <div className="overview">
    <Summary title="Variables"/>
    <Summary title="Accessors"/>
    <Summary title="Methods"/>
    <Summary title="Interfaces"/>
    <Summary title="Classes"/>
    <Summary title="Enums"/>
  </div>
  <hr/>
  $allConstructorsInDepth$
  $allAccessorsInDepth$    
  $allMethodsInDepth$
  $allEnumsInDepth$
  </div>
  )
}