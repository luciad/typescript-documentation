import React from "react"
import DirectoryTree from "./directory-tree"

export default ({data}) => {
  return (
    <DirectoryTree directories={data}></DirectoryTree>
  )
}