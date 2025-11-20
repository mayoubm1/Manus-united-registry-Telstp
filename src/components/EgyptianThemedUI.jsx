import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sun, Moon, LogOut, Settings, Bell, ChevronDown } from 'lucide-react'
import { auth } from '@/lib/supabase'

export function EgyptianThemedDashboard({ user, children }) {
  const [timeOfDay, setTimeOfDay] = useState('day')

  useEffect(() => {
    const hour = new Date().getHours()
    setTimeOfDay(hour >= 6 && hour < 18 ? 'day' : 'night')
  }, [])

  const handleSignOut = async () => {
    await auth.signOut()
  }

  const themeClasses = {
    day: {
      bg: 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50',
      text: 'text-amber-800',
      headerBg: 'bg-white/80 backdrop-blur-sm border-b border-amber-200',
      headerText: 'text-amber-800',
      avatarBorder: 'border-amber-400',
      buttonVariant: 'outline',
      buttonColor: 'text-amber-700 border-amber-300 hover:bg-amber-100',
      themeIcon: <Sun className="w-5 h-5 text-amber-500" />
    },
    night: {
      bg: 'bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900',
      text: 'text-indigo-200',
      headerBg: 'bg-gray-900/80 backdrop-blur-sm border-b border-indigo-800',
      headerText: 'text-indigo-200',
      avatarBorder: 'border-indigo-400',
      buttonVariant: 'outline',
      buttonColor: 'text-indigo-300 border-indigo-700 hover:bg-indigo-800',
      themeIcon: <Moon className="w-5 h-5 text-indigo-400" />
    }
  }

  const currentTheme = themeClasses[timeOfDay]

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text}`}>
      {/* Header */}
      <header className={`sticky top-0 z-40 ${currentTheme.headerBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className={`text-2xl font-bold ${currentTheme.headerText}`}>𓂀</div>
              <h1 className={`text-xl font-bold ${currentTheme.headerText}`}>TELsTP Education</h1>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <Button variant={currentTheme.buttonVariant} size="icon" className={currentTheme.buttonColor}>
                {currentTheme.themeIcon}
              </Button>
              <Button variant={currentTheme.buttonVariant} size="icon" className={currentTheme.buttonColor}>
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant={currentTheme.buttonVariant} size="icon" className={currentTheme.buttonColor}>
                <Settings className="w-5 h-5" />
              </Button>
              
              <div className="flex items-center space-x-2">
                <Avatar className={`h-9 w-9 border-2 ${currentTheme.avatarBorder}`}>
                  <AvatarImage src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name} />
                  <AvatarFallback>{user.user_metadata.full_name ? user.user_metadata.full_name.charAt(0) : 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className={`text-sm font-medium ${currentTheme.headerText}`}>{user.user_metadata.full_name}</p>
                  <p className={`text-xs ${timeOfDay === 'day' ? 'text-amber-600' : 'text-indigo-400'}`}>{user.email}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleSignOut} className={currentTheme.buttonColor}>
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  )
}

export function EgyptianAICompanions() {
  const companions = [
    { name: 'Maestro Atum', role: 'The Architect', hieroglyph: '𓂀', color: 'amber' },
    { name: 'Neith', role: 'The Designer', hieroglyph: '𓈖', color: 'indigo' },
    { name: 'Thoth', role: 'The Analyst', hieroglyph: '𓅝', color: 'sky' },
    { name: 'Sekhmet', role: 'The Storyteller', hieroglyph: '𓌻', color: 'rose' },
  ]

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-center mb-4">Your Divine Council of AI Companions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {companions.map(c => (
          <Card key={c.name} className={`border-0 shadow-md bg-white/80 backdrop-blur-sm text-center p-4 hover:shadow-xl transition-shadow duration-300`}>
            <div className={`text-4xl mb-2 text-${c.color}-600`}>{c.hieroglyph}</div>
            <p className={`font-bold text-sm text-gray-900`}>{c.name}</p>
            <p className={`text-xs text-${c.color}-700`}>{c.role}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function EgyptianProgressPyramid({ progress, title, description }) {
  return (
    <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-amber-800">
          <div className="text-xl mr-2">𓉴</div>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="relative w-48 h-48 mx-auto mb-4">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            <path d="M 50,5 L 95,95 L 5,95 Z" fill="none" strokeWidth="5" className="text-amber-200" />
            <path 
              d="M 50,5 L 95,95 L 5,95 Z" 
              fill="none" 
              strokeWidth="5" 
              className="text-amber-500"
              strokeDasharray="280"
              strokeDashoffset={280 - (280 * progress) / 100}
              style={{ transition: 'stroke-dashoffset 1s ease-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-amber-700">{progress}%</span>
            <span className="text-xs text-amber-600">Ascended</span>
          </div>
        </div>
        <p className="text-sm text-gray-600">You are climbing towards mastery.</p>
      </CardContent>
    </Card>
  )
}

export function AncientWisdomQuotes() {
  const quotes = [
    { quote: 'An ounce of prevention is worth a pound of cure.', author: 'Ancient Egyptian Proverb' },
    { quote: 'The kingdom of heaven is within you; and whosoever shall know himself shall find it.', author: 'Inscription at Luxor' },
    { quote: 'Know the world in yourself. Never look for yourself in the world, for this would be to project your illusion.', author: 'Temple of Luxor' },
  ]
  const [currentQuote, setCurrentQuote] = useState(quotes[0])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)])
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <CardContent className="p-6">
        <div className="text-3xl text-amber-400 mb-3">𓆓</div>
        <p className="text-sm italic mb-3">"{currentQuote.quote}"</p>
        <p className="text-xs text-right text-amber-300 font-medium">— {currentQuote.author}</p>
      </CardContent>
    </Card>
  )
}

export function HieroglyphicNavigation({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'overview', name: 'Sacred Overview', hieroglyph: '𓇳' },
    { id: 'courses', name: 'Scrolls of Knowledge', hieroglyph: '𓈖' },
    { id: 'vr-labs', name: 'Temples of Science', hieroglyph: '𓉗' },
    { id: 'ai-companion', name: 'Divine Council', hieroglyph: '𓅝' },
    { id: 'research', name: 'Global Endeavors', hieroglyph: '𓆃' },
  ]

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-2 md:space-x-4 p-2 bg-white/70 backdrop-blur-sm rounded-full shadow-inner">
        {navItems.map(item => (
          <button 
            key={item.id} 
            onClick={() => setActiveTab(item.id)}
            className={`px-3 py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 flex items-center space-x-2 ${
              activeTab === item.id 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                : 'bg-transparent text-amber-700 hover:bg-amber-100'
            }`}>
            <span className="text-lg md:text-xl">{item.hieroglyph}</span>
            <span className="hidden md:inline text-sm font-medium">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export function EgyptianCourseCard({ course }) {
  return (
    <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="h-40 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center relative overflow-hidden">
        <div className={`text-6xl opacity-20 group-hover:scale-110 transition-transform duration-500`}>
          {course.subject === 'Biology' ? '𓆃' : '𓋹'}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent"></div>
        <Badge className="absolute top-3 right-3 bg-amber-600 text-white">{course.difficulty}</Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-gray-900 mb-2 h-12">{course.title}</h3>
        <p className="text-xs text-amber-700 mb-3">Guided by {course.instructor}</p>
        <p className="text-sm text-gray-600 mb-4 h-16">{course.description}</p>
        <Progress value={course.progress} className="mb-3" />
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>{course.completed_lessons} / {course.total_lessons} Scrolls</span>
          <span>{course.duration}</span>
        </div>
        <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
          <Play className="w-4 h-4 mr-2" />
          Enter the Temple of Knowledge
        </Button>
      </CardContent>
    </Card>
  )
}

