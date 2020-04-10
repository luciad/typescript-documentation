import { useFlexSearch } from 'react-use-flexsearch'

export default () => {

const data = useStaticQuery(graphql`
    query {
      localSearchPages {
        index
        store
      }
    }
  `)
  const { index, store } = data.localSearchPages
  const [query, setQuery] = useState("")
  const results = useFlexSearch(query, index, store)

  const resultRenderer = ({ title }) => {
    const rest = title.substring(query.length)

    return [
      <div key={title} className="content">
        <div className="title">
          {query}
          <b>{rest}</b>
        </div>
      </div>,
    ]
  }


  return (
    <>
      <InputSearch
        resultRenderer={resultRenderer}
        results={results}
        value={query}
        onSearchChange={(e, { value }) => {
          setQuery(value)
        }}
        onResultSelect={(e, { result }) => {
          setQuery(result.title)
        }}
      />
    </>
  )
}
