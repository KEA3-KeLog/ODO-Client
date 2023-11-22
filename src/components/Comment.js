import React, { Component } from "react"
import "./Comment.module.css"
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import CommentService from "../service/CommentService";

class Comment extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
        };
    }

    componentDidMount() {
        // 컴포넌트가 마운트되면 댓글 목록을 불러옵니다.
        this.loadComments();
    }

    componentDidUpdate(prevProps) {
        // postId가 변경될 때마다 댓글 목록을 다시 불러옵니다.
        if (this.props.postId !== prevProps.postId) {
            this.loadComments();
        }
    }

    // 댓글 목록을 불러오는 함수
    loadComments = () => {
        const { postId } = this.props;

        // CommentService를 통해 댓글 목록을 가져옵니다.
        CommentService.getComments(postId).then(res => {
            this.setState({
                comments: res.data,
            });
            
        });

    };

  // 댓글 등록 핸들러
  handleCommentSubmit = async (comment) => {
    const { postId } = this.props;

    // CommentService를 통해 댓글을 생성하고, 댓글 목록을 업데이트합니다.
    await CommentService.createComment({ postId, contents: comment });

    // 댓글 등록 후에 댓글 목록을 다시 불러와서 상태를 업데이트합니다.
    this.loadComments();
  };

    render() {
        const { comments } = this.state;

        return (
            <div>
                {/* CommentForm 컴포넌트에 댓글 등록 핸들러 전달 */}
                <CommentForm onSubmit={this.handleCommentSubmit} />
                {/* CommentList 컴포넌트에 댓글 목록 전달 */}
                <CommentList list={comments} />
            </div>
        );
    }
}

export default Comment;