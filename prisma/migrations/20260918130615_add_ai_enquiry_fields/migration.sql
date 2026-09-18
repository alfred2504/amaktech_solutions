-- AlterTable
ALTER TABLE "Enquiry" ADD COLUMN     "aiGenerated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "aiProjectBrief" TEXT;

-- CreateIndex
CREATE INDEX "Enquiry_aiGenerated_idx" ON "Enquiry"("aiGenerated");
