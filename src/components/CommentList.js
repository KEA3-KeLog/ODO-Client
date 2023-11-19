import React from 'react';
import styles from "./Comment.module.css"; // 모듈 스타일을 import

const formatDateTime = (dateTimeString) => {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // 24시간 형식으로 설정
        timeZone: 'Asia/Seoul', // 한국 시간대로 설정
    };

    const formattedDateTime = new Intl.DateTimeFormat('ko-KR', options).format(new Date(dateTimeString));
    return formattedDateTime;
};

const CommentList = ({ list }) => {
    if (!list || !Array.isArray(list)) {
        // list가 정의되지 않았거나 배열이 아닌 경우에 대한 처리
        return <div>댓글이 없습니다.</div>;
    }

    return (
        <div>
            <h3>댓글 목록</h3>
            <ul className={styles.commentList}>
                {list.map((comment, index) => (
                    <li key={index} className={styles.commentItem}>
                        <div className={styles.commentId}>
                            <strong>{comment.userId}</strong>
                        </div>
                        <div className={styles.commentContents}>
                            {comment.contents}
                        </div>
                        <div className={styles.commentTime}>
                            {formatDateTime(comment.createdTime)}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentList;