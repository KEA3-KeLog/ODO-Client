import "./PostView.css";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import PostService from '../service/PostService';
import { useNavigate } from 'react-router-dom';


function PostView() {



    return (
        <>
            <div className = "posting-main">
                    <div >
                            {/* <div >      
                                <label> Title </label> : {this.state.board.title}
                            </div>
                            <div >      
                                <label> Tag </label> : {this.state.board.tag}
                            </div>

                            <div >
                                <label> Contents </label> : <br></br>
                                <textarea value={this.state.board.contents} readOnly/> 
                            </div >

                            {this.returnDate(this.state.board.createdTime, this.state.board.updatedTime) }
                            <button onClick={this.goToList.bind(this)} style={{marginLeft:"10px"}}>글 목록으로 이동</button> */}
                    </div>
                </div>
        </>

    );
};

export default PostView;
