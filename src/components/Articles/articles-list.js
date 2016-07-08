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
import { merge } from 'lodash';


export default React.createClass({
    getInitialState() {
        //console.log("初始数据",this.props)
      return {
          checked: {},
          doAll:false,
          clickedIndex:-1

      }
    },
    onChecked(index,checked) {
        //console.log('onChecked', index, checked);
       //this.setState({...(this.state), index: true})
        this.setState(state => {
            var stateNew = {...state};
            stateNew.checked = merge({}, state.checked, {[index]: checked});
            return stateNew;
        })
    },
    liClicked(index){
        //记录被点击对象的索引值
        this.setState({clickedIndex:index})
    },
    getArticlesID(){
        //根据state里面的索引值key，去items查找对应文章的id
        var items=this.props.articles.articlesList.items;
        var checked=this.state.checked;
        var articlesIDs=[];
        for(var x in checked){
            if(checked[x]==true){
                articlesIDs.push(items[x].id)
            }
        }
        console.log(articlesIDs)
        return articlesIDs;

    },
    cancelPublish(){
        //发送取消后submit
        var articlesIDs=this.getArticlesID();
        if(articlesIDs.length==0) return
        this.props.actions.pushAndUnpush({contentIdList:articlesIDs,type:0}).then(res=>{
            if(!res.error){
                this.props.queryNews()
            }
        });
    },
    publish(){
        var articlesIDs=this.getArticlesID();
        if(articlesIDs.length==0) return
        this.props.actions.pushAndUnpush({contentIdList:articlesIDs,type:1}).then(res=>{
            if(!res.error){
                this.props.queryNews()
            }
        });

    },
    componentWillUpdate(nextProps) {
        if(nextProps.articles.articlesList !== this.props.articles.articlesList) {
            console.log('文章列表即将刷新为初始状态');
            this.setState(this.getInitialState());
    }
    },
    doAll:function(e){
        var items=this.props.articles.articlesList.items;
        var dataLength=items.length
        var actionType=e.target.checked;
        var newChecked={};
        newChecked=_.fill(new Array(dataLength), actionType).reduce((pre, cur, index)=>{pre[index]=cur;return pre}, {})
        console.log("全选操作的结果",newChecked)
        this.setState(state => {
            var stateNew = {...state};
            stateNew = merge({}, state, {checked:newChecked,doAll:actionType});
            return stateNew;
        })


    },
    render(){
        let {checked,doAll} = this.state,showPagination=false;
        let {articles,config,actions,queryNews}=this.props,rows=[]
        var publishStatus = parseInt(articles.query.publishStatus);

        //组装数据
        let articlesLists=this.props.articles.articlesList;
        if(articlesLists){
            rows=articlesLists.items.map((articleData,index)=>{
                return <ArticleSolo key={index} index={index} checked={checked[index]}
                                    onChecked={this.onChecked} {...articleData} actions={actions}
                                    liClicked={this.liClicked}
                                    ifClicked={index==this.state.clickedIndex?true:false}
                />
            });
            if(articlesLists.items.length!=0){
                showPagination=true
            }
        }
        if(rows.length==0){
            rows=<div className='noFound'>No Results</div>
        }

        return (
            <div>
                <div className={style.articles_list_header}>

                                <div className={classnames({'selectAll':true})}>
                                    <input type="checkbox" onChange={this.doAll} checked={doAll}/>All select
                                    <span onClick={this.cancelPublish} className={classnames({'hidden':publishStatus==1})}>Cancel published</span>
                                    <span onClick={this.publish} className={classnames({'hidden':publishStatus==2})}>Publish</span>

                                </div>

                                <div className='orderType'>
                                    <SelectCommon value={articles.query.orderType}
                                                  options={config.filterOption} onChange={actions.changeFilterType}
                                                  placeholder=""
                                        />

                                </div>


                </div>


                <div className={style.articles_list_body}>
                <ul>
                    {rows}
                </ul>
                </div>
                <div className="articles-list-footer">
                <center className={classnames({'hidden':!showPagination})}>
                    <Pagination pageNo={articlesLists?articlesLists.pageNo:0} totalPage={articlesLists?articlesLists.totalPage:0} query={queryNews}/>
                </center>
                </div>
            </div>


        )
    }
})