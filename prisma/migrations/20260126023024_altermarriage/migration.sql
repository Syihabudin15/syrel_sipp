/*
  Warnings:

  - You are about to drop the column `marriage_birthdate` on the `dapem` table. All the data in the column will be lost.
  - You are about to drop the column `marriage_birthplace` on the `dapem` table. All the data in the column will be lost.
  - You are about to drop the column `marriage_job` on the `dapem` table. All the data in the column will be lost.
  - You are about to drop the column `marriage_name` on the `dapem` table. All the data in the column will be lost.
  - You are about to drop the column `marriage_nik` on the `dapem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `dapem` DROP COLUMN `marriage_birthdate`,
    DROP COLUMN `marriage_birthplace`,
    DROP COLUMN `marriage_job`,
    DROP COLUMN `marriage_name`,
    DROP COLUMN `marriage_nik`,
    ADD COLUMN `aw_birthdate` VARCHAR(191) NULL,
    ADD COLUMN `aw_birthplace` VARCHAR(191) NULL,
    ADD COLUMN `aw_name` VARCHAR(191) NULL,
    ADD COLUMN `aw_nik` VARCHAR(191) NULL;
