-- CreateTable
CREATE TABLE "resetPassword" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "resetPassword_pkey" PRIMARY KEY ("id")
);
