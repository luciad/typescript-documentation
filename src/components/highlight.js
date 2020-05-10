import Prism from 'prismjs'
import { useEffect } from "react"

export default () => {
  useEffect(() => {
    // call the highlightAll() function to style our code blocks
    Prism.highlightAll()
  })
  return null;
}