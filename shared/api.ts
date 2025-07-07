/**
 * Shared code between client and server
 * Marketing Automation Platform API Types
 */

// Authentication & Users
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

// Email Campaigns
export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  status: "draft" | "scheduled" | "sent" | "paused";
  scheduledAt?: string;
  sentAt?: string;
  openRate?: number;
  clickRate?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCampaignRequest {
  name: string;
  subject: string;
  content: string;
  scheduledAt?: string;
}

// Mailing Lists
export interface MailingList {
  id: string;
  name: string;
  description: string;
  subscriberCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  tags: string[];
  subscribedAt: string;
  status: "active" | "unsubscribed" | "bounced";
}

// Sales Funnels
export interface SalesFunnel {
  id: string;
  name: string;
  description: string;
  steps: FunnelStep[];
  conversionRate?: number;
  totalRevenue?: number;
  createdAt: string;
  updatedAt: string;
}

export interface FunnelStep {
  id: string;
  name: string;
  type: "landing" | "email" | "product" | "checkout";
  config: Record<string, any>;
  order: number;
}

// Courses & Products
export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  thumbnail?: string;
  lessons: Lesson[];
  enrollmentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  order: number;
  duration?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  images: string[];
  inventory?: number;
  createdAt: string;
  updatedAt: string;
}

// Webhooks
export interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  isActive: boolean;
  secret?: string;
  createdAt: string;
  lastTriggered?: string;
}

export interface WebhookEvent {
  id: string;
  type: string;
  data: Record<string, any>;
  timestamp: string;
}

// Workflows & Automations
export interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: WorkflowTrigger;
  actions: WorkflowAction[];
  isActive: boolean;
  executionCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowTrigger {
  type:
    | "email_opened"
    | "link_clicked"
    | "form_submitted"
    | "date_time"
    | "webhook";
  config: Record<string, any>;
}

export interface WorkflowAction {
  id: string;
  type:
    | "send_email"
    | "add_to_list"
    | "remove_from_list"
    | "update_field"
    | "wait";
  config: Record<string, any>;
  order: number;
}

// Analytics & Reports
export interface DashboardStats {
  totalSubscribers: number;
  activeCampaigns: number;
  totalRevenue: number;
  conversionRate: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  userId?: string;
}

// Affiliate Marketing
export interface Affiliate {
  id: string;
  userId: string;
  commissionRate: number;
  totalEarnings: number;
  referralCode: string;
  status: "active" | "pending" | "suspended";
  createdAt: string;
}

export interface Commission {
  id: string;
  affiliateId: string;
  amount: number;
  currency: string;
  orderId: string;
  status: "pending" | "paid" | "cancelled";
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Legacy demo type for backwards compatibility
export interface DemoResponse {
  message: string;
}
