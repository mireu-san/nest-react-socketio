# Welcome!
- This repository will demonstrate whether using nestjs would be sufficient to handle websocket.

# Goal
- Set up some feature to send a message. (1. broadcast message 2. notify when client is connected & (3) disconnected)
- Test out whether the message can be seen from either: (1) Another screen, (2) return echo message.

# Optional
- Test out with MongoDB Atlas or Google Firebase and see which one is better option for future work.

# Knowledge
- 1. Know the difference between REST API (when needed in request) and Websocket API (this is more like subscription). 
https://dotherealthing.tistory.com/13
- 2. socket.io : May need to use this again.
- 3. What server do in this time : Only echo back the information.

# Installed dependencies
- npm install --save @nestjs/websockets
- npm i -D eslint eslint-config-prettier eslint-plugin-prettier
- applied this code to .eslitrc.js
```
'prettier/prettier': [
  'error',
  {
    'endOfLine': 'auto',
  }
]
```
