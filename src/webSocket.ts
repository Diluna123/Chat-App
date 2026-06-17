import { Server } from "http";
import { WebSocketServer } from "ws";
import db from "./db";


export function startWebSocket(server: Server) {

    const userConnections = new Map();

    const wsServer = new WebSocketServer({ server });
    wsServer.on("connection", (ws) => {

        console.log("WebSocket connection established");
        ws.on("message", (data) => {
            const msgData = JSON.parse(data.toString());
            if (msgData.type === "register") {
                userConnections.set(msgData.data, ws);
                console.log("connection saved")
                console.log(msgData);

            } else if (msgData.type === "chat") {
                console.log(msgData);

                const { data, reciver, sender, chatId } = msgData;

                const reciverWs = <WebSocket>userConnections.get(reciver);
                // save to db
                const pool = db.promise();
                try {
                    pool.query("INSERT INTO chat_history (message, sent_at, chat_chat_id, sender, message_status_id) VALUES (?,?,?,?,?)", [data, new Date(), chatId, sender, 1]);


                } catch (err) {
                    console.error("Error saving chat message to database:", err);
                }

                // send to reciver
                if (reciverWs) {
                    const msgData = {
                        message: data,
                        sent_at: new Date().toISOString(),
                        sender: sender

                    }


                    reciverWs.send(JSON.stringify(msgData));
                    console.log("message sent to reciver")
                }


            }
        });

    });

}