const ck = import.meta.env.VITE_WC_CONSUMER_KEY;
const cs = import.meta.env.VITE_WC_CONSUMER_SECRET;
const siteUrl = 'https://sleigh.staymedia.ng';

const isDev = import.meta.env.DEV;
const baseUrl = isDev ? '' : siteUrl;

const requestHeaders = {
  'Content-Type': 'application/json',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

export async function getCategoryIdBySlug(slug: string) {
  try {
    const res = await fetch(`${baseUrl}/wp-json/wc/v3/products/categories?slug=${slug}&consumer_key=${ck}&consumer_secret=${cs}`, {
      headers: requestHeaders
    });
    const categories = await res.json();
    return categories.length > 0 ? categories[0].id : null;
  } catch (e) {
    return null;
  }
}

export async function getWooProducts(categorySlug?: string) {
  try {
    let url = `${baseUrl}/wp-json/wc/v3/products?consumer_key=${ck}&consumer_secret=${cs}&per_page=12&status=publish`;
    if (categorySlug) {
      const categoryId = await getCategoryIdBySlug(categorySlug);
      if (categoryId) url += `&category=${categoryId}`;
    }
    const res = await fetch(url, { headers: requestHeaders });
    return res.json();
  } catch (e) {
    return [];
  }
}

export async function getSingleProduct(id: string) {
  try {
    const url = `${baseUrl}/wp-json/wc/v3/products/${id}?consumer_key=${ck}&consumer_secret=${cs}`;
    const res = await fetch(url, { headers: requestHeaders });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    return null;
  }
}

// FIXED: Re-adding the missing Blog Post fetcher
export async function getWPPosts() {
  try {
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/posts?_embed&per_page=6`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("WP Fetch Error:", e);
    return [];
  }
}

export async function createWooOrder(payload: any) {
  try {
    const url = `${baseUrl}/wp-json/wc/v3/orders?consumer_key=${ck}&consumer_secret=${cs}`;
    const res = await fetch(url, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(payload)
    });
    const order = await res.json();
    if (!res.ok) throw new Error(order.message || "Order Creation Failed");
    return { success: true, orderId: order.id, total: order.total };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function submitInquiry(name: string, email: string, message: string) {
  try {
    const FORM_ID = "8";
    const url = `${baseUrl}/wp-json/contact-form-7/v1/contact-forms/${FORM_ID}/feedback?consumer_key=${ck}&consumer_secret=${cs}`;
    
    const formData = new FormData();
    formData.append("your-name", name);
    formData.append("your-email", email);
    formData.append("your-message", message);
    formData.append("your-subject", `Z2 Concept Inquiry: ${name}`);
    formData.append("_wpcf7", FORM_ID);
    formData.append("_wpcf7_unit_tag", `wpcf7-f${FORM_ID}-p-o1`);

    const res = await fetch(url, {
      method: "POST",
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      body: formData
    });

    const result = await res.json();
    const isSuccess = result.status === "mail_sent" || result.status === "mail_failed";

    if (res.ok && isSuccess) {
      return { success: true, message: "Inquiry successfully recorded" };
    } else {
      return { success: false, error: result.message || "Submission rejected" };
    }
  } catch (e: any) {
    return { success: false, error: "Internal connection error" };
  }
}
