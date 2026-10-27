CREATE TABLE `english_practice` (
	`user_id` text NOT NULL,
	`article_id` text NOT NULL,
	`translations` text DEFAULT '[]' NOT NULL,
	`reviewed` text DEFAULT '[]' NOT NULL,
	`completed` integer DEFAULT 0 NOT NULL,
	`updated_at` text NOT NULL,
	PRIMARY KEY(`user_id`, `article_id`)
);
--> statement-breakpoint
CREATE TABLE `english_vocabulary` (
	`user_id` text NOT NULL,
	`id` text NOT NULL,
	`article_id` text NOT NULL,
	`term` text NOT NULL,
	`meaning` text NOT NULL,
	`example` text DEFAULT '' NOT NULL,
	`known` integer DEFAULT 0 NOT NULL,
	`reviews` integer DEFAULT 0 NOT NULL,
	`updated_at` text NOT NULL,
	PRIMARY KEY(`user_id`, `id`)
);
