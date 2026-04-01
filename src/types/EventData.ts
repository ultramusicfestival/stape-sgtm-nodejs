export type Address = Partial<{
  first_name: string;
  sha256_first_name: string;
  last_name: string;
  sha256_last_name: string;
  street: string;
  city: string;
  region: string;
  postal_code: string;
  country: string;
}>;

export type UserData = Partial<{
  email_address: string;
  sha256_email_address: string;
  phone_number: string;
  sha256_phone_number: string;
  address: Address;
  new_customer: boolean;
}>;

export type UserProperty = {
  value: string | number;
};

export type EventData = Partial<{
  // Core identifiers
  client_id: string;
  user_id: string;
  session_id: string;

  // User data & properties
  user_data: UserData;
  user_properties: Record<string, UserProperty>;

  // Page / environment
  language: string;
  page_encoding: string;
  page_hostname: string;
  page_location: string;
  page_path: string;
  page_referrer: string;
  page_title: string;
  screen_resolution: string;
  viewport_size: string;
  user_agent: string;
  ip_override: string;

  // Timing
  event_time: number;
  engagement_time_msec: number;

  // Campaign / UTM
  campaign_id: string;
  campaign: string;
  campaign_source: string;
  campaign_medium: string;
  campaign_term: string;
  campaign_content: string;

  // Ecommerce
  currency: string;
  value: number;
  transaction_id: string;
  tax: number;
  shipping: number;
  coupon: string;
  payment_type: string;
  items: Array<EcommerceItem>;

  // Content / interaction
  search_term: string;
  content_type: string;
  content_id: string;
  method: string;
  non_interaction: boolean;

  // Debug
  debug_mode: boolean;

  // Sent as Cookie header — readable by getCookieValues() in all sGTM tags
  cookies: Record<string, string>;

  // Sent in event data body — readable by Stape tags via eventData.common_cookie
  common_cookie: Record<string, string>;
}> & {
  [key: string]: any;
};

export type EcommerceItem = Partial<{
  item_id: string;
  item_name: string;
  affiliation: string;
  coupon: string;
  discount: number;
  index: number;
  item_brand: string;
  item_category: string;
  item_category2: string;
  item_category3: string;
  item_category4: string;
  item_category5: string;
  item_list_id: string;
  item_list_name: string;
  item_variant: string;
  location_id: string;
  price: number;
  quantity: number;
  creative_name: string;
  creative_slot: string;
  promotion_id: string;
  promotion_name: string;
}> & {
  [key: string]: any;
};
