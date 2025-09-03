import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, BarChart3, MapPin, Clock, TrendingUp, Users, Car, Footprints, Bike, Bus } from "lucide-react";

interface DashboardProps {
  onBack: () => void;
}

const Dashboard = ({ onBack }: DashboardProps) => {
  // Mock data for demonstration
  const mockTrips = [
    {
      id: 1,
      date: "2024-01-15",
      origin: "Home - Downtown Residency",
      destination: "Office Complex - Tech Park",
      mode: "Driving",
      purpose: "Work/Business",
      duration: "25 min",
      distance: "12.5 km",
      travelers: 1
    },
    {
      id: 2,
      date: "2024-01-15",
      origin: "Tech Park",
      destination: "Central Mall",
      mode: "Walking",
      purpose: "Shopping",
      duration: "8 min",
      distance: "0.6 km",
      travelers: 2
    },
    {
      id: 3,
      date: "2024-01-14",
      origin: "Home",
      destination: "Metro Station",
      mode: "Cycling",
      purpose: "Public Transit",
      duration: "12 min",
      distance: "3.2 km",
      travelers: 1
    },
  ];

  const stats = {
    totalTrips: 156,
    totalDistance: "2,347 km",
    totalDuration: "89 hrs",
    avgTripLength: "15.1 km",
    mostCommonMode: "Driving",
    peakHour: "8:00 AM"
  };

  const modeDistribution = [
    { mode: "Driving", count: 89, percentage: 57, color: "bg-primary", icon: <Car className="h-4 w-4" /> },
    { mode: "Walking", count: 34, percentage: 22, color: "bg-success", icon: <Footprints className="h-4 w-4" /> },
    { mode: "Cycling", count: 21, percentage: 13, color: "bg-warning", icon: <Bike className="h-4 w-4" /> },
    { mode: "Public Transit", count: 12, percentage: 8, color: "bg-accent", icon: <Bus className="h-4 w-4" /> },
  ];

  const getModeColor = (mode: string) => {
    const modeMap: { [key: string]: string } = {
      "Driving": "bg-primary",
      "Walking": "bg-success",
      "Cycling": "bg-warning",
      "Public Transit": "bg-accent"
    };
    return modeMap[mode] || "bg-muted";
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Research Dashboard</h1>
              <p className="text-muted-foreground">Trip data analysis for NATPAC scientists</p>
            </div>
          </div>
          <Button className="gradient-transport">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold gradient-transport bg-clip-text text-transparent">
                {stats.totalTrips}
              </div>
              <p className="text-sm text-muted-foreground">Total Trips</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold gradient-transport bg-clip-text text-transparent">
                {stats.totalDistance}
              </div>
              <p className="text-sm text-muted-foreground">Distance</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold gradient-transport bg-clip-text text-transparent">
                {stats.totalDuration}
              </div>
              <p className="text-sm text-muted-foreground">Duration</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold gradient-transport bg-clip-text text-transparent">
                {stats.avgTripLength}
              </div>
              <p className="text-sm text-muted-foreground">Avg Length</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold gradient-transport bg-clip-text text-transparent">
                {stats.mostCommonMode}
              </div>
              <p className="text-sm text-muted-foreground">Top Mode</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold gradient-transport bg-clip-text text-transparent">
                {stats.peakHour}
              </div>
              <p className="text-sm text-muted-foreground">Peak Hour</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trips">Trip History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Mode Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Transportation Mode Distribution
                </CardTitle>
                <CardDescription>
                  Analysis of transportation preferences across all recorded trips
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modeDistribution.map((item) => (
                    <div key={item.mode} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded ${item.color} text-white`}>
                          {item.icon}
                        </div>
                        <span className="font-medium">{item.mode}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-12 text-right">
                          {item.count} trips
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Trip Activity</CardTitle>
                <CardDescription>Latest recorded trips</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockTrips.slice(0, 3).map((trip) => (
                    <div key={trip.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${getModeColor(trip.mode)}`} />
                        <div>
                          <p className="font-medium">{trip.origin} → {trip.destination}</p>
                          <p className="text-sm text-muted-foreground">
                            {trip.mode} • {trip.purpose} • {trip.duration}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">{trip.date}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trips" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Recorded Trips</CardTitle>
                <CardDescription>Complete history of collected trip data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTrips.map((trip) => (
                    <div key={trip.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={getModeColor(trip.mode)}>
                            {trip.mode}
                          </Badge>
                          <Badge variant="outline">{trip.purpose}</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{trip.date}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">From:</p>
                            <p className="text-muted-foreground">{trip.origin}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">To:</p>
                            <p className="text-muted-foreground">{trip.destination}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Duration:</p>
                            <p className="text-muted-foreground">{trip.duration}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Travelers:</p>
                            <p className="text-muted-foreground">{trip.travelers}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Trip Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">Peak Travel Times</p>
                      <p className="text-sm text-muted-foreground">8:00 AM - 9:00 AM (37 trips)</p>
                      <p className="text-sm text-muted-foreground">5:00 PM - 6:00 PM (42 trips)</p>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">Common Routes</p>
                      <p className="text-sm text-muted-foreground">Home ↔ Office (67 trips)</p>
                      <p className="text-sm text-muted-foreground">Office ↔ Shopping Centers (23 trips)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Research Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">Modal Split Analysis</p>
                      <p className="text-sm text-muted-foreground">Private vehicles: 57%</p>
                      <p className="text-sm text-muted-foreground">Active transport: 35%</p>
                      <p className="text-sm text-muted-foreground">Public transit: 8%</p>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">Trip Purpose Distribution</p>
                      <p className="text-sm text-muted-foreground">Work/Business: 45%</p>
                      <p className="text-sm text-muted-foreground">Shopping: 25%</p>
                      <p className="text-sm text-muted-foreground">Recreation: 30%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;