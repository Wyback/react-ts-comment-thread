import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
import Comment from "./Components/Comment";
import { IComment } from "./Interfaces";


const App: FC = () => {
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [commentList, setCommentList] = useState<IComment[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "content") {
      setContent(event.target.value);
    } else {
      setAuthor(String(event.target.value));
    }
  };

  const addComment = (): void => {
    const today = new Date();
    const newComment = { content: content, author: author, date: today.toLocaleString() };
    setCommentList([...commentList, newComment]);
    setContent("");
    setAuthor("");
  };

  // ajout template codepen
  
  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <div className="authorContainer">
            <span>Comment as </span>
            <input
              type="text"
              className="authorComment"
              placeholder="Your name..."
              name="author"
              value={author}
              onChange={handleChange}
            />
          </div>
          <input
            type="textarea"
            className="mainComment"
            placeholder="Write your comment..."
            name="content"
            value={content}
            onChange={handleChange}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
      </div>

      
      <div className="commentList">
        {commentList.map((comment: IComment, key: number) => {
          return <Comment key={key} comment={comment} />;
        })}
      </div>
    </div>
  );
};

export default App;
