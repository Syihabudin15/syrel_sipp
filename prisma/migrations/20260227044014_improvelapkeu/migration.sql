/*
  Warnings:

  - You are about to drop the column `description` on the `journalentry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `journaldetail` ADD COLUMN `desciption` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `journalentry` DROP COLUMN `description`;
