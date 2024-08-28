/*
  Warnings:

  - The values [Defi] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Idea` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('Payment', 'ConsumerDapp', 'Nft', 'DeFi', 'DePin', 'Gaming', 'Social', 'Ai', 'Content', 'DeveloperTooling', 'Community');
ALTER TABLE "Idea" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Idea" DROP CONSTRAINT "Idea_userId_fkey";

-- DropIndex
DROP INDEX "User_avatar_image_url_key";

-- AlterTable
ALTER TABLE "Idea" DROP CONSTRAINT "Idea_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Idea_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Idea_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "avatar_image_url" DROP NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Idea" ADD CONSTRAINT "Idea_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
