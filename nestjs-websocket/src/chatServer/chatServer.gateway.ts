import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatRoomService } from './chatRoom.service';
import { setInitDTO, chatRoomListDTO } from './dto/chatServer.dto';
import { Observable, map, from } from 'rxjs';

// port number 5000, origin 3000 to let it access via 3000 port.
@WebSocketGateway(5000, {
    cors: {
        origin: 'http://localhost:3000',
    },
})
export class ChatBackEndGateway
    implements OnGatewayConnection, OnGatewayDisconnect
{
    constructor(private readonly ChatRoomService: ChatRoomService) {}
    @WebSocketServer()
    server: Server;

    //add to user list once socket connection established
    public handleConnection(client: Socket): void {
        console.log('connected', client.id);
        client.leave(client.id);
        client.data.roomId = `room:lobby`;
        client.join('room:lobby');
    }

    //remove from user list if socket connection disconnected
    public handleDisconnect(client: Socket): void {
        const { roomId } = client.data;
        if (
            roomId != 'room:lobby' &&
            !this.server.sockets.adapter.rooms.get(roomId)
        ) {
            this.ChatRoomService.deleteChatRoom(roomId);
            this.server.emit(
                'getChatRoomList',
                this.ChatRoomService.getChatRoomList(),
            );
        }
        console.log('disonnected', client.id);
    }

    // send message to all users once message send
    @SubscribeMessage('sendMessage')
    sendMessage(client: Socket, message: string): void {
        client.rooms.forEach((roomId) =>
            client.to(roomId).emit('getMessage', {
                id: client.id,
                nickname: client.data.nickname,
                message,
            }),
        );
    }

    // initial nickname setup
    @SubscribeMessage('setInit')
    setInit(client: Socket, data: setInitDTO): setInitDTO {
        // 이미 최초 세팅이 되어있는 경우 패스
        if (client.data.isInit) {
            return;
        }

        client.data.nickname = data.nickname
            ? data.nickname
            : 'anonymous ' + client.id;

        client.data.isInit = true;

        return {
            nickname: client.data.nickname,
            room: {
                roomId: 'room:lobby',
                roomName: 'new chat',
            },
        };
    }

    //change nickname
    @SubscribeMessage('setNickname')
    setNickname(client: Socket, nickname: string): void {
        const { roomId } = client.data;
        client.to(roomId).emit('getMessage', {
            id: null,
            nickname: 'notice',
            message: `"User ${client.data.nickname}" has changed the nickname to "${nickname}".`,
        });
        client.data.nickname = nickname;
    }

    // load chat room list
    @SubscribeMessage('getChatRoomList')
    getChatRoomList(client: Socket, payload: any) {
        client.emit('getChatRoomList', this.ChatRoomService.getChatRoomList());
    }

    // create chat room
    @SubscribeMessage('createChatRoom')
    createChatRoom(client: Socket, roomName: string) {
        // remove room if user in that room is less than 2 user(client)
        if (
            client.data.roomId != 'room:lobby' &&
            this.server.sockets.adapter.rooms.get(client.data.roomId).size == 1
        ) {
            this.ChatRoomService.deleteChatRoom(client.data.roomId);
        }

        this.ChatRoomService.createChatRoom(client, roomName);
        return {
            roomId: client.data.roomId,
            roomName: this.ChatRoomService.getChatRoom(client.data.roomId)
                .roomName,
        };
    }

    // access chat room
    @SubscribeMessage('enterChatRoom')
    enterChatRoom(client: Socket, roomId: string) {
        // block the entry if already joined
        if (client.rooms.has(roomId)) {
            return;
        }
        // remove room if user in that room is less than 2 user(client)
        if (
            client.data.roomId != 'room:lobby' &&
            this.server.sockets.adapter.rooms.get(client.data.roomId).size == 1
        ) {
            this.ChatRoomService.deleteChatRoom(client.data.roomId);
        }
        this.ChatRoomService.enterChatRoom(client, roomId);
        return {
            roomId: roomId,
            roomName: this.ChatRoomService.getChatRoom(roomId).roomName,
        };
    }
}
