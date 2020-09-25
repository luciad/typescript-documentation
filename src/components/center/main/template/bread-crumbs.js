import React, { Component } from "react"
import { Link } from "gatsby"
import { MODULE_PATH_PREFIX } from "../../../../util/util"

class BreadCrumbs extends Component {
  constructor(props){
    super(props)
    this.path = props.path
  }
  render(){
    const splitPath = this.path.replace(/^\/+/, '').split("/") //this.path.replace(MODULE_PATH_PREFIX + "/","").split("/")
    const splitLink = []
    for(let i = 0; i < splitPath.length; i++){
      splitLink[i] = "/" + splitPath.slice(0, i +1).join("/")
    }
    splitPath[0] = "/"
    splitLink[0] = "/"
    return(
      <div className="breadcrumbs sidecontainer">
        {splitPath.map((path, i) =>
        <div key={path + "_" + splitLink[i]}>
        {i > 0 && <>&nbsp;{">"}&nbsp;</>}
        {i == splitPath.length - 1 &&
          <div className="currentPath inline-block">{path}</div>
        ||
          <Link to={splitLink[i]}>{path}</Link>}
        </div>)}
      </div>
    )
  }
}

export default BreadCrumbs