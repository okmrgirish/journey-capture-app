import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Users, Target, Save, Locate } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TripFormProps {
  onBack: () => void;
}

const TripForm = ({ onBack }: TripFormProps) => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    purpose: "",
    mode: "",
    travelers: "1",
    notes: "",
    startTime: "",
    endTime: ""
  });

  const transportModes = [
    "Walking", "Driving", "Cycling", "Public Transit", "Motorcycle", "Other"
  ];

  const tripPurposes = [
    "Work/Business", "Shopping", "Personal Care", "Education", 
    "Recreation", "Social/Family", "Medical", "Other"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    const now = new Date().toLocaleTimeString();
    handleInputChange('startTime', now);
    
    toast({
      title: "Trip Recording Started",
      description: "GPS tracking is now active. Your location data is being collected securely.",
    });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    const now = new Date().toLocaleTimeString();
    handleInputChange('endTime', now);
    
    toast({
      title: "Trip Recording Stopped",
      description: "Trip data has been captured. Please complete the form details.",
    });
  };

  const handleSaveTrip = () => {
    // In a real app, this would save to database via Supabase
    toast({
      title: "Trip Saved Successfully",
      description: "Your trip data has been recorded for NATPAC research.",
    });
    onBack();
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Trip Data Collection</h1>
            <p className="text-muted-foreground">Record your journey details</p>
          </div>
        </div>

        {/* Recording Status */}
        <Card className="mb-6 border-2 border-dashed">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-success animate-pulse' : 'bg-muted'}`} />
                <span className="font-medium">
                  {isRecording ? 'Recording Trip...' : 'Trip Recording Stopped'}
                </span>
              </div>
              {!isRecording ? (
                <Button onClick={handleStartRecording} className="gradient-transport">
                  <Locate className="h-4 w-4 mr-2" />
                  Start Recording
                </Button>
              ) : (
                <Button variant="outline" onClick={handleStopRecording}>
                  Stop Recording
                </Button>
              )}
            </div>
            {isRecording && (
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  GPS tracking active • Started at {formData.startTime}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Location Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location Details
            </CardTitle>
            <CardDescription>
              Enter or verify your trip origin and destination
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="origin">Origin</Label>
              <Input
                id="origin"
                placeholder="Starting location..."
                value={formData.origin}
                onChange={(e) => handleInputChange('origin', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                placeholder="Ending location..."
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Trip Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Trip Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="purpose">Trip Purpose</Label>
              <Select value={formData.purpose} onValueChange={(value) => handleInputChange('purpose', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select trip purpose..." />
                </SelectTrigger>
                <SelectContent>
                  {tripPurposes.map((purpose) => (
                    <SelectItem key={purpose} value={purpose}>
                      {purpose}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="mode">Transportation Mode</Label>
              <Select value={formData.mode} onValueChange={(value) => handleInputChange('mode', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transportation mode..." />
                </SelectTrigger>
                <SelectContent>
                  {transportModes.map((mode) => (
                    <SelectItem key={mode} value={mode}>
                      {mode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="travelers">Number of Travelers</Label>
              <Select value={formData.travelers} onValueChange={(value) => handleInputChange('travelers', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Person' : 'People'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional trip details or observations..."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Time Information */}
        {(formData.startTime || formData.endTime) && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Timing Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {formData.startTime && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium">Start Time</p>
                    <p className="text-lg">{formData.startTime}</p>
                  </div>
                )}
                {formData.endTime && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium">End Time</p>
                    <p className="text-lg">{formData.endTime}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Save Button */}
        <div className="flex gap-3">
          <Button 
            onClick={handleSaveTrip} 
            className="flex-1 gradient-transport shadow-transport"
            disabled={!formData.origin || !formData.destination}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Trip Data
          </Button>
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TripForm;