-- CreateTable
CREATE TABLE "emailVerification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emailVerification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "emailVerification" ADD CONSTRAINT "emailVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
