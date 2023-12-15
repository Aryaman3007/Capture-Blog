import React from 'react'
import appwriteService from "../appwrite/configure"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, image }) {
  return (
    <>
      <Link to={`/post/${$id}`}>
        <div className="group h-72 w-80 [perspective:1000px]">
          <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            <div className="absolute inset-0">
              <div className='justify-center'>
                <img src={appwriteService.getFilePreview(image)} alt={title} className='rounded-tl-lg rounded-tr-lg w-full h-60' />
              </div>
              <h2 className='text-xl font-bold text-center py-2 text-slate-900'>{title}</h2>
            </div>
            <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <div className="flex min-h-full flex-col items-center justify-center">
                <h1 className="text-3xl font-bold">Author</h1>
                <p className="text-lg">Author_name</p>
                <button className="mt-2 rounded-md bg-yellow-800 py-1 px-2 text-sm hover:bg-neutral-900">Read More</button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default PostCard

