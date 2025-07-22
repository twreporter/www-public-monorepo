-- AlterTable
ALTER TABLE `Post` ADD COLUMN `beenRelatedPostsOrderJson` JSON NULL,
    ADD COLUMN `relatedTopicsOrderJson` JSON NULL,
    ADD COLUMN `subcategoriesOrderJson` JSON NULL,
    ADD COLUMN `tagsOrderJson` JSON NULL;
