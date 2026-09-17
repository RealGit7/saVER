CREATE TABLE `collector_runs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`retailer` text NOT NULL,
	`source_url` text NOT NULL,
	`status` text NOT NULL,
	`listings_seen` integer DEFAULT 0 NOT NULL,
	`prices_accepted` integer DEFAULT 0 NOT NULL,
	`started_at` text NOT NULL,
	`finished_at` text,
	`error` text
);
--> statement-breakpoint
CREATE TABLE `retailer_prices` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`retailer` text NOT NULL,
	`store_name` text,
	`source_product_id` text,
	`product` text NOT NULL,
	`size` text,
	`price` real NOT NULL,
	`source_url` text NOT NULL,
	`observed_at` text NOT NULL,
	`collector_run_id` integer NOT NULL,
	`created_at` text NOT NULL
);
