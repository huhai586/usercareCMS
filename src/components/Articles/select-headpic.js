/**
 * Created by haihu on 2016/5/11.
 */
import React from 'react';
import Select from 'react-select';
import style from "./style.less";
import {Button} from "react-bootstrap";
export default React.createClass({
    getInitialState(){
        return {images:[],clicktoSetTEXT:"click to Set Head pictures"}
    },
    componentDidMount(){
       var dom=this.refs.hideArticle;
        var images=dom.querySelectorAll("img");
        var gotAllimages=[]
        for(var i=0;i<images.length;i++){
            var src=images[i].src;
            gotAllimages.push({src:src,choose:false})
        }

         this.setState({images:gotAllimages });
    },
    setAsHeadPic(index){
        this.setState(state=>{
            var prevImages=[...state.images];
            prevImages[index].choose=!this.state.images[index].choose;
            return {...state, images: prevImages};
        })
    },
    setPics(){
        //首先得到被选中的img数组
        var images=this.state.images,contentId=this.props.content.id;
        var choosed=[]
        images.map(obj=>{
            if(obj.choose){
                choosed.push(obj.src)
            }
        });
        var params={contentId:contentId,imageUrl:choosed};
        this.setState(state=>{
            return {...state,clicktoSetTEXT:"Setting..."}
        })
        this.props.actions.setHeadPic(params).then(promise=> {

            if (promise.error) {
                alert("set head picture error")
            } else {
               this.setState(state=>{
                   return {...state,clicktoSetTEXT:"Success!"}
               })
            }

        });

    },
    render(){
        var {content}=this.props;
        return(
            <div className={style.headPicsChoose}>
            <h4>Select head pictures</h4>
                <div ref="hideArticle" className="hideArticle hidden" dangerouslySetInnerHTML={{__html:content.body}}></div>
                <div className="slectArea">
                    <ul >
                        {this.state.images.map((obj,index)=>{

                            return <li key={index}><input type="checkbox" checked={obj.choose} onChange={this.setAsHeadPic.bind(this,index)}/>
                                <img src={obj.src} alt=""/>
                            </li>

                        })}


                    </ul>
                        <div className="clickToset">
                            <Button bsStyle="info" onClick={this.setPics}>{this.state.clicktoSetTEXT}</Button>
                        </div>
                </div>

            </div>


        )
    }
})