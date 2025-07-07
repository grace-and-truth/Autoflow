import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, Sparkles } from "lucide-react";

export default function Campaigns() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="flex items-center space-x-2 ml-8">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  AutoFlow
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <Mail className="w-16 h-16 mx-auto text-primary mb-4" />
            <CardTitle className="text-2xl">Email Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              This page is under construction. The email campaigns feature will
              allow you to create, manage, and track your email marketing
              campaigns with advanced automation and analytics.
            </p>
            <div className="space-y-4">
              <p className="text-sm font-medium text-left">Coming soon:</p>
              <ul className="text-sm text-left space-y-2 text-muted-foreground">
                <li>• Drag-and-drop email builder</li>
                <li>• Advanced audience segmentation</li>
                <li>• A/B testing capabilities</li>
                <li>• Real-time analytics and reporting</li>
                <li>• Automated drip campaigns</li>
                <li>• Personalization and dynamic content</li>
              </ul>
            </div>
            <Link to="/dashboard" className="mt-6 inline-block">
              <Button>Return to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
