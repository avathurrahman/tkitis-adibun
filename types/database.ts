export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      ai_usage: {
        Row: {
          completion_tokens: number;
          created_at: string;
          id: string;
          model: string;
          prompt_tokens: number;
          provider: string;
          user_id: string;
        };
        Insert: {
          completion_tokens?: number;
          created_at?: string;
          id?: string;
          model: string;
          prompt_tokens?: number;
          provider: string;
          user_id: string;
        };
        Update: {
          completion_tokens?: number;
          created_at?: string;
          id?: string;
          model?: string;
          prompt_tokens?: number;
          provider?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      audit_logs: {
        Row: {
          actor_email: string;
          actor_user_id: string | null;
          created_at: string;
          description: string;
          id: string;
          metadata: Json | null;
          type: string;
        };
        Insert: {
          actor_email: string;
          actor_user_id?: string | null;
          created_at?: string;
          description: string;
          id?: string;
          metadata?: Json | null;
          type: string;
        };
        Update: {
          actor_email?: string;
          actor_user_id?: string | null;
          created_at?: string;
          description?: string;
          id?: string;
          metadata?: Json | null;
          type?: string;
        };
        Relationships: [];
      };
      payments: {
        Row: {
          amount: number;
          created_at: string;
          currency: string;
          external_id: string;
          id: string;
          items: Json;
          metadata: Json | null;
          paid_at: string | null;
          payment_type: string | null;
          plan: Database["public"]["Enums"]["plan"];
          provider: Database["public"]["Enums"]["payment_provider"];
          status: Database["public"]["Enums"]["payment_status"];
          subscription_id: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          currency?: string;
          external_id: string;
          id?: string;
          items?: Json;
          metadata?: Json | null;
          paid_at?: string | null;
          payment_type?: string | null;
          plan: Database["public"]["Enums"]["plan"];
          provider: Database["public"]["Enums"]["payment_provider"];
          status?: Database["public"]["Enums"]["payment_status"];
          subscription_id?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          currency?: string;
          external_id?: string;
          id?: string;
          items?: Json;
          metadata?: Json | null;
          paid_at?: string | null;
          payment_type?: string | null;
          plan?: Database["public"]["Enums"]["plan"];
          provider?: Database["public"]["Enums"]["payment_provider"];
          status?: Database["public"]["Enums"]["payment_status"];
          subscription_id?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      rate_limit_buckets: {
        Row: {
          count: number;
          created_at: string;
          namespace: string;
          reset_at: string;
          subject_key: string;
          updated_at: string;
        };
        Insert: {
          count?: number;
          created_at?: string;
          namespace: string;
          reset_at: string;
          subject_key: string;
          updated_at?: string;
        };
        Update: {
          count?: number;
          created_at?: string;
          namespace?: string;
          reset_at?: string;
          subject_key?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_path: string | null;
          avatar_url: string | null;
          created_at: string;
          full_name: string | null;
          id: string;
          updated_at: string;
        };
        Insert: {
          avatar_path?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string | null;
          id: string;
          updated_at?: string;
        };
        Update: {
          avatar_path?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string | null;
          id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean;
          canceled_at: string | null;
          created_at: string;
          current_period_end: string | null;
          current_period_start: string | null;
          id: string;
          plan: Database["public"]["Enums"]["plan"];
          status: Database["public"]["Enums"]["subscription_status"];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          cancel_at_period_end?: boolean;
          canceled_at?: string | null;
          created_at?: string;
          current_period_end?: string | null;
          current_period_start?: string | null;
          id?: string;
          plan?: Database["public"]["Enums"]["plan"];
          status?: Database["public"]["Enums"]["subscription_status"];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          cancel_at_period_end?: boolean;
          canceled_at?: string | null;
          created_at?: string;
          current_period_end?: string | null;
          current_period_start?: string | null;
          id?: string;
          plan?: Database["public"]["Enums"]["plan"];
          status?: Database["public"]["Enums"]["subscription_status"];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          role: Database["public"]["Enums"]["app_role"];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          role?: Database["public"]["Enums"]["app_role"];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          role?: Database["public"]["Enums"]["app_role"];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      webhook_events: {
        Row: {
          created_at: string;
          error_message: string | null;
          event_key: string;
          event_type: string;
          external_id: string;
          id: string;
          payload: Json;
          processed_at: string | null;
          provider: Database["public"]["Enums"]["payment_provider"];
          status: Database["public"]["Enums"]["webhook_event_status"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          error_message?: string | null;
          event_key: string;
          event_type: string;
          external_id: string;
          id?: string;
          payload: Json;
          processed_at?: string | null;
          provider: Database["public"]["Enums"]["payment_provider"];
          status?: Database["public"]["Enums"]["webhook_event_status"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          error_message?: string | null;
          event_key?: string;
          event_type?: string;
          external_id?: string;
          id?: string;
          payload?: Json;
          processed_at?: string | null;
          provider?: Database["public"]["Enums"]["payment_provider"];
          status?: Database["public"]["Enums"]["webhook_event_status"];
          updated_at?: string;
        };
        Relationships: [];
      };
      waitlist: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          name?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      admin_payment_metrics: {
        Args: Record<PropertyKey, never>;
        Returns: {
          active_subscriptions: number;
          free_subscriptions: number;
          paid_subscriptions: number;
          total_payments: number;
          total_revenue: number;
        }[];
      };
      admin_revenue_by_day: {
        Args: {
          days_back?: number;
        };
        Returns: {
          date: string;
          revenue: number;
        }[];
      };
      claim_webhook_event: {
        Args: {
          p_event_key: string;
          p_event_type: string;
          p_external_id: string;
          p_payload: Json;
          p_provider: Database["public"]["Enums"]["payment_provider"];
        };
        Returns: {
          created_at: string;
          error_message: string | null;
          event_key: string;
          event_type: string;
          external_id: string;
          id: string;
          payload: Json;
          processed_at: string | null;
          provider: Database["public"]["Enums"]["payment_provider"];
          should_process: boolean;
          status: Database["public"]["Enums"]["webhook_event_status"];
          updated_at: string;
        }[];
      };
      consume_rate_limit: {
        Args: {
          p_limit: number;
          p_namespace: string;
          p_subject_key: string;
          p_window_seconds: number;
        };
        Returns: {
          allowed: boolean;
          limit: number;
          remaining: number;
          reset_at: string;
          retry_after: number;
        }[];
      };
    };
    Enums: {
      app_role: "member" | "admin";
      payment_provider: "MIDTRANS" | "DOKU";
      payment_status: "PENDING" | "PAID" | "FAILED" | "REFUNDED" | "EXPIRED";
      plan: "FREE" | "BASIC" | "PRO" | "ULTIMATE";
      subscription_status: "ACTIVE" | "CANCELED" | "PAST_DUE" | "UNPAID";
      webhook_event_status: "processing" | "processed" | "failed";
    };
    CompositeTypes: Record<string, never>;
  };
};

export type PublicSchema = Database["public"];

export type TableName = keyof PublicSchema["Tables"];

export type Row<T extends TableName> = PublicSchema["Tables"][T]["Row"];
export type InsertDto<T extends TableName> = PublicSchema["Tables"][T]["Insert"];
export type UpdateDto<T extends TableName> = PublicSchema["Tables"][T]["Update"];
export type DbEnum<T extends keyof PublicSchema["Enums"]> = PublicSchema["Enums"][T];
