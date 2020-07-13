import React, { Component } from 'react'
import { Link, StaticQuery, graphql } from "gatsby"
import Icon from "../general/icon"

export default class Main extends Component {
  kindStringFilterDefaultOn = [
    "Function",
    "Class",
    "Interface"
  ]
  kindStringFilterDefaultOff = [
    "Method",
    "Enumeration",
    "Constructor",
    "Accessor",
    "Property",
    "Enumeration member",
    "Event"
  ]

  state = {
      kindStringFilter: [...this.kindStringFilterDefaultOn],
      pathFilter: ""
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

  handleTextUpdate = (e) => {
    this.setState({pathFilter: e})
  }

  passesFilter = (node) => {
    return this.state.kindStringFilter.includes(node.kindString) && node.fields.path.toLowerCase().includes(this.state.pathFilter.toLowerCase())
  }

  render () {
    return (
      <div className="filter">
        <details>
          <summary>
            <h3  style={{"display": "inline"}}>Filter</h3>
          </summary>
          <div className="expanded">
            <details>
              <summary>
                Selection
              </summary>
            <ul className="filteroptions">
              {this.kindStringFilterDefaultOn.map(item => {
                return(
                  <Checkbox text={item} handleCheckboxUpdate={this.handleCheckboxUpdate} defaultChecked={true}/>
                  )
                })}
              {this.kindStringFilterDefaultOff.map(item => {
                return(
                  <Checkbox text={item} handleCheckboxUpdate={this.handleCheckboxUpdate} defaultChecked={false}/>
                  )
                })}
            </ul>
            </details>
            <TextInput handleTextUpdate={this.handleTextUpdate}/>
          </div>
        </details>
        <ul className="classes">

        <StaticQuery
          query={graphql`
            query ClassQuery {
              allSymbol(sort: {fields: name}) {
                nodes {
                  kindString
                  name
                  id
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
                if(!this.passesFilter(node)) return null
                  return (
                    <li key={node.id + "_filterlist_entry"}>
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
    this.state = {checked: props.defaultChecked};
  }

  handleCheckClick = () => {
    this.props.handleCheckboxUpdate(this.props.text, !this.state.checked)
    this.setState({ checked: !this.state.checked });
  }

  render() {
    return (
      <li key={this.props.text + "_checkbox_entry"}>
        <input type="checkbox" defaultChecked={this.state.checked} onChange={this.handleCheckClick} id={this.props.text + "_checkbox"}/>
        <i className="filteritem">{this.props.text}</i>
      </li>
    );
  }
}

class TextInput extends Component {
  handleTextUpdate = (e) => {
    this.props.handleTextUpdate(e.target.value)
  }

  render() {
    return (
      <div className="pathfilter">
      <small>Path includes:</small>
        <input type="text" onChange={this.handleTextUpdate} id="filter-path-textinput"/>
      </div>
    );
  }
}
