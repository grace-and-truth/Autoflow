import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleLogin, handleRegister, handleGetProfile } from "./routes/auth";
import {
  handleGetCampaigns,
  handleCreateCampaign,
  handleGetCampaign,
  handleUpdateCampaign,
  handleDeleteCampaign,
} from "./routes/campaigns";
import {
  handleGetWebhooks,
  handleCreateWebhook,
  handleUpdateWebhook,
  handleDeleteWebhook,
  handleWebhookEvents,
  handleIncomingWebhook,
} from "./routes/webhooks";
import { handleGetDashboardStats } from "./routes/dashboard";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Marketing Automation Platform API v1.0" });
  });

  // Legacy demo route
  app.get("/api/demo", handleDemo);

  // Authentication routes
  app.post("/api/auth/login", handleLogin);
  app.post("/api/auth/register", handleRegister);
  app.get("/api/auth/profile", handleGetProfile);

  // Dashboard routes
  app.get("/api/dashboard/stats", handleGetDashboardStats);

  // Campaign routes
  app.get("/api/campaigns", handleGetCampaigns);
  app.post("/api/campaigns", handleCreateCampaign);
  app.get("/api/campaigns/:id", handleGetCampaign);
  app.put("/api/campaigns/:id", handleUpdateCampaign);
  app.delete("/api/campaigns/:id", handleDeleteCampaign);

  // Webhook routes
  app.get("/api/webhooks", handleGetWebhooks);
  app.post("/api/webhooks", handleCreateWebhook);
  app.put("/api/webhooks/:id", handleUpdateWebhook);
  app.delete("/api/webhooks/:id", handleDeleteWebhook);
  app.get("/api/webhooks/events", handleWebhookEvents);
  app.post("/api/webhooks/incoming", handleIncomingWebhook);

  return app;
}
