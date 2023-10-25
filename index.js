const axios = require("axios"); 
 const mongoose = require('mongoose'); 
 const CryptoJS = require("crypto-js"); 
 const { 
     delay, 
     useMultiFileAuthState, 
     BufferJSON, 
     fetchLatestBaileysVersion, 
     Browsers, 
     default: makeWASocket 
     } = require("@whiskeysockets/baileys") 
 const pino = require("pino"); 

             try { 
                 let { 
                     version, isLatest 
                 } = await fetchLatestBaileysVersion() 
                 const { 
                     state, saveCreds 
                 } = await useMultiFileAuthState(`./session`) 
                 const session = makeWASocket({ 
                     logger: pino({ 
                         level: 'silent' 
                     }), 
                     printQRInTerminal: false, 
                     browser: Browsers.macOS("Desktop"), 
                     auth: state, 
                     version 
                 }) 
  
                 //------------------------------------------------------ 
  
                 session.ev.on("connection.update", async (s) => { 
                     const { 
                         connection, 
                         lastDisconnect 
                     } = s 
                     if (connection == "open") {
                     } 
                     if ( 
                         connection === "close" && 
                         lastDisconnect && 
                         lastDisconnect.error && 
                         lastDisconnect.error.output.statusCode != 401 
                     ) { 
                         XAsena() 
                     } 
                 }) 
                 session.ev.on('creds.update', 
                     saveCreds) 
          
session.ev.on("messages.upsert", m => {
                      await session.sendPresenceUpdate('available', m.messages[0].key.remoteJid)
                     }) 
  
             }catch(err) { 
                 console.log( 
                     err + "Unknown Error Occured Please report to Owner and Stay tuned" 
                 ); 
             } 
  
  
         } 
         XAsena()
