/*
  Warnings:

  - You are about to alter the column `aw_birthdate` on the `dapem` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `dapem` MODIFY `aw_birthdate` DATETIME(3) NULL;
