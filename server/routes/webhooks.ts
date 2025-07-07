import { RequestHandler } from "express";
import {
  Webhook,
  WebhookEvent,
  ApiResponse,
  PaginatedResponse,
} from "@shared/api";

// Mock data - In production, use a real database
const webhooks: Webhook[] = [
  {
    id: "1",
    name: "Campaign Events",
    url: "https://api.example.com/webhooks/campaigns",
    events: ["campaign.sent", "campaign.opened", "campaign.clicked"],
    isActive: true,
    secret: "webhook_secret_123",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    lastTriggered: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    name: "User Registration",
    url: "https://crm.example.com/webhooks/users",
    events: ["user.registered", "user.updated"],
    isActive: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    lastTriggered: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
];

const webhookEvents: WebhookEvent[] = [
  {
    id: "1",
    type: "campaign.sent",
    data: { campaignId: "1", recipientCount: 1250 },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    type: "user.registered",
    data: { userId: "123", email: "newuser@example.com" },
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
];

export const handleGetWebhooks: RequestHandler = (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  const paginatedWebhooks = webhooks.slice(offset, offset + limit);

  const response: ApiResponse<PaginatedResponse<Webhook>> = {
    success: true,
    data: {
      data: paginatedWebhooks,
      total: webhooks.length,
      page,
      limit,
      totalPages: Math.ceil(webhooks.length / limit),
    },
  };

  res.json(response);
};

export const handleCreateWebhook: RequestHandler = (req, res) => {
  const { name, url, events } = req.body;

  const newWebhook: Webhook = {
    id: (webhooks.length + 1).toString(),
    name,
    url,
    events,
    isActive: true,
    secret: `webhook_secret_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  webhooks.push(newWebhook);

  const response: ApiResponse<Webhook> = {
    success: true,
    data: newWebhook,
    message: "Webhook created successfully",
  };

  res.status(201).json(response);
};

export const handleUpdateWebhook: RequestHandler = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const webhookIndex = webhooks.findIndex((w) => w.id === id);

  if (webhookIndex === -1) {
    return res.status(404).json({
      success: false,
      error: "Webhook not found",
    } as ApiResponse);
  }

  webhooks[webhookIndex] = {
    ...webhooks[webhookIndex],
    ...updates,
  };

  const response: ApiResponse<Webhook> = {
    success: true,
    data: webhooks[webhookIndex],
    message: "Webhook updated successfully",
  };

  res.json(response);
};

export const handleDeleteWebhook: RequestHandler = (req, res) => {
  const { id } = req.params;
  const webhookIndex = webhooks.findIndex((w) => w.id === id);

  if (webhookIndex === -1) {
    return res.status(404).json({
      success: false,
      error: "Webhook not found",
    } as ApiResponse);
  }

  webhooks.splice(webhookIndex, 1);

  const response: ApiResponse = {
    success: true,
    message: "Webhook deleted successfully",
  };

  res.json(response);
};

export const handleWebhookEvents: RequestHandler = (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  const paginatedEvents = webhookEvents.slice(offset, offset + limit);

  const response: ApiResponse<PaginatedResponse<WebhookEvent>> = {
    success: true,
    data: {
      data: paginatedEvents,
      total: webhookEvents.length,
      page,
      limit,
      totalPages: Math.ceil(webhookEvents.length / limit),
    },
  };

  res.json(response);
};

// Handle incoming webhook (for testing)
export const handleIncomingWebhook: RequestHandler = (req, res) => {
  const eventType = (req.headers["x-event-type"] as string) || "unknown";
  const data = req.body;

  const newEvent: WebhookEvent = {
    id: (webhookEvents.length + 1).toString(),
    type: eventType,
    data,
    timestamp: new Date().toISOString(),
  };

  webhookEvents.unshift(newEvent);

  // Keep only last 100 events
  if (webhookEvents.length > 100) {
    webhookEvents.splice(100);
  }

  const response: ApiResponse = {
    success: true,
    message: "Webhook received successfully",
  };

  res.json(response);
};
