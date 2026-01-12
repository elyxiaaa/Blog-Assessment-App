import React, { useEffect, useState, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

const CreateBlog: React.FC = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState('') 
  const titleRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  const user = JSON.parse(localStorage.getItem('user') || 'null')

  useEffect(() => {
    if (!user) navigate('/Login')
  }, [navigate, user])

  const handleCreate = async () => {
    if (!title.trim()) {
      titleRef.current?.focus()
      setAlertMessage('Please enter a title for the blog') 
      return
    }
    if (!content.trim()) {
      contentRef.current?.focus()
      setAlertMessage('Please enter content for the blog') 
      return
    }

    setIsLoading(true)
    setAlertMessage('') 
    const { error } = await supabase.from('blogs').insert([
      {
        user_id: user.id,
        title,
        content,
      },
    ])

    setIsLoading(false)

    if (!error) {
      navigate('/my-blogs', { state: { success: true } })
    } else {
      setAlertMessage('Error: ' + error.message) 
    }
  }

  return (
    <div className="min-h-screen bg-BGCreate bg-cover bg-center flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-lg">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="bg-white backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-4xl p-8 relative transition-transform">

        {/** LOADER*/}
        {isLoading && (
          <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center rounded-3xl z-50">
            <span className="loading loading-spinner loading-xl mb-3"></span>
            <p className="text-lg font-medium">Publishing Blog...</p>
          </div>
        )}

        {alertMessage && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-300">
            {alertMessage}
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">
          Create a New Blog
        </h1>

        <div className="space-y-5">

          {/** TITLE */}
          <div>
            <label className="text-lg font-medium text-gray-600">
                Blog Title
            </label>
            <input
              ref={titleRef}
              type="text"
              placeholder="Title (max 50 characters)"
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 50))}
              className="input input-bordered w-full text-lg placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200 transition shadow-sm border-b-2 px-2"
              disabled={isLoading}
            />
            <p className="text-sm text-gray-400 mt-1">{title.length}/50</p>
          </div>

          {/** CONTENT */}
          <div className="relative">
            <textarea
              ref={contentRef}
              placeholder="Write your story here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isLoading}
              className="textarea border w-full h-[40vh] max-h-[50vh] resize-none text-base placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200 transition overflow-auto shadow-sm p-2"
            />
            <p className="text-sm text-gray-400 mt-1">{content.length} characters</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
          <button
            className="btn hover:btn-error w-full border-b-2 sm:w-auto hover:text-red-500 p-2 transition"
            onClick={() => navigate('/home')}
            disabled={isLoading}
          >
            Cancel
          </button>

          <button
            className="btn hover:btn-primary w-full border-b-2 sm:w-auto text-lg px-8 hover:text-primary"
            onClick={handleCreate}
            disabled={isLoading}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateBlog
