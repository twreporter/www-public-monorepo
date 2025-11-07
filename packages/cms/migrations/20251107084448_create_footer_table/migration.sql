-- CreateTable
CREATE TABLE `Footer` (
    `id` INTEGER NOT NULL,
    `fundraisingID` VARCHAR(191) NOT NULL DEFAULT '',
    `fundraisingDateString` VARCHAR(191) NOT NULL DEFAULT '',
    `socialMediaLinks` JSON NULL,
    `footerLinks` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
