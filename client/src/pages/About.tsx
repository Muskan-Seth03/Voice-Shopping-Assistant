import React from 'react';
import { Mic, Brain, Zap, Shield, Users, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export function About() {
  const features = [
    {
      icon: <Mic className="h-8 w-8 text-blue-600" />,
      title: "Voice Recognition",
      description: "Advanced speech recognition technology that understands natural language commands with high accuracy."
    },
    {
      icon: <Brain className="h-8 w-8 text-purple-600" />,
      title: "Smart Suggestions", 
      description: "AI-powered recommendations based on your shopping patterns and preferences."
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Lightning Fast",
      description: "Add items to your shopping list in seconds with simple voice commands."
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Privacy First",
      description: "Your data is secure and private. We never store your personal information."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "50+", label: "Languages" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About ShopVoice
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're revolutionizing the way people create shopping lists through the power of voice technology. 
          Our mission is to make grocery shopping more efficient, accessible, and enjoyable for everyone.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose ShopVoice?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  {feature.icon}
                  <span>{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            At ShopVoice, we believe that technology should simplify daily tasks, not complicate them. 
            Our voice-powered shopping assistant is designed to understand natural language, making it 
            accessible to users of all ages and technical backgrounds. We're committed to continuous 
            innovation while maintaining the highest standards of privacy and security.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Built by Experts</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          Our team consists of experienced engineers, designers, and AI specialists who are passionate 
          about creating intuitive and powerful voice interfaces. We're backed by cutting-edge research 
          in natural language processing and machine learning.
        </p>
        <div className="flex justify-center space-x-4">
          <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="text-blue-800 font-medium">Expert Team</span>
          </div>
          <div className="flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full">
            <Award className="h-5 w-5 text-purple-600" />
            <span className="text-purple-800 font-medium">Award Winning</span>
          </div>
        </div>
      </div>
    </div>
  );
}