-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `twreporterID` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `User_twreporterID_idx`(`twreporterID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bookmark` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` INTEGER NULL,
    `post` INTEGER NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Bookmark_user_idx`(`user`),
    INDEX `Bookmark_post_idx`(`post`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostReadingTime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` INTEGER NULL,
    `post` INTEGER NULL,
    `seconds` INTEGER NOT NULL DEFAULT 0,

    INDEX `PostReadingTime_user_idx`(`user`),
    INDEX `PostReadingTime_post_idx`(`post`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostReadingFootprint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` INTEGER NULL,
    `post` INTEGER NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `PostReadingFootprint_user_idx`(`user`),
    INDEX `PostReadingFootprint_post_idx`(`post`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Post_postReadingBy` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Post_postReadingBy_AB_unique`(`A`, `B`),
    INDEX `_Post_postReadingBy_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_user_fkey` FOREIGN KEY (`user`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_post_fkey` FOREIGN KEY (`post`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostReadingTime` ADD CONSTRAINT `PostReadingTime_user_fkey` FOREIGN KEY (`user`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostReadingTime` ADD CONSTRAINT `PostReadingTime_post_fkey` FOREIGN KEY (`post`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostReadingFootprint` ADD CONSTRAINT `PostReadingFootprint_user_fkey` FOREIGN KEY (`user`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostReadingFootprint` ADD CONSTRAINT `PostReadingFootprint_post_fkey` FOREIGN KEY (`post`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Post_postReadingBy` ADD CONSTRAINT `_Post_postReadingBy_A_fkey` FOREIGN KEY (`A`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Post_postReadingBy` ADD CONSTRAINT `_Post_postReadingBy_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
