import React from "react"
import Header from "../components/general/header"
import MainPage from "../components/center/main/main-page"
import PageLayout from "../components/page-layout"

export default () => {
  return (
    <>
      <Header siteTitle="Home"/>
      <PageLayout>
        <MainPage/>
      </PageLayout>
    </>
  )
}
