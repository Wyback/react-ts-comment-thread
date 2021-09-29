
import React, { ChangeEvent, useState } from "react";
import { IComment } from "../Interfaces";
import Error from "../assets/error.png";
import Message from "../assets/message.png";

interface Props {
  comment: IComment;
}

const Comment = ({ comment }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const [showError, setShowError] = useState(false);
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [vote, setVote] = useState(0);
  const [replyList, setReplyList] = useState<IComment[]>([]);
  const onClick = () => {
    showForm ? setShowForm(false) : setShowForm(true)
  }
const upvote = () => {
  comment.upvote++;
  setVote(comment.upvote)
}
const downvote = () => {
  if (comment.upvote > 0)
    comment.upvote--
    setVote(comment.upvote)
}

const handleChangeAuthor = (event: ChangeEvent<HTMLInputElement>): void => {
  setAuthor(String(event.target.value));
};

const handleChangeContent = (event: ChangeEvent<HTMLTextAreaElement>): void => {
  setContent(event.target.value);
};


const addReply = () => {
  const today = new Date();
  let date = today.toLocaleDateString('fr-CA', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const reply = { content: content, author: author, date: date, upvote: 0, replyList: []};
  if (controlInputs()) {
    setReplyList([...replyList, reply])
    setContent("");
    setAuthor("");
    setShowForm(false)
  }
  checkError()
}

const controlInputs= (): Boolean => {
  if(content !== "" && author !== "")
    return true
  else
    return false
};

const checkError = () => {
  if (showError && controlInputs())
    setShowError(false)
  else
    setShowError(true)
}

  

  return (
    <div className="comment">

      <div className="comment-thread">
        <details open className="comment" id="comment-1">
            <a href="#comment-1" className="comment-border-link">
                <span className="sr-only">Jump to comment-1</span>
            </a>
            <summary>
                <div className="comment-heading">
                    <div className="comment-voting">
                        <button type="button" onClick={upvote}>
                            <span aria-hidden="true">&#9650;</span>
                            <span className="sr-only">Vote up</span>
                        </button>
                        <button type="button" onClick={downvote}>
                            <span aria-hidden="true">&#9660;</span>
                            <span className="sr-only">Vote down</span>
                        </button>
                    </div>
                    <div className="comment-info">
                        <a className="comment-author">{comment.author}</a>
                        <p className="m-0">
                          {vote} upvote - {comment.date}
                        </p>
                    </div>
                </div>
                <div className="comment-body">
                <p>
                  {comment.content}
                </p>
                <button type="button" onClick={onClick}>Reply</button>
                {
                  showForm ? 
                  <form className="reply-form">
                    <span>Reply as </span>
                    <input
                      type="text"
                      className="authorReply"
                      placeholder="Your name..."
                      name="author"
                      value={author}
                      onChange={handleChangeAuthor}
                    />
                    <textarea
                      className="mainReply"
                      placeholder="Reply to comment"
                      name="content"
                      value={content}
                      onChange={handleChangeContent}
                    />
                    <div className="subReply">
                      {
                        showError ? <span className="errorMsg">error in the inputs, enter both a name and a content</span> : null
                      }
                      <button onClick={addReply}>
                        <div className="btnContent">
                          <img src={Message} className="chatImg" alt="ChatBubble"/>
                          <span className="chatTxt">Reply</span>
                        </div>
                      </button>
                      <button onClick={onClick}>
                        <div className="btnContent">
                          <img src={Error} className="chatImg" alt="ChatBubble"/>
                          <span className="chatTxt">Cancel</span>
                        </div>
                      </button>
                    </div>
                  </form> : null
                }
                <div className="commentList">
                  {replyList.map((comment: IComment, key: number) => {
                    return <Comment key={key} comment={comment} />;
                  })}
                </div>
            </div>
            </summary>
        </details>
      </div>

    </div>
    
    
  );

};

export default Comment;