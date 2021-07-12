import React from 'react'
import { gql, useApolloClient } from '@apollo/client'
import 'antd/dist/antd.css'
import debounce from 'lodash.debounce'
import { Select } from 'antd'

const Complete = () => {
  const client = useApolloClient()
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [renderContent, setRenderContent] = React.useState(false)
  const [content, setContent] = React.useState('')
  const handleSearch = async (term) => {
    const { data, loading, error } = await client.query({
      query: gql`
    query SearchQuery {
       posts(where: {search:"${term}"}) {
         nodes {
           title
           content
         }
       }
     }
   `,
    })
    setData(data)
    setLoading(loading)
    setError(error)
  }
  const { Option } = Select
  const debouncedSearcher = React.useMemo(() => debounce(handleSearch, 300), [])
  const posts = data?.posts?.nodes ?? []

  const renderPostTitle = () => {
    if (posts) {
      const children = posts.map((post, index) => (
        <Option key={index + post.title} value={post.content}>
          {post.title}
        </Option>
      ))

      return children
    }
  }

  const renderContentFn = () => {
    if (content) {
      return content.replace(/<\/?[^>]+(>|$)/g, '')
    }
  }

  const handleSelect = (content) => {
    setContent(content)
    setRenderContent(true)
  }

  if (error) {
    return <div>sth went wrong...</div>
  }
  return (
    <>
      <Select
        showSearch
        style={{ width: '100%' }}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        allowClear
        autoFocus
        onSearch={debouncedSearcher}
        onSelect={(value) => handleSelect(value)}
      >
        {renderPostTitle()}
      </Select>
      {renderContent && renderContentFn()}
    </>
  )
}

export default Complete
