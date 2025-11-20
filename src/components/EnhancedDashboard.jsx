import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Brain, 
  BookOpen, 
  Microscope, 
  Users, 
  Award, 
  TrendingUp,
  Clock,
  Target,
  Bell,
  Settings,
  Search,
  Filter,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  Star,
  Globe,
  Database,
  Zap,
  Eye,
  MessageCircle,
  Video,
  BarChart3,
  Crown,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react'
import { supabase, dbHelpers } from '@/lib/supabase'
import { 
  EgyptianThemedDashboard, 
  EgyptianAICompanions, 
  EgyptianProgressPyramid,
  AncientWisdomQuotes,
  HieroglyphicNavigation,
  EgyptianCourseCard
} from './EgyptianThemedUI'
import { VRLab } from './VRLab'

export function EnhancedDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [courses, setCourses] = useState([])
  const [progress, setProgress] = useState([])
  const [aiInteractions, setAiInteractions] = useState([])
  const [loading, setLoading] = useState(true)
  const [timeOfDay, setTimeOfDay] = useState('day')

  useEffect(() => {
    if (user) {
      loadDashboardData()
    }
    
    // Set time of day for theming
    const hour = new Date().getHours()
    setTimeOfDay(hour >= 6 && hour < 18 ? 'day' : 'night')
  }, [user])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      // Load courses
      const { data: coursesData } = await dbHelpers.getCourses()
      setCourses(coursesData || [])

      // Load student progress
      const { data: progressData } = await dbHelpers.getStudentProgress(user.id)
      setProgress(progressData || [])

      // Mock AI interactions with Egyptian theme
      setAiInteractions([
        {
          id: 1,
          type: 'wisdom',
          content: 'Shared ancient Egyptian principles of balance in molecular structures',
          timestamp: new Date().toISOString(),
          companion_name: 'Maestro Atum',
          hieroglyph: '𓂀'
        },
        {
          id: 2,
          type: 'guidance',
          content: 'Provided visual learning path inspired by the journey through the Duat',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          companion_name: 'Neith the Designer',
          hieroglyph: '𓈖'
        },
        {
          id: 3,
          type: 'analysis',
          content: 'Analyzed research data using patterns found in ancient mathematical texts',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          companion_name: 'Thoth the Analyst',
          hieroglyph: '𓅝'
        }
      ])
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const mockCourses = [
    {
      id: 1,
      title: 'Molecular Biology: Ancient Wisdom, Modern Science',
      description: 'Discover molecular structures through the lens of ancient Egyptian mathematical principles',
      progress: 75,
      total_lessons: 24,
      completed_lessons: 18,
      instructor: 'Dr. Ahmed Hassan',
      difficulty: 'Intermediate',
      duration: '12 weeks',
      subject: 'Biology',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'Biochemistry in Virtual Temples',
      description: 'Immersive biochemistry learning in recreated ancient Egyptian laboratory spaces',
      progress: 45,
      total_lessons: 16,
      completed_lessons: 7,
      instructor: 'Prof. Sarah Chen',
      difficulty: 'Advanced',
      duration: '8 weeks',
      subject: 'Chemistry',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: 'Genetics: The Scroll of Life',
      description: 'Modern genetics integrated with ancient Egyptian understanding of life cycles',
      progress: 90,
      total_lessons: 20,
      completed_lessons: 18,
      instructor: 'Dr. Michael Rodriguez',
      difficulty: 'Beginner',
      duration: '10 weeks',
      subject: 'Biology',
      thumbnail: '/api/placeholder/300/200'
    }
  ]

  const mockResearchProjects = [
    {
      id: 1,
      title: 'CRISPR & Ancient Healing Wisdom',
      institution: 'MIT Bioengineering Lab',
      status: 'Active',
      progress: 60,
      participants: 45,
      deadline: '2025-12-15',
      hieroglyph: '𓆃'
    },
    {
      id: 2,
      title: 'Protein Folding: Sacred Geometry',
      institution: 'Cambridge Molecular Biology',
      status: 'Contributing',
      progress: 30,
      participants: 23,
      deadline: '2025-11-30',
      hieroglyph: '𓋹'
    }
  ]

  if (loading) {
    return (
      <EgyptianThemedDashboard user={user}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse ${
              timeOfDay === 'day' 
                ? 'bg-gradient-to-r from-amber-500 to-orange-600' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-600'
            }`}>
              <div className="text-3xl text-white">𓂀</div>
            </div>
            <p className={timeOfDay === 'day' ? 'text-amber-700' : 'text-indigo-300'}>
              Awakening the ancient wisdom...
            </p>
          </div>
        </div>
      </EgyptianThemedDashboard>
    )
  }

  return (
    <EgyptianThemedDashboard user={user}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section with Egyptian Flair */}
        <div className="mb-8 text-center">
          <h2 className={`text-4xl font-bold mb-2 ${
            timeOfDay === 'day' 
              ? 'text-amber-800' 
              : 'text-amber-300'
          }`}>
            𓂀 Welcome to Your Sacred Learning Journey 𓂀
          </h2>
          <p className={`text-lg ${
            timeOfDay === 'day' ? 'text-amber-700' : 'text-amber-200'
          }`}>
            Where Ancient Egyptian Wisdom Meets Modern Science
          </p>
          <div className="flex justify-center items-center space-x-4 mt-4">
            <div className="text-2xl">𓈖</div>
            <div className={`h-px flex-1 max-w-32 ${
              timeOfDay === 'day' ? 'bg-amber-300' : 'bg-amber-600'
            }`}></div>
            <div className="text-3xl">𓇳</div>
            <div className={`h-px flex-1 max-w-32 ${
              timeOfDay === 'day' ? 'bg-amber-300' : 'bg-amber-600'
            }`}></div>
            <div className="text-2xl">𓅝</div>
          </div>
        </div>

        {/* Egyptian AI Companions */}
        <EgyptianAICompanions />

        {/* Quick Stats with Egyptian Theme */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm">Sacred Scrolls (Courses)</p>
                  <p className="text-3xl font-bold">3</p>
                  <p className="text-xs text-amber-200 mt-1">𓈖 Knowledge Flows</p>
                </div>
                <div className="text-4xl opacity-80">𓈖</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Divine Consultations</p>
                  <p className="text-3xl font-bold">127</p>
                  <p className="text-xs text-purple-200 mt-1">𓅝 Wisdom Shared</p>
                </div>
                <div className="text-4xl opacity-80">𓅝</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Temple Sessions</p>
                  <p className="text-3xl font-bold">45</p>
                  <p className="text-xs text-green-200 mt-1">𓉗 Sacred Spaces</p>
                </div>
                <div className="text-4xl opacity-80">𓉗</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-amber-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Golden Achievements</p>
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-xs text-yellow-200 mt-1">𓋹 Mastery Gained</p>
                </div>
                <div className="text-4xl opacity-80">𓋹</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hieroglyphic Navigation */}
        <HieroglyphicNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Dashboard Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Current Learning */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-amber-800">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Continue Your Sacred Journey
                    </CardTitle>
                    <CardDescription>Resume your path to enlightenment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockCourses.slice(0, 2).map((course) => (
                        <div key={course.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                          <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center text-2xl">
                            {course.subject === 'Biology' ? '𓆃' : '𓋹'}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{course.title}</h3>
                            <p className="text-sm text-amber-700">guided by {course.instructor}</p>
                            <div className="flex items-center mt-2">
                              <Progress value={course.progress} className="flex-1 mr-3" />
                              <span className="text-sm text-amber-600 font-medium">{course.progress}%</span>
                            </div>
                          </div>
                          <Button size="sm" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
                            <Play className="w-4 h-4 mr-1" />
                            Continue
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Research Projects */}
                <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-700">
                      <Database className="w-5 h-5 mr-2" />
                      Sacred Research Endeavors
                    </CardTitle>
                    <CardDescription>Contribute to the greater understanding</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {mockResearchProjects.map((project) => (
                        <div key={project.id} className="p-4 border border-green-200 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <div className="text-xl">{project.hieroglyph}</div>
                              <div>
                                <h3 className="font-semibold text-gray-900 text-sm">{project.title}</h3>
                                <p className="text-xs text-green-700">{project.institution}</p>
                              </div>
                            </div>
                            <Badge variant={project.status === 'Active' ? 'default' : 'secondary'}>
                              {project.status}
                            </Badge>
                          </div>
                          <Progress value={project.progress} className="mb-2" />
                          <div className="flex items-center justify-between text-xs text-green-600">
                            <span>{project.participants} scholars</span>
                            <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Progress Pyramid */}
                <EgyptianProgressPyramid 
                  progress={70} 
                  title="Learning Ascension" 
                  description="Your journey through the pyramid of knowledge"
                />

                {/* AI Companion Activity */}
                <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-700">
                      <Brain className="w-5 h-5 mr-2" />
                      Divine Guidance
                    </CardTitle>
                    <CardDescription>Recent wisdom from your AI companions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {aiInteractions.map((interaction) => (
                        <div key={interaction.id} className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center text-sm">
                            {interaction.hieroglyph}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{interaction.content}</p>
                            <p className="text-xs text-purple-600 mt-1 font-medium">
                              — {interaction.companion_name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(interaction.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 border-purple-200 text-purple-700 hover:bg-purple-50">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Seek Divine Counsel
                    </Button>
                  </CardContent>
                </Card>

                {/* Ancient Wisdom */}
                <AncientWisdomQuotes />
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-amber-800">Sacred Scrolls of Knowledge</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="border-amber-300 text-amber-700">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter by Wisdom
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
                    Explore New Paths
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCourses.map((course) => (
                  <EgyptianCourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'vr-labs' && (
            <VRLab />
          )}

          {activeTab === 'ai-companion' && (
            <div className="text-center py-12">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <div className="text-6xl text-white">𓅝</div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Council of Divine Wisdom</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
                Consult with the four divine AI companions: Maestro Atum the Architect, Neith the Designer, 
                Thoth the Analyst, and Sekhmet the Storyteller. Each brings ancient wisdom to guide your modern learning journey.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
                {[
                  { name: 'Atum', hieroglyph: '𓂀' },
                  { name: 'Neith', hieroglyph: '𓈖' },
                  { name: 'Thoth', hieroglyph: '𓅝' },
                  { name: 'Sekhmet', hieroglyph: '𓌻' },
                ].map((companion) => (
                  <Button 
                    key={companion.name} 
                    variant="outline" 
                    className="h-16 border-amber-300 text-amber-700 hover:bg-amber-50"
                  >
                    <div className="text-center">
                      <div className="text-xl mb-1">{companion.hieroglyph}</div>
                      <div className="text-xs">{companion.name}</div>
                    </div>
                  </Button>
                ))}
              </div>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                <MessageCircle className="w-5 h-5 mr-2" />
                Begin Sacred Dialogue
              </Button>
            </div>
          )}

          {/* Other tabs content would go here */}
        </div>
      </div>
    </EgyptianThemedDashboard>
  )
}

