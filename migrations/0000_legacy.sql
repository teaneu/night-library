CREATE TABLE `readings` (
	`user_id` text NOT NULL,
	`article_id` text NOT NULL,
	`translation` text DEFAULT '' NOT NULL,
	`summary` text DEFAULT '' NOT NULL,
	`answers` text DEFAULT '[]' NOT NULL,
	`completed` integer DEFAULT 0 NOT NULL,
	`updated_at` text NOT NULL,
	PRIMARY KEY(`user_id`, `article_id`)
);
--> statement-breakpoint
CREATE TABLE `words` (
	`user_id` text NOT NULL,
	`word_key` text NOT NULL,
	`created_at` text NOT NULL,
	PRIMARY KEY(`user_id`, `word_key`)
);
