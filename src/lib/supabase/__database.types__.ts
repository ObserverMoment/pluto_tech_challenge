export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      order_lines: {
        Row: {
          created_at: string
          id: number
          line_total: number
          order_id: string
          pizza_size_id: string
          toppings: Json
        }
        Insert: {
          created_at?: string
          id?: number
          line_total: number
          order_id: string
          pizza_size_id: string
          toppings?: Json
        }
        Update: {
          created_at?: string
          id?: number
          line_total?: number
          order_id?: string
          pizza_size_id?: string
          toppings?: Json
        }
        Relationships: [
          {
            foreignKeyName: "order_lines_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_lines_pizza_size_id_fkey"
            columns: ["pizza_size_id"]
            referencedRelation: "pizza_sizes"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          allergies: string | null
          created_at: string
          customer_name: string
          id: string
          notes: string | null
        }
        Insert: {
          allergies?: string | null
          created_at?: string
          customer_name: string
          id?: string
          notes?: string | null
        }
        Update: {
          allergies?: string | null
          created_at?: string
          customer_name?: string
          id?: string
          notes?: string | null
        }
        Relationships: []
      }
      pizza_sizes: {
        Row: {
          created_at: string
          id: string
          included_toppings: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          included_toppings: number
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          included_toppings?: number
          name?: string
        }
        Relationships: []
      }
      pizza_toppings: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      price_list: {
        Row: {
          created_at: string
          id: number
          name: string
          price: number
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          price: number
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          price?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
