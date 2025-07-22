-- CreateTable
CREATE TABLE `Topic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL DEFAULT '',
    `title` VARCHAR(191) NOT NULL DEFAULT '',
    `subtitle` VARCHAR(191) NOT NULL DEFAULT '',
    `headline` VARCHAR(191) NOT NULL DEFAULT '',
    `topicName` VARCHAR(191) NOT NULL DEFAULT '',
    `titlePosition` VARCHAR(191) NULL DEFAULT 'bottom',
    `state` VARCHAR(191) NULL DEFAULT 'draft',
    `publishedDate` DATETIME(3) NULL,
    `heroImage` INTEGER NULL,
    `mobileHeroImage` INTEGER NULL,
    `ogTitle` VARCHAR(191) NOT NULL DEFAULT '',
    `ogDescription` VARCHAR(191) NOT NULL DEFAULT '',
    `ogImage` INTEGER NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Topic_slug_key`(`slug`),
    INDEX `Topic_title_idx`(`title`),
    INDEX `Topic_state_idx`(`state`),
    INDEX `Topic_publishedDate_idx`(`publishedDate`),
    INDEX `Topic_heroImage_idx`(`heroImage`),
    INDEX `Topic_mobileHeroImage_idx`(`mobileHeroImage`),
    INDEX `Topic_ogImage_idx`(`ogImage`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Post_relatedTopics` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Post_relatedTopics_AB_unique`(`A`, `B`),
    INDEX `_Post_relatedTopics_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Topic` ADD CONSTRAINT `Topic_heroImage_fkey` FOREIGN KEY (`heroImage`) REFERENCES `Photo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Topic` ADD CONSTRAINT `Topic_mobileHeroImage_fkey` FOREIGN KEY (`mobileHeroImage`) REFERENCES `Photo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Topic` ADD CONSTRAINT `Topic_ogImage_fkey` FOREIGN KEY (`ogImage`) REFERENCES `Photo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Post_relatedTopics` ADD CONSTRAINT `_Post_relatedTopics_A_fkey` FOREIGN KEY (`A`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Post_relatedTopics` ADD CONSTRAINT `_Post_relatedTopics_B_fkey` FOREIGN KEY (`B`) REFERENCES `Topic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
