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
  const [searchText, setSearchText] = useState('')
  const [post, setPost] = useState([])

  const handleSearchChange = (e) => {

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
          placeHolder="Search for a tag"
          onChange={handleSearchChange}
          required
          className="peer search_input"
        />
      </form>
      <PromptCardList
        data={post}
        handleTagClick={() => { }}
      />
    </section>
  )
}

export default Feed