import { InMemoryNotificationRepository } from "../../../test/repositories/inMemoryNotificationRepository";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { CountRecipientNotification } from "./count-recipient-notifications";

describe('Count recipients notifications',()=>{
  it('Should be able to count a recipient notifications', async()=>{
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotification = new CountRecipientNotification(notificationRepository);

    await notificationRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de notificação'),
        recipientId: 'recipient-1',
      })
    );
    await notificationRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de notificação'),
        recipientId: 'recipient-1',
      })
    );
    await notificationRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de notificação'),
        recipientId: 'recipient-2',
      })
    );
    const {count} = await countRecipientNotification.execute({
      recipientId:'recipient-1',
    });

    expect(count).toEqual(2);
  });
})