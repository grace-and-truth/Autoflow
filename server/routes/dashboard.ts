import { RequestHandler } from "express";
import { DashboardStats, ApiResponse } from "@shared/api";

export const handleGetDashboardStats: RequestHandler = (req, res) => {
  // Mock dashboard statistics
  const stats: DashboardStats = {
    totalSubscribers: 12547,
    activeCampaigns: 8,
    totalRevenue: 145678.9,
    conversionRate: 3.45,
    recentActivity: [
      {
        id: "1",
        type: "campaign_sent",
        description: "Welcome Series campaign sent to 1,250 subscribers",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        userId: "1",
      },
      {
        id: "2",
        type: "new_subscriber",
        description: "New subscriber joined: john.doe@example.com",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "3",
        type: "purchase",
        description:
          "Course 'Advanced Marketing' purchased by jane.smith@example.com",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "4",
        type: "webhook_triggered",
        description: "Campaign Events webhook triggered successfully",
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "5",
        type: "funnel_conversion",
        description: "Lead converted in 'Product Launch' funnel",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      },
    ],
  };

  const response: ApiResponse<DashboardStats> = {
    success: true,
    data: stats,
  };

  res.json(response);
};
