import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(socket: Socket) {
    console.log('Client connected:', socket.id);
  }

  handleDisconnect(socket: Socket) {
    console.log('Client disconnected:', socket.id);
  }

  @SubscribeMessage('message')
  handleMessage(socket: Socket, message: string) {
    console.log('Received message:', message);
    this.server.emit('message', message);
  }
}


// import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

// @WebSocketGateway()
// export class ChatGateway {
//   @WebSocketServer()
//   server;

//   @SubscribeMessage('message')
//   handleMessage(@MessageBody() message: string): void {
//     this.server.emit('message', message);
//   }
// }

// import { 
//     WebSocketGateway,
//     WebSocketServer,
//     SubscribeMessage,
//     OnGatewayConnection,
//     OnGatewayDisconnect,
// } from '@nestjs/websockets';

// @WebSocketGateway()
// // to track the clients connection and disconnection
// export class ChatGateWay implements OnGatewayConnection, OnGatewayDisconnect {
//     @WebSocketServer() server;
//     users: number = 0;

//     async handleConnection() {
//         this.users++;
//         this.server.emit('users', this.users);
//     }

//     async handleDisconnect() {
//         this.users--;
//         this.server.emit('users', this.users);
//     }

//     @SubscribeMessage('chat')
//     async onChat(client, message) {
//         client.broadcast.emit('chat', message);
//     }
// }
