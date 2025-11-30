/*
  Warnings:

  - Made the column `password` on table `falena_user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "falena_user" ALTER COLUMN "name" DROP DEFAULT,
ALTER COLUMN "password" SET NOT NULL;
