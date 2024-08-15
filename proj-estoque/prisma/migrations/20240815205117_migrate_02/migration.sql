/*
  Warnings:

  - You are about to drop the column `local_fabricado` on the `Produto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "local_fabricado",
ADD COLUMN     "municipio_fabricado" TEXT,
ADD COLUMN     "uf_fabricado" TEXT;
