import React from "react"
import renderer from "react-test-renderer"

import Header from "../components/general/header"

describe("Header", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Header siteTitle="test" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})