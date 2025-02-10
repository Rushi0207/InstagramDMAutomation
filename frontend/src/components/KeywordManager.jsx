import React, { useState } from "react";
import axios from "axios";

const KeywordManager = () => {
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");
  const [keywordsList, setKeywordsList] = useState([]);

  const handleAddKeyword = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/keywords",
        { keyword, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setKeywordsList([...keywordsList, response.data]);
      setKeyword("");
      setMessage("");
    } catch (err) {
      console.error("Error adding keyword:", err);
    }
  };

  return (
    <div>
      <h3>Manage Keywords</h3>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button className="btn btn-success" onClick={handleAddKeyword}>
        Add Keyword
      </button>
      <ul className="mt-3">
        {keywordsList.map((kw, index) => (
          <li key={index}>
            <strong>{kw.keyword}</strong>: {kw.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeywordManager;