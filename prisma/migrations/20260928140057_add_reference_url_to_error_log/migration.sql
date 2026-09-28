-- CreateEnum
CREATE TYPE "ResolutionStatus" AS ENUM ('RESOLVED', 'UNRESOLVED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userName" VARCHAR(255) NOT NULL,
    "profileIcon" TEXT NOT NULL DEFAULT '',
    "xUrl" TEXT NOT NULL DEFAULT '',
    "instagramUrl" TEXT NOT NULL DEFAULT '',
    "threadsUrl" TEXT NOT NULL DEFAULT '',
    "githubUrl" TEXT NOT NULL DEFAULT '',
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ErrorLog" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "status" "ResolutionStatus" NOT NULL DEFAULT 'UNRESOLVED',
    "os" VARCHAR(255),
    "framework_version" VARCHAR(255),
    "framework" VARCHAR(255),
    "solution" TEXT NOT NULL,
    "cause" TEXT NOT NULL,
    "error_message" TEXT NOT NULL,
    "reference_url" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ErrorLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tag_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ErrorLogTag" (
    "id" TEXT NOT NULL,
    "errorLogId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "ErrorLogTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_tag_name_key" ON "Tag"("tag_name");

-- CreateIndex
CREATE UNIQUE INDEX "ErrorLogTag_errorLogId_tagId_key" ON "ErrorLogTag"("errorLogId", "tagId");

-- AddForeignKey
ALTER TABLE "ErrorLog" ADD CONSTRAINT "ErrorLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ErrorLogTag" ADD CONSTRAINT "ErrorLogTag_errorLogId_fkey" FOREIGN KEY ("errorLogId") REFERENCES "ErrorLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ErrorLogTag" ADD CONSTRAINT "ErrorLogTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
