# Prerequisite
Please run the following command from the root directory.
- npm run install-all
- npm run client
- npm run server

Please note: you need to run the client and the server in separate terminals.

# Motivation
I made this project to test out real-chat application feature by using nest.js and react.js simultaneously.
With the combination of websocket in nest.js and socket.io, I left some possibilities that this log can be recorded by using extra node.js module such as Winston in future.

# Limitation
Due to security concerns related to tokens in public environments, this project does not include serverless features.

If you have any questions, please feel free to send me a direct message to my Linkedin account :)

# Note
- In general, most pioneer seemed to not have a separate folder and instead, used ejs format to construct client view page and real-time feature with socket.io.
- EJS was experimentally implemented to this project, as recommendation to form dynamic rendering of HTML, based on the data provided by server.
- Instead of using ws(ws), socket.io(http) provides concept calls room.
- socket.io has a good reputation - no compatibility issue from browser.

# Potential improvement in future work
- May add up 'kick out' feature by selecting a specific ID (client).
- May add up 'sending a message to specific ID user only' feature whilst number of people are in the same room.


# Link (starting point)
- https://inpa.tistory.com/entry/SOCKET-%F0%9F%93%9A-SocketIO-%EC%82%AC%EC%9A%A9-%ED%95%B4%EB%B3%B4%EA%B8%B0#socket.io
- https://stackoverflow.com/questions/42156057/can-we-use-socket-io-with-ejsembedded-javascript-instead-of-html-page-in-node
- https://esc-wq.medium.com/simple-chat-server-using-nodejs-socket-io-ce31294926d1