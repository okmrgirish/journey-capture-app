import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Car, Bike, Footprints, Plane, Bus } from "lucide-react";
import TripForm from "@/components/TripForm";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'form' | 'dashboard'>('home');

  const features = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "GPS Tracking",
      description: "Automatic origin and destination capture with precise location data"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Real-time Collection",
      description: "Background services capture trips automatically with timestamps"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Trip Details",
      description: "Capture purpose, travelers count, and transportation modes"
    },
    {
      icon: <Car className="h-6 w-6" />,
      title: "Mode Detection",
      description: "AI-powered detection of walking, driving, cycling, and public transport"
    }
  ];

  const transportModes = [
    { icon: <Car className="h-5 w-5" />, name: "Driving", color: "bg-primary" },
    { icon: <Footprints className="h-5 w-5" />, name: "Walking", color: "bg-success" },
    { icon: <Bike className="h-5 w-5" />, name: "Cycling", color: "bg-warning" },
    { icon: <Bus className="h-5 w-5" />, name: "Public Transit", color: "bg-accent" },
  ];

  if (currentView === 'form') {
    return <TripForm onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'dashboard') {
    return <Dashboard onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 px-4 py-2">
              <MapPin className="h-4 w-4 mr-2" />
              NATPAC Research Platform
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Trip Data Collection
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Advanced mobile platform for transportation research data collection. 
              Capture detailed trip patterns, modes, and behaviors for urban planning insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gradient-transport shadow-transport hover:shadow-lg transition-all"
                onClick={() => setCurrentView('form')}
              >
                Start Trip Collection
                <MapPin className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setCurrentView('dashboard')}
              >
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Transportation Modes */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-semibold text-center mb-8">Supported Transportation Modes</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {transportModes.map((mode, index) => (
              <div key={index} className="flex items-center gap-3 px-6 py-3 rounded-full border shadow-sm">
                <div className={`p-2 rounded-full text-white ${mode.color}`}>
                  {mode.icon}
                </div>
                <span className="font-medium">{mode.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Advanced Data Collection Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools for capturing accurate transportation data with minimal user intervention
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-data hover:shadow-lg transition-all border-0 gradient-data text-white">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/90">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Impact */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">For NATPAC Scientists</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-bold gradient-transport bg-clip-text text-transparent mb-2">
                Real-time
              </div>
              <p className="text-muted-foreground">Data collection with GPS precision</p>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-transport bg-clip-text text-transparent mb-2">
                Automated
              </div>
              <p className="text-muted-foreground">Background trip detection</p>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-transport bg-clip-text text-transparent mb-2">
                Secure
              </div>
              <p className="text-muted-foreground">Privacy-first data handling</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;