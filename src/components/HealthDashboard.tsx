
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, Activity, Droplet, Thermometer, Eye, TrendingUp } from 'lucide-react';

const HealthDashboard = () => {
  const healthMetrics = [
    { name: 'Blood Pressure', value: '120/80', status: 'normal', icon: Heart, color: 'text-green-500', progress: 85 },
    { name: 'Heart Rate', value: '72 BPM', status: 'good', icon: Activity, color: 'text-blue-500', progress: 90 },
    { name: 'Blood Sugar', value: '95 mg/dL', status: 'normal', icon: Droplet, color: 'text-purple-500', progress: 80 },
    { name: 'Temperature', value: '98.6°F', status: 'normal', icon: Thermometer, color: 'text-orange-500', progress: 95 },
  ];

  const weeklyGoals = [
    { goal: 'Take medications on time', progress: 85, completed: 6, total: 7 },
    { goal: 'Daily exercise (30 min)', progress: 71, completed: 5, total: 7 },
    { goal: 'Drink 8 glasses of water', progress: 57, completed: 4, total: 7 },
    { goal: 'Sleep 8 hours nightly', progress: 43, completed: 3, total: 7 },
  ];

  const recentReadings = [
    { date: 'Today', bp: '120/80', hr: '72', bs: '95' },
    { date: 'Yesterday', bp: '118/78', hr: '75', bs: '92' },
    { date: '2 days ago', bp: '122/82', hr: '70', bs: '98' },
    { date: '3 days ago', bp: '119/79', hr: '73', bs: '94' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'danger': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Health Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <IconComponent className={`w-8 h-8 ${metric.color}`} />
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status.toUpperCase()}
                  </Badge>
                </div>
                <h3 className="font-semibold text-gray-700 mb-2">{metric.name}</h3>
                <p className="text-2xl font-bold text-gray-900 mb-3">{metric.value}</p>
                <Progress value={metric.progress} className="h-2" />
                <p className="text-xs text-gray-500 mt-2">Health score: {metric.progress}%</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Goals */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <span>Weekly Health Goals</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {weeklyGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{goal.goal}</span>
                  <span className="text-sm text-gray-500">{goal.completed}/{goal.total} days</span>
                </div>
                <Progress value={goal.progress} className="h-3" />
                <p className="text-xs text-gray-600">{goal.progress}% completed this week</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Readings */}
        <Card className="bg-gradient-to-br from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-6 h-6 text-green-600" />
              <span>Recent Health Readings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReadings.map((reading, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="font-medium text-gray-700">{reading.date}</span>
                  <div className="flex space-x-4 text-sm">
                    <span className="text-red-600">BP: {reading.bp}</span>
                    <span className="text-blue-600">HR: {reading.hr}</span>
                    <span className="text-purple-600">BS: {reading.bs}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Tips */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-l-yellow-400">
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-3 text-yellow-800">💡 Today's Health Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🚶‍♂️</span>
              <div>
                <p className="font-medium">Take a 10-minute walk after meals</p>
                <p className="text-sm text-gray-600">Helps with blood sugar control and digestion</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">💧</span>
              <div>
                <p className="font-medium">Stay hydrated throughout the day</p>
                <p className="text-sm text-gray-600">Aim for 8 glasses of water daily</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">😴</span>
              <div>
                <p className="font-medium">Maintain consistent sleep schedule</p>
                <p className="text-sm text-gray-600">7-9 hours of quality sleep is essential</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🧘‍♀️</span>
              <div>
                <p className="font-medium">Practice stress management</p>
                <p className="text-sm text-gray-600">Try meditation or deep breathing exercises</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthDashboard;
