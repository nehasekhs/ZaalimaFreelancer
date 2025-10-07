import "./Messages.css";

export default function Messages() {
  return (
    <div className="messages-page">
      <h1>Messages</h1>
      <p>Chat with clients and manage your conversations.</p>
      <div className="chat-box">
        <div className="message client">Client: Hi, are you available?</div>
        <div className="message freelancer">You: Yes, I am available.</div>
      </div>
      <textarea placeholder="Type your message..." className="message-input"></textarea>
      <button className="send-btn">Send</button>
    </div>
  );
}