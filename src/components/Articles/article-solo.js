/**
 * Created by haihu on 2016/5/11.
 */
import React from 'react';
import Select from 'react-select';
import style from "./style.less"
import classnames from "classnames"
import moment from "moment"
export default React.createClass({
    getContent(){
        var contentId=this.props.id;
        console.log("文章ID",contentId);
        this.props.liClicked(this.props.index);
        this.props.actions.getContent({contentId:contentId})
    },
    storeSelected(e){
        this.props.onChecked(this.props.index, e.target.checked)
    },
    render() {
        let{checked,ifClicked,title,originalReleaseTimestamp,browseNum,sourceDesc,recommendFlag,topFlag,type,actions}=this.props;
        return(
            <li className={classnames(style.articleSolo,{showClicked:ifClicked})}  >
                <div className="selctThis">
                    <input type="checkbox" checked={checked||false} onChange={this.storeSelected} />
                </div>
                <div className="basicInfo" onClick={this.getContent}>
                    <div className="articleTitle"><span>{title}</span></div>
                    <span className="time">{moment(originalReleaseTimestamp).format("YYYY-MM-DD")}</span>
                    <span className="readCount">Pageviews:{browseNum}</span>
                    <span className="from">{sourceDesc}</span>
                </div>
                <div className="otherInfo">
                    <span className={classnames({"recommendICON":true,"hidden":recommendFlag==0})}>Rec</span>
                    <span className={classnames({"FixICON":true,"hidden":topFlag==0})}>Top</span>
                    <span className={classnames({"PicICON":true,"hidden":type!=2})}>Pic</span>
                </div>
            </li>


        )
    }
})