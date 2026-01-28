/*
  Warnings:

  - You are about to alter the column `document_status` on the `dapem` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(13))` to `Enum(EnumId(13))`.
  - You are about to alter the column `guarantee_status` on the `dapem` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(14))` to `Enum(EnumId(13))`.

*/
-- AlterTable
ALTER TABLE `dapem` MODIFY `document_status` ENUM('UNIT', 'DELIVERY', 'PUSAT', 'SUMDAN') NOT NULL DEFAULT 'UNIT',
    MODIFY `guarantee_status` ENUM('UNIT', 'DELIVERY', 'PUSAT', 'SUMDAN') NOT NULL DEFAULT 'UNIT';
