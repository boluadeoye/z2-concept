const ck = import.meta.env.VITE_WC_CONSUMER_KEY;
const cs = import.meta.env.VITE_WC_CONSUMER_SECRET;
const baseUrl = ''; 
const WP_DOMAIN = "https://sleigh.staymedia.ng";

const requestHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
};

const auth = `consumer_key=${ck}&consumer_secret=${cs}`;

// DEBUG LOGGER UTILITY
async function logDebug(label: string, res: Response, url: string) {
  console.group(`DEBUG: ${label}`);
  console.log(`URL: ${url}`);
  console.log(`Status: ${res.status} ${res.statusText}`);
  try {
    const text = await res.clone().text();
    console.log(`Response Body:`, text);
  } catch (e) {
    console.log(`Could not read response body`);
  }
  console.groupEnd();
}

export function extractContentImage(html: string): string | null {
  if (!html) return null;
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}

export function sanitizeImageUrl(url: string | null): string | null {
  if (!url || url === "" || url.includes("undefined")) return null;
  let clean = url.replace(/\\/g, "").replace(/"/g, "");
  if (clean.includes(WP_DOMAIN)) return clean.split(WP_DOMAIN)[1];
  if (clean.startsWith("http")) return clean;
  return clean.startsWith("/") ? clean : `/${clean}`;
}

// 1. GALLERY ENGINE
export async function getGalleryItems(categoryId?: number) {
  const url = `${baseUrl}/wp-api/wp/v2/gallery?_embed=1&status=publish&per_page=100${categoryId ? `&gallery_category=${categoryId}` : ''}`;
  try {
    const res = await fetch(url, { headers: requestHeaders });
    if (!res.ok) await logDebug("Gallery Items", res, url);
    return res.ok ? res.json() : [];
  } catch (e) { return []; }
}

export const getWPGalleries = getGalleryItems;

export async function getGalleryCategories() {
  const url = `${baseUrl}/wp-api/wp/v2/gallery_category?hide_empty=true`;
  try {
    const res = await fetch(url, { headers: requestHeaders });
    if (!res.ok) await logDebug("Gallery Categories", res, url);
    return res.ok ? res.json() : [];
  } catch (e) { return []; }
}

export async function getSingleWPPortfolio(slug: string) {
  const url = `${baseUrl}/wp-api/wp/v2/gallery?slug=${slug}&_embed=1`;
  try {
    const res = await fetch(url, { headers: requestHeaders });
    if (!res.ok) await logDebug("Single Portfolio", res, url);
    const items = await res.json();
    return items.length > 0 ? items[0] : null;
  } catch (e) { return null; }
}

// 2. PRODUCT ENGINE
export async function getWooProducts(categoryId?: number) {
  const url = `${baseUrl}/wp-api/wc/v3/products?${auth}&per_page=12&status=publish${categoryId ? `&category=${categoryId}` : ''}`;
  try {
    const res = await fetch(url, { headers: requestHeaders });
    if (!res.ok) await logDebug("Woo Products", res, url);
    return res.ok ? res.json() : [];
  } catch (e) { return []; }
}

export async function getSingleProduct(id: string) {
  const url = `${baseUrl}/wp-api/wc/v3/products/${id}?${auth}`;
  try {
    const res = await fetch(url, { headers: requestHeaders });
    if (!res.ok) await logDebug("Single Product", res, url);
    return res.ok ? res.json() : null;
  } catch (e) { return null; }
}

export async function getCategoryIdBySlug(slug: string) {
  const url = `${baseUrl}/wp-api/wc/v3/products/categories?slug=${slug}&${auth}`;
  try {
    const res = await fetch(url, { headers: requestHeaders });
    const categories = await res.json();
    return categories.length > 0 ? categories[0].id : null;
  } catch (e) { return null; }
}

// 3. BLOG & AUTH ENGINE
export async function getWPPosts() {
  const url = `${baseUrl}/wp-api/wp/v2/posts?_embed=1&per_page=10`;
  try {
    const res = await fetch(url, { headers: requestHeaders });
    if (!res.ok) await logDebug("WP Posts", res, url);
    return res.ok ? res.json() : [];
  } catch (e) { return []; }
}

export async function loginUser(username: string, password: string) {
  const url = `${baseUrl}/wp-api/jwt-auth/v1/token`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) await logDebug("Login User", res, url);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Invalid credentials");
    return { success: true, token: data.token, name: data.user_display_name };
  } catch (e: any) { return { success: false, error: e.message }; }
}

export async function registerUser(userData: any) {
  const url = `${baseUrl}/wp-api/wc/v3/customers?${auth}`;
  try {
    const res = await fetch(url, {
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
    if (!res.ok) await logDebug("Register User", res, url);
    const data = await res.json();
    return { success: res.ok, id: data.id };
  } catch (e: any) { return { success: false, error: e.message }; }
}

// 4. DASHBOARD & TRANSACTIONS
export async function getCustomerData(id: string | number) {
  const url = `${baseUrl}/wp-api/wc/v3/customers/${id}?${auth}`;
  try {
    const res = await fetch(url, { headers: requestHeaders });
    if (!res.ok) await logDebug("Customer Data", res, url);
    return res.ok ? res.json() : null;
  } catch (e) { return null; }
}

export async function getCustomerOrders(id: string | number) {
  const url = `${baseUrl}/wp-api/wc/v3/orders?customer=${id}&${auth}`;
  try {
    const res = await fetch(url, { headers: requestHeaders });
    if (!res.ok) await logDebug("Customer Orders", res, url);
    return res.ok ? res.json() : [];
  } catch (e) { return []; }
}

export async function updateCustomerAddress(id: string | number, data: any) {
  const url = `${baseUrl}/wp-api/wc/v3/customers/${id}?${auth}`;
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: requestHeaders,
      body: JSON.stringify({ shipping: data, billing: data })
    });
    if (!res.ok) await logDebug("Update Address", res, url);
    return { success: res.ok };
  } catch (e) { return { success: false }; }
}

export async function createWooOrder(payload: any) {
  const url = `${baseUrl}/wp-api/wc/v3/orders?${auth}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(payload)
    });
    if (!res.ok) await logDebug("Create Order", res, url);
    const order = await res.json();
    return { success: res.ok, orderId: order.id };
  } catch (e: any) { return { success: false, error: e.message }; }
}

export async function submitInquiry(name: string, email: string, message: string) {
  const url = `${baseUrl}/wp-api/contact-form-7/v1/contact-forms/8/feedback`;
  try {
    const formData = new FormData();
    formData.append("your-name", name);
    formData.append("your-email", email);
    formData.append("your-message", message);
    formData.append("_wpcf7", "8");
    const res = await fetch(url, { method: "POST", body: formData });
    const result = await res.json();
    return { success: result.status === "mail_sent" };
  } catch (e) { return { success: false }; }
}

export async function sendPasswordResetEmail(userLogin: string) {
  const url = `${baseUrl}/wp-api/z2/v1/forgot-password`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({ user_login: userLogin }),
    });
    return { success: res.ok };
  } catch (e) { return { success: false }; }
}

export async function finalizePasswordReset(payload: any) {
  const url = `${baseUrl}/wp-api/z2/v1/reset-password`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(payload),
    });
    return { success: res.ok };
  } catch (e) { return { success: false }; }
}
