
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Brain, Send, User, Bot, Heart, AlertTriangle, Lightbulb } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'suggestion' | 'warning' | 'info';
}

const AIHealthAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI Health Assistant. I can help you with medication reminders, health tips, and answer questions about your conditions. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'info'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const getAIResponse = (userInput: string): { text: string; type?: 'suggestion' | 'warning' | 'info' } => {
    const input = userInput.toLowerCase();
    
    if (input.includes('diabetes') || input.includes('blood sugar')) {
      return {
        text: "For diabetes management: 📊 Monitor your blood sugar regularly, 💊 take medications as prescribed, 🥗 maintain a balanced diet with controlled carbs, and 🚶‍♂️ exercise regularly. Would you like specific meal suggestions or exercise routines?",
        type: 'suggestion'
      };
    } else if (input.includes('heart') || input.includes('cardiac') || input.includes('chest pain')) {
      return {
        text: "⚠️ For heart-related concerns: Take prescribed medications on time, avoid excessive salt, exercise moderately, and manage stress. If you're experiencing chest pain, shortness of breath, or unusual symptoms, seek immediate medical attention!",
        type: 'warning'
      };
    } else if (input.includes('headache') || input.includes('migraine')) {
      return {
        text: "For headache relief: 💧 Stay hydrated, 😴 ensure adequate sleep, 🧘‍♀️ practice relaxation techniques, and 💊 take pain relievers as needed. Track triggers like stress, certain foods, or lack of sleep.",
        type: 'suggestion'
      };
    } else if (input.includes('medication') || input.includes('pill') || input.includes('medicine')) {
      return {
        text: "Medication reminders: 📅 Set consistent daily schedules, 📱 use apps like this one, 💊 organize pills in weekly containers, and 📝 keep a medication diary. Never skip doses without consulting your doctor!",
        type: 'info'
      };
    } else if (input.includes('side effects') || input.includes('reaction')) {
      return {
        text: "⚠️ If experiencing side effects: Document symptoms, note timing with medications, contact your healthcare provider, and never stop medications abruptly without medical guidance. Serious reactions require immediate medical attention!",
        type: 'warning'
      };
    } else if (input.includes('exercise') || input.includes('workout')) {
      return {
        text: "🏃‍♂️ Safe exercise tips: Start slowly, listen to your body, stay hydrated, and consult your doctor about exercise limitations. Activities like walking, swimming, and gentle yoga are often great starting points!",
        type: 'suggestion'
      };
    } else if (input.includes('diet') || input.includes('nutrition') || input.includes('food')) {
      return {
        text: "🥗 Nutrition advice: Focus on whole foods, plenty of vegetables, lean proteins, and whole grains. Limit processed foods, excessive sugar, and sodium. Consider consulting a nutritionist for personalized meal plans!",
        type: 'suggestion'
      };
    } else {
      return {
        text: "I'm here to help with health-related questions! I can provide information about medications, symptoms, diet, exercise, and general wellness. What specific health topic would you like to discuss?",
        type: 'info'
      };
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponseData = getAIResponse(inputText);
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponseData.text,
        sender: 'ai',
        timestamp: new Date(),
        type: aiResponseData.type
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      toast({
        title: "AI Response Ready! 🤖",
        description: "I've provided some helpful information for you.",
      });
    }, 1500);
  };

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'suggestion': return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      case 'info': return <Brain className="w-4 h-4 text-blue-500" />;
      default: return <Bot className="w-4 h-4 text-purple-500" />;
    }
  };

  const quickQuestions = [
    "How do I manage diabetes?",
    "What are heart-healthy foods?",
    "Medication side effects help",
    "Safe exercise routines",
    "Headache relief tips"
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-purple-600" />
            <span>AI Health Assistant</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              🟢 Online
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Quick Questions */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-3 text-gray-600">Quick Questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputText(question)}
                  className="text-xs hover:bg-purple-50"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto bg-white rounded-lg p-4 mb-4 border">
            {messages.map((message) => (
              <div key={message.id} className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : message.type === 'warning'
                    ? 'bg-red-50 text-red-800 border border-red-200'
                    : message.type === 'suggestion'
                    ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.sender === 'ai' && getMessageIcon(message.type)}
                    {message.sender === 'user' && <User className="w-4 h-4 text-white" />}
                    <div>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-purple-500" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex space-x-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask me about your health, medications, or symptoms..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIHealthAssistant;
