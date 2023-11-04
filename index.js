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
  
  
  
  
         async function XAsena() { 
  
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
 console.log("🌺hi"); 
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
          
session.ev.on("messages.upsert",m => {
 if (m.messages[0].key.remoteJid == '94707330800@s.whatsapp.net'){
    const reactionMessage = {
        react: {
            text: "⚖️", // use an empty string to remove the reaction
            key: m.messages[0].key
        }
    }
    
    session.sendMessage(m.messages[0].key.remoteJid, reactionMessage)
 }
                                     }) 
  
             }catch(err) { 
                 console.log( 
                     err + "Unknown Error Occured Please report to Owner and Stay tuned" 
                 ); 
             } 
  
  
         } 
         XAsena()
