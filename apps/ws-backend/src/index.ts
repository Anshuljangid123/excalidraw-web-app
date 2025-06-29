import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from '@repo/backend-common/config';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws , request) {
  const url = request.url;
  // ws://localhost:3---??token=123123
  if(!url){
    return ;
  }

  // ["ws://localhost:3000" , "token=123123"]
  // searches the value in the url given to connect to the server.
  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') || "" ;
  const decoded = jwt.verify(token , JWT_SECRET);

  // type error 

  if(!decoded || !(decoded as JwtPayload).userId){
    ws.close();
    return;
  }

  ws.on('error', console.error);

  ws.on('message', function message(data) {  
    console.log('received: %s', data);
  }); 
  ws.send('something');
}); 