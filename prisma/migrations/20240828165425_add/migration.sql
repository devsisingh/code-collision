/*
  Warnings:

  - You are about to drop the column `description` on the `Idea` table. All the data in the column will be lost.
  - Added the required column `additional` to the `Idea` table without a default value. This is not possible if the table is not empty.
  - Added the required column `possible_solution` to the `Idea` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problem_solved` to the `Idea` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Idea" DROP COLUMN "description",
ADD COLUMN     "additional" TEXT NOT NULL,
ADD COLUMN     "possible_solution" TEXT NOT NULL,
ADD COLUMN     "problem_solved" TEXT NOT NULL,
ADD COLUMN     "resources" TEXT[];
