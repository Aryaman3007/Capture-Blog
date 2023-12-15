import React, { useState, useEffect } from 'react'
import appwriteService from "../appwrite/configure"
import PostCard from '../components/PostCard'
import Container from '../components/container/Container'
import { PacmanLoader } from 'react-spinners'

function AllPost() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 6000)
    }, [])

    useEffect(() => { }, [])
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    }, [])

    return (
        !loading ?
            <div className='w-full py-8 px-10 '>
                <Container>
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (

                            <div key={post.$id} className='p-4 w-1/4 transform hover:scale-105 transition duration-300 hover:rounded-xl'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
            :
            <div
                style={{
                    position: 'fixed',
                    top: '25%',
                    left: '50%',
                }}
            >
                <PacmanLoader css={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100vh',
                }} size={25} color={'#36d7b7'} loading={loading} />
            </div>
    )
}

export default AllPost