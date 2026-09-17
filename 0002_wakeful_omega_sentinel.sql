CREATE TABLE `receipts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`contributor_id` integer NOT NULL,
	`store_name` text NOT NULL,
	`latitude` real,
	`longitude` real,
	`what3words` text,
	`image_key` text NOT NULL,
	`image_hash` text NOT NULL,
	`status` text DEFAULT 'pending_ocr' NOT NULL,
	`transaction_at` text,
	`receipt_total` real,
	`line_item_count` integer DEFAULT 0 NOT NULL,
	`observed_at` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `receipts_image_hash_unique` ON `receipts` (`image_hash`);--> statement-breakpoint
ALTER TABLE `observations` ADD `what3words` text;