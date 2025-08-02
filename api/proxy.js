export default async function handler(req, res) {
  // Set CORS header
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const googleScriptUrl = "https://script.google.com/macros/s/AKfycbzQj9AVLlMVAH5LcF8br29Y_O0VaAP1sc7IoFOPGHyx3fd_Bhl2jdQQVMwZKqkKxHeO7g/exec";

  try {
    if (req.method === "POST") {
      const response = await fetch(googleScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });

      const data = await response.text();
      return res.status(200).json({ success: true, data });
    }

    if (req.method === "GET") {
      const response = await fetch(googleScriptUrl);
      const data = await response.text();
      return res.status(200).send(data);
    }

    res.status(405).json({ success: false, message: "Method not allowed" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString() });
  }
}



