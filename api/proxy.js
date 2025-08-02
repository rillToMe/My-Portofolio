export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const googleScriptUrl = "https://script.google.com/macros/s/AKfycbxc9070uwJVp0FJKI8u_brBHV5Xrz_yvJv3pJplnD6svQLPtZCR0dFn8GPli1DkRFkEmw/exec";

      const response = await fetch(googleScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });

      const data = await response.text();
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.toString() });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
