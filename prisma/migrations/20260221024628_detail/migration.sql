-- AlterTable
ALTER TABLE `dapem` ADD COLUMN `aw_address` VARCHAR(191) NULL,
    ADD COLUMN `aw_job` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `sumdan` ADD COLUMN `sk_date` DATETIME(3) NULL,
    ADD COLUMN `sk_no` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `ptkp` VARCHAR(191) NULL,
    ADD COLUMN `t_position` INTEGER NOT NULL DEFAULT 0;
