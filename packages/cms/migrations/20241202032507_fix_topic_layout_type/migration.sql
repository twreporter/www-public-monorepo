/*
  Warnings:

  - You are about to alter the column `postLayout` on the `Topic` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Topic` MODIFY `postLayout` ENUM('row', 'column') NULL DEFAULT 'row';
