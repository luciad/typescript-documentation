import React, { Component } from 'react'
import { Link, StaticQuery, graphql } from "gatsby"
import { pathToExport } from "../../util/util"
import Icon from "../general/icon"

/**
 * List of all classes
 */
export default class Main extends Component {
  state = {
    filter: {
      kindString: [
        ""
      ]
    }
  }

  handleCheckboxUpdate = (name, add) => {
    if(add){
      this.state.filter.kindString.push(name)
    }else{
      this.state.filter.kindString = this.state.filter.kindString.filter(e => e !== name)
    }
    this.forceUpdate()
  }

  passesFilter = (node) => {
    return this.state.filter.kindString.includes(node.kindString)
  }

  render () {
    return (
      <div>
        <details>
          <summary>
            <h3 style={{"display": "inline"}}>Filter</h3>
          </summary>
          <ul className="filteroptions">
            <Checkbox text="Function" handleCheckboxUpdate={this.handleCheckboxUpdate}/>
            <Checkbox text="Interface" handleCheckboxUpdate={this.handleCheckboxUpdate}/>
            <Checkbox text="Class" handleCheckboxUpdate={this.handleCheckboxUpdate}/>
          </ul>
        </details>
        <ul className="classes">

        <StaticQuery
          query={graphql`
            query ClassQuery {
              allSymbol(sort: {fields: name}) {
                nodes {
                  kindString
                  name
                  parent {
                    ... on Module {
                      name
                    }
                  }
                }
              }
            }
          `}
          render={(
            data
          ) => (
            <div>
              {data.allSymbol.nodes.map( node =>
              {
              if(!this.passesFilter(node)) return null
              return (
                <li key={node.name}>
                <div className="sidecontainer">
                  <Icon kindString={node.kindString}/>
                  <Link to={pathToExport(node.parent, node)}>{node.name}</Link>
                </div>
                </li>
              )})}
            </div>
          )}
        />
        </ul>
      </div>
    )
  }
}

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {checked: true};
  }

  handleCheckClick = () => {
    this.props.handleCheckboxUpdate(this.props.text, !this.state.checked)
    this.setState({ checked: !this.state.checked });
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <input type="checkbox" checked={this.state.checked} defaultChecked={this.state.checked} onChange={this.handleCheckClick} className="filled-in" id="filled-in-box"/>
        <i className="filteritem">{this.props.text}</i>{String(this.state.checked)}
      </div>
    );
  }
}
