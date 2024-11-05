import { Message } from './Message';

export interface SocketEvents {
  onMessage: (message: Message) => void;         
  onUserJoined: (userName: string) => void;       
  onUserLeft: (userName: string) => void;         
  onLoadMessages: (messages: Message[]) => void; 
}