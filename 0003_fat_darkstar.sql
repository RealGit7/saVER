CREATE TABLE `privacy_consents` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`notice_version` text NOT NULL,
	`purposes` text NOT NULL,
	`consented_at` text NOT NULL,
	`withdrawn_at` text
);
--> statement-breakpoint
CREATE TABLE `retailers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`legal_name` text NOT NULL,
	`display_name` text NOT NULL,
	`contact_user_id` text NOT NULL,
	`status` text DEFAULT 'pending_verification' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `offers` ADD `retailer_id` integer;--> statement-breakpoint
ALTER TABLE `offers` ADD `audience` text DEFAULT 'all' NOT NULL;--> statement-breakpoint
ALTER TABLE `offers` ADD `starts_at` text;--> statement-breakpoint
ALTER TABLE `offers` ADD `ends_at` text;