import React from "react"
import MainPage from "../components/main-page"
import PageLayout from "../components/page-layout"

export default () => {
  return (
    <PageLayout>
      <h1>404 - Page not found</h1>
      <br/>
      <p>Looks like the page you're looking for does not exist!</p>
      <br/>
      <a href="/overview">Go back to overview</a>
    </PageLayout>
  )
}