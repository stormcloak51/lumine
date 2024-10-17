import {
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	OnGatewayConnection,
	OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class PostsGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;

	handleConnection(client: any) {
			console.log('Client connected:', client.id);
	}

	handleDisconnect(client: any) {
			console.log('Client disconnected:', client.id);
	}

	@SubscribeMessage('newPost')
	handleNewPost(post: any) {
			this.server.emit('postCreated', post);
	}
}