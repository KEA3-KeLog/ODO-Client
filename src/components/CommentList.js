
import UserService from "../service/UserService";
import React, { useEffect, useState } from 'react';
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
    const [userNicknames, setUserNicknames] = useState({});

    useEffect(() => {
        const fetchUserNicknames = async () => {
            if (list && Array.isArray(list)) {
                const userIds = list.map(comment => comment.userId);
                const userNicknameData = await Promise.all(
                    userIds.map(userId => UserService.getUser(userId))
                );

                const nicknameMap = {};
                userNicknameData.forEach((resource, index) => {
                    const userId = list[index].userId; // list에 있는 userId 사용
                    const nickname = resource.data.blog_nickname;
                    nicknameMap[userId] = nickname;
                });

                setUserNicknames(nicknameMap);
            }
        };

        fetchUserNicknames();
        console.log(userNicknames);
    }, [list]);

    // 나머지 코드는 이전과 동일

    return (
        <div>
            <h3>댓글 목록</h3>
            <ul className={styles.commentList}>
                {list.map((comment, index) => (
                    <li key={index} className={styles.commentItem}>
                        <div className={styles.commentId}>
                            <strong>{userNicknames[comment.userId]}</strong>
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