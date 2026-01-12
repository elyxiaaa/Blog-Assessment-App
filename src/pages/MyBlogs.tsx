import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { CiSearch } from "react-icons/ci";

interface Blog {
  id: string
  title: string
  content: string
  created_at: string
}

const MyBlogs: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [viewBlog, setViewBlog] = useState<Blog | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const blogsPerPage = 4

  useEffect(() => {
    if (!user) navigate('/LoginPage')
    else fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    const { data } = await supabase
      .from('blogs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    if (data) setBlogs(data)
  }

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  )


  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage)
  const startIndex = (currentPage - 1) * blogsPerPage
  const endIndex = startIndex + blogsPerPage
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex)

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4 md:gap-0">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          My Blogs
        </h1>

        <label className="input input-bordered w-full md:w-64 flex items-center gap-2">
          <CiSearch className="text-lg opacity-50" />

          <input
            type="search"
            placeholder="Search by title"
            className="w-full outline-none text-base"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
          />
        </label>
      </div>

      {/**CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {currentBlogs.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No blogs found.
          </p>
        )}

        {currentBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-all cursor-pointer min-h-[250px]"
            onClick={() => {
              setViewBlog(blog)
              ;(document.getElementById('view_blog_modal') as HTMLDialogElement)?.showModal()
            }}
          >
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800 line-clamp-2">
                {blog.title}
              </h2>
              <p className="text-gray-600 line-clamp-4 text-sm md:text-base">
                {blog.content}
              </p>
            </div>

            <div className="flex justify-between items-center mt-4 gap-2">
              <span className="text-sm text-gray-400">
                {new Date(blog.created_at).toLocaleDateString()}
              </span>
              <div className="flex gap-2">
                <button
                  className="btn btn-sm hover:btn-primary flex items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/update-blog/${blog.id}`)
                  }}
                >
                  <FiEdit className="text-base" /> Edit
                </button>
                <button
                  className="btn btn-sm hover:btn-error flex items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/delete-blog/${blog.id}`)
                  }}
                >
                  <FiTrash2 className="text-base" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="btn btn-outline"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="flex items-center px-3 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-outline"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/** MODAL*/}
      {viewBlog && (
        <dialog id="view_blog_modal" className="modal">
          <div className="modal-box w-full max-w-3xl rounded-3xl p-6 md:p-8 bg-white/95 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
              {viewBlog.title}
            </h3>
            <div className="border-b border-gray-300 mb-4"></div>
            <p className="text-gray-700 text-base md:text-lg whitespace-pre-line">
              {viewBlog.content}
            </p>
            <p className="text-gray-400 text-sm md:text-base mt-4 text-right">
              {new Date(viewBlog.created_at).toLocaleString()}
            </p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      )}
    </div>
  )
}

export default MyBlogs
