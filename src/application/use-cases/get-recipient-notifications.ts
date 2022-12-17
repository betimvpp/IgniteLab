import { Injectable } from "@nestjs/common";
import { Notification } from "../entities/notification";
import {NotificationRepository} from "../repositories/notification-repositories"

interface GetRecipientNotificationRequest{
  recipientId: string,
}

interface GetRecipientNotificationResponse{
  notifications: Notification[];
};

@Injectable()
export class GetRecipientNotification {
  constructor(private notificationRepository: NotificationRepository){}

  async execute(request: GetRecipientNotificationRequest): Promise <GetRecipientNotificationResponse>{
    const { recipientId } = request;

    const notifications = await this.notificationRepository.findManyByRecipientId(recipientId);

   return{
    notifications,
   };
  }
}