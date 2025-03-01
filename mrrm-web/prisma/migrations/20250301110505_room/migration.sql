-- CreateTable
CREATE TABLE `Room` (
    `RoomId` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `CreateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Description` VARCHAR(191) NOT NULL,
    `Capacity` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `Room_Name_key`(`Name`),
    PRIMARY KEY (`RoomId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservations` (
    `ReservationId` INTEGER NOT NULL AUTO_INCREMENT,
    `StartTime` DATETIME(3) NOT NULL,
    `EndTime` DATETIME(3) NOT NULL,
    `Note` VARCHAR(191) NOT NULL,
    `CreateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UserId` INTEGER NOT NULL,
    `RoomId` INTEGER NOT NULL,

    PRIMARY KEY (`ReservationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reservations` ADD CONSTRAINT `Reservations_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`UserId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservations` ADD CONSTRAINT `Reservations_RoomId_fkey` FOREIGN KEY (`RoomId`) REFERENCES `Room`(`RoomId`) ON DELETE RESTRICT ON UPDATE CASCADE;
