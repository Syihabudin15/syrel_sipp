/*
  Warnings:

  - Added the required column `remaining` to the `Angsuran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `angsuran` ADD COLUMN `remaining` INTEGER NOT NULL;
