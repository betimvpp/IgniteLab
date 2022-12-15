import { Injectable } from "@nestjs/common";
import { Notification } from "src/application/entities/notification";
import { NotificationRepository } from "../../../../application/repositories/notification-repositories";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository{
  constructor(private prismaService: PrismaService){}
  save(notification: Notification): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  findById(notificationId: string): Promise<Notification> {
    throw new Error("Method not implemented.");
  }
  
  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: raw,
    });
  }
}