import { Module } from '@nestjs/common';
import { ChatServerModule } from './chatServer/chatServer.module';
import { ChatClientModule } from './chatClient/chatClient.module';

@Module({
    imports: [ChatServerModule, ChatClientModule],
})
export class AppModule {}


// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ChatGateway } from './chat/chat.gateway';


// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService, ChatGateway],
// })
// export class AppModule {}
