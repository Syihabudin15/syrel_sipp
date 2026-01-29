/*
  Warnings:

  - Added the required column `sumdanId` to the `Berkas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sumdanId` to the `Dropping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sumdanId` to the `Jaminan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dapemId` to the `Pelunasan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `berkas` ADD COLUMN `sumdanId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `dropping` ADD COLUMN `sumdanId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `jaminan` ADD COLUMN `sumdanId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `pelunasan` ADD COLUMN `dapemId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Dropping` ADD CONSTRAINT `Dropping_sumdanId_fkey` FOREIGN KEY (`sumdanId`) REFERENCES `Sumdan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Berkas` ADD CONSTRAINT `Berkas_sumdanId_fkey` FOREIGN KEY (`sumdanId`) REFERENCES `Sumdan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jaminan` ADD CONSTRAINT `Jaminan_sumdanId_fkey` FOREIGN KEY (`sumdanId`) REFERENCES `Sumdan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pelunasan` ADD CONSTRAINT `Pelunasan_dapemId_fkey` FOREIGN KEY (`dapemId`) REFERENCES `Dapem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
