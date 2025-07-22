-- CreateTable
CREATE TABLE `Photo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `imageFile_id` VARCHAR(191) NULL,
    `imageFile_filesize` INTEGER NULL,
    `imageFile_width` INTEGER NULL,
    `imageFile_height` INTEGER NULL,
    `imageFile_extension` VARCHAR(191) NULL,
    `IPTC` JSON NULL,
    `copyright` VARCHAR(191) NULL DEFAULT 'copyrighted',
    `keywords` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `Photo_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
