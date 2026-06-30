export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      admin_settings: {
        Row: {
          id: string
          setting_key: string
          setting_value: string
          updated_at: string
        }
        Insert: {
          id?: string
          setting_key: string
          setting_value: string
          updated_at?: string
        }
        Update: {
          id?: string
          setting_key?: string
          setting_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      affiliate_clicks: {
        Row: {
          affiliate_id: string | null
          clicked_at: string | null
          hotel_name: string
          hotel_url: string
          id: string
          ip_address: string | null
          referrer: string | null
          user_agent: string | null
        }
        bookings: {
          Row: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            item_type: string | null;
            course_title: string | null;
            preferred_date: string | null;
            experience_level: string | null;
            message: string | null;
            payment_choice: string | null;
            addons: string | null;
            addons_json: string | null;
            addons_total: number | null;
            subtotal_amount: number | null;
            total_payable_now: number | null;
            internal_notes: string | null;
            status: string | null;
            created_at: string | null;
            updated_at: string | null;
          };
          Insert: {
            id?: string;
            name: string;
            email: string;
            phone?: string | null;
            item_type?: string | null;
            course_title?: string | null;
            preferred_date?: string | null;
            experience_level?: string | null;
            message?: string | null;
            payment_choice?: string | null;
            addons?: string | null;
            addons_json?: string | null;
            addons_total?: number | null;
            subtotal_amount?: number | null;
            total_payable_now?: number | null;
            internal_notes?: string | null;
            status?: string | null;
            created_at?: string | null;
            updated_at?: string | null;
          };
          Update: {
            id?: string;
            name?: string;
            email?: string;
            phone?: string | null;
            item_type?: string | null;
            course_title?: string | null;
            preferred_date?: string | null;
            experience_level?: string | null;
            message?: string | null;
            payment_choice?: string | null;
            addons?: string | null;
            addons_json?: string | null;
            addons_total?: number | null;
            subtotal_amount?: number | null;
            total_payable_now?: number | null;
            internal_notes?: string | null;
            status?: string | null;
            created_at?: string | null;
            updated_at?: string | null;
          };
          Relationships: [];
        };
        Insert: {
          affiliate_id?: string | null
          clicked_at?: string | null
          hotel_name: string
          hotel_url: string
          id?: string
          ip_address?: string | null
          referrer?: string | null
          user_agent?: string | null
        }
        Update: {
          affiliate_id?: string | null
          clicked_at?: string | null
          hotel_name?: string
          hotel_url?: string
          id?: string
          ip_address?: string | null
          referrer?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      booking_inquiries: {
        Row: {
          course_title: string
          created_at: string
          email: string
          experience_level: string | null
          id: string
          message: string | null
          name: string
          phone: string | null
          preferred_date: string | null
        }
        Insert: {
          course_title: string
          created_at?: string
          email: string
          experience_level?: string | null
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          preferred_date?: string | null
        }
        Update: {
          course_title?: string
          created_at?: string
          email?: string
          experience_level?: string | null
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          preferred_date?: string | null
        }
        Relationships: []
      }
      page_content: {
        Row: {
          content_type: string
          content_value: string
          created_at: string
          id: string
          locale: string
          page_slug: string
          section_key: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          content_type?: string
          content_value: string
          created_at?: string
          id?: string
          locale?: string
          page_slug: string
          section_key: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          content_type?: string
          content_value?: string
          created_at?: string
          id?: string
          locale?: string
          page_slug?: string
          section_key?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      page_metadata: {
        Row: {
          created_at: string | null
          has_seo: boolean | null
          id: string
          is_secured: boolean | null
          page_slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          has_seo?: boolean | null
          id?: string
          is_secured?: boolean | null
          page_slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          has_seo?: boolean | null
          id?: string
          is_secured?: boolean | null
          page_slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      page_security: {
        Row: {
          allowed_roles: string[] | null
          content_security_policy: string | null
          created_at: string | null
          csrf_protection: boolean | null
          id: string
          ip_whitelist: string | null
          is_secured: boolean | null
          page_slug: string
          rate_limit_enabled: boolean | null
          rate_limit_requests: number | null
          rate_limit_window: number | null
          require_admin: boolean | null
          require_auth: boolean | null
          updated_at: string | null
          updated_by: string | null
          xss_protection: boolean | null
        }
        Insert: {
          allowed_roles?: string[] | null
          content_security_policy?: string | null
          created_at?: string | null
          csrf_protection?: boolean | null
          id?: string
          ip_whitelist?: string | null
          is_secured?: boolean | null
          page_slug: string
          rate_limit_enabled?: boolean | null
          rate_limit_requests?: number | null
          rate_limit_window?: number | null
          require_admin?: boolean | null
          require_auth?: boolean | null
          updated_at?: string | null
          updated_by?: string | null
          xss_protection?: boolean | null
        }
        Update: {
          allowed_roles?: string[] | null
          content_security_policy?: string | null
          created_at?: string | null
          csrf_protection?: boolean | null
          id?: string
          ip_whitelist?: string | null
          is_secured?: boolean | null
          page_slug?: string
          rate_limit_enabled?: boolean | null
          rate_limit_requests?: number | null
          rate_limit_window?: number | null
          require_admin?: boolean | null
          require_auth?: boolean | null
          updated_at?: string | null
          updated_by?: string | null
          xss_protection?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_page_metadata"
            columns: ["page_slug"]
            isOneToOne: true
            referencedRelation: "page_metadata"
            referencedColumns: ["page_slug"]
          },
        ]
      }
      page_seo: {
        Row: {
          canonical_url: string | null
          created_at: string | null
          id: string
          meta_description: string | null
          meta_keywords: string | null
          meta_title: string | null
          og_description: string | null
          og_image: string | null
          og_title: string | null
          og_type: string | null
          page_slug: string
          robots: string | null
          schema_json: Json | null
          schema_type: string | null
          twitter_card: string | null
          twitter_description: string | null
          twitter_image: string | null
          twitter_title: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          canonical_url?: string | null
          created_at?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          og_type?: string | null
          page_slug: string
          robots?: string | null
          schema_json?: Json | null
          schema_type?: string | null
          twitter_card?: string | null
          twitter_description?: string | null
          twitter_image?: string | null
          twitter_title?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          canonical_url?: string | null
          created_at?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          og_type?: string | null
          page_slug?: string
          robots?: string | null
          schema_json?: Json | null
          schema_type?: string | null
          twitter_card?: string | null
          twitter_description?: string | null
          twitter_image?: string | null
          twitter_title?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_page_metadata"
            columns: ["page_slug"]
            isOneToOne: true
            referencedRelation: "page_metadata"
            referencedColumns: ["page_slug"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          experience_level: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          experience_level?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          experience_level?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      course_prices: {
        Row: {
          id: string;
          course: string;
          price_thb: string;
          price_usd: string;
          price_eur: string;
        };
        Insert: {
          id?: string;
          course: string;
          price_thb: string;
          price_usd: string;
          price_eur: string;
        };
        Update: {
          id?: string;
          course?: string;
          price_thb?: string;
          price_usd?: string;
          price_eur?: string;
        };
        Relationships: [];
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
