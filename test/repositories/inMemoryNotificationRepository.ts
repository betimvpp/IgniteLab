import { Notification } from "../../src/application/entities/notification";
import { NotificationRepository } from "../../src/application/repositories/notification-repositories";

export class InMemoryNotificationRepository implements NotificationRepository{
  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(notification => notification.recipientId === recipientId).length;
  } 
  async findById(notificationId: string): Promise<Notification> {
    const notification = this.notifications.find(item => (item.id === notificationId));
    if(!notification){
      return null
    } else{
      return notification
    }
  }
  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(item => (item.id === notification.id))
    if(notificationIndex >=0){
      this.notifications[notificationIndex] = notification;
    }
  }
  public notifications: Notification[] = [];

  async create(notification: Notification){
    this.notifications.push(notification);
  }
};