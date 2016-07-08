import React from 'react';
import { Modal, Button,FormGroup,FormControl } from 'react-bootstrap';
import style from "./style.less";
import classnames from 'classnames';
import moment from 'moment';
import Pagination from '../../components/Pagination/index';

console.log('style',style)
export default React.createClass({
    getInitialState(){
        return {
            pageNo:null,
            totalCount:null,
            pageSize:null,
            totalPage:null,
            originalCommentNum:0,
            commentNum:0,
            commentList:null
        }
    },
    componentDidUpdate(prevProps,prevState){
        var contentId=this.props.contentId;
        if (this.props.show && !prevProps.show) {
            //获取评论
           this.props.actions.getComments({
               contentId:contentId,
               pageNo:1,
               pageSize:20
           }).then((res)=>{
               if(!res.error){
                   console.log("获取到评论数据",res)
                   this.setState(res.payload)

               }else{
                   alert("fetch comments error")
               }
           })
        }
    },
    queryComments(pageNo){
        var contentId=this.props.contentId;
        this.props.actions.getComments({
            contentId:contentId,
            pageNo:pageNo,
            pageSize:20
        }).then((res)=>{
            if(!res.error){
                console.log("获取到评论数据",res)
                this.setState(res.payload)

            }else{
                alert("fetch comments error")
            }
        })
    },
    block(id,status,index){
        let changeStatusTo=status==1?0:1;
       this.props.actions.blockComment({commentId:id,status:changeStatusTo}).then(res=>{
           if(!res.error){
               this.setState(state=>{
                   var commentList=[...state.commentList];
                   commentList[index].status=changeStatusTo;
                   return {...state,commentList:commentList}
               })

           }else{
               alert("block failure")
           }
       })
    },
    render() {
        let {contentId,actions}=this.props,commentLists=[];
        var commentsData=this.state.commentList;
        var pageNo=this.state.pageNo;
        var pageSize=this.state.pageSize;
        var content=this.state.content;
        if(commentsData){
            commentLists=commentsData.map((obj,index)=>{
                return(

                    <li key={index} className="comment_solo">

                        <div className="comment_Content">
                            <p className="listNum">
                    <span>
                        {pageNo==1?(index+1):(pageNo-1)*pageSize+(index+1)}
                    </span>

                            </p>
                            <span>{obj.content}</span>
                        </div>

                        <div className="other_info">
                            <span>{moment(parseInt(obj.commentTimestamp)).format("YYYY-MM-DD")}</span>
                            <span>user:{obj.userDesc}</span>
                            <span>source:{obj.type}</span>
                        </div>

                        <div className="blockAction">
                            <input type="checkbox" checked={obj.status==0?true:false} onChange={this.block.bind(this,obj.commentId,obj.status,index)}/>Block
                        </div>

                    </li>
                )
            })
        }

        if(commentLists.length==0){
            commentLists="No comments"
        }




        return(
            <div>
                {contentId&& <Modal {...this.props} onHide={this.props.closeModal} bsSize="large" aria-labelledby="contained-modal-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg" backdrop="static">Comments</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={classnames(style.commentsSummary,{"hidden":this.state.totalCount==0})}>
                            {this.state.totalCount&&<div>
                                <div className="summary">
                                    total comments: <span className="count">{this.state.totalCount}</span>
                                    original comments:<span className="count">{this.state.originalCommentNum}</span>
                                    platform comments:<span className="count">{this.state.commentNum}</span>
                                </div>
                            </div>}
                            <hr/>
                        </div>

                        <div className={style.commentsList}>
                        <ul>
                            {commentLists}
                        </ul>
                        </div>


                        <center className={classnames({'hidden':this.state.totalCount==0})}>
                            <Pagination pageNo={this.state.pageNo?this.state.pageNo:0} totalPage={this.state.totalPage?this.state.totalPage:0} query={this.queryComments}/>
                        </center>






                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.closeModal} >Close</Button>
                    </Modal.Footer>
                </Modal>}
            </div>

        )
    }
});