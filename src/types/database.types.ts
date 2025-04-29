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
      // Add your database tables here
      // For example:
      exercises: {
        Row: {
          id: string
          name: string
          category: string
          description: string | null
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          description?: string | null
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          description?: string | null
          user_id?: string
          created_at?: string
        }
      }
      workouts: {
        Row: {
          id: string
          date: string
          user_id: string
          completed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          date: string
          user_id: string
          completed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          date?: string
          user_id?: string
          completed?: boolean
          created_at?: string
        }
      }
      // Add more tables as needed
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
  }
} 