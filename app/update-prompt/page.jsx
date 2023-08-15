'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'

const EditPrompt = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')
    const { data: session } = useSession()
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })
    const getPromptDetails = async () => {
        const response = await fetch(`api/prompt/${promptId}`)
        const data = await response.json()
        setPost({prompt: data.prompt, tag: data.tag})
    }

    useEffect(() => {
        if(promptId) getPromptDetails()
    },[promptId])

    const updatePrompt = async (event) => {
        event.preventDefault()
        setSubmitting(true)
        
        if(!promptId) alert('Prompt Id not found!!!')

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    userId: session?.user.id
                })
            })
            if (response.ok) router.push('/')
        } catch (error) {
            console.log("error", error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt