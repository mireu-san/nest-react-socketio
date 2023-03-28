import { Injectable } from '@nestjs/common';
import { chatRoomListDTO } from './dto/chatServer.dto';
import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChatRoomService {
    private chatRoomList: Record<string, chatRoomListDTO>;
    constructor() {
        this.chatRoomList = {
            'room:lobby': {
                roomId: 'room:lobby',
                roomName: 'new chat',
                cheifId: null,
            },
        };
    }
    createChatRoom(client: Socket, roomName: string): void {
        const roomId = `room:${uuidv4()}`;
        const nickname: string = client.data.nickname;
        client.emit('getMessage', {
            id: null,
            nickname: 'notice',
            message:
                '"User"' + nickname + '"has created the room"' + roomName,
        });
        // return this.chatRoomList[roomId];
        this.chatRoomList[roomId] = {
            roomId,
            cheifId: client.id,
            roomName,
        };
        client.data.roomId = roomId;
        client.rooms.clear();
        client.join(roomId);
    }

    enterChatRoom(client: Socket, roomId: string) {
        client.data.roomId = roomId;
        client.rooms.clear();
        client.join(roomId);
        const { nickname } = client.data;
        const { roomName } = this.getChatRoom(roomId);
        client.to(roomId).emit('getMessage', {
            id: null,
            nickname: 'notice',
            message: `"User ${nickname}" joined the room "${roomName}".`,
        });
    }

    exitChatRoom(client: Socket, roomId: string) {
        client.data.roomId = `room:lobby`;
        client.rooms.clear();
        client.join(`room:lobby`);
        const { nickname } = client.data;
        client.to(roomId).emit('getMessage', {
            id: null,
            nickname: 'notice',
            message: '"User"' + nickname + "left the room.",
        });
    }

    getChatRoom(roomId: string): chatRoomListDTO {
        return this.chatRoomList[roomId];
    }

    getChatRoomList(): Record<string, chatRoomListDTO> {
        return this.chatRoomList;
    }

    deleteChatRoom(roomId: string) {
        delete this.chatRoomList[roomId];
    }
}
