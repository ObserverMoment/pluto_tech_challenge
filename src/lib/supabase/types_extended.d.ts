import type { Database } from './__database.types__';

/// Read Only data
export type PizzaTopping = Database['public']['Tables']['pizza_toppings']['Row'];
export type PizzaSize = Database['public']['Tables']['pizza_sizes']['Row'];
export type Price = Database['public']['Tables']['price_list']['Row'];

/// Orders
export type Order = Database['public']['Tables']['orders']['Row'];
export type OrderLine = Database['public']['Tables']['order_lines']['Row'];

/// Pre Cart Types
export interface OrderLineData {
	line_total: number;
	pizza_size_id: string;
	toppings: Json;
}

/// DB Insert Types
export type InsertOrder = Database['public']['Tables']['orders']['Insert'];
export type InsertOrderLine = Database['public']['Tables']['order_lines']['Insert'];
