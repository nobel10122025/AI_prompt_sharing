'use client'

import { useState, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Profile from "@components/Profile";

const UserProfile = () => {
    const params = useSearchParams()
    const searchParams = usePathname()
    const userName = params.get("name");
    const [posts, setPosts] = useState('')

    useEffect(() => {
        const id = searchParams.split("/")
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${id[2]}/posts`);
          const data = await response.json();
          setPosts(data);
        };
    
        if (id[2]) fetchPosts();
      }, [searchParams]);
    

    return <Profile
        name={userName}
        desc={`Welcome to ${userName} profile section`}
        data={posts}
    />
}

export default UserProfile;