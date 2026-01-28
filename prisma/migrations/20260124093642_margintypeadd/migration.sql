/*
  Warnings:

  - Added the required column `margin_type` to the `Dapem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `margin_type` to the `ProdukPembiayaan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dapem` ADD COLUMN `margin_type` ENUM('FLAT', 'ANUITAS') NOT NULL,
    MODIFY `dropping_status` ENUM('DRAFT', 'CANCEL', 'PROCCESS', 'APPROVED', 'PAID_OFF') NOT NULL DEFAULT 'DRAFT',
    MODIFY `takeover_status` ENUM('DRAFT', 'CANCEL', 'PROCCESS', 'APPROVED', 'PAID_OFF') NOT NULL DEFAULT 'DRAFT',
    MODIFY `mutasi_status` ENUM('DRAFT', 'CANCEL', 'PROCCESS', 'APPROVED', 'PAID_OFF') NOT NULL DEFAULT 'DRAFT',
    MODIFY `cash_status` ENUM('DRAFT', 'CANCEL', 'PROCCESS', 'APPROVED', 'PAID_OFF') NOT NULL DEFAULT 'DRAFT',
    MODIFY `document_status` ENUM('DRAFT', 'CANCEL', 'PROCCESS', 'APPROVED', 'PAID_OFF') NOT NULL DEFAULT 'DRAFT',
    MODIFY `guarantee_status` ENUM('DRAFT', 'CANCEL', 'PROCCESS', 'APPROVED', 'PAID_OFF') NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE `produkpembiayaan` ADD COLUMN `margin_type` ENUM('FLAT', 'ANUITAS') NOT NULL;
