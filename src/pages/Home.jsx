import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/configure"
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className="flex flex-wrap justify-center items-center font-bold text-2xl">
                        <h1>LOGIN TO READ POSTS</h1>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div className="p-2 w-1/4" key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home