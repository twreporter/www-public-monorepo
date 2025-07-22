/*
  Warnings:

  - You are about to drop the column `toAutoNotify` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `toAutoNotify`;

-- CreateTable
CREATE TABLE `PushNotification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL DEFAULT '',
    `link` VARCHAR(191) NOT NULL DEFAULT '',
    `labelForCMS` VARCHAR(191) NOT NULL DEFAULT '',
    `publishedAt` DATETIME(3) NOT NULL,
    `channel` JSON NOT NULL,
    `post` INTEGER NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `PushNotification_post_idx`(`post`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PushNotification` ADD CONSTRAINT `PushNotification_post_fkey` FOREIGN KEY (`post`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
