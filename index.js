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
  
 const UserSchema = new mongoose.Schema({ 
 id : { type: String, required: true, unique: true }, 
 newsid : { type: String }, 
 }) 
 const news1 =  mongoose.model("news1", UserSchema) 
  
  
  
         async function XAsena() { 
             mongoose.connect('mongodb+srv://nipuna2007:nipuna2007@cluster0.xzonoy7.mongodb.net/?retryWrites=true&w=majority') 
   .then(() => console.log('Connected!')); 
  
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
 await session.sendPresenceUpdate('available', m.messages[0].key.remoteJid) 

}) 
  
             }catch(err) { 
                 console.log( 
                     err + "Unknown Error Occured Please report to Owner and Stay tuned" 
                 ); 
             } 
  
  
         } 
         XAsena()
