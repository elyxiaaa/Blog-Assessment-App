import React, { useEffect, useState, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteBlog: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [passwordModal, setPasswordModal] = useState(false)
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const titleRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!user) navigate('/LoginPage')
    else fetchBlog()
  }, [])

  const fetchBlog = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error(error)
      alert('Failed to fetch blog')
      navigate('/my-blogs')
      return
    }

    setTitle(data.title)
    setContent(data.content)
  }

  const handleConfirmDelete = async () => {
    if (!password.trim()) {
      passwordRef.current?.focus()
      setMessage('Please enter your password')
      return
    }

    setLoading(true)

    // VERIFY
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .eq('password', password)
      .single()

    if (!userData) {
      setLoading(false)
      setMessage('Incorrect password')
      return
    }

    // DELETE
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id)

    setLoading(false)
    setPassword('')
    setPasswordModal(false)

    if (error) {
      setMessage(error.message)
      return
    }

    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
    navigate('/my-blogs')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-start sm:items-center justify-center py-8 sm:py-12 px-4 sm:px-6">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-4xl p-10 sm:p-12 relative">

        {/** LOADER */}
        {loading && (
          <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-50 rounded-3xl">
            <span className="loading loading-spinner loading-xl mb-3"></span>
            <p className="text-lg font-medium">Deleting Blog...</p>
          </div>
        )}

        {/** TOAST*/}
        {showSuccess && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
              Blog deleted successfully!
            </div>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800">
          Delete Blog
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
              className="input input-bordered w-full text-lg placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200 transition shadow-sm border-b-2 px-2"
              disabled
            />
            <p className="text-sm text-gray-400 mt-1">{title.length}/50</p>
          </div>

          <div>
            <textarea
              ref={contentRef}
              placeholder="Blog content..."
              className="textarea border w-full h-72 sm:h-80 resize-none text-base placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200 transition overflow-auto shadow-sm p-2"
              value={content}
              disabled
            />
            <p className="text-sm text-gray-400 mt-1">{content.length} characters</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-4">
          <button
            className="btn btn-outline w-full sm:w-auto hover:text-gray-700 p-3 transition"
            onClick={() => navigate('/my-blogs')}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="btn btn-error w-full sm:w-auto text-lg px-10 py-3"
            onClick={() => setPasswordModal(true)}
            disabled={loading}
          >
            Delete
          </button>
        </div>

        {/** PASS CONFIRMATION*/}
        {passwordModal && (
          <dialog id="delete_modal" className="modal" open>
            <div className="modal-box w-full max-w-md mx-4 sm:mx-auto rounded-3xl p-6 sm:p-8 bg-white/95 shadow-2xl flex flex-col gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
                Confirm Delete
              </h3>
              <p className="text-gray-600 text-center text-sm sm:text-base">
                Enter your password to delete: <br />
                <span className="font-semibold text-gray-800 mt-1 block truncate">{title}</span>
              </p>

              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full text-base sm:text-lg placeholder-gray-400 focus:border-red-500 focus:ring focus:ring-red-200 transition"
                ref={passwordRef}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {message && (
                <p className={`text-center font-medium ${message.includes('success') ? 'text-green-600' : 'text-red-500'}`}>
                  {message}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
                <button
                  className="btn btn-outline w-full sm:w-1/2"
                  onClick={() => {
                    setPasswordModal(false)
                    setPassword('')
                    setMessage('');
                   (document.getElementById('delete_modal') as HTMLDialogElement)?.close()
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-error w-full sm:w-1/2"
                  onClick={handleConfirmDelete}
                >
                  Confirm Delete
                </button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        )}
      </div>
    </div>
  )
}

export default DeleteBlog
