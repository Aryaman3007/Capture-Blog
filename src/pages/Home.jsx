import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/configure"
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'
import PacmanLoader from 'react-spinners/PacmanLoader'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 6000)
    }, [])

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
                    <div className="flex flex-wrap justify-center items-center font-bold text-2xl text-slate-900">
                        <h1>LOGIN TO READ POSTS</h1>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        !loading ?
            <div className='w-full py-8 px-10 '>
                <Container>
                    <div className='px-8 font-semibold text-3xl mb-2 font-poppins flex items-center text-slate-900'>
                        <span className='mr-2 '>Top Posts of the week</span><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg>
                    </div>
                    <div className="flex flex-wrap">
                        {posts.slice(-4).map((post) => (
                            <div className="p-4 w-1/4 transform hover:scale-105 transition duration-300 hover:rounded-xl" key={post.$id}>
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
    );
}

export default Home