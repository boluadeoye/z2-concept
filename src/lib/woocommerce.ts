const ck = import.meta.env.VITE_WC_CONSUMER_KEY;
const cs = import.meta.env.VITE_WC_CONSUMER_SECRET;

// Relative path to trigger Vercel/Vite Proxy
const baseUrl = "";

const requestHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
};

const auth = `consumer_key=${ck}&consumer_secret=${cs}`;

export async function getWPPortfolios() {
  try {
    // Added cache-buster to prevent empty cached responses
    const res = await fetch(`${baseUrl}/wp-api/wp/v2/portfolio?_embed&per_page=12&cb=${Date.now()}`, {
      headers: requestHeaders
    });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

export async function getSingleWPPortfolio(slug: string) {
  try {
    const res = await fetch(`${baseUrl}/wp-api/wp/v2/portfolio?slug=${slug}&_embed&cb=${Date.now()}`, {
      headers: requestHeaders
    });
    if (!res.ok) return null;
    const items = await res.json();
    return items.length > 0 ? items[0] : null;
  } catch (e) {
    return null;
  }
}

export async function getWooProducts(categorySlug?: string) {
  try {
    let url = `${baseUrl}/wp-api/wc/v3/products?${auth}&per_page=12&status=publish`;
    const res = await fetch(url, { headers: requestHeaders });
    return res.json();
  } catch (e) { return []; }
}

export async function loginUser(username: string, password: string) {
  try {
    const res = await fetch(`${baseUrl}/wp-api/jwt-auth/v1/token`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Invalid credentials");
    return { success: true, token: data.token, name: data.user_display_name };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}
