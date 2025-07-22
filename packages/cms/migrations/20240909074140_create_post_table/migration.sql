-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL DEFAULT '',
    `title` VARCHAR(191) NOT NULL DEFAULT '',
    `subtitle` VARCHAR(191) NOT NULL DEFAULT '',
    `state` VARCHAR(191) NULL DEFAULT 'draft',
    `publishedDate` DATETIME(3) NULL,
    `heroSize` VARCHAR(191) NULL DEFAULT 'medium',
    `heroCaption` VARCHAR(191) NOT NULL DEFAULT '',
    `style` VARCHAR(191) NULL DEFAULT 'default',
    `copyright` VARCHAR(191) NULL DEFAULT 'copyrighted',
    `ogTitle` VARCHAR(191) NOT NULL DEFAULT '',
    `ogDescription` VARCHAR(191) NOT NULL DEFAULT '',
    `newPageTargetBlank` BOOLEAN NOT NULL DEFAULT false,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Post_slug_key`(`slug`),
    INDEX `Post_title_idx`(`title`),
    INDEX `Post_state_idx`(`state`),
    INDEX `Post_publishedDate_idx`(`publishedDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
