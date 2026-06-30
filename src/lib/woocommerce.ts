const ck = import.meta.env.VITE_WC_CONSUMER_KEY;
const cs = import.meta.env.VITE_WC_CONSUMER_SECRET;

// ALWAYS use relative paths to trigger Vite Proxy (Dev) and Vercel Rewrites (Prod)
const baseUrl = ''; 

const requestHeaders = {
  'Content-Type': 'application/json'
};

/**
 * MEDIA PROXY SANITIZER
 * Forces absolute WordPress image URLs through the Vercel/Vite bridge
 */
export function sanitizeImageUrl(url: string): string {
  if (!url) return "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521130/blog_assets/dsitt1fhtiod9dkndedz.png";
  return url.replace('http://', 'https://').replace('https://sleigh.staymedia.ng', '');
}

// 1. GALLERY FETCHERS
export async function getWPGalleries(categorySlug?: string) {
  try {
    let url = `${baseUrl}/wp-api/wp/v2/gallery?_embed&per_page=100`;
    if (categorySlug) {
      const catRes = await fetch(`${baseUrl}/wp-api/wp/v2/gallery_category?slug=${categorySlug}`);
      const cats = await catRes.json();
      if (cats.length > 0) url += `&gallery_category=${cats[0].id}`;
    }
    const res = await fetch(url);
    if (!res.ok) {
      const fallback = await fetch(`${baseUrl}/wp-api/wp/v2/portfolio?_embed&per_page=100`);
      return fallback.json();
    }
    return res.json();
  } catch (e) { return []; }
}

export async function getGalleryCategories() {
  try {
    const res = await fetch(`${baseUrl}/wp-api/wp/v2/gallery_category`);
    if (!res.ok) return [
      { name: "Wedding", slug: "wedding" }, 
      { name: "Birthday", slug: "birthday" }, 
      { name: "Graduation", slug: "graduation" }
    ];
    return res.json();
  } catch (e) { return []; }
}

// 2. CATEGORY RESOLVER
export async function getCategoryIdBySlug(slug: string) {
  try {
    const res = await fetch(`${baseUrl}/wp-api/wc/v3/products/categories?slug=${slug}&consumer_key=${ck}&consumer_secret=${cs}`, {
      headers: requestHeaders
    });
    const categories = await res.json();
    return categories.length > 0 ? categories[0].id : null;
  } catch (e) { return null; }
}

// 3. PRODUCT GRID FETCH
export async function getWooProducts(categorySlug?: string) {
  try {
    let url = `${baseUrl}/wp-api/wc/v3/products?consumer_key=${ck}&consumer_secret=${cs}&per_page=12&status=publish`;
    if (categorySlug) {
      const categoryId = await getCategoryIdBySlug(categorySlug);
      if (categoryId) url += `&category=${categoryId}`;
    }
    const res = await fetch(url, { headers: requestHeaders });
    return res.json();
  } catch (e) { return []; }
}

// 4. SINGLE PRODUCT FETCH
export async function getSingleProduct(id: string) {
  try {
    const url = `${baseUrl}/wp-api/wc/v3/products/${id}?consumer_key=${ck}&consumer_secret=${cs}`;
    const res = await fetch(url, { headers: requestHeaders });
    return res.ok ? res.json() : null;
  } catch (e) { return null; }
}

// 5. BLOG POST FETCH
export async function getWPPosts() {
  try {
    const res = await fetch(`${baseUrl}/wp-api/wp/v2/posts?_embed&per_page=6`);
    return res.ok ? res.json() : [];
  } catch (e) { return []; }
}

// 6. NATIVE PORTFOLIO LIST FETCH (Legacy Fallback)
export async function getWPPortfolios() {
  try {
    const res = await fetch(`${baseUrl}/wp-api/wp/v2/portfolio?_embed&per_page=12`);
    return res.ok ? res.json() : [];
  } catch (e) { return []; }
}

// 7. NATIVE PORTFOLIO SINGLE FETCH (Legacy Fallback)
export async function getSingleWPPortfolio(slug: string) {
  try {
    const res = await fetch(`${baseUrl}/wp-api/wp/v2/portfolio?slug=${slug}&_embed`);
    const items = await res.json();
    return items.length > 0 ? items[0] : null;
  } catch (e) { return null; }
}

// 8. DASHBOARD: CUSTOMER DATA
export async function getCustomerData(id: string | number) {
  try {
    const url = `${baseUrl}/wp-api/wc/v3/customers/${id}?consumer_key=${ck}&consumer_secret=${cs}`;
    const res = await fetch(url, { headers: requestHeaders });
    return res.ok ? res.json() : null;
  } catch (e) { return null; }
}

// 9. DASHBOARD: CUSTOMER ORDERS
export async function getCustomerOrders(id: string | number) {
  try {
    const url = `${baseUrl}/wp-api/wc/v3/orders?customer=${id}&consumer_key=${ck}&consumer_secret=${cs}`;
    const res = await fetch(url, { headers: requestHeaders });
    return res.ok ? res.json() : [];
  } catch (e) { return []; }
}

// 10. DASHBOARD: UPDATE ADDRESS
export async function updateCustomerAddress(id: string | number, shippingData: any) {
  try {
    const url = `${baseUrl}/wp-api/wc/v3/customers/${id}?consumer_key=${ck}&consumer_secret=${cs}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: requestHeaders,
      body: JSON.stringify({ shipping: shippingData, billing: shippingData })
    });
    return { success: res.ok };
  } catch (e) { return { success: false }; }
}

// 11. LOGIN ENGINE (JWT)
export async function loginUser(username: string, password: string) {
  try {
    const res = await fetch(`${baseUrl}/wp-api/jwt-auth/v1/token`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Invalid credentials");

    const userRes = await fetch(`${baseUrl}/wp-api/wc/v3/customers?email=${encodeURIComponent(username)}&consumer_key=${ck}&consumer_secret=${cs}`);
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

// 12. REGISTRATION ENGINE
export async function registerUser(userData: any) {
  try {
    const res = await fetch(`${baseUrl}/wp-api/wc/v3/customers?consumer_key=${ck}&consumer_secret=${cs}`, {
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

// 13. ORDER CREATION ENGINE
export async function createWooOrder(payload: any) {
  try {
    const url = `${baseUrl}/wp-api/wc/v3/orders?consumer_key=${ck}&consumer_secret=${cs}`;
    const res = await fetch(url, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(payload)
    });
    const order = await res.json();
    return { success: res.ok, orderId: order.id };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

// 14. INQUIRY ENGINE (CF7)
export async function submitInquiry(name: string, email: string, message: string) {
  try {
    const FORM_ID = "8";
    const url = `${baseUrl}/wp-api/contact-form-7/v1/contact-forms/${FORM_ID}/feedback?consumer_key=${ck}&consumer_secret=${cs}`;
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

// 15. PASSWORD RESET ENGINE
export async function sendPasswordResetEmail(userLogin: string) {
  try {
    const res = await fetch(`${baseUrl}/wp-api/z2/v1/forgot-password`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({ user_login: userLogin }),
    });
    const data = await res.json();
    return { success: res.ok, message: data.message || "Request failed" };
  } catch (e) {
    return { success: false, error: "Connection error" };
  }
}

export async function finalizePasswordReset(payload: any) {
  try {
    const res = await fetch(`${baseUrl}/wp-api/z2/v1/reset-password`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return { success: res.ok, message: data.message || "Reset failed" };
  } catch (e) {
    return { success: false, error: "Connection error" };
  }
}
