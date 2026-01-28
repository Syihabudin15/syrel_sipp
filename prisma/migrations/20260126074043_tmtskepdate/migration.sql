/*
  Warnings:

  - You are about to alter the column `date_skep` on the `debitur` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `tmt_skep` on the `debitur` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `debitur` MODIFY `date_skep` DATETIME(3) NOT NULL,
    MODIFY `tmt_skep` DATETIME(3) NOT NULL;
