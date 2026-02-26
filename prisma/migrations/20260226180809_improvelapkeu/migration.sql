/*
  Warnings:

  - You are about to drop the column `amount` on the `journalentry` table. All the data in the column will be lost.
  - You are about to drop the column `categoryOfAccountId` on the `journalentry` table. All the data in the column will be lost.
  - You are about to drop the column `droppingId` on the `journalentry` table. All the data in the column will be lost.
  - You are about to drop the column `sumdanId` on the `journalentry` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `journalentry` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `journalentry` DROP FOREIGN KEY `JournalEntry_categoryOfAccountId_fkey`;

-- DropForeignKey
ALTER TABLE `journalentry` DROP FOREIGN KEY `JournalEntry_droppingId_fkey`;

-- DropForeignKey
ALTER TABLE `journalentry` DROP FOREIGN KEY `JournalEntry_sumdanId_fkey`;

-- DropForeignKey
ALTER TABLE `journalentry` DROP FOREIGN KEY `JournalEntry_userId_fkey`;

-- DropIndex
DROP INDEX `JournalEntry_categoryOfAccountId_fkey` ON `journalentry`;

-- DropIndex
DROP INDEX `JournalEntry_droppingId_fkey` ON `journalentry`;

-- DropIndex
DROP INDEX `JournalEntry_sumdanId_fkey` ON `journalentry`;

-- DropIndex
DROP INDEX `JournalEntry_userId_fkey` ON `journalentry`;

-- AlterTable
ALTER TABLE `journalentry` DROP COLUMN `amount`,
    DROP COLUMN `categoryOfAccountId`,
    DROP COLUMN `droppingId`,
    DROP COLUMN `sumdanId`,
    DROP COLUMN `userId`;

-- CreateTable
CREATE TABLE `JournalDetail` (
    `id` VARCHAR(191) NOT NULL,
    `debit` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    `credit` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    `journalEntryId` VARCHAR(191) NOT NULL,
    `categoryOfAccountId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `JournalDetail` ADD CONSTRAINT `JournalDetail_journalEntryId_fkey` FOREIGN KEY (`journalEntryId`) REFERENCES `JournalEntry`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JournalDetail` ADD CONSTRAINT `JournalDetail_categoryOfAccountId_fkey` FOREIGN KEY (`categoryOfAccountId`) REFERENCES `CategoryOfAccount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JournalDetail` ADD CONSTRAINT `JournalDetail_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
