import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AccessibilityToggle from "@/components/AccessibilityToggle";
import DemoContent from "@/components/DemoContent";
import TextToSpeech from "@/components/TextToSpeech";
import { Eye, Brain, Focus, Palette, ArrowRight, CheckCircle } from "lucide-react";

const Index = () => {
  const [dyslexiaMode, setDyslexiaMode] = useState(false);
  const [adhdMode, setAdhdMode] = useState(false);
  const [lowVisionMode, setLowVisionMode] = useState(false);

  // Apply accessibility modes to document body
  useEffect(() => {
    const body = document.body;
    
    // Remove all mode classes first
    body.classList.remove('dyslexia-mode', 'adhd-mode', 'low-vision-mode');
    
    // Apply active modes
    if (dyslexiaMode) body.classList.add('dyslexia-mode');
    if (adhdMode) body.classList.add('adhd-mode');
    if (lowVisionMode) body.classList.add('low-vision-mode');
    
    return () => {
      body.classList.remove('dyslexia-mode', 'adhd-mode', 'low-vision-mode');
    };
  }, [dyslexiaMode, adhdMode, lowVisionMode]);

  const demoText = "Web accessibility ensures that websites and applications are usable by everyone, including people with disabilities. This includes visual, auditory, motor, and cognitive impairments that affect how people interact with digital content.";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-primary bg-[length:200%_200%] animate-gradient-x">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 text-center text-white">
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
            Live Demo
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Accessibility
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Modes Demo
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-white/90">
            Experience how different accessibility modes transform web content for users with disabilities. 
            Toggle the modes below to see real-time changes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Try It Now <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <TextToSpeech 
              text="Welcome to our Accessibility Modes Demo. Experience how different accessibility features can transform web content for users with disabilities."
              enabled={dyslexiaMode}
            />
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Accessibility Controls
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Toggle these modes to see how they adapt the content below for different accessibility needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <AccessibilityToggle
              id="dyslexia"
              label="Dyslexia Mode"
              description="Changes font to OpenDyslexic, increases spacing, and enables text-to-speech for better readability."
              checked={dyslexiaMode}
              onChange={setDyslexiaMode}
              icon={<Brain className="w-5 h-5" />}
            />
            
            <AccessibilityToggle
              id="adhd"
              label="ADHD Mode"
              description="Reduces distractions by highlighting focus areas and simplifying the interface layout."
              checked={adhdMode}
              onChange={setAdhdMode}
              icon={<Focus className="w-5 h-5" />}
            />
            
            <AccessibilityToggle
              id="low-vision"
              label="Low Vision Mode"
              description="Increases text size, improves contrast, and uses high-contrast colors for better visibility."
              checked={lowVisionMode}
              onChange={setLowVisionMode}
              icon={<Eye className="w-5 h-5" />}
            />
          </div>
        </div>
      </section>

      {/* Demo Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Live Content Preview
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch how the content transforms in real-time as you enable different accessibility modes.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <DemoContent 
              dyslexiaMode={dyslexiaMode}
              adhdMode={adhdMode}
              lowVisionMode={lowVisionMode}
            />
            
            {dyslexiaMode && (
              <div className="mt-6 flex justify-center">
                <TextToSpeech text={demoText} enabled={dyslexiaMode} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Each Mode Does
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <Brain className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>Dyslexia Support</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    OpenDyslexic font
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Increased letter spacing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Text-to-speech functionality
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Warm color palette
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Focus className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>ADHD Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Reduced visual clutter
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Focus highlighting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Calming color scheme
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Simplified layouts
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Eye className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>Low Vision Aid</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    High contrast colors
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Larger text size
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Improved readability
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Bold typography
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Built with accessibility in mind. Experience the difference inclusive design makes.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;