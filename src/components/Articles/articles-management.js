/**
 * Created by haihu on 2016/5/11.
 */
import React from 'react';
import Select from 'react-select';
import style from "./style.less";
import classnames from 'classnames';
import SelectCommon from '../../components/Articles/select-common';
import ArticleSolo from '../../components/Articles/article-solo';
import Pagination from '../../components/Pagination/index';
import EditModal from '../../components/EditModal/index';
import CommentsModal from '../../components/Articles/comments';
import { merge } from 'lodash';
import moment from 'moment';
import PushThisArticle from './push-this-article';
import { Affix } from 'antd';


export default React.createClass({
    getInitialState(){
        return {modalEditShow:false,modalCommentsShow:false,pushShow:false}
    },
    changeTime(time){
        if(time=="") return "";
        var parseTime=parseInt(time);
        if(parseTime==0) return 0
       return  moment(parseTime).format("YYYY-MM-DD HH:mm:ss")
    },
    delete(index){

        //删除头图用
        var content=this.props.content;
        var headImgs=[...content.headImageList];
        headImgs.splice(index,1);
        var contentId=content.id;
        var params={
            contentId:contentId,
            imageUrl:headImgs
        };
        this.props.actions.setHeadPic(params);
    },
    openModal(param){
        var newState=Object.assign({},this.state,{[param]:true});
        this.setState(newState)
    },
    closeModal(param){
        var newState=Object.assign({},this.state,{[param]:false});
        this.setState(newState);
        //关闭编辑窗口后需要获取当前文章
        this.props.actions.getContent({contentId:this.props.content.contentId})
    },
    recommend(){
        var content=this.props.content;
        var contentType=this.props.content.type;
        if(contentType==3){
            alert("jokes can not be recommend");
            return
        }
        var contentId=content.contentId;
        var type=(this.props.content.recommendFlag)==1?0:1;
        this.props.actions.recommend({contentId:contentId,type:type})
    },
    sticky(){
        var content=this.props.content;
        var contentId=content.contentId;
        var type=(this.props.content.topFlag)==1?0:1;
        var categoryCode="100000001";
        this.props.actions.sticky({contentId:contentId,type:type,categoryCode:categoryCode})
    },

    render(){

        var {content,actions,articles,config} = this.props;
        
        return(
            <div>
                <Affix>
                    <div>
                        {content&&<div>
                            <EditModal articles={articles} config={config} actions={actions} content={content} show={this.state.modalEditShow} closeModal={this.closeModal.bind(this,'modalEditShow')}></EditModal>
                            <CommentsModal articles={articles} config={config} actions={actions} contentId={content.contentId} show={this.state.modalCommentsShow} closeModal={this.closeModal.bind(this,'modalCommentsShow')}></CommentsModal>
                            <PushThisArticle content={content} articles={articles} config={config} actions={actions} contentId={content.contentId} show={this.state.pushShow} closeModal={this.closeModal.bind(this,'pushShow')}></PushThisArticle>

                            <div className={style.operateArea}>
                                <span onClick={this.openModal.bind(this,'modalEditShow')}>Quick edit</span>
                                <span onClick={this.recommend} className={classnames({isSelected:content.recommendFlag})} >Recommend</span>
                                <span onClick={this.sticky} className={classnames({isSelected:content.topFlag})}>Sticky</span>
                                <span onClick={this.openModal.bind(this,'modalCommentsShow')}>Comments({parseInt(content.commentNum)})</span>
                                <span onClick={this.openModal.bind(this,'pushShow')}>PushThis</span>

                            </div>
                            <div className={style.divider}></div>
                            <div className="content_area">
                                <div className="article_title">
                                    <h2>{content.title}</h2>
                                </div>
                                <div className={style.article_info}>
                                    <span >source:{content.sourceDesc}</span>
                                    <span>publish data:{this.changeTime(content.originalReleaseTimestamp)}</span>
                                    <span>crawling date:{this.changeTime(content.crawlTimestamp)}</span>
                                    <span>push date:{this.changeTime(content.publishTimestamp)}</span>
                                    <span>HTML5 pageviews:{content.webBrowseNum}</span>
                                    <span>client pageviews:{content.appBrowseNum}</span>
                                    <span>likes:{content.praiseNum}</span>
                                    <span>share:{content.shareNum}</span>
                                </div>
                                <div className={style.article_content}>
                                    <span dangerouslySetInnerHTML={{__html:content.body}}></span>
                                </div>
                                <div className={style.soucreInfo}>
                                    <h4>Original Article Info</h4>
                                    <span>share:{content.originalShareNum}</span>
                                    <span>comments:{content.originalCommentNum}</span>
                                    <span>keywords:{content.originalKeywords}</span>
                                </div>


                            </div>


                        </div> }
                    </div>
                </Affix>
            </div>


        )
    }
})