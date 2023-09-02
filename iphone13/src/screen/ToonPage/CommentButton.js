import React, { useEffect, useState } from 'react';
import useDetectClose from "../../hooks/useDetectClose";
import useIconClick from '../../hooks/useIconClick';
import { createComment, deleteComment, getComment } from '../../API/CommentAPI';
import "./ChatStyles.css";
import { GoPaperAirplane } from "react-icons/go";
import { RiCoinsFill } from "react-icons/ri";


const CommentButton = ({toonId, isError}) => {
  const [myPageIsOpen, myRef, myPageToggleHandler] = useDetectClose(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments when the component mounts
    fetchComments();
  }, []);

  const fetchComments = () => {
    // Implement your getComment function here
    // You can use toonId to specify which video or content you are fetching comments for
    getComment(toonId, (data) => {
      // Assuming the response data is an array of comments
      console.log('댓글 조회', data);
      setComments(data.comments);
    }, (error) => {
      console.error('댓글 조회 실패:', error);
    });
  };

  /*
  const handleCommentSubmit = () => {
    if (commentText.trim() !== "") {
      setComments([...comments, commentText]);
      setCommentText("");
    }
    // handleIconClick(8);
  }
  */

  const handleCommentSubmit = () => {
    if (commentText.trim() !== '') {
      // Create a new comment
      createComment(toonId, (data) => {
        //setComments([...comments, newComment]);
        setCommentText('');
      }, (error) => {
        console.error('댓글 생성 오류:', error);
      });
    }
  };

  const handleCommentDelete = (commentId) => {
    // Implement your deleteComment function here
    // You can pass the commentId to specify which comment to delete
    deleteComment(commentId, () => {
      // Remove the deleted comment from the state
      const updatedComments = comments.filter((comment) => comment.id !== commentId);
      setComments(updatedComments);
    }, (error) => {
      console.error('댓글 삭제 오류:', error);
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCommentSubmit();
    }
  };

  const {
    chatIconClicked,
    commentClicked,
    handleIconClick,
  } = useIconClick();

  return (
    <div className='comment-wrapper' ref={myRef}>
      <div className="comment-container">
        {/* 채팅 아이콘 */}
        <div className='comment-button'
          onClick={() => {
            /*
            if(!isError){
              myPageToggleHandler();
              handleIconClick(7);
            }
            */
           myPageToggleHandler();
           // handleIconClick(7);
          }}
          >
            <img
              src={
                process.env.PUBLIC_URL +
                (!isError ?
                (chatIconClicked ? '/images/bubble_chat_icon_b&w.png' : '/images/bubble_chat_icon.png') :
                '/images/bubble_chat_icon_b&w.png')
              }
              alt="채팅 아이콘"
            />
          </div> {/* dropdown-button */}
          <div className={`comment-menu ${myPageIsOpen ? 'open' : ''}`}>
            <div className='comment-menu-title'>댓글 및 후원</div>
            <div className='comment-menu-container'>
              {/* 댓글 표시 */}
              <div className='comment-section-container'>
                {comments.slice().reverse().map((comment, index) => (
                  <div key={index}>{comment}
                    <button onClick={() => handleCommentDelete(index)}>댓글 삭제</button>
                  </div>
                ))}
              </div>
              <div className='comment-menu-bottom-wrapper'>
                {/* 댓글 입력 폼 */}
                <input
                  className='comment-menu-input-style'
                  type="text"
                  placeholder="댓글을 입력하세요."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <GoPaperAirplane
                  color={commentClicked ? '#800000' : '#FF3CBB'}
                  size="30"
                  onClick={handleCommentSubmit}
                />
                {/* 후원 아이콘 */}
                <RiCoinsFill color= '#FF8200' size = '40'/>
              </div>
            </div>
          </div>
          {/* 삼각형 */}
          <div className='comment-triangle-wrapper'>
            {myPageIsOpen && <div className={`comment-triangle-outer ${myPageIsOpen ? 'fade-in' : ''}`} />}
            {myPageIsOpen && <div className={`comment-triangle-inner ${myPageIsOpen ? 'fade-in' : ''}`} />}
          </div>
      </div>
    </div>
  )
};

export default CommentButton;