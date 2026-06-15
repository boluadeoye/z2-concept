const ck = import.meta.env.VITE_WC_CONSUMER_KEY;
const cs = import.meta.env.VITE_WC_CONSUMER_SECRET;
const baseUrl = import.meta.env.VITE_WC_SITE_URL || 'https://sleigh.staymedia.ng';

export async function getCategoryIdBySlug(slug: string) {
  try {
    const res = await fetch(`${baseUrl}/wp-json/wc/v3/products/categories?slug=${slug}&consumer_key=${ck}&consumer_secret=${cs}`);
    const categories = await res.json();
    return categories.length > 0 ? categories[0].id : null;
  } catch (e) {
    console.error("Category Resolver Error:", e);
    return null;
  }
}

export async function getWooProducts(categorySlug?: string) {
  try {
    let url = `${baseUrl}/wp-json/wc/v3/products?consumer_key=${ck}&consumer_secret=${cs}&per_page=8&status=publish`;

    if (categorySlug) {
      const categoryId = await getCategoryIdBySlug(categorySlug);
      if (categoryId) {
        url += `&category=${categoryId}`;
      }
    }

    const res = await fetch(url);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("WooCommerce Fetch Error:", e);
    return [];
  }
}
