export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const googleScriptUrl = "https://script.google.com/macros/s/AKfycbyfDvR14Rn56Nl2KKtP0HGETdGzzP0d2YGZ-ZU6NPsjxAffZ5WJMZoISIMgi5h1w5Fv2A/exec";

      const response = await fetch(googleScriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.text();

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.toString() });
    }
  } else if (req.method === "OPTIONS") {
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).end();
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}





