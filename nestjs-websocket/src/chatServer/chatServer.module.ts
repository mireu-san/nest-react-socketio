import { Module } from '@nestjs/common';
import { ChatServerGateway } from './chatServer.gateway';
import { ChatRoomService } from './chatRoom.service';

@Module({
    providers: [ChatServerGateway, ChatRoomService],
})
export class ChatServerModule {}
