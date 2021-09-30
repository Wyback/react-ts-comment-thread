import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
import Comment from "./Components/Comment";
import { IComment } from "./Interfaces";
import Message from "./assets/message.png";


const App: FC = () => {
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const [showError, setShowError] = useState(false);

  const handleChangeAuthor = (event: ChangeEvent<HTMLInputElement>): void => {
      setAuthor(String(event.target.value));
  };

  const handleChangeContent = (event: ChangeEvent<HTMLTextAreaElement>): void => {
      setContent(event.target.value);
  };


  const addComment = (): void => {
    const today = new Date();
    let date = today.toLocaleDateString('fr-CA', { day: '2-digit', month: '2-digit', year: 'numeric' })
    const newComment = { content: content, author: author, date: date, upvote: 0, replyList: []};
    if (controlInputs()) {
      setCommentList([...commentList, newComment])
      setContent("");
      setAuthor("");
    }
  };

  const controlInputs= (): Boolean => {
    if(content !== "" && author !== "") {
      setShowError(false)
      return true
    }
    else{
      setShowError(true)
      return false
    }
  };
  
  
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
                onChange={handleChangeAuthor}
              />
            </div>
            <textarea
              className="mainComment"
              placeholder=" Write your comment..."
              name="content"
              value={content}
              onChange={handleChangeContent}
            />
            <div className="subContent">
              {
                showError ? <span className="errorMsg">error in the inputs, enter both a name and a content</span> : null
              }
              <button onClick={addComment}>
                <div className="btnContent">
                  <img src={Message} className="chatImg" alt="ChatBubble"/>
                  <span className="chatTxt">Comment</span>
                </div>
              </button>
            </div>
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
