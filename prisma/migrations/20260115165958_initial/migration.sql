-- CreateTable
CREATE TABLE `Role` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `permission` TEXT NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sumdan` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `logo` VARCHAR(191) NULL,
    `address` TEXT NULL,
    `phone` VARCHAR(191) NULL,
    `tbo` INTEGER NOT NULL DEFAULT 3,
    `rounded` INTEGER NOT NULL DEFAULT 1000,
    `limit` INTEGER NOT NULL DEFAULT 0,
    `c_margin` DOUBLE NOT NULL,
    `c_adm` DOUBLE NOT NULL,
    `c_gov` INTEGER NOT NULL,
    `c_stamps` INTEGER NOT NULL,
    `c_account` INTEGER NOT NULL,
    `dsr` DOUBLE NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Area` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cabang` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `address` TEXT NULL,
    `phone` VARCHAR(191) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `areaId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `nip` VARCHAR(191) NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `target` INTEGER NOT NULL DEFAULT 0,
    `position` VARCHAR(191) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `roleId` VARCHAR(191) NOT NULL,
    `cabangId` VARCHAR(191) NOT NULL,
    `sumdanId` VARCHAR(191) NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProdukPembiayaan` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `c_margin` DOUBLE NOT NULL,
    `c_adm` DOUBLE NOT NULL,
    `c_insurance` DOUBLE NOT NULL,
    `max_tenor` INTEGER NOT NULL,
    `max_plafond` INTEGER NOT NULL,
    `min_age` INTEGER NOT NULL,
    `max_age` INTEGER NOT NULL,
    `max_paid` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sumdanId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JenisPembiayaan` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `c_blokir` INTEGER NOT NULL,
    `c_mutasi` INTEGER NOT NULL DEFAULT 0,
    `status_takeover` BOOLEAN NOT NULL DEFAULT false,
    `status_mutasi` BOOLEAN NOT NULL DEFAULT false,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Debitur` (
    `nopen` VARCHAR(191) NOT NULL,
    `salary` INTEGER NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `nik` VARCHAR(191) NULL,
    `birthdate` DATETIME(3) NOT NULL,
    `birthplace` VARCHAR(191) NULL,
    `religion` VARCHAR(191) NULL,
    `address` VARCHAR(191) NOT NULL,
    `ward` VARCHAR(191) NULL,
    `district` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `province` VARCHAR(191) NULL,
    `pos_code` VARCHAR(191) NULL,
    `npwp` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `education` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,
    `no_skep` VARCHAR(191) NOT NULL,
    `name_skep` VARCHAR(191) NULL,
    `date_skep` VARCHAR(191) NOT NULL,
    `tmt_skep` VARCHAR(191) NOT NULL,
    `rank_skep` VARCHAR(191) NULL,
    `publisher_skep` VARCHAR(191) NULL,
    `group_skep` VARCHAR(191) NULL,
    `soul_code` INTEGER NULL,
    `job_year` INTEGER NULL,
    `pay_office` VARCHAR(191) NOT NULL,
    `start_flagging` VARCHAR(191) NULL,
    `end_flagging` VARCHAR(191) NULL,
    `mother_name` VARCHAR(191) NULL,
    `account_name` VARCHAR(191) NULL,
    `account_number` VARCHAR(191) NULL,

    UNIQUE INDEX `Debitur_nopen_key`(`nopen`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dapem` (
    `id` VARCHAR(191) NOT NULL,
    `salary` INTEGER NOT NULL,
    `tenor` INTEGER NOT NULL,
    `plafond` INTEGER NOT NULL,
    `c_margin` DOUBLE NOT NULL,
    `c_margin_sumdan` DOUBLE NOT NULL,
    `c_adm` DOUBLE NOT NULL,
    `c_adm_sumdan` DOUBLE NOT NULL,
    `c_insurance` DOUBLE NOT NULL,
    `c_gov` INTEGER NOT NULL,
    `c_stamp` INTEGER NOT NULL,
    `c_account` INTEGER NOT NULL,
    `c_mutasi` INTEGER NOT NULL,
    `c_blokir` INTEGER NOT NULL,
    `c_takeover` INTEGER NOT NULL,
    `tbo` INTEGER NOT NULL,
    `rounded` INTEGER NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `ward` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NULL,
    `pos_code` VARCHAR(191) NULL,
    `geolocation` VARCHAR(191) NULL,
    `house_status` VARCHAR(191) NULL,
    `house_year` VARCHAR(191) NULL,
    `job` VARCHAR(191) NULL,
    `job_address` VARCHAR(191) NULL,
    `business` VARCHAR(191) NULL,
    `marriage_status` ENUM('KAWIN', 'BELUM_KAWIN', 'JANDA', 'DUDA') NOT NULL DEFAULT 'BELUM_KAWIN',
    `marriage_name` VARCHAR(191) NULL,
    `marriage_nik` VARCHAR(191) NULL,
    `marriage_birthdate` VARCHAR(191) NULL,
    `marriage_birthplace` VARCHAR(191) NULL,
    `marriage_job` VARCHAR(191) NULL,
    `f_name` VARCHAR(191) NULL,
    `f_relate` VARCHAR(191) NULL,
    `f_phone` VARCHAR(191) NULL,
    `f_address` VARCHAR(191) NULL,
    `dropping_status` ENUM('DRAFT', 'PROCCESS', 'APPROVED', 'PAID_OFF') NOT NULL DEFAULT 'DRAFT',
    `verif_status` ENUM('PENDING', 'APPROVED', 'REJECTED') NULL,
    `verif_desc` TEXT NULL,
    `slik_status` ENUM('PENDING', 'APPROVED', 'REJECTED') NULL,
    `slik_desc` TEXT NULL,
    `approv_status` ENUM('PENDING', 'APPROVED', 'REJECTED') NULL,
    `approv_desc` TEXT NULL,
    `takeover_status` ENUM('DRAFT', 'PROCCESS', 'APPROVED', 'PAID_OFF') NOT NULL DEFAULT 'DRAFT',
    `takeover_desc` TEXT NULL,
    `mutasi_status` ENUM('DRAFT', 'PROCCESS', 'APPROVED', 'PAID_OFF') NOT NULL DEFAULT 'DRAFT',
    `mutasi_desc` TEXT NULL,
    `cash_status` ENUM('DRAFT', 'PROCCESS', 'APPROVED', 'PAID_OFF') NOT NULL DEFAULT 'DRAFT',
    `cash_desc` TEXT NULL,
    `document_status` ENUM('DRAFT', 'PROCCESS', 'APPROVED', 'PAID_OFF') NOT NULL DEFAULT 'DRAFT',
    `document_desc` TEXT NULL,
    `guarantee_status` ENUM('DRAFT', 'PROCCESS', 'APPROVED', 'PAID_OFF') NOT NULL DEFAULT 'DRAFT',
    `guarantee_desc` TEXT NULL,
    `used_for` VARCHAR(191) NOT NULL,
    `no_contract` VARCHAR(191) NOT NULL,
    `date_contract` DATETIME(3) NULL,
    `file_slik` VARCHAR(191) NULL,
    `file_submission` VARCHAR(191) NULL,
    `video_interview` VARCHAR(191) NULL,
    `video_insurance` VARCHAR(191) NULL,
    `file_contract` VARCHAR(191) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nopen` VARCHAR(191) NOT NULL,
    `produkPembiayaanId` VARCHAR(191) NOT NULL,
    `jenisPembiayaanId` VARCHAR(191) NOT NULL,
    `createdById` VARCHAR(191) NOT NULL,
    `aoId` VARCHAR(191) NOT NULL,
    `droppingId` VARCHAR(191) NULL,
    `berkasId` VARCHAR(191) NULL,
    `jaminanId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dropping` (
    `id` VARCHAR(191) NOT NULL,
    `file_sub` VARCHAR(191) NULL,
    `file_proof` TEXT NULL,
    `status` BOOLEAN NOT NULL,
    `process_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Berkas` (
    `id` VARCHAR(191) NOT NULL,
    `file_sub` VARCHAR(191) NULL,
    `file_proof` VARCHAR(191) NULL,
    `status` ENUM('UNIT', 'DELIVERY', 'PUSAT', 'SUMDAN') NOT NULL,
    `process_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jaminan` (
    `id` VARCHAR(191) NOT NULL,
    `file_sub` VARCHAR(191) NULL,
    `file_proof` VARCHAR(191) NULL,
    `status` ENUM('UNIT', 'DELIVERY', 'PUSAT', 'SUMDAN') NOT NULL,
    `process_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pelunasan` (
    `id` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `penalty` INTEGER NOT NULL,
    `desc` VARCHAR(191) NULL,
    `file_sub` VARCHAR(191) NULL,
    `type` ENUM('MENINGGAL', 'TOPUP', 'LEPAS') NOT NULL,
    `status_paid` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `process_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Angsuran` (
    `id` VARCHAR(191) NOT NULL,
    `counter` INTEGER NOT NULL,
    `principal` INTEGER NOT NULL,
    `margin` INTEGER NOT NULL,
    `date_pay` DATETIME(3) NOT NULL,
    `date_paid` DATETIME(3) NULL,
    `dapemId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cabang` ADD CONSTRAINT `Cabang_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `Area`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_cabangId_fkey` FOREIGN KEY (`cabangId`) REFERENCES `Cabang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_sumdanId_fkey` FOREIGN KEY (`sumdanId`) REFERENCES `Sumdan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProdukPembiayaan` ADD CONSTRAINT `ProdukPembiayaan_sumdanId_fkey` FOREIGN KEY (`sumdanId`) REFERENCES `Sumdan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dapem` ADD CONSTRAINT `Dapem_nopen_fkey` FOREIGN KEY (`nopen`) REFERENCES `Debitur`(`nopen`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dapem` ADD CONSTRAINT `Dapem_produkPembiayaanId_fkey` FOREIGN KEY (`produkPembiayaanId`) REFERENCES `ProdukPembiayaan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dapem` ADD CONSTRAINT `Dapem_jenisPembiayaanId_fkey` FOREIGN KEY (`jenisPembiayaanId`) REFERENCES `JenisPembiayaan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dapem` ADD CONSTRAINT `Dapem_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dapem` ADD CONSTRAINT `Dapem_aoId_fkey` FOREIGN KEY (`aoId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dapem` ADD CONSTRAINT `Dapem_droppingId_fkey` FOREIGN KEY (`droppingId`) REFERENCES `Dropping`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dapem` ADD CONSTRAINT `Dapem_berkasId_fkey` FOREIGN KEY (`berkasId`) REFERENCES `Berkas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dapem` ADD CONSTRAINT `Dapem_jaminanId_fkey` FOREIGN KEY (`jaminanId`) REFERENCES `Jaminan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Angsuran` ADD CONSTRAINT `Angsuran_dapemId_fkey` FOREIGN KEY (`dapemId`) REFERENCES `Dapem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
