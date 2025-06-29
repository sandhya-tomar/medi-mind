
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Heart, Brain, Pill, Mic, Camera, Trophy, AlertTriangle, Phone } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import MedicationTracker from '@/components/MedicationTracker';
import AIHealthAssistant from '@/components/AIHealthAssistant';  
import HealthDashboard from '@/components/HealthDashboard';
import EmergencyContacts from '@/components/EmergencyContacts';
import PillIdentifier from '@/components/PillIdentifier';
import VoiceReminder from '@/components/VoiceReminder';

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [healthStreak, setHealthStreak] = useState(7);
  const [todaysMeds, setTodaysMeds] = useState([
    { name: 'Aspirin', time: '09:00', taken: true, type: 'Heart' },
    { name: 'Metformin', time: '12:00', taken: false, type: 'Diabetes' },
    { name: 'Lisinopril', time: '18:00', taken: false, type: 'Blood Pressure' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const completedMeds = todaysMeds.filter(med => med.taken).length;
  const totalMeds = todaysMeds.length;
  const completionRate = (completedMeds / totalMeds) * 100;

  const markMedicationTaken = (index: number) => {
    const updated = [...todaysMeds];
    updated[index].taken = true;
    setTodaysMeds(updated);
    toast({
      title: "Medication Taken! 💊",
      description: `Great job taking your ${updated[index].name}!`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-200 rounded-full opacity-15 animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-lg relative z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8 animate-pulse" />
            <h1 className="text-3xl font-bold">MediMinder AI</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              🔥 {healthStreak} Day Streak!
            </Badge>
            <div className="text-right">
              <p className="text-sm opacity-80">Today</p>
              <p className="font-bold">{currentTime.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-400 to-green-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Today's Progress</p>
                  <p className="text-3xl font-bold">{completedMeds}/{totalMeds}</p>
                </div>
                <Pill className="w-12 h-12 opacity-80" />
              </div>
              <Progress value={completionRate} className="mt-4 bg-green-200" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Health Score</p>
                  <p className="text-3xl font-bold">92%</p>
                </div>
                <Heart className="w-12 h-12 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-400 to-purple-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">AI Suggestions</p>
                  <p className="text-3xl font-bold">5</p>
                </div>
                <Brain className="w-12 h-12 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-400 to-orange-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Next Reminder</p>
                  <p className="text-xl font-bold">12:00 PM</p>
                </div>
                <Clock className="w-12 h-12 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white shadow-lg">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="medications" className="flex items-center space-x-2">
              <Pill className="w-4 h-4" />
              <span>Medications</span>
            </TabsTrigger>
            <TabsTrigger value="ai-assistant" className="flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span>AI Assistant</span>
            </TabsTrigger>
            <TabsTrigger value="pill-id" className="flex items-center space-x-2">
              <Camera className="w-4 h-4" />
              <span>Pill ID</span>
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex items-center space-x-2">
              <Mic className="w-4 h-4" />
              <span>Voice</span>
            </TabsTrigger>
            <TabsTrigger value="emergency" className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Emergency</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <HealthDashboard />
          </TabsContent>

          <TabsContent value="medications">
            <MedicationTracker 
              medications={todaysMeds}
              onMedicationTaken={markMedicationTaken}
            />
          </TabsContent>

          <TabsContent value="ai-assistant">
            <AIHealthAssistant />
          </TabsContent>

          <TabsContent value="pill-id">
            <PillIdentifier />
          </TabsContent>

          <TabsContent value="voice">
            <VoiceReminder />
          </TabsContent>

          <TabsContent value="emergency">
            <EmergencyContacts />
          </TabsContent>
        </Tabs>

        {/* Floating AI Assistant */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button 
            size="lg" 
            className="rounded-full w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-2xl animate-pulse"
            onClick={() => toast({ title: "AI Assistant Activated! 🤖", description: "How can I help you today?" })}
          >
            🤖
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
