const ck = import.meta.env.VITE_WC_CONSUMER_KEY;
const cs = import.meta.env.VITE_WC_CONSUMER_SECRET;

// The Unified Proxy Prefix
const baseUrl = '/wp-api';

const requestHeaders = {
  'Content-Type': 'application/json'
};

// 1. CATEGORY RESOLVER
export async function getCategoryIdBySlug(slug: string) {
  try {
    const res = await fetch(`${baseUrl}/wc/v3/products/categories?slug=${slug}&consumer_key=${ck}&consumer_secret=${cs}`, {
      headers: requestHeaders
    });
    const categories = await res.json();
    return categories.length > 0 ? categories[0].id : null;
  } catch (e) { return null; }
}

// 2. PRODUCT GRID FETCH
export async function getWooProducts(categorySlug?: string) {
  try {
    let url = `${baseUrl}/wc/v3/products?consumer_key=${ck}&consumer_secret=${cs}&per_page=12&status=publish`;
    if (categorySlug) {
      const categoryId = await getCategoryIdBySlug(categorySlug);
      if (categoryId) url += `&category=${categoryId}`;
    }
    const res = await fetch(url, { headers: requestHeaders });
    return res.json();
  } catch (e) { return []; }
}

// 3. SINGLE PRODUCT FETCH
export async function getSingleProduct(id: string) {
  try {
    const url = `${baseUrl}/wc/v3/products/${id}?consumer_key=${ck}&consumer_secret=${cs}`;
    const res = await fetch(url, { headers: requestHeaders });
    if (!res.ok) return null;
    return res.json();
  } catch (e) { return null; }
}

// 4. BLOG POST FETCH (Standard WP API)
export async function getWPPosts() {
  try {
    // Note: wp/v2 is outside the wc/v3 namespace but handled by the same proxy
    const res = await fetch(`${baseUrl}/wp/v2/posts?_embed&per_page=6`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) { return []; }
}

// 5. DASHBOARD: CUSTOMER DATA
export async function getCustomerData(id: string | number) {
  try {
    const url = `${baseUrl}/wc/v3/customers/${id}?consumer_key=${ck}&consumer_secret=${cs}`;
    const res = await fetch(url, { headers: requestHeaders });
    if (!res.ok) return null;
    return res.json();
  } catch (e) { return null; }
}

// 6. DASHBOARD: CUSTOMER ORDERS
export async function getCustomerOrders(id: string | number) {
  try {
    const url = `${baseUrl}/wc/v3/orders?customer=${id}&consumer_key=${ck}&consumer_secret=${cs}`;
    const res = await fetch(url, { headers: requestHeaders });
    if (!res.ok) return [];
    return res.json();
  } catch (e) { return []; }
}

// 7. DASHBOARD: UPDATE ADDRESS
export async function updateCustomerAddress(id: string | number, shippingData: any) {
  try {
    const url = `${baseUrl}/wc/v3/customers/${id}?consumer_key=${ck}&consumer_secret=${cs}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: requestHeaders,
      body: JSON.stringify({ shipping: shippingData })
    });
    return { success: res.ok };
  } catch (e) { return { success: false }; }
}

// 8. LOGIN ENGINE (JWT)
export async function loginUser(username: string, password: string) {
  try {
    const res = await fetch(`${baseUrl}/jwt-auth/v1/token`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Invalid credentials");

    const userRes = await fetch(`${baseUrl}/wc/v3/customers?email=${encodeURIComponent(username)}&consumer_key=${ck}&consumer_secret=${cs}`);
    const userData = await userRes.json();
    
    return { 
      success: true, 
      token: data.token, 
      name: data.user_display_name, 
      id: userData.length > 0 ? userData[0].id : null 
    };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

// 9. REGISTRATION ENGINE
export async function registerUser(userData: any) {
  try {
    const res = await fetch(`${baseUrl}/wc/v3/customers?consumer_key=${ck}&consumer_secret=${cs}`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        password: userData.password,
        username: userData.email.split('@')[0]
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");
    return { success: true, id: data.id };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

// 10. ORDER CREATION ENGINE
export async function createWooOrder(payload: any) {
  try {
    const url = `${baseUrl}/wc/v3/orders?consumer_key=${ck}&consumer_secret=${cs}`;
    const res = await fetch(url, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(payload)
    });
    const order = await res.json();
    if (!res.ok) throw new Error(order.message || "Order Failed");
    return { success: true, orderId: order.id };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

// 11. INQUIRY ENGINE (CF7)
export async function submitInquiry(name: string, email: string, message: string) {
  try {
    const FORM_ID = "8";
    const url = `${baseUrl}/contact-form-7/v1/contact-forms/${FORM_ID}/feedback?consumer_key=${ck}&consumer_secret=${cs}`;
    const formData = new FormData();
    formData.append("your-name", name);
    formData.append("your-email", email);
    formData.append("your-message", message);
    formData.append("_wpcf7", FORM_ID);
    
    const res = await fetch(url, { 
      method: "POST",
      body: formData 
    });
    const result = await res.json();
    return { success: result.status === "mail_sent" || result.status === "mail_failed" };
  } catch (e) { 
    return { success: false, error: "Connection error" }; 
  }
}
