import React, { Component } from 'react'
import { Link, StaticQuery, graphql } from "gatsby"
import Icon from "../general/icon"

/**
 * List of all classes
 */
export default class Main extends Component {
  state = {
      kindStringFilter: [
        "Function",
        "Class",
        "Interface"
      ]
  }

  handleCheckboxUpdate = (name, add) => {
    if(add){
      let newState = [...this.state.kindStringFilter]
      newState.push(name)
      this.setState({kindStringFilter: newState})
    }else{
      let newState = [...this.state.kindStringFilter].filter(e => e !== name)
      this.setState({kindStringFilter: newState})
    }
  }

  passesFilter = (node) => {
    return this.state.kindStringFilter.includes(node.kindString)
  }

  render () {
    return (
      <div className="filter">
        <details>
          <summary>
            <h3  style={{"display": "inline"}}>Filter</h3>
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
                  fields {
                    path
                  }
                }
              }
            }
          `}
          render={(data) => (
            <div>
              {data.allSymbol.nodes.map(node =>
              {
                if(this.passesFilter(node))
                  return (
                    <li key={node.name}>
                    <div className="sidecontainer">
                      <Icon kindString={node.kindString}/>
                      <Link to={node.fields.path}>{node.name}</Link>
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
    // this.props.handleCheckboxUpdate(this.props.text, this.state.checked)
  }

  handleCheckClick = () => {
    this.props.handleCheckboxUpdate(this.props.text, !this.state.checked)
    this.setState({ checked: !this.state.checked });
  }

  render() {
    return (
      <div>
        <input type="checkbox" checked={this.state.checked} defaultChecked={this.state.checked} onChange={this.handleCheckClick} className="filled-in" id="filled-in-box"/>
        <i className="filteritem">{this.props.text}</i>
      </div>
    );
  }
}
