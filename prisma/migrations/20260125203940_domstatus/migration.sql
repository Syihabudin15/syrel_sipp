/*
  Warnings:

  - Added the required column `dom_status` to the `Dapem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dapem` ADD COLUMN `dom_status` BOOLEAN NOT NULL;
