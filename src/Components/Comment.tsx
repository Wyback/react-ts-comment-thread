
import React, { useState } from "react";
import { IComment } from "../Interfaces";

interface Props {
  comment: IComment;
}

const Comment = ({ comment }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const onClick = () => setShowForm(true);
  const onCancel = () => setShowForm(false);
  

  return (
    <div className="comment">

      <div className="comment-thread">
        <details open className="comment" id="comment-1">
            <summary>
                <div className="comment-heading">
                    <div className="comment-voting">
                        <button type="button">
                            <span aria-hidden="true">&#9650;</span>
                            <span className="sr-only">Vote up</span>
                        </button>
                        <button type="button">
                            <span aria-hidden="true">&#9660;</span>
                            <span className="sr-only">Vote down</span>
                        </button>
                    </div>
                    <div className="comment-info">
                        <a href="#" className="comment-author">{comment.author}</a>
                        <p className="m-0">
                          {comment.date}
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
                  <form method="POST" className="reply-form">
                    <textarea placeholder="Reply to comment"></textarea>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                  </form> : null
                }
            </div>
            </summary>
        </details>
      </div>

    </div>
    
    
  );

};

export default Comment;