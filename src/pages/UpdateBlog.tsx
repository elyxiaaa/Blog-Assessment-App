import React, { useEffect, useState, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateBlog: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const titleRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!user) {
      navigate('/Login')
      return
    }
    fetchBlog()
  }, [])

  const fetchBlog = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error(error)
      return
    }

    setTitle(data.title)
    setContent(data.content)
  }

  const handleUpdate = async () => {
    if (!title.trim()) {
      titleRef.current?.focus()
      return
    }
    if (!content.trim()) {
      contentRef.current?.focus()
      return
    }

    setLoading(true)

    const { error } = await supabase
      .from('blogs')
      .update({ title, content })
      .eq('id', id)
      .eq('user_id', user.id)

    setLoading(false)

    if (error) {
      console.error(error)
      alert('Failed to update blog')
      return
    }

    setShowSuccess(true)

    setTimeout(() => {
      setShowSuccess(false)
      navigate('/my-blogs', { state: { updated: true } })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-start sm:items-center justify-center py-8 sm:py-12 px-4 sm:px-6">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-4xl p-10 sm:p-12 relative ">

        {/**LOEADER */}
        {loading && (
          <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center rounded-3xl z-50">
            <span className="loading loading-spinner loading-xl mb-3"></span>
            <p className="text-lg font-medium">Updating Blog...</p>
          </div>
        )}

        {/** TOAST SUCCESS*/}
        {showSuccess && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg 
                            transform transition-all duration-500 ease-out 
                            opacity-100 translate-y-0">
              Blog updated successfully!
            </div>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800">
          Edit Blog
        </h1>

        <div className="space-y-6">
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
              disabled={loading}
            />
            <p className="text-sm text-gray-400 mt-1">{title.length}/50</p>
          </div>

          <div>
            <textarea
              ref={contentRef}
              placeholder="Write your story here..."
              className="textarea border w-full h-72 sm:h-80 resize-none text-base placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200 transition overflow-auto shadow-sm p-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
            />
            <p className="text-sm text-gray-400 mt-1">{content.length} characters</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-4">
          <button
            className="btn btn-outline w-full sm:w-auto hover:text-red-500 p-3 transition"
            onClick={() => navigate('/my-blogs')}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary w-full sm:w-auto text-lg px-10 py-3 hover:text-primary"
            onClick={handleUpdate}
            disabled={loading}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateBlog
