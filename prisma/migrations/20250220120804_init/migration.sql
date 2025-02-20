-- CreateTable
CREATE TABLE "Menu" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "icon" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Menu_parentId_idx" ON "Menu"("parentId");

-- CreateIndex
CREATE INDEX "Menu_order_idx" ON "Menu"("order");

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
