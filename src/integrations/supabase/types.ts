export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          created_at: string | null
          device_type: string | null
          event_name: string
          event_type: string
          id: string
          ip_address: unknown | null
          page_url: string | null
          properties: Json | null
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          event_name: string
          event_type: string
          id?: string
          ip_address?: unknown | null
          page_url?: string | null
          properties?: Json | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          event_name?: string
          event_type?: string
          id?: string
          ip_address?: unknown | null
          page_url?: string | null
          properties?: Json | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_comments: {
        Row: {
          blog_id: string
          content: string
          created_at: string | null
          id: string
          is_approved: boolean | null
          is_featured: boolean | null
          likes_count: number | null
          parent_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          blog_id: string
          content: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          is_featured?: boolean | null
          likes_count?: number | null
          parent_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          blog_id?: string
          content?: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          is_featured?: boolean | null
          likes_count?: number | null
          parent_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "blog_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      blogs: {
        Row: {
          author: string | null
          category: string | null
          content: string | null
          created_at: string | null
          date: string | null
          excerpt: string | null
          id: string
          image: string | null
          is_published: boolean | null
          likes_count: number | null
          meta_description: string | null
          reading_time: number | null
          tags: string[] | null
          title: string
          view_count: number | null
        }
        Insert: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          date?: string | null
          excerpt?: string | null
          id?: string
          image?: string | null
          is_published?: boolean | null
          likes_count?: number | null
          meta_description?: string | null
          reading_time?: number | null
          tags?: string[] | null
          title: string
          view_count?: number | null
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          date?: string | null
          excerpt?: string | null
          id?: string
          image?: string | null
          is_published?: boolean | null
          likes_count?: number | null
          meta_description?: string | null
          reading_time?: number | null
          tags?: string[] | null
          title?: string
          view_count?: number | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          admin_notes: string | null
          company: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string | null
          subject: string
        }
        Insert: {
          admin_notes?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string | null
          subject: string
        }
        Update: {
          admin_notes?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string | null
          subject?: string
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          created_at: string | null
          html_content: string
          id: string
          is_active: boolean | null
          name: string
          subject: string
          template_type: string | null
          text_content: string | null
          updated_at: string | null
          variables: string[] | null
        }
        Insert: {
          created_at?: string | null
          html_content: string
          id?: string
          is_active?: boolean | null
          name: string
          subject: string
          template_type?: string | null
          text_content?: string | null
          updated_at?: string | null
          variables?: string[] | null
        }
        Update: {
          created_at?: string | null
          html_content?: string
          id?: string
          is_active?: boolean | null
          name?: string
          subject?: string
          template_type?: string | null
          text_content?: string | null
          updated_at?: string | null
          variables?: string[] | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string
          created_at: string | null
          display_order: number | null
          helpful_count: number | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          question: string
          tags: string[] | null
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          answer: string
          category: string
          created_at?: string | null
          display_order?: number | null
          helpful_count?: number | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          question: string
          tags?: string[] | null
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          answer?: string
          category?: string
          created_at?: string | null
          display_order?: number | null
          helpful_count?: number | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          question?: string
          tags?: string[] | null
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          admin_notes: string | null
          applied_position: string
          cover_letter: string | null
          created_at: string | null
          custom_role: string | null
          deadline: string | null
          department: string | null
          email: string
          experience_level: string | null
          experience_required: string | null
          id: string
          is_active: boolean | null
          job_description: string | null
          job_type: string | null
          location: string | null
          name: string
          phone: string | null
          requirements: string[] | null
          resume_url: string | null
          role_type: string
          salary_range: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          applied_position: string
          cover_letter?: string | null
          created_at?: string | null
          custom_role?: string | null
          deadline?: string | null
          department?: string | null
          email: string
          experience_level?: string | null
          experience_required?: string | null
          id?: string
          is_active?: boolean | null
          job_description?: string | null
          job_type?: string | null
          location?: string | null
          name: string
          phone?: string | null
          requirements?: string[] | null
          resume_url?: string | null
          role_type: string
          salary_range?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          applied_position?: string
          cover_letter?: string | null
          created_at?: string | null
          custom_role?: string | null
          deadline?: string | null
          department?: string | null
          email?: string
          experience_level?: string | null
          experience_required?: string | null
          id?: string
          is_active?: boolean | null
          job_description?: string | null
          job_type?: string | null
          location?: string | null
          name?: string
          phone?: string | null
          requirements?: string[] | null
          resume_url?: string | null
          role_type?: string
          salary_range?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      job_postings: {
        Row: {
          application_count: number | null
          application_limit: number | null
          benefits: string[] | null
          created_at: string
          deadline: string | null
          department: string
          description: string
          experience_level: string
          id: string
          is_active: boolean | null
          job_type: string
          location: string | null
          multiple_choice_questions: Json | null
          requirements: string[] | null
          responsibilities: string[] | null
          salary_range: string | null
          title: string
          updated_at: string
        }
        Insert: {
          application_count?: number | null
          application_limit?: number | null
          benefits?: string[] | null
          created_at?: string
          deadline?: string | null
          department: string
          description: string
          experience_level: string
          id?: string
          is_active?: boolean | null
          job_type: string
          location?: string | null
          multiple_choice_questions?: Json | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          salary_range?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          application_count?: number | null
          application_limit?: number | null
          benefits?: string[] | null
          created_at?: string
          deadline?: string | null
          department?: string
          description?: string
          experience_level?: string
          id?: string
          is_active?: boolean | null
          job_type?: string
          location?: string | null
          multiple_choice_questions?: Json | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          salary_range?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          author: string | null
          content: string
          created_at: string
          excerpt: string | null
          id: string
          image: string | null
          is_published: boolean | null
          likes_count: number | null
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          author?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image?: string | null
          is_published?: boolean | null
          likes_count?: number | null
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          author?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image?: string | null
          is_published?: boolean | null
          likes_count?: number | null
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          email: string
          id: string
          is_active: boolean | null
          name: string | null
          preferences: Json | null
          subscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean | null
          name?: string | null
          preferences?: Json | null
          subscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean | null
          name?: string | null
          preferences?: Json | null
          subscribed_at?: string | null
        }
        Relationships: []
      }
      portfolio_categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          project_count: number | null
          slug: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          project_count?: number | null
          slug: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          project_count?: number | null
          slug?: string
        }
        Relationships: []
      }
      portfolio_projects: {
        Row: {
          category: string
          client_name: string | null
          completion_date: string | null
          created_at: string | null
          demo_link: string | null
          description: string
          github_link: string | null
          id: string
          image: string
          is_featured: boolean | null
          is_published: boolean | null
          likes_count: number | null
          long_description: string | null
          project_duration: string | null
          sort_order: number | null
          technologies: string[] | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          category: string
          client_name?: string | null
          completion_date?: string | null
          created_at?: string | null
          demo_link?: string | null
          description: string
          github_link?: string | null
          id?: string
          image: string
          is_featured?: boolean | null
          is_published?: boolean | null
          likes_count?: number | null
          long_description?: string | null
          project_duration?: string | null
          sort_order?: number | null
          technologies?: string[] | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          category?: string
          client_name?: string | null
          completion_date?: string | null
          created_at?: string | null
          demo_link?: string | null
          description?: string
          github_link?: string | null
          id?: string
          image?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          likes_count?: number | null
          long_description?: string | null
          project_duration?: string | null
          sort_order?: number | null
          technologies?: string[] | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          preferences: Json | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          preferences?: Json | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          preferences?: Json | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      project_inquiries: {
        Row: {
          admin_notes: string | null
          assigned_to: string | null
          budget_range: string | null
          company: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string | null
          priority: string | null
          project_description: string
          requirements: Json | null
          service_type: string
          status: string | null
          timeline: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          assigned_to?: string | null
          budget_range?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          phone?: string | null
          priority?: string | null
          project_description: string
          requirements?: Json | null
          service_type: string
          status?: string | null
          timeline?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          assigned_to?: string | null
          budget_range?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          priority?: string | null
          project_description?: string
          requirements?: Json | null
          service_type?: string
          status?: string | null
          timeline?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_inquiries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          avatar: string | null
          comment: string
          company: string | null
          created_at: string | null
          helpful_votes: number | null
          id: string
          is_featured: boolean | null
          is_verified: boolean | null
          name: string | null
          rating: number
          service_type: string | null
          user_id: string | null
        }
        Insert: {
          avatar?: string | null
          comment: string
          company?: string | null
          created_at?: string | null
          helpful_votes?: number | null
          id?: string
          is_featured?: boolean | null
          is_verified?: boolean | null
          name?: string | null
          rating?: number
          service_type?: string | null
          user_id?: string | null
        }
        Update: {
          avatar?: string | null
          comment?: string
          company?: string | null
          created_at?: string | null
          helpful_votes?: number | null
          id?: string
          is_featured?: boolean | null
          is_verified?: boolean | null
          name?: string | null
          rating?: number
          service_type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          category: string | null
          created_at: string | null
          delivery_time: string | null
          display_order: number | null
          features: string[] | null
          icon: string | null
          id: string
          image: string | null
          is_active: boolean | null
          is_featured: boolean | null
          long_description: string | null
          meta_description: string | null
          meta_title: string | null
          name: string
          price_range: string | null
          short_description: string
          slug: string
          starting_price: number | null
          technologies: string[] | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          delivery_time?: string | null
          display_order?: number | null
          features?: string[] | null
          icon?: string | null
          id?: string
          image?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          long_description?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          price_range?: string | null
          short_description: string
          slug: string
          starting_price?: number | null
          technologies?: string[] | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          delivery_time?: string | null
          display_order?: number | null
          features?: string[] | null
          icon?: string | null
          id?: string
          image?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          long_description?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          price_range?: string | null
          short_description?: string
          slug?: string
          starting_price?: number | null
          technologies?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          avatar: string | null
          bio: string | null
          created_at: string | null
          display_order: number | null
          email: string | null
          github_url: string | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          linkedin_url: string | null
          name: string
          position: string
          skills: string[] | null
          twitter_url: string | null
          years_experience: number | null
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          created_at?: string | null
          display_order?: number | null
          email?: string | null
          github_url?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          linkedin_url?: string | null
          name: string
          position: string
          skills?: string[] | null
          twitter_url?: string | null
          years_experience?: number | null
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          created_at?: string | null
          display_order?: number | null
          email?: string | null
          github_url?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          linkedin_url?: string | null
          name?: string
          position?: string
          skills?: string[] | null
          twitter_url?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          client_name: string
          client_position: string | null
          company_logo: string | null
          company_name: string
          created_at: string | null
          display_order: number | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          project_type: string | null
          rating: number | null
          testimonial_text: string
        }
        Insert: {
          client_name: string
          client_position?: string | null
          company_logo?: string | null
          company_name: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          project_type?: string | null
          rating?: number | null
          testimonial_text: string
        }
        Update: {
          client_name?: string
          client_position?: string | null
          company_logo?: string | null
          company_name?: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          project_type?: string | null
          rating?: number | null
          testimonial_text?: string
        }
        Relationships: []
      }
      user_activity_logs: {
        Row: {
          activity_type: string
          created_at: string | null
          description: string | null
          id: string
          ip_address: unknown | null
          metadata: Json | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          description?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_slug: {
        Args: { title_text: string }
        Returns: string
      }
      get_admin_dashboard_summary: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_blogs: number
          total_reviews: number
          total_contacts: number
          total_inquiries: number
          new_contacts_week: number
          new_inquiries_week: number
          avg_rating: number
          total_users: number
        }[]
      }
      get_blog_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_blogs: number
          published_blogs: number
          total_views: number
          total_likes: number
          avg_reading_time: number
        }[]
      }
      get_popular_content: {
        Args: Record<PropertyKey, never>
        Returns: {
          content_type: string
          id: string
          title: string
          view_count: number
          likes_count: number
          created_at: string
        }[]
      }
      get_portfolio_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_projects: number
          published_projects: number
          featured_projects: number
          total_views: number
          categories_count: number
        }[]
      }
      get_review_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_reviews: number
          average_rating: number
          five_star_reviews: number
          featured_reviews: number
        }[]
      }
      increment_view_count: {
        Args: { table_name: string; record_id: string }
        Returns: undefined
      }
      search_blogs: {
        Args: { search_query: string; limit_count?: number }
        Returns: {
          id: string
          title: string
          excerpt: string
          author: string
          category: string
          created_at: string
          reading_time: number
          rank: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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
  public: {
    Enums: {},
  },
} as const
