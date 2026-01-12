import React, { useState, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import LoginBG from '../assets/Backgrounds/BGBlogs.jpg'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const identifierRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleLogin = async () => {
    if (!identifier.trim()) {
      identifierRef.current?.focus()
      setMessage('Please enter your username or email')
      return
    }
    if (!password.trim()) {
      passwordRef.current?.focus()
      setMessage('Please enter your password')
      return
    }

    setIsLoading(true)

    const { data: user } = await supabase
      .from('users')
      .select('*')
      .or(`username.eq.${identifier},email.eq.${identifier}`)
      .eq('password', password)
      .single()

    setIsLoading(false)

    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
      setMessage('')
      navigate('/home')
    } else {
      setMessage('Invalid username/email or password')
    }
  }

  return (
    <div className="min-h-screen flex bg-sky-50">
      
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative">

          {/* LOADER */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center rounded-2xl z-50">
              <span className="loading loading-spinner loading-lg mb-2"></span>
              <p className="text-sm font-medium text-gray-700">Logging in...</p>
            </div>
          )}

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Login to <span className="text-sky-500">GameHub</span>
          </h1>

          <p className="text-sm text-gray-500 mb-8">
            Welcome back! Please login to your account.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Username / Email
              </label>
              <input
                ref={identifierRef}
                type="text"
                placeholder="your-email@gmail.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-sky-500 focus:ring focus:ring-sky-200 transition"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-sky-500 focus:ring focus:ring-sky-200 transition"
                disabled={isLoading}
              />
            </div>
          </div>

          {/** NOFUNCTION */}
          <div className="flex items-center justify-between mt-4 text-sm">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-info" />
              Remember me
            </label>

            <span className="text-sky-500 hover:underline cursor-pointer">
              Forgot Password?
            </span>
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="mt-6 w-full rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2.5 transition transform hover:scale-[1.02]"
          >
            Log In
          </button>

          <p className="mt-5 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <span
              className="text-sky-500 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate('/registerPage')}
            >
              Register
            </span>
          </p>

          {message && (
            <p className="mt-4 text-center text-sm font-medium text-red-500">
              {message}
            </p>
          )}
        </div>
      </div>

      <div className="hidden lg:block w-1/2 relative">
        <img
          src={LoginBG}
          alt="Login Visual"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default LoginPage
