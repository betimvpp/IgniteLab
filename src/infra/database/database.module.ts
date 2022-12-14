import { Module } from "@nestjs/common";
import { NotificationRepository } from "src/application/repositories/notification-repositories";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaNotificationRepository } from "./prisma/repositories/prisma-notification-repository";


@Module({
  providers:[
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository
    }
  ],
  exports:[
    NotificationRepository
  ]
})

export class DatabaseModule{}