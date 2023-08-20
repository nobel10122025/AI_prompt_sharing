'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from "@components/Profile";

const MyProfile = () => {
    const [posts, setPosts] = useState('')
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        const fetchPost = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`)
          const data = await response.json()
          setPosts(data)
        }
        if (session?.user.id) fetchPost();      
    }, [session?.user.id])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want the delete the prompt?")
        if(hasConfirmed) {
            try{
                await fetch(`api/prompt/${post._id.toString()}`, {method: "DELETE"});
                const filteredPost = posts.filter((p) => p._id !== post._id)
                setPosts(filteredPost)
            } catch(error) {
                console.log("error", error)
            }
        }

    }
    return <Profile 
        name={"My"}
        desc={"Welcome to my profile section"}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        data={posts}
    />
}

export default MyProfile;