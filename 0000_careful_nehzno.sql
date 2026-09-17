CREATE TABLE `contributors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`email` text NOT NULL,
	`display_name` text,
	`points` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `contributors_user_id_unique` ON `contributors` (`user_id`);--> statement-breakpoint
CREATE TABLE `observations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`contributor_id` integer NOT NULL,
	`product` text NOT NULL,
	`price` real NOT NULL,
	`store_name` text NOT NULL,
	`latitude` real,
	`longitude` real,
	`image_key` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`observed_at` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `offers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`retailer` text NOT NULL,
	`title` text NOT NULL,
	`points_cost` integer NOT NULL,
	`terms` text DEFAULT '' NOT NULL,
	`active` integer DEFAULT true NOT NULL
);
