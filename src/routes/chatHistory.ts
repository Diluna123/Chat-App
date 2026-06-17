import { Router } from "express";
import db from "../db";



const router = Router();
const pool = db.promise();



router.get("/get-chat-history",async (req, res)=>{
    

    const {chatId} = req.query;
    
    
   
    try{
        if(!chatId){
        res.status(400).send({message : "Chat ID is required"});

        return;
    }else{
        const [chatData] = await pool.query("SELECT * FROM chat_history WHERE chat_chat_id = ? ORDER BY sent_at ASC", [chatId]);
        res.status(200).send(chatData);
        



        // res.status(200).send({message : "Chat history loaded successfully" + chatId});

    }

    }catch(err){
        res.status(500).send({message : "Error loading chat history"});
    }
})



export default router;