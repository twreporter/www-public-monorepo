-- AlterTable
ALTER TABLE `Post` ADD COLUMN `brief` JSON NULL;

-- AlterTable
ALTER TABLE `PostFollowup` ADD COLUMN `content` JSON NULL;

-- AlterTable
ALTER TABLE `Topic` ADD COLUMN `description` JSON NULL,
    ADD COLUMN `teamDescription` JSON NULL;
