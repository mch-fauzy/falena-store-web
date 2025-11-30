-- CreateTable
CREATE TABLE "falena_product" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "images" TEXT[],
    "brand" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "price" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "rating" DECIMAL(3,2) NOT NULL DEFAULT 0,
    "num_reviews" INTEGER NOT NULL DEFAULT 0,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "banner" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" TEXT,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" TEXT,

    CONSTRAINT "falena_product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "falena_product_slug_key" ON "falena_product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "falena_product_sku_key" ON "falena_product"("sku");

-- CreateIndex
CREATE INDEX "falena_product_name_idx" ON "falena_product"("name");

-- CreateIndex
CREATE INDEX "falena_product_price_idx" ON "falena_product"("price");

-- CreateIndex
CREATE INDEX "falena_product_rating_idx" ON "falena_product"("rating");

-- CreateIndex
CREATE INDEX "falena_product_num_reviews_idx" ON "falena_product"("num_reviews");

-- CreateIndex
CREATE INDEX "falena_product_is_featured_idx" ON "falena_product"("is_featured");

-- CreateIndex
CREATE INDEX "falena_product_updated_at_idx" ON "falena_product"("updated_at");

-- CreateIndex
CREATE INDEX "falena_product_deleted_at_created_at_idx" ON "falena_product"("deleted_at", "created_at");

-- CreateIndex
CREATE INDEX "falena_product_category_brand_idx" ON "falena_product"("category", "brand");

-- CreateIndex
CREATE INDEX "falena_product_price_rating_idx" ON "falena_product"("price", "rating");

-- CreateIndex
CREATE INDEX "falena_product_stock_price_idx" ON "falena_product"("stock", "price");

-- CreateIndex
CREATE INDEX "falena_product_is_featured_rating_idx" ON "falena_product"("is_featured", "rating");
