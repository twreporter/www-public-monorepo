/*
  Warnings:

  - You are about to drop the `_PostFollowup_posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_PostFollowup_posts` DROP FOREIGN KEY `_PostFollowup_posts_A_fkey`;

-- DropForeignKey
ALTER TABLE `_PostFollowup_posts` DROP FOREIGN KEY `_PostFollowup_posts_B_fkey`;

-- AlterTable
ALTER TABLE `Post` ADD COLUMN `authorsJSON` JSON NULL,
    ADD COLUMN `reviewWord` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `toAutoNotify` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `updatedDate` DATETIME(3) NULL;

-- DropTable
DROP TABLE `_PostFollowup_posts`;

-- CreateTable
CREATE TABLE `_Post_postFollowups` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Post_postFollowups_AB_unique`(`A`, `B`),
    INDEX `_Post_postFollowups_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_Post_postFollowups` ADD CONSTRAINT `_Post_postFollowups_A_fkey` FOREIGN KEY (`A`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Post_postFollowups` ADD CONSTRAINT `_Post_postFollowups_B_fkey` FOREIGN KEY (`B`) REFERENCES `PostFollowup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
