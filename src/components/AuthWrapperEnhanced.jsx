import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Brain, Mail, Lock, User, Globe, Zap, Eye, EyeOff } from 'lucide-react'
import { auth, supabase } from '@/lib/supabase'
import { EnhancedDashboard } from './EnhancedDashboard'
import { FrameBox, FrameCorner } from '@arwes/react-frames'
import { Animator, useAnimator } from '@arwes/react-animator'
import { Text } from '@arwes/react-text'

export function AuthWrapperEnhanced() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    institution: '',
    fieldOfStudy: ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    // Check current session
    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
    } catch (error) {
      console.error('Error checking user session:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setAuthLoading(true)
    setError('')

    try {
      console.log('Starting sign-up process...')
      console.log('Supabase client:', supabase)
      console.log('Form data:', formData)
      
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            institution: formData.institution,
            field_of_study: formData.fieldOfStudy
          }
        }
      })

      console.log('Sign-up response:', { data, error })

      if (error) {
        console.error('Sign-up error:', error)
        throw error
      }

      if (data.user) {
        // User created successfully
        console.log('User created:', data.user)
        setError('') // Clear any previous errors
      }
    } catch (error) {
      console.error('Caught error:', error)
      const errorMessage = error?.message || error?.toString() || 'An unknown error occurred'
      setError(errorMessage)
    } finally {
      setAuthLoading(false)
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    setAuthLoading(true)
    setError('')

    try {
      console.log('Starting sign-in process...')
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      })
      console.log('Sign-in response:', { data, error })
      if (error) {
        console.error('Sign-in error:', error)
        throw error
      }
    } catch (error) {
      console.error('Caught error:', error)
      const errorMessage = error?.message || error?.toString() || 'An unknown error occurred'
      setError(errorMessage)
    } finally {
      setAuthLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-blue-900 to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse shadow-lg shadow-amber-500/50">
            <Brain className="w-8 h-8 text-amber-900" />
          </div>
          <p className="text-amber-200">Initializing TELsTP Education Platform...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return <EnhancedDashboard user={user} />
  }

  return (
    <Animator>
      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-blue-900 to-blue-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Egyptian-themed background effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="w-full max-w-2xl relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 px-4">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/50 border-2 border-amber-400">
              <span className="text-2xl">🔺</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent mb-2 tracking-wider">
              TELsTP EDUCATION
            </h1>
            <p className="text-amber-200 font-semibold">
              Revolutionary AI-Powered Learning Platform
            </p>
            <p className="text-sm text-amber-300 mt-1 font-light">
              Tawasol Egypt Life Science Technology Park
            </p>
          </div>

          {/* Features Preview with ARWES-style frames */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 px-4">
            <div className="text-center p-3 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-lg border border-amber-500/30 hover:border-amber-400/50 transition-all">
              <Brain className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <p className="text-xs text-amber-200">AI Companions</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-lg border border-blue-500/30 hover:border-blue-400/50 transition-all">
              <Eye className="w-6 h-6 text-blue-300 mx-auto mb-2" />
              <p className="text-xs text-blue-200">VR Labs</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 transition-all">
              <Globe className="w-6 h-6 text-cyan-300 mx-auto mb-2" />
              <p className="text-xs text-cyan-200">Global Research</p>
            </div>
          </div>

          {/* Auth Forms with enhanced styling */}
          <div className="border-2 border-amber-500/30 rounded-lg shadow-2xl shadow-amber-500/20 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-md overflow-hidden mx-4 sm:mx-0">
            <div className="bg-gradient-to-r from-amber-600/20 to-blue-600/20 border-b border-amber-500/30 px-6 py-4">
              <h2 className="text-xl font-bold text-amber-300">Join the Future of Education</h2>
              <p className="text-sm text-amber-200/70 mt-1">
                Access world-class learning with AI guidance and global collaboration
              </p>
            </div>

            <div className="p-6">
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-amber-500/20">
                  <TabsTrigger value="signin" className="data-[state=active]:bg-amber-600/30 data-[state=active]:text-amber-300 text-amber-200/70">Sign In</TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:bg-amber-600/30 data-[state=active]:text-amber-300 text-amber-200/70">Sign Up</TabsTrigger>
                </TabsList>

                {/* Sign In Form */}
                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email" className="text-amber-300">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-amber-500/50" />
                        <Input
                          id="signin-email"
                          name="email"
                          type="email"
                          placeholder="your.email@university.edu"
                          className="pl-10 bg-slate-800/50 border-amber-500/30 text-amber-100 placeholder:text-amber-900/50 focus:border-amber-400 focus:ring-amber-500/30"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signin-password" className="text-amber-300">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-amber-500/50" />
                        <Input
                          id="signin-password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 bg-slate-800/50 border-amber-500/30 text-amber-100 placeholder:text-amber-900/50 focus:border-amber-400 focus:ring-amber-500/30"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 h-4 w-4 text-amber-500/50 hover:text-amber-400"
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                    </div>

                    {error && (
                      <div className="p-3 bg-red-950/50 border border-red-500/50 rounded-lg">
                        <p className="text-sm text-red-300">{error}</p>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-900 font-semibold border border-amber-400/50 shadow-lg shadow-amber-500/30"
                      disabled={authLoading}
                    >
                      {authLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                          Signing In...
                        </div>
                      ) : (
                        'Sign In to TELsTP'
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* Sign Up Form */}
                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-amber-300">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-amber-500/50" />
                        <Input
                          id="signup-name"
                          name="fullName"
                          type="text"
                          placeholder="Dr. Ahmed Hassan"
                          className="pl-10 bg-slate-800/50 border-amber-500/30 text-amber-100 placeholder:text-amber-900/50 focus:border-amber-400 focus:ring-amber-500/30"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-amber-300">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-amber-500/50" />
                        <Input
                          id="signup-email"
                          name="email"
                          type="email"
                          placeholder="ahmed.hassan@university.edu"
                          className="pl-10 bg-slate-800/50 border-amber-500/30 text-amber-100 placeholder:text-amber-900/50 focus:border-amber-400 focus:ring-amber-500/30"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-institution" className="text-amber-300">Institution</Label>
                      <Input
                        id="signup-institution"
                        name="institution"
                        type="text"
                        placeholder="Cairo University"
                        className="bg-slate-800/50 border-amber-500/30 text-amber-100 placeholder:text-amber-900/50 focus:border-amber-400 focus:ring-amber-500/30"
                        value={formData.institution}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-field" className="text-amber-300">Field of Study</Label>
                      <Input
                        id="signup-field"
                        name="fieldOfStudy"
                        type="text"
                        placeholder="Molecular Biology"
                        className="bg-slate-800/50 border-amber-500/30 text-amber-100 placeholder:text-amber-900/50 focus:border-amber-400 focus:ring-amber-500/30"
                        value={formData.fieldOfStudy}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-amber-300">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-amber-500/50" />
                        <Input
                          id="signup-password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          className="pl-10 pr-10 bg-slate-800/50 border-amber-500/30 text-amber-100 placeholder:text-amber-900/50 focus:border-amber-400 focus:ring-amber-500/30"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 h-4 w-4 text-amber-500/50 hover:text-amber-400"
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                    </div>

                    {error && (
                      <div className="p-3 bg-red-950/50 border border-red-500/50 rounded-lg">
                        <p className="text-sm text-red-300">{error}</p>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-900 font-semibold border border-amber-400/50 shadow-lg shadow-amber-500/30"
                      disabled={authLoading}
                    >
                      {authLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                          Creating Account...
                        </div>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Join TELsTP Education
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-amber-500/20">
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-amber-200/70">
                    <Globe className="w-3 h-3 mr-1.5 text-amber-400" />
                    Connected to 50+ Global Research Institutions
                  </div>
                  <div className="flex items-center text-xs text-amber-200/70">
                    <Brain className="w-3 h-3 mr-1.5 text-amber-400" />
                    AI-Powered Personalized Learning
                  </div>
                  <div className="flex items-center text-xs text-amber-200/70">
                    <Eye className="w-3 h-3 mr-1.5 text-amber-400" />
                    Virtual Reality Laboratory Access
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 px-4">
            <p className="text-xs text-amber-300/70">
              &copy; 2025 TAWASOL Egypt Life Science Technology Park
            </p>
            <p className="text-xs text-amber-300/70">
              Revolutionizing Education Through AI & Innovation
            </p>
          </div>
        </div>
      </div>
    </Animator>
  )
}
