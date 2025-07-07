import { RequestHandler } from "express";
import {
  EmailCampaign,
  CreateCampaignRequest,
  ApiResponse,
  PaginatedResponse,
} from "@shared/api";

// Mock data - In production, use a real database
const campaigns: EmailCampaign[] = [
  {
    id: "1",
    name: "Welcome Series",
    subject: "Welcome to our platform!",
    content: "<h1>Welcome!</h1><p>Thank you for joining us.</p>",
    status: "sent",
    sentAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    openRate: 45.2,
    clickRate: 12.8,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    name: "Product Launch",
    subject: "🚀 New Product Launch - Limited Time Offer",
    content:
      "<h1>Exciting News!</h1><p>We're launching our new product with 20% off!</p>",
    status: "scheduled",
    scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    name: "Newsletter #12",
    subject: "Monthly Newsletter - March Updates",
    content: "<h1>Monthly Update</h1><p>Here's what happened this month...</p>",
    status: "draft",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
];

export const handleGetCampaigns: RequestHandler = (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  const paginatedCampaigns = campaigns.slice(offset, offset + limit);

  const response: ApiResponse<PaginatedResponse<EmailCampaign>> = {
    success: true,
    data: {
      data: paginatedCampaigns,
      total: campaigns.length,
      page,
      limit,
      totalPages: Math.ceil(campaigns.length / limit),
    },
  };

  res.json(response);
};

export const handleCreateCampaign: RequestHandler = (req, res) => {
  const { name, subject, content, scheduledAt } =
    req.body as CreateCampaignRequest;

  const newCampaign: EmailCampaign = {
    id: (campaigns.length + 1).toString(),
    name,
    subject,
    content,
    status: scheduledAt ? "scheduled" : "draft",
    scheduledAt,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  campaigns.push(newCampaign);

  const response: ApiResponse<EmailCampaign> = {
    success: true,
    data: newCampaign,
    message: "Campaign created successfully",
  };

  res.status(201).json(response);
};

export const handleGetCampaign: RequestHandler = (req, res) => {
  const { id } = req.params;
  const campaign = campaigns.find((c) => c.id === id);

  if (!campaign) {
    return res.status(404).json({
      success: false,
      error: "Campaign not found",
    } as ApiResponse);
  }

  const response: ApiResponse<EmailCampaign> = {
    success: true,
    data: campaign,
  };

  res.json(response);
};

export const handleUpdateCampaign: RequestHandler = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const campaignIndex = campaigns.findIndex((c) => c.id === id);

  if (campaignIndex === -1) {
    return res.status(404).json({
      success: false,
      error: "Campaign not found",
    } as ApiResponse);
  }

  campaigns[campaignIndex] = {
    ...campaigns[campaignIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  const response: ApiResponse<EmailCampaign> = {
    success: true,
    data: campaigns[campaignIndex],
    message: "Campaign updated successfully",
  };

  res.json(response);
};

export const handleDeleteCampaign: RequestHandler = (req, res) => {
  const { id } = req.params;
  const campaignIndex = campaigns.findIndex((c) => c.id === id);

  if (campaignIndex === -1) {
    return res.status(404).json({
      success: false,
      error: "Campaign not found",
    } as ApiResponse);
  }

  campaigns.splice(campaignIndex, 1);

  const response: ApiResponse = {
    success: true,
    message: "Campaign deleted successfully",
  };

  res.json(response);
};
