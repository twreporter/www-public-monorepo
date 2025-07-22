-- CreateTable
CREATE TABLE `Latest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tag` INTEGER NULL,
    `order` INTEGER NULL,

    INDEX `Latest_tag_idx`(`tag`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Latest` ADD CONSTRAINT `Latest_tag_fkey` FOREIGN KEY (`tag`) REFERENCES `Tag`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
