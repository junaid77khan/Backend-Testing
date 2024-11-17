import React, { useState } from 'react';
import Button from '../Button';

function CommentForm({ onAddComment, comments }) {
  const [commentContent, setCommentContent] = useState("");
  const [visibility, setVisibility] = useState(false);
  
  const onClickCommentBox = () => {
    setVisibility(true);
  };

  return (
    <div className="w-full bg-gray-800 dark:bg-gray-900 p-4 rounded-lg text-white">
      <h1 className="text-lg font-semibold text-gray-200">Comments ({comments?.length})</h1>
      <textarea
        onClick={onClickCommentBox}
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        className="w-full mt-2 p-3 outline-none border-b-2 border-gray-600 bg-gray-700 text-white focus:border-blue-400 rounded-md"
        type="text"
        placeholder="Add a comment"
      />

      <div className="flex flex-wrap justify-end gap-3 mt-3">
        {visibility && (
          <Button
            disabled={!commentContent.trim()}
            onClick={() => {
              onAddComment(commentContent);
              setCommentContent("");
            }}
            className="bg-orange-500 text-white hover:bg-orange-600 transition duration-300"
          >
            Add
          </Button>
        )}
        {visibility && (
          <Button
            onClick={() => {
              setVisibility(false);
            }}
            className="bg-gray-600 text-white hover:bg-gray-500 transition duration-300"
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}

export default CommentForm;
