import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy{
 constructor(){
  super({
    client:{
      clientId: 'notifications',
      brokers: ['select-mammoth-7791-us1-kafka.upstash.io:9092'],
      sasl: {
        mechanism: 'scram-sha-256',
        username: 'c2VsZWN0LW1hbW1vdGgtNzc5MSRLXvmVnjfppHICbWYvbpyo2MDHnZjqLPveYDQ',
        password: 'LTUuUCx-cf3VCnadX2ueeFYc7KdGF0xQHTr6APH9HPD9uZyDFFyrQ5q6xsLS-W-EhaU4cw==',
      },
      ssl: true,
    }
  });
 }
  async onModuleDestroy() {
    await this.close();
  }
}