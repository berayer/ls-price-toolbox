DROP TABLE IF EXISTS "color";
CREATE TABLE "color" (
  "id" integer PRIMARY KEY AUTOINCREMENT,
  "name" text NOT NULL,
  "code" text NOT NULL,
  "d_code" text,
  "full_name" text NOT NULL,
  "created_at" text NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')),
  "updated_at" text NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime'))
);

DROP TABLE IF EXISTS "mat";
CREATE TABLE "mat" (
  "id" integer PRIMARY KEY AUTOINCREMENT,
  "name" text NOT NULL,
  "code" text NOT NULL,
  "created_at" text NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')),
  "updated_at" text NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime'))
);

DROP TABLE IF EXISTS "mat_color";
CREATE TABLE "mat_color" (
  "id" integer PRIMARY KEY AUTOINCREMENT,
  "mat_id" integer NOT NULL,
  "color_id" integer NOT NULL,
  "spec" integer NOT NULL,
  "thick" integer NOT NULL,
  "created_at" text NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')),
  "updated_at" text NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime'))
);

DROP TABLE IF EXISTS "price_type";
CREATE TABLE "price_type" (
  "id" integer PRIMARY KEY AUTOINCREMENT,
  "name" text NOT NULL,
  "unit" integer NOT NULL,
  "remark" text NOT NULL DEFAULT '',
  "priority" integer NOT NULL DEFAULT 100,
  "created_at" text NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')),
  "updated_at" text NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime'))
);

DROP TABLE IF EXISTS "mat_color_price";
CREATE TABLE "mat_color_price" (
  "id" integer PRIMARY KEY AUTOINCREMENT,
  "mat_color_id" integer NOT NULL,
  "price_type_id" integer NOT NULL,
  "price" real NOT NULL,
  "created_at" text NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')),
  "updated_at" text NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime'))
);
