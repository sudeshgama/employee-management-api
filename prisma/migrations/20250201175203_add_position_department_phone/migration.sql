/*
  Warnings:

  - Added the required column `department` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "position" TEXT NOT NULL;
