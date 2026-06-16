const ck = import.meta.env.VITE_WC_CONSUMER_KEY;
const cs = import.meta.env.VITE_WC_CONSUMER_SECRET;

// In development, we use an empty string so the request hits our Vite Proxy (/wp-json)
// In production, we use the actual URL
const isDev = import.meta.env.DEV;
const siteUrl = 'https://sleigh.staymedia.ng';
const baseUrl = isDev ? '' : siteUrl;

export async function getWooProducts(categorySlug?: string) {
  try {
    let url = `${baseUrl}/wp-json/wc/v3/products?consumer_key=${ck}&consumer_secret=${cs}&per_page=8&status=publish`;
    
    if (categorySlug) {
      const catRes = await fetch(`${baseUrl}/wp-json/wc/v3/products/categories?slug=${categorySlug}&consumer_key=${ck}&consumer_secret=${cs}`);
      const categories = await catRes.json();
      if (categories && categories.length > 0) {
        url += `&category=${categories[0].id}`;
      }
    }

    const res = await fetch(url);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Fetch Error:", e);
    return [];
  }
}

export async function getSingleProduct(id: string) {
  try {
    const url = `${baseUrl}/wp-json/wc/v3/products/${id}?consumer_key=${ck}&consumer_secret=${cs}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("Single Product Error:", e);
    return null;
  }
}
