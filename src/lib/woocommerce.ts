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

/**
 * MEDIA PROXY SANITIZER
 * Forces all site-wide images through the Vercel/Vite asset tunnel
 */
export function sanitizeImageUrl(url: string): string {
  if (!url) return "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521130/blog_assets/dsitt1fhtiod9dkndedz.png";
  let clean = url.replace(/\\/g, "").replace(/"/g, "");
  if (clean.startsWith(WP_DOMAIN)) {
    return clean.replace(WP_DOMAIN, "");
  }
  return clean;
}

// 1. GALLERY & PORTFOLIO ENGINE (BOSS MANDATED)
export async function getGalleryItems(categoryId?: number) {
  try {
    let url = `${baseUrl}/wp-api/wp/v2/gallery?_embed=1&status=publish&per_page=100&cb=${Date.now()}`;
    if (categoryId) url += `&gallery_category=${categoryId}`;
    const res = await fetch(url, { headers: requestHeaders });
    if (!res.ok) return [];
    return res.json();
  } catch (e) { return []; }
}

export const getWPGalleries = getGalleryItems;

export async function getGalleryCategories() {
  try {
    const res = await fetch(`${baseUrl}/wp-api/wp/v2/gallery_category?hide_empty=false`, { headers: requestHeaders });
    return res.ok ? res.json() : [];
  } catch (e) { return []; }
}

export async function getSingleWPPortfolio(slug: string) {
  try {
    const res = await fetch(`${baseUrl}/wp-api/wp/v2/gallery?slug=${slug}&_embed=1&cb=${Date.now()}`, { headers: requestHeaders });
    const items = await res.json();
    return items.length > 0 ? items[0] : null;
  } catch (e) { return null; }
}

// 2. WOOCOMMERCE PRODUCT ENGINE
export async function getCategoryIdBySlug(slug: string) {
  try {
    const res = await fetch(`${baseUrl}/wp-api/wc/v3/products/categories?slug=${slug}&${auth}`, { headers: requestHeaders });
    const categories = await res.json();
    return categories.length > 0 ? categories[0].id : null;
  } catch (e) { return null; }
}

export async function getWooProducts(categorySlug?: string) {
  try {
    let url = `${baseUrl}/wp-api/wc/v3/products?${auth}&per_page=12&status=publish`;
    if (categorySlug) {
      const id = await getCategoryIdBySlug(categorySlug);
      if (id) url += `&category=${id}`;
    }
    const res = await fetch(url, { headers: requestHeaders });
    return res.ok ? res.json() : [];
  } catch (e) { return []; }
}

export async function getSingleProduct(id: string) {
  try {
    const res = await fetch(`${baseUrl}/wp-api/wc/v3/products/${id}?${auth}`, { headers: requestHeaders });
    return res.ok ? res.json() : null;
  } catch (e) { return null; }
}

// 3. BLOG ENGINE
export async function getWPPosts() {
  try {
    const res = await fetch(`${baseUrl}/wp-api/wp/v2/posts?_embed=1&per_page=10&cb=${Date.now()}`, { headers: requestHeaders });
    return res.ok ? res.json() : [];
  } catch (e) { return []; }
}

// 4. AUTHENTICATION & CUSTOMER ENGINE
export async function loginUser(username: string, password: string) {
  try {
    const res = await fetch(`${baseUrl}/wp-api/jwt-auth/v1/token`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Invalid credentials");
    const userRes = await fetch(`${baseUrl}/wp-api/wc/v3/customers?email=${encodeURIComponent(username)}&${auth}`);
    const userData = await userRes.json();
    return { success: true, token: data.token, name: data.user_display_name, id: userData[0]?.id };
  } catch (e: any) { return { success: false, error: e.message }; }
}

export async function registerUser(userData: any) {
  try {
    const res = await fetch(`${baseUrl}/wp-api/wc/v3/customers?${auth}`, {
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
  } catch (e: any) { return { success: false, error: e.message }; }
}

export async function getCustomerData(id: string | number) {
  try {
    const res = await fetch(`${baseUrl}/wp-api/wc/v3/customers/${id}?${auth}`, { headers: requestHeaders });
    return res.ok ? res.json() : null;
  } catch (e) { return null; }
}

export async function getCustomerOrders(id: string | number) {
  try {
    const res = await fetch(`${baseUrl}/wp-api/wc/v3/orders?customer=${id}&${auth}`, { headers: requestHeaders });
    return res.ok ? res.json() : [];
  } catch (e) { return []; }
}

export async function updateCustomerAddress(id: string | number, shippingData: any) {
  try {
    const res = await fetch(`${baseUrl}/wp-api/wc/v3/customers/${id}?${auth}`, {
      method: "PUT",
      headers: requestHeaders,
      body: JSON.stringify({ shipping: shippingData, billing: shippingData })
    });
    return { success: res.ok };
  } catch (e) { return { success: false }; }
}

// 5. ORDER & INQUIRY ENGINE
export async function createWooOrder(payload: any) {
  try {
    const res = await fetch(`${baseUrl}/wp-api/wc/v3/orders?${auth}`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(payload)
    });
    const order = await res.json();
    return { success: res.ok, orderId: order.id };
  } catch (e: any) { return { success: false, error: e.message }; }
}

export async function submitInquiry(name: string, email: string, message: string) {
  try {
    const FORM_ID = "8";
    const formData = new FormData();
    formData.append("your-name", name);
    formData.append("your-email", email);
    formData.append("your-message", message);
    formData.append("_wpcf7", FORM_ID);
    const res = await fetch(`${baseUrl}/wp-api/contact-form-7/v1/contact-forms/${FORM_ID}/feedback`, {
      method: "POST",
      body: formData
    });
    const result = await res.json();
    return { success: result.status === "mail_sent" };
  } catch (e) { return { success: false }; }
}

// 6. PASSWORD RESET ENGINE
export async function sendPasswordResetEmail(userLogin: string) {
  try {
    const res = await fetch(`${baseUrl}/wp-api/z2/v1/forgot-password`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({ user_login: userLogin }),
    });
    return { success: res.ok };
  } catch (e) { return { success: false }; }
}

export async function finalizePasswordReset(payload: any) {
  try {
    const res = await fetch(`${baseUrl}/wp-api/z2/v1/reset-password`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(payload),
    });
    return { success: res.ok };
  } catch (e) { return { success: false }; }
}
