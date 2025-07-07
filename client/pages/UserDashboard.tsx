import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, DashboardStats } from "@shared/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Mail,
  TrendingUp,
  DollarSign,
  Bell,
  Search,
  Plus,
  Activity,
  Zap,
  BookOpen,
  Users,
  BarChart3,
  Sparkles,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

interface UserDashboardProps {
  user: User;
}

export default function UserDashboard({ user }: UserDashboardProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/dashboard/stats");
        const data = await response.json();
        if (data.success) {
          // Simulate user-specific stats (in production, this would be filtered)
          setStats({
            ...data.data,
            totalSubscribers: Math.floor(data.data.totalSubscribers * 0.1),
            activeCampaigns: Math.floor(data.data.activeCampaigns * 0.6),
            totalRevenue: Math.floor(data.data.totalRevenue * 0.05),
            conversionRate: data.data.conversionRate * 0.8,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const quickActions = [
    {
      title: "Create Campaign",
      description: "Send email to your list",
      icon: Mail,
      href: "/campaigns/new",
      color: "text-blue-500",
    },
    {
      title: "View Analytics",
      description: "Check performance",
      icon: BarChart3,
      href: "/analytics",
      color: "text-green-500",
    },
    {
      title: "Manage Lists",
      description: "Update subscribers",
      icon: Users,
      href: "/lists",
      color: "text-purple-500",
    },
    {
      title: "Automations",
      description: "Set up workflows",
      icon: Zap,
      href: "/automations",
      color: "text-yellow-500",
    },
  ];

  const recentCampaigns = [
    {
      id: "1",
      name: "Welcome Series",
      status: "sent",
      openRate: 45.2,
      clickRate: 12.8,
      sentAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Product Launch",
      status: "scheduled",
      scheduledAt: "2024-01-20",
    },
    {
      id: "3",
      name: "Newsletter #12",
      status: "draft",
      progress: 75,
    },
  ];

  const goals = [
    {
      title: "Monthly Subscribers",
      current: 1254,
      target: 1500,
      unit: "subscribers",
    },
    {
      title: "Email Open Rate",
      current: 24.5,
      target: 30,
      unit: "%",
    },
    {
      title: "Revenue Goal",
      current: 7200,
      target: 10000,
      unit: "$",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  AutoFlow
                </span>
              </Link>
              <Badge variant="outline" className="ml-4">
                My Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                {user.name}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Good morning, {user.name}!
          </h1>
          <p className="text-muted-foreground">
            Ready to grow your business today? Here's your marketing overview.
          </p>
        </div>

        {/* Stats Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  My Subscribers
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalSubscribers.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">+23 this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Campaigns
                </CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.activeCampaigns}
                </div>
                <p className="text-xs text-muted-foreground">
                  1 scheduled tomorrow
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${stats.totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  +15% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Conversion Rate
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.conversionRate?.toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">Above average</p>
              </CardContent>
            </Card>
          </div>
        ) : null}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Quick Actions</span>
                </CardTitle>
                <CardDescription>
                  Get started with these common tasks.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Link key={index} to={action.href}>
                      <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer group">
                        <CardContent className="flex items-center space-x-4 p-4">
                          <action.icon
                            className={`w-8 h-8 ${action.color} group-hover:scale-110 transition-transform`}
                          />
                          <div>
                            <h3 className="font-semibold">{action.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {action.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Campaigns */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Recent Campaigns</span>
                </CardTitle>
                <CardDescription>
                  Your latest email campaigns and their performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCampaigns.map((campaign, index) => (
                    <div
                      key={campaign.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {campaign.status === "sent" && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        {campaign.status === "scheduled" && (
                          <Clock className="w-5 h-5 text-blue-500" />
                        )}
                        {campaign.status === "draft" && (
                          <AlertCircle className="w-5 h-5 text-yellow-500" />
                        )}
                        <div>
                          <p className="font-medium">{campaign.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {campaign.status === "sent" &&
                              `Sent on ${campaign.sentAt}`}
                            {campaign.status === "scheduled" &&
                              `Scheduled for ${campaign.scheduledAt}`}
                            {campaign.status === "draft" &&
                              `${campaign.progress}% complete`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {campaign.status === "sent" && (
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              {campaign.openRate}% open
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {campaign.clickRate}% click
                            </p>
                          </div>
                        )}
                        {campaign.status === "draft" && (
                          <Progress
                            value={campaign.progress}
                            className="w-20"
                          />
                        )}
                        {campaign.status === "scheduled" && (
                          <Badge variant="outline">Scheduled</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Goals & Progress */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Monthly Goals</span>
                </CardTitle>
                <CardDescription>
                  Track your progress towards monthly targets.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {goals.map((goal, index) => {
                  const percentage = (goal.current / goal.target) * 100;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {goal.title}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {goal.current.toLocaleString()}
                          {goal.unit} / {goal.target.toLocaleString()}
                          {goal.unit}
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {percentage.toFixed(0)}% of monthly goal
                      </p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Tips & Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Tips & Resources</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">
                    Improve Open Rates
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Try personalizing your subject lines to increase engagement.
                  </p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-medium text-green-900 dark:text-green-100">
                    Segment Your Lists
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Create targeted campaigns for better conversion rates.
                  </p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h4 className="font-medium text-purple-900 dark:text-purple-100">
                    New Feature
                  </h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                    Try our new AI-powered content suggestions!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
