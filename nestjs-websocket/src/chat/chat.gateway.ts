import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors: true})
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
//   @SubscribeMessage('message')
//   handleMessage(client: Socket, message: string) {
//     console.log('Received message:', message);
//     client.emit('message', message);
// }

}

