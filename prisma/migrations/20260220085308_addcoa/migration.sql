-- CreateTable
CREATE TABLE `CategoryOfAccount` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('ASSET', 'KEWAJIBAN', 'MODAL', 'PENDAPATAN', 'BEBAN') NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `parentId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JournalEntry` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NULL,
    `amount` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    `droppingId` VARCHAR(191) NULL,
    `categoryOfAccountId` VARCHAR(191) NOT NULL,
    `sumdanId` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CategoryOfAccount` ADD CONSTRAINT `CategoryOfAccount_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `CategoryOfAccount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JournalEntry` ADD CONSTRAINT `JournalEntry_sumdanId_fkey` FOREIGN KEY (`sumdanId`) REFERENCES `Sumdan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JournalEntry` ADD CONSTRAINT `JournalEntry_droppingId_fkey` FOREIGN KEY (`droppingId`) REFERENCES `Dropping`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JournalEntry` ADD CONSTRAINT `JournalEntry_categoryOfAccountId_fkey` FOREIGN KEY (`categoryOfAccountId`) REFERENCES `CategoryOfAccount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JournalEntry` ADD CONSTRAINT `JournalEntry_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
