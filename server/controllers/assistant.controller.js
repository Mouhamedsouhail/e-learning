require("dotenv").config(); // Keep for other potential env vars

// No longer need Hugging Face library or token checks

exports.handleMessage = async (req, res) => {
  const { message, userRole } = req.body;
  // IMPORTANT: Replace 'deepseek-coder' if your local model name is different!
  // Verify the exact name using 'ollama list' in your terminal.
  const model = "deepseek-coder"; // Changed back from deepseek-r1:latest
  const ollamaApiUrl = "http://localhost:11434/api/chat"; // Default Ollama API endpoint

  console.log(`Received message: "${message}" from role: ${userRole}`);
  console.log(
    `Attempting to contact local Ollama model: ${model} at ${ollamaApiUrl}`
  );

  try {
    const apiResponse = await fetch(ollamaApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // No Authorization header needed for local Ollama by default
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant for an e-learning platform. The user is a ${userRole}.`,
          },
          { role: "user", content: message },
        ],
        stream: false, // Request a non-streamed response for simplicity
      }),
    });

    console.log(`Ollama API Response Status: ${apiResponse.status}`);
    const responseData = await apiResponse.json();
    console.log("Ollama API Response Data:", responseData);

    if (!apiResponse.ok) {
      // Extract error message if provided by Ollama
      const errorMessage =
        responseData.error ||
        `Ollama API request failed with status ${apiResponse.status}`;
      throw new Error(errorMessage);
    }

    // Extract the response content from Ollama's structure
    const response =
      responseData.message && responseData.message.content
        ? responseData.message.content.trim()
        : "Sorry, I couldn't get a response from Ollama.";

    res.json({ response });
  } catch (error) {
    console.error(
      `Error handling chat message with local Ollama (${model}):`,
      error
    );

    let statusCode = 500;
    let messageText =
      "Server error while processing chat message with local Ollama";

    // Check for connection errors (fetch might throw specific types)
    if (error.code === "ECONNREFUSED") {
      statusCode = 503;
      messageText = "Could not connect to local Ollama server. Is it running?";
      console.error(
        "Connection refused. Ensure Ollama is running at",
        ollamaApiUrl
      );
    }
    // Check for model not found errors based on Ollama's typical response
    else if (
      error.message &&
      error.message.toLowerCase().includes("model") &&
      error.message.toLowerCase().includes("not found")
    ) {
      statusCode = 404; // Or 503
      messageText = `The specified Ollama model ('${model}') was not found. Did you run 'ollama pull ${model}'?`;
      console.error(`Ollama model '${model}' not found.`);
    }

    res
      .status(statusCode)
      .json({ message: messageText, detail: error.message });
  }
};
