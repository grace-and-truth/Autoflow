import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Users,
  TrendingUp,
  BookOpen,
  Zap,
  Share2,
  Shield,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Globe,
  Heart,
} from "lucide-react";

export default function Index() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Mail,
      title: "Email Campaigns",
      description:
        "Create and send beautiful email campaigns with advanced automation and personalization.",
      color: "text-blue-500",
    },
    {
      icon: Users,
      title: "Mailing Lists",
      description:
        "Manage subscriber lists with advanced segmentation and targeting capabilities.",
      color: "text-green-500",
    },
    {
      icon: TrendingUp,
      title: "Sales Funnels",
      description:
        "Build high-converting sales funnels with drag-and-drop simplicity.",
      color: "text-purple-500",
    },
    {
      icon: BookOpen,
      title: "Courses & Products",
      description:
        "Sell digital courses and products with integrated payment processing.",
      color: "text-orange-500",
    },
    {
      icon: Zap,
      title: "Webhooks",
      description:
        "Connect with any service using powerful webhook integrations.",
      color: "text-yellow-500",
    },
    {
      icon: Share2,
      title: "Content Repurposing",
      description:
        "Transform your content across multiple channels and formats automatically.",
      color: "text-pink-500",
    },
    {
      icon: BarChart3,
      title: "Workflow Automation",
      description:
        "Automate complex business processes with visual workflow builder.",
      color: "text-indigo-500",
    },
    {
      icon: Heart,
      title: "Affiliate Marketing",
      description:
        "Build and manage your affiliate program with real-time tracking.",
      color: "text-red-500",
    },
  ];

  const stats = [
    { label: "Active Users", value: "50K+", icon: Users },
    { label: "Campaigns Sent", value: "2M+", icon: Mail },
    { label: "Revenue Generated", value: "$10M+", icon: TrendingUp },
    { label: "Integrations", value: "200+", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                AutoFlow
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button
                  size="sm"
                  className="bg-gradient-primary text-white border-0 hover:opacity-90"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            New: AI-Powered Automation
          </Badge>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
            The Complete
            <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Marketing Automation
            </span>
            Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Streamline your marketing with powerful email campaigns, sales
            funnels, course creation, and automation workflows. Everything you
            need to grow your business in one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-primary text-white border-0 hover:opacity-90 px-8 py-6 text-lg h-auto"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg h-auto"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                {" "}
                Scale Your Business
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From email marketing to course creation, our platform provides all
              the tools you need to automate and grow your business.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? "ring-2 ring-primary shadow-lg"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <feature.icon className={`w-8 h-8 ${feature.color} mr-4`} />
                    <div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="lg:pl-12">
              <Card className="border-2 border-primary/20 bg-gradient-secondary">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    {React.createElement(features[activeFeature].icon, {
                      className: `w-12 h-12 ${features[activeFeature].color}`,
                    })}
                    <div>
                      <CardTitle className="text-2xl">
                        {features[activeFeature].title}
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        {features[activeFeature].description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">
                        Advanced analytics and reporting
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">
                        Real-time performance tracking
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">
                        Seamless integrations with 200+ tools
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">24/7 customer support</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="bg-gradient-primary rounded-2xl p-12 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using AutoFlow to automate
              their marketing and scale their operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button
                  size="lg"
                  variant="secondary"
                  className="px-8 py-6 text-lg h-auto bg-white text-primary hover:bg-gray-100"
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg h-auto border-white text-white hover:bg-white/10"
              >
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                AutoFlow
              </span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 AutoFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
