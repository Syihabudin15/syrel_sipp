/*
  Warnings:

  - You are about to alter the column `takeover_date` on the `dapem` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `dapem` MODIFY `takeover_date` DATETIME(3) NULL;
