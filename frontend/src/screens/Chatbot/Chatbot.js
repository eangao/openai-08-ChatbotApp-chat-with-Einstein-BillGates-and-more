import React, { useState } from "react";
import "./style/style.css";
import axios from "axios";

function Chatbot() {
  //Add states: inputValue, error, result, prompt, jresult
  const [inputMessage, setInputMessage] = useState("");
  const [result, setResult] = useState("");
  const [prompt, setPrompt] = useState("");
  const [jresult, setJresult] = useState("");
  const [responseOk, setResponseOk] = useState("");
  const [error, setError] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [messages, setMessages] = useState([
    { role: "system", content: "You are an assistant" },
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // send a request to the server only if there is a user message
    if (inputMessage.trim() !== "") {
      try {
        // Add the user message to the messages array
        const updatedMessages = [
          ...messages,
          { role: "user", content: inputMessage },
        ];
        setMessages(updatedMessages);
        const response = await axios.post("/api/chatbot", {
          messages: updatedMessages,
        });
        const serverResponse = response.data;

        // add the server respnse to the messages array
        const updatedMessages2 = [
          ...updatedMessages,
          {
            role: "assistant",
            content: serverResponse.data.choices[0].message.content,
          },
        ];
        setMessages(updatedMessages2);
        console.log(updatedMessages2);

        // Update jresult with the updates messages array
        setJresult(JSON.stringify(updatedMessages2, null, 2));
      } catch (error) {
        console.log("An error occured", error);
        setError("An error occured");
      }
    }
  };

  return (
    <div>
      <div className="d-flex flex-column chat-page">
        <div id="personalities" className=" text-center">
          <h3>
            {selectedOption
              ? "You are chatting with:"
              : "Please select a character:"}
          </h3>
          <div>{/* options */}</div>
        </div>

        <div id="chatContainer" className="flex-fill overflow-auto">
          <div>message1</div>
          <div>message2</div>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {prompt && <div className="alert alert-secondary mt-3">{prompt}</div>}
          {result && <div className="alert alert-success mt-3">{result}</div>}
        </div>

        <form className="form-horizontal" onSubmit={handleSubmit}>
          <div className="row form-group mt-2">
            <div className="col-sm-10">
              <div className="form-floating">
                <textarea
                  className="form-control custom-input"
                  id="floatingInput"
                  placeholder="Enter a prompt"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <label htmlFor="floatingInput">Input</label>
              </div>
            </div>
            <div className="col-sm-2">
              <button type="submit" className="btn btn-primary custom-button">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      {jresult && (
        <pre className="alert alert-info mt-3">
          <code>{jresult}</code>
        </pre>
      )}
    </div>
  );
}
export default Chatbot;
