import { Module } from '@nestjs/common';
import { ChatFrontEndController } from './chatClient.controller';

@Module({
    controllers: [ChatFrontEndController],
})
export class ChatFrontEndModule {}
