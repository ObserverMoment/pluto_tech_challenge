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
      carts: {
        Row: {
          created_at: string
          id: string
          order_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          order_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "carts_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          }
        ]
      }
      order_lines: {
        Row: {
          created_at: string
          id: number
          line_total: number
          order_id: string
          product_id: number
          quantity: number
        }
        Insert: {
          created_at?: string
          id?: number
          line_total: number
          order_id: string
          product_id: number
          quantity: number
        }
        Update: {
          created_at?: string
          id?: number
          line_total?: number
          order_id?: string
          product_id?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_lines_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_lines_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "pizza_options"
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
      pizza_options: {
        Row: {
          created_at: string
          id: number
          included_toppings: number
          name: string
          price: number
        }
        Insert: {
          created_at?: string
          id?: number
          included_toppings: number
          name: string
          price: number
        }
        Update: {
          created_at?: string
          id?: number
          included_toppings?: number
          name?: string
          price?: number
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
