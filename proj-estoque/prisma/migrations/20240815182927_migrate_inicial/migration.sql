-- CreateTable
CREATE TABLE "Localidade" (
    "municipio_id" INTEGER NOT NULL,
    "municipio_nome" TEXT NOT NULL,
    "uf_id" INTEGER NOT NULL,
    "uf_sigla" TEXT NOT NULL,
    "uf_nome" TEXT NOT NULL,

    CONSTRAINT "Localidade_pkey" PRIMARY KEY ("municipio_id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "referencia" TEXT NOT NULL,
    "unidade_medida" TEXT NOT NULL,
    "vlr_venda" DOUBLE PRECISION NOT NULL,
    "estoque" DOUBLE PRECISION DEFAULT 0,
    "fabricante" TEXT,
    "local_fabricado" TEXT,
    "image_url" TEXT,
    "localidade_id" INTEGER,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_localidade_id_fkey" FOREIGN KEY ("localidade_id") REFERENCES "Localidade"("municipio_id") ON DELETE SET NULL ON UPDATE CASCADE;
