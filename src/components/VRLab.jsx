import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Microscope, Dna, TestTube, FlaskConical, Play, Users, Settings } from 'lucide-react'

export function VRLab() {
  const [activeLab, setActiveLab] = useState(null)
  const [labSettings, setLabSettings] = useState({ complexity: 'beginner', collaborators: 1 })

  const labs = [
    {
      id: 'molecular_viewer',
      name: 'Molecular Viewer',
      description: 'Visualize and manipulate complex molecules in 3D space.',
      icon: <Microscope className="w-8 h-8" />,
      color: 'blue'
    },
    {
      id: 'gene_sequencer',
      name: 'Gene Sequencer',
      description: 'Simulate the process of DNA sequencing and analysis.',
      icon: <Dna className="w-8 h-8" />,
      color: 'purple'
    },
    {
      id: 'biochemistry_sim',
      name: 'Biochemistry Simulator',
      description: 'Conduct virtual experiments with biochemical reactions.',
      icon: <TestTube className="w-8 h-8" />,
      color: 'green'
    },
    {
      id: 'synthesis_lab',
      name: 'Organic Synthesis Lab',
      description: 'Design and perform organic synthesis reactions safely.',
      icon: <FlaskConical className="w-8 h-8" />,
      color: 'orange'
    }
  ]

  const handleSelectLab = (lab) => {
    setActiveLab(lab)
  }

  const handleLaunchLab = () => {
    // In a real application, this would trigger the VR environment
    alert(`Launching ${activeLab.name} with complexity: ${labSettings.complexity} for ${labSettings.collaborators} user(s).`)
  }

  return (
    <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-indigo-800">
          <div className="text-2xl mr-3">𓉗</div>
          Virtual Reality Laboratories
        </CardTitle>
        <CardDescription>Immersive, hands-on science at the molecular level. Step into the future of research.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lab Selection */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold mb-4 text-gray-800">Select a Virtual Laboratory</h3>
            <div className="space-y-3">
              {labs.map(lab => (
                <button 
                  key={lab.id} 
                  onClick={() => handleSelectLab(lab)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center space-x-4 ${
                    activeLab?.id === lab.id
                      ? `border-${lab.color}-500 bg-${lab.color}-50 shadow-md`
                      : `border-gray-200 hover:border-${lab.color}-300 hover:bg-gray-50`
                  }`}>
                  <div className={`text-${lab.color}-600`}>{lab.icon}</div>
                  <div>
                    <p className="font-semibold text-gray-900">{lab.name}</p>
                    <p className="text-xs text-gray-600">{lab.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Lab Details & Launch */}
          <div className="lg:col-span-2">
            {activeLab ? (
              <div className="p-6 bg-gray-50 rounded-lg h-full flex flex-col">
                <div className="flex-grow">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`text-4xl text-${activeLab.color}-600`}>{activeLab.icon}</div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{activeLab.name}</h2>
                      <p className="text-gray-600">{activeLab.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-semibold mb-4 text-gray-800 flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      Lab Configuration
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="complexity" className="block text-sm font-medium text-gray-700 mb-1">Complexity</label>
                        <Select 
                          value={labSettings.complexity}
                          onValueChange={(value) => setLabSettings({...labSettings, complexity: value})}
                        >
                          <SelectTrigger id="complexity">
                            <SelectValue placeholder="Select complexity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label htmlFor="collaborators" className="block text-sm font-medium text-gray-700 mb-1">Collaborators</label>
                        <Select
                          value={String(labSettings.collaborators)}
                          onValueChange={(value) => setLabSettings({...labSettings, collaborators: Number(value)})}
                        >
                          <SelectTrigger id="collaborators">
                            <SelectValue placeholder="Select collaborators" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Solo Session</SelectItem>
                            <SelectItem value="2">2 Collaborators</SelectItem>
                            <SelectItem value="4">4 Collaborators</SelectItem>
                            <SelectItem value="8">8 Collaborators</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Button 
                    size="lg" 
                    onClick={handleLaunchLab}
                    className={`w-full max-w-xs mx-auto bg-gradient-to-r from-${activeLab.color}-500 to-${activeLab.color}-600 hover:from-${activeLab.color}-600 hover:to-${active.color}-700 text-white shadow-lg`}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Launch Virtual Lab
                  </Button>
                  <p className="text-xs text-gray-500 mt-3">Requires a compatible VR headset.</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50 rounded-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                  <div className="text-4xl text-indigo-500">𓉗</div>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Select a Lab to Begin</h2>
                <p className="text-gray-500 mt-2 max-w-sm">
                  Choose a virtual laboratory from the list to configure your session and step into an immersive scientific experience.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

