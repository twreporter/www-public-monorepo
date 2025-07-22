/*
  Warnings:

  - You are about to drop the `_Post_relatedPosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_Post_relatedPosts` DROP FOREIGN KEY `_Post_relatedPosts_A_fkey`;

-- DropForeignKey
ALTER TABLE `_Post_relatedPosts` DROP FOREIGN KEY `_Post_relatedPosts_B_fkey`;

-- AlterTable
ALTER TABLE `Post` ADD COLUMN `heroImage` INTEGER NULL,
    ADD COLUMN `ogImage` INTEGER NULL;

-- DropTable
DROP TABLE `_Post_relatedPosts`;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL DEFAULT '',
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `sortOrder` INTEGER NULL,
    `ogTitle` VARCHAR(191) NOT NULL DEFAULT '',
    `ogDescription` VARCHAR(191) NOT NULL DEFAULT '',
    `ogImage` INTEGER NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Category_slug_key`(`slug`),
    UNIQUE INDEX `Category_name_key`(`name`),
    UNIQUE INDEX `Category_sortOrder_key`(`sortOrder`),
    INDEX `Category_ogImage_idx`(`ogImage`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subcategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL DEFAULT '',
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `category` INTEGER NULL,
    `nameForCMS` VARCHAR(191) NOT NULL DEFAULT '',
    `sortOrder` INTEGER NULL,
    `ogTitle` VARCHAR(191) NOT NULL DEFAULT '',
    `ogDescription` VARCHAR(191) NOT NULL DEFAULT '',
    `ogImage` INTEGER NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Subcategory_slug_key`(`slug`),
    UNIQUE INDEX `Subcategory_name_key`(`name`),
    UNIQUE INDEX `Subcategory_sortOrder_key`(`sortOrder`),
    INDEX `Subcategory_category_idx`(`category`),
    INDEX `Subcategory_ogImage_idx`(`ogImage`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Post_subcatories` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Post_subcatories_AB_unique`(`A`, `B`),
    INDEX `_Post_subcatories_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Post_beenRelatedPosts` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Post_beenRelatedPosts_AB_unique`(`A`, `B`),
    INDEX `_Post_beenRelatedPosts_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Category_posts` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Category_posts_AB_unique`(`A`, `B`),
    INDEX `_Category_posts_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Post_heroImage_idx` ON `Post`(`heroImage`);

-- CreateIndex
CREATE INDEX `Post_ogImage_idx` ON `Post`(`ogImage`);

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_heroImage_fkey` FOREIGN KEY (`heroImage`) REFERENCES `Photo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_ogImage_fkey` FOREIGN KEY (`ogImage`) REFERENCES `Photo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_ogImage_fkey` FOREIGN KEY (`ogImage`) REFERENCES `Photo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subcategory` ADD CONSTRAINT `Subcategory_category_fkey` FOREIGN KEY (`category`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subcategory` ADD CONSTRAINT `Subcategory_ogImage_fkey` FOREIGN KEY (`ogImage`) REFERENCES `Photo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Post_subcatories` ADD CONSTRAINT `_Post_subcatories_A_fkey` FOREIGN KEY (`A`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Post_subcatories` ADD CONSTRAINT `_Post_subcatories_B_fkey` FOREIGN KEY (`B`) REFERENCES `Subcategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Post_beenRelatedPosts` ADD CONSTRAINT `_Post_beenRelatedPosts_A_fkey` FOREIGN KEY (`A`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Post_beenRelatedPosts` ADD CONSTRAINT `_Post_beenRelatedPosts_B_fkey` FOREIGN KEY (`B`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Category_posts` ADD CONSTRAINT `_Category_posts_A_fkey` FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Category_posts` ADD CONSTRAINT `_Category_posts_B_fkey` FOREIGN KEY (`B`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
