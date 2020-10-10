import React from "react"
import PageLayout from "../components/page-layout"
import Header from "../components/template/general/header"

export default () => {
  return (
    <>
      <Header siteTitle="404"/>
      <PageLayout>
        <h1>404 - Page not found</h1>
        <br/>
        <p>Looks like the page you're looking for does not exist!</p>
        <br/>
        <a href="/overview">Go back to overview</a>
      </PageLayout>
    </>
  )
}