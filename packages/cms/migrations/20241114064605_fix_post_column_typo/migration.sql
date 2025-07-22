/*
  Warnings:

  - You are about to drop the `_Post_subcatories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_Post_subcatories` DROP FOREIGN KEY `_Post_subcatories_A_fkey`;

-- DropForeignKey
ALTER TABLE `_Post_subcatories` DROP FOREIGN KEY `_Post_subcatories_B_fkey`;

-- DropTable
DROP TABLE `_Post_subcatories`;

-- CreateTable
CREATE TABLE `_Post_subcategories` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Post_subcategories_AB_unique`(`A`, `B`),
    INDEX `_Post_subcategories_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_Post_subcategories` ADD CONSTRAINT `_Post_subcategories_A_fkey` FOREIGN KEY (`A`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Post_subcategories` ADD CONSTRAINT `_Post_subcategories_B_fkey` FOREIGN KEY (`B`) REFERENCES `Subcategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
