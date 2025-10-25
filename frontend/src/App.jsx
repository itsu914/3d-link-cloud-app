import React, { useEffect, useState } from "react";
import ThreeLinkCloud from "./components/ThreeLinkCloud";
import { getLinks, addLink } from "./api";

export default function App() {
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    getLinks().then(setLinks);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !url) return;
    const newLink = await addLink(url, title);
    setLinks([...links, newLink]);
    setTitle("");
    setUrl("");
  };

  return (
    <div style={{ height: "100vh", width: "100vw", background: "linear-gradient(to bottom, #b9eaff 0%, #fff 100%)" }}>
      <div style={{ position: "absolute", zIndex: 10, left: 20, top: 20, background: "#fff6", borderRadius: 12, padding: 20, boxShadow: "0 2px 12px #0002" }}>
        <h2>3D URL Link Cloud</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
          <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} style={{ borderRadius: 6, border: "1px solid #ccc", padding: 4 }} />
          <input placeholder="URL" value={url} onChange={e => setUrl(e.target.value)} style={{ borderRadius: 6, border: "1px solid #ccc", padding: 4 }} />
          <button type="submit" style={{ borderRadius: 6, background: "#0099ff", color: "#fff", border: "none", padding: "4px 12px" }}>
            追加
          </button>
        </form>
      </div>
      <div style={{ height: "100%", width: "100%" }}>
        <ThreeLinkCloud links={links} />
      </div>
    </div>
  );
}