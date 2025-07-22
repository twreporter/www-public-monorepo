-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `post` INTEGER NULL,
    `order` INTEGER NULL,

    INDEX `Review_post_idx`(`post`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_post_fkey` FOREIGN KEY (`post`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
