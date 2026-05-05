export type Customer = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  style_preference?: string;
  budget?: number;
  status: "lead" | "active" | "completed" | "hold";
  notes?: string;
  created_at: string;
  updated_at: string;
};

export type Estimate = {
  id: string;
  customer_id: string;
  project_type: string;
  space_size?: number;
  requirements?: string;
  ai_result?: string;
  final_amount?: number;
  status: "draft" | "sent" | "approved" | "rejected";
  created_at: string;
};

export type Proposal = {
  id: string;
  customer_id: string;
  style_keyword?: string;
  room_type?: string;
  budget_range?: string;
  ai_result?: string;
  created_at: string;
};

export type SnsContent = {
  id: string;
  image_url?: string;
  project_type?: string;
  style_tag?: string;
  ai_caption?: string;
  platform: "instagram" | "blog" | "both";
  status: "draft" | "published";
  created_at: string;
};

export type Partner = {
  id: string;
  name: string;
  category: string;
  contact?: string;
  region?: string;
  specialty?: string;
  rating?: number;
  notes?: string;
  created_at: string;
};
