import { makeNotification } from "../../../test/factories/notification-factory";
import { InMemoryNotificationRepository } from "../../../test/repositories/inMemoryNotificationRepository";
import { CancelNotification } from "./cancel-notification"
import { NotificationNotFound } from "./errors/notification-not-found";

describe('Cancel notification',()=>{
  it('Should be able to cancel a notification', async()=>{
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await cancelNotification.execute({notificationId: notification.id});

    expect(notificationRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
  });

  it('should not be able to cancel a notification when it does not exist', async ()=>{
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(()=>{
      return cancelNotification.execute({notificationId: 'fake-notification-id'});
    }).rejects.toThrow(NotificationNotFound); 
  });
})