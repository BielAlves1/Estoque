/*
  Warnings:

  - You are about to drop the column `localidade_id` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `municipio_fabricado` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `uf_fabricado` on the `Produto` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Produto" DROP CONSTRAINT "Produto_localidade_id_fkey";

-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "localidade_id",
DROP COLUMN "municipio_fabricado",
DROP COLUMN "uf_fabricado";
