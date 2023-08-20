'use client'
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data && data.map((post) => {
        return (
          <PromptCard
            post={post}
            handleTagClick={handleTagClick}
          />
        )
      })}
    </div>
  )
}

function Feed() {
  const [post, setPost] = useState([])

  // Search states
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [finalResults, setFinalResults] = useState([]);

  const getFilteredData = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    const filteredData = post.filter((currentPost) => 
      regex.test(currentPost.prompt) || 
      regex.test(currentPost.tag) || 
      regex.test(currentPost.creator.username))
      return filteredData
    }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)
    setSearchTimeout(setTimeout(() => {
      const searchData = getFilteredData(e.target.value)
      setFinalResults(searchData)
    }, 500))
  }

  const handleTagClick = (tag) => {
    setSearchText(tag)
    const searchData = getFilteredData(tag)
    setFinalResults(searchData)
  }

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPost(data)
    }
    fetchPost()
  }, [])


  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          value={searchText}
          type="text"
          placeholder="Search for a tag"
          onChange={handleSearchChange}
          required
          className="peer search_input"
        />
      </form>
      {searchText === "" ? <PromptCardList
        data={post}
        handleTagClick={handleTagClick}
      /> : <PromptCardList
        data={finalResults}
        handleTagClick={handleTagClick}
      />}
    </section>
  )
}

export default Feed