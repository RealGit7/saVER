import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const contributors = sqliteTable("contributors", {
  id: integer("id").primaryKey({ autoIncrement: true }), userId: text("user_id").notNull().unique(), email: text("email").notNull(), displayName: text("display_name"), points: integer("points").notNull().default(0), createdAt: text("created_at").notNull(),
});
export const privacyConsents = sqliteTable("privacy_consents", {
  id: integer("id").primaryKey({ autoIncrement: true }), userId: text("user_id").notNull(), noticeVersion: text("notice_version").notNull(), purposes: text("purposes").notNull(), consentedAt: text("consented_at").notNull(), withdrawnAt: text("withdrawn_at"),
});
export const retailers = sqliteTable("retailers", {
  id: integer("id").primaryKey({ autoIncrement: true }), legalName: text("legal_name").notNull(), displayName: text("display_name").notNull(), contactUserId: text("contact_user_id").notNull(), status: text("status").notNull().default("pending_verification"), createdAt: text("created_at").notNull(),
});
export const observations = sqliteTable("observations", {
  id: integer("id").primaryKey({ autoIncrement: true }), contributorId: integer("contributor_id").notNull(), product: text("product").notNull(), price: real("price").notNull(), storeName: text("store_name").notNull(), latitude: real("latitude"), longitude: real("longitude"), what3words: text("what3words"), imageKey: text("image_key").notNull(), status: text("status").notNull().default("pending"), observedAt: text("observed_at").notNull(), createdAt: text("created_at").notNull(),
});
export const receipts = sqliteTable("receipts", {
  id: integer("id").primaryKey({ autoIncrement: true }), contributorId: integer("contributor_id").notNull(), storeName: text("store_name").notNull(), latitude: real("latitude"), longitude: real("longitude"), what3words: text("what3words"), imageKey: text("image_key").notNull(), imageHash: text("image_hash").notNull().unique(), status: text("status").notNull().default("pending_ocr"), transactionAt: text("transaction_at"), receiptTotal: real("receipt_total"), lineItemCount: integer("line_item_count").notNull().default(0), observedAt: text("observed_at").notNull(), createdAt: text("created_at").notNull(),
});
export const offers = sqliteTable("offers", {
  id: integer("id").primaryKey({ autoIncrement: true }), retailer: text("retailer").notNull(), retailerId: integer("retailer_id"), title: text("title").notNull(), pointsCost: integer("points_cost").notNull(), terms: text("terms").notNull().default(""), audience: text("audience").notNull().default("all"), startsAt: text("starts_at"), endsAt: text("ends_at"), active: integer("active", { mode: "boolean" }).notNull().default(true),
});
export const collectorRuns = sqliteTable("collector_runs", {
  id: integer("id").primaryKey({ autoIncrement: true }), retailer: text("retailer").notNull(), sourceUrl: text("source_url").notNull(), status: text("status").notNull(), listingsSeen: integer("listings_seen").notNull().default(0), pricesAccepted: integer("prices_accepted").notNull().default(0), startedAt: text("started_at").notNull(), finishedAt: text("finished_at"), error: text("error"),
});
export const retailerPrices = sqliteTable("retailer_prices", {
  id: integer("id").primaryKey({ autoIncrement: true }), retailer: text("retailer").notNull(), storeName: text("store_name"), sourceProductId: text("source_product_id"), product: text("product").notNull(), size: text("size"), price: real("price").notNull(), sourceUrl: text("source_url").notNull(), observedAt: text("observed_at").notNull(), collectorRunId: integer("collector_run_id").notNull(), createdAt: text("created_at").notNull(),
});
