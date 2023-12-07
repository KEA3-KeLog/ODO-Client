import React, {useState} from 'react';
import styles from "./CommentForm.module.css";

const CommentForm = ({onSubmit}) => {
    const [newComment, setNewComment] = useState('');

    const handleInputChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() === '') {
            // 댓글 내용이 비어있는 경우 처리 (예: 경고 메시지 등)
            return;
        }

        // 부모 컴포넌트에서 전달받은 onSubmit 함수 호출
        onSubmit(newComment);

        // 입력 필드 초기화
        setNewComment('');
    };

    return (
        <div>
            <h3>댓글 작성</h3>
            <form
                className={styles.form}
                onSubmit={handleSubmit}>
                <textarea
                    className={styles[`text-area`]}
                    placeholder="댓글을 입력하세요"
                    value={newComment}
                    onChange={handleInputChange}
                />
                <div className={styles[`submit-wrapper`]}>
                    <button
                        type="submit"
                    >
                        댓글 등록
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CommentForm;