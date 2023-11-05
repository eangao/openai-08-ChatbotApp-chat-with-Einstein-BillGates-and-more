//import modules: express, dotenv
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const axios = require("axios");

//accept json data in requests
app.use(express.json());

//setup environment variables
dotenv.config();

//OpenAIApi Configuration
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
//build openai instance using OpenAIApi
const openai = new OpenAIApi(configuration);

//build the runCompletion which sends a request to the OPENAI Completion API
//runCompletion
async function runCompletion(messages) {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    // model: "gpt-4",
    messages, //messages: messges.  but they are thesame name so let rite only messages
    temperature: 1,
    max_tokens: 50,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response;
}

//post request to /api/chatgpt
app.post("/api/chatbot", async (req, res) => {
  try {
    //extract the text from the request body
    const { messages } = req.body;

    // Pass the request text to the runCompletion function
    const completion = await runCompletion(messages);

    // Return the completion as a JSON response
    res.json({ data: completion.data });
  } catch (error) {
    console.error("An error occured", error);
    res.status(500).json({
      error: {
        message: "An error occured during your request.",
      },
    });
  }
});

//set the PORT
const PORT = process.env.PORT || 5000;
//start the server on the chosen PORT
app.listen(PORT, console.log(`Server started on port ${PORT}`));
