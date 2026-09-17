export type LivePrice = {
  item: string;
  size: string;
  price: number;
  shop: string;
  sourceUrl: string;
  observedAt: string;
  sourceType: "retailer-online";
  category: string;
};

const sourceUrl = "https://shop.miles.bm/";
const observedAt = "2026-09-17T10:40:00-03:00";

// First auditable production snapshot from Miles' public online catalogue.
// Historical charts remain explicitly labelled as demonstrations until repeat
// collections create a sufficient time series.
const rawPrices: [string, string, number, string][] = [
  ["Louis Jadot Chardonnay", "750 ml", 23.96, "Wine & spirits"],
  ["Louis Jadot Premier Cru Pouilly-Fuissé", "750 ml", 62.36, "Wine & spirits"],
  ["Bananas", "each", 3.25, "Fresh produce"],
  ["Louis Jadot Beaujolais Villages", "750 ml", 19.96, "Wine & spirits"],
  ["Lemons", "each", 1.95, "Fresh produce"],
  ["Louis Jadot Nuits-Saint-Georges", "750 ml", 67.96, "Wine & spirits"],
  ["M2 Go Croissant", "each", 2.95, "Bakery"],
  ["Lime", "each", 1.25, "Fresh produce"],
  ["Imported small avocado", "each", 2.5, "Fresh produce"],
  ["Baobab Women & Gentlemen home spray gift box", "2 × 44 ml", 100, "Home & personal care"],
  ["My First Baobab Aurum diffuser", "250 ml", 130, "Home & personal care"],
  ["My First Baobab Platinum diffuser", "250 ml", 130, "Home & personal care"],
  ["My First Baobab Women diffuser", "250 ml", 120, "Home & personal care"],
  ["My First Baobab Gentlemen diffuser", "250 ml", 120, "Home & personal care"],
  ["Envy apple", "each", 2.75, "Fresh produce"],
  ["My First Baobab Tomorrowland diffuser", "250 ml", 130, "Home & personal care"],
  ["English cucumber", "each", 4.25, "Fresh produce"],
  ["Baobab Totem Pearls White", "500 ml", 315, "Home & personal care"],
  ["Orange", "each", 1.75, "Fresh produce"],
  ["Baobab Totem Stones Marble", "500 ml", 315, "Home & personal care"],
  ["Baobab Totem Sand Sonora", "500 ml", 315, "Home & personal care"],
  ["Baobab Manhattan & Paris travel candles", "3 × 80 g", 130, "Home & personal care"],
  ["Watermelon slices", "1 pack", 6.95, "Fresh produce"],
  ["Baobab Singapore & Athens travel candles", "3 × 80 g", 130, "Home & personal care"],
];

export const livePrices: LivePrice[] = rawPrices.map(([item, size, price, category]) => ({
  item: item as string,
  size: size as string,
  price: price as number,
  shop: "Miles Market",
  sourceUrl,
  observedAt,
  sourceType: "retailer-online" as const,
  category,
}));

export const sourceCoverage = [
  { retailer: "Miles Market", listings: "312+", status: "Live prices", detail: "Public online catalogue; first 24 prices captured and attributed." },
  { retailer: "MarketPlace", listings: "432+", status: "Adapter testing", detail: "Large public catalogue; price and availability vary by selected branch." },
  { retailer: "Lindo's", listings: "Specials", status: "Fallback needed", detail: "Ordering endpoint was unavailable; specials pages can be collected separately." },
  { retailer: "Supermart", listings: "Weekly", status: "OCR candidate", detail: "No structured catalogue; weekly specials and submitted shelf tags are suitable sources." },
];
