import { Module } from '@nestjs/common';
import { ChatClientController } from './chatClient.controller';

@Module({
    controllers: [ChatClientController],
})
export class ChatClientModule {}
