-- CreateTable
CREATE TABLE `PostFollowup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL DEFAULT '',
    `publishedDate` DATETIME(3) NULL,
    `summary` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `PostFollowup_title_idx`(`title`),
    INDEX `PostFollowup_publishedDate_idx`(`publishedDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PostFollowup_posts` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PostFollowup_posts_AB_unique`(`A`, `B`),
    INDEX `_PostFollowup_posts_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PostFollowup_posts` ADD CONSTRAINT `_PostFollowup_posts_A_fkey` FOREIGN KEY (`A`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PostFollowup_posts` ADD CONSTRAINT `_PostFollowup_posts_B_fkey` FOREIGN KEY (`B`) REFERENCES `PostFollowup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
