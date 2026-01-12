import React, { useState, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import RegisterBG from '../assets/Backgrounds/RegBG.jpg'

const RegisterPage: React.FC = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  const handleRegister = async () => {
    setMessage('')

    if (!username.trim()) {
      usernameRef.current?.focus()
      return setMessage('Please enter a username')
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      emailRef.current?.focus()
      return setMessage('Please enter a valid email')
    }
    if (!password.trim()) {
      passwordRef.current?.focus()
      return setMessage('Please enter a password')
    }
    if (password !== confirmPassword) {
      confirmPasswordRef.current?.focus()
      return setMessage('Passwords do not match')
    }

    setIsLoading(true)

    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .or(`username.eq.${username},email.eq.${email}`)
      .single()

    if (existingUser) {
      setIsLoading(false)
      return setMessage('Username or email already exists')
    }

    const { error } = await supabase.from('users').insert([
      { username, email, password },
    ])

    setIsLoading(false)

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Registered successfully! You can login now.')
      navigate('/Login')
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
              <p className="text-sm font-medium text-gray-700">
                Registering...
              </p>
            </div>
          )}

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Register to <span className="text-sky-500">GameHub</span>
          </h1>

          <p className="text-sm text-gray-500 mb-8">
            Create your account to get started.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                ref={usernameRef}
                type="text"
                placeholder="Your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-sky-500 focus:ring focus:ring-sky-200 transition"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                ref={emailRef}
                type="email"
                placeholder="your-email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-sky-500 focus:ring focus:ring-sky-200 transition"
                disabled={isLoading}
              />
            </div>

            <div className="relative">
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                ref={passwordRef}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm focus:border-sky-500 focus:ring focus:ring-sky-200 transition"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <div className="relative">
              <label className="text-sm font-medium text-gray-600">
                Confirm Password
              </label>
              <input
                ref={confirmPasswordRef}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm focus:border-sky-500 focus:ring focus:ring-sky-200 transition"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            onClick={handleRegister}
            disabled={isLoading}
            className="mt-6 w-full rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2.5 transition transform hover:scale-[1.02]"
          >
            Register
          </button>

          <p className="mt-5 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <span
              className="text-sky-500 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate('/Login')}
            >
              Login
            </span>
          </p>

          {message && (
            <p className={`mt-4 text-center text-sm font-medium ${
              message.includes('success') ? 'text-green-600' : 'text-red-500'
            }`}>
              {message}
            </p>
          )}
        </div>
      </div>

      <div className="hidden lg:block w-1/2 relative">
        <img
          src={RegisterBG}
          alt="Register Visual"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
    
  )
}

export default RegisterPage
