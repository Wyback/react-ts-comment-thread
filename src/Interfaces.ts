  
export interface IComment {
    content: string;
    author: string;
    date: string;
    upvote: number;
    replyList: IComment[];
  }