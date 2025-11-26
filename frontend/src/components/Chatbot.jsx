import { useState } from "react";
import { Card, Button, Form, Spinner } from "react-bootstrap";

export default function Chatbot() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askBot = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(
        `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1`
      );
      const data = await res.json();

      if (data.Abstract && data.Abstract.length > 0) {
        setResponse(data.Abstract);
      } else {
        setResponse("I don't have enough info on that — try asking differently 🙂");
      }
    } catch (err) {
      console.error(err);
      setResponse("Error fetching response. Try again.");
    }

    setLoading(false);
  };

  return (
    <Card className="p-3 shadow" style={{ height: "100%" }}>
      <h5 className="text-center">EngiSafe AI Assistant</h5>

      <Form.Control
        className="mt-3"
        placeholder="Ask safety, equipment, process or general questions..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Button className="mt-3 w-100" onClick={askBot} disabled={loading}>
        {loading ? <Spinner size="sm" /> : "Ask"}
      </Button>

      {response && (
        <div className="mt-3 p-2 border rounded bg-light" style={{ minHeight: "80px" }}>
          {response}
        </div>
      )}
    </Card>
  );
}
