import { useEffect, useState } from "react";

const Inbox = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    console.log("🚀 useEffect ejecutado");
  }, []);

  return (
    <div style={{ color: "white", padding: "20px" }}>
      <h1>Inbox VIVO</h1>
    </div>
  );
};

export default Inbox;