-- AlterTable
ALTER TABLE `user` ADD COLUMN `end_pkwt` DATETIME(3) NULL,
    ADD COLUMN `pkwt_status` VARCHAR(191) NULL,
    ADD COLUMN `start_pkwt` DATETIME(3) NULL;
