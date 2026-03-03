/*
  Warnings:

  - You are about to alter the column `debit` on the `journaldetail` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,2)` to `Int`.
  - You are about to alter the column `credit` on the `journaldetail` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,2)` to `Int`.

*/
-- AlterTable
ALTER TABLE `journaldetail` MODIFY `debit` INTEGER NOT NULL DEFAULT 0,
    MODIFY `credit` INTEGER NOT NULL DEFAULT 0;
