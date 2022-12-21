import { Kafka } from "kafkajs";
import { randomUUID } from "node:crypto";

async function bootstrap() {
    const kafka = new Kafka({
        clientId: "kafka-producer",
        clientId: 'notifications',
        brokers: ['select-mammoth-7791-us1-kafka.upstash.io:9092'],
        sasl: {
            mechanism: 'scram-sha-256',
            username: 'c2VsZWN0LW1hbW1vdGgtNzc5MSRLXvmVnjfppHICbWYvbpyo2MDHnZjqLPveYDQ',
            password: 'LTUuUCx-cf3VCnadX2ueeFYc7KdGF0xQHTr6APH9HPD9uZyDFFyrQ5q6xsLS-W-EhaU4cw==',
        },
        ssl: true,
    });

    const producer = kafka.producer()

    await producer.connect()

    await producer.send({
        topic: 'notifications.send-notification',
        messages: [{
            value: JSON.stringify({
                content: 'Nova solicitação de amizade!',
                category: 'social',
                recipientId: randomUUID(),
            })
        }, ],
    })

    await producer.disconnect()
}

bootstrap()