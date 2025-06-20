import {StreamChat} from "stream-chat"
import "dotenv/config"

const apiKey = process.env.STREAM_KEY
const apiSecret = process.env.STREAM_SECRET

if (!apiKey || !apiSecret)
    console.error("The Stream API Key or Secret is missing");
const streamClient = StreamChat.getInstance(apiKey, apiSecret)

export const upsertStreamUser = async function upsertStreamUserFunction(userData) {
    try {
        await streamClient.upsertUsers([userData])
        return userData;
    } catch (error) {
        console.error("Error while creating/updating the stream user", error);
    }
}

export const generateStreamToken = (userId) => {
    try {
      // ensure userId is a string
      const userIdStr = userId.toString();
      return streamClient.createToken(userIdStr);
    } catch (error) {
      console.error("Error generating Stream token:", error);
    }
  };