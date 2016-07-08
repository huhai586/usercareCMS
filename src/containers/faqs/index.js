import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as faqsActions from '../../actions/faqs';
import * as labelsActions from '../../actions/labels';
import NewTemplate from '../../components/Faqs/new-template';
import style from './style.less';
import { Input,Select,Button,Switch,Icon,Pagination   } from 'antd';
const Option = Select.Option;
import classnames from 'classnames'

// antd example


import { Cascader} from 'antd';


// antd example
let unionActions = Object.assign({}, faqsActions,labelsActions);

var FAQS = React.createClass({
    getInitialState(){
        return {modalShow:false,curIndex:0,showTemplate:false}

    },
    componentDidMount(){
        var p1=this.props.actions.getProjectsList();
        var p2=this.props.actions.getLabels();
        var p3=this.props.actions.getCategorys();
        Promise.all([p1, p2, p3]).then((res)=>{
            console.log("获取数据都成功了",res);
            this.doSearch()
        })
        
    },
    handleSubmit(e){
        debugger
    },
    storeKeyword(e){
        this.setState({keyWords:e.target.value});
    },
    storeCategory(val){
        this.setState({categoryId:val});
    },
    storeModel(val){
        this.setState({model:val[1]});
    },
    storeLabel(val){
        this.setState({label:val});
    },
    changeDisplay(faqID,status){
        var params={faqId:faqID,status:status=='Y'?"N":"Y"};
        this.props.actions.changeFAQdisplay(params).then((res)=>{
            if(!res.error){
                this.doSearch()
            }
        })

    },
    doSearch(pageNo){
      var curState=this.state;
      var params={keyWords:curState.keyWords,categoryId:curState.categoryId,model:curState.model,label:curState.label,pageNo:1};
        //数据都可以为空值所以可以不检查
        if(typeof pageNo =="number"){
            params.pageNo=pageNo;
        }
        this.props.actions.searchFAQ(params)
    },
    addNewTemplate(){
        this.setState({"showTemplate":true})
    },
    closeTemplate(){
        this.setState({"showTemplate":false})
    },
    render() {
        var {FAQS}=this.props;
        //获取models
        var itemsModels=FAQS.projectsList.items;
        if(!itemsModels){
            itemsModels=[];
        }else{
            itemsModels=itemsModels.map(obj=>{
                var curValue=obj.id,noChild=false,children=[];
                var curLabel=obj.projectName;
                if(obj.modelList && obj.modelList.length==0){
                    noChild=true
                }else{
                    var child=obj.modelList;
                    children=child.map(obj=>{
                        return {value:obj.id,label:obj.modelCode}
                    })
                    return {value:curValue,label:curLabel,children: children}
                }
                return {value:curValue,label:curLabel,disabled: noChild}
            })
        }
        // console.log("当前的itemsModels",itemsModels);

        //获取labels
        var labels=FAQS.labelsData.items;
        if(!labels){
            labels=[];
        }else{
            labels=labels.map((obj,index)=>{
                return  <Option value={obj.name} key={index}>{obj.name}</Option>
            })
        }
        //获取Category
        var categorys=FAQS.categoryData.items,categoryDefault;
        if(!categorys){
            categorys=[];
        }else{
            categorys=categorys.map((obj,index)=>{
                if(index==0){
                    categoryDefault=obj.id;
                }
                return  <Option value={obj.id} key={index}>{obj.name}</Option>
            })
        }
        //或者faqs list
        var faqsTD=FAQS.searchFAQ.items;
        if(!faqsTD){
            faqsTD= [];

        }else{
            faqsTD=faqsTD.map((obj,index)=>{
                return  <tr key={index}>
                    <td>
                        {obj.id}
                    </td>
                    <td>
                        {obj.topic}
                    </td>
                    <td>
                        {obj.brief}
                    </td>
                    <td>
                        {
                            obj.categoryName
                        }
                    </td>
                    <td>
                        {
                            <Switch defaultChecked={obj.status=="Y"} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross"/>} onChange={this.changeDisplay.bind(this,obj.id,obj.status)} />
                        }
                    </td>
                    <td>
                        {
                            obj.projectList.map((curObj,index)=>{
                                return <span className={style.modelItem} key={index}>{curObj.projectName}({curObj.modelCodes.join(",")})</span>
                            })
                        }
                    </td>
                    <td>
                        {
                            obj.labelList.map((curObj,index)=>{
                                return <span className={style.modelItem} key={index}> {curObj.name}</span>
                            })
                        }
                    </td>

                    <td className={style.multiLanguage}>
                        <div className="languageManage" >

                            <span className={classnames(style.modelItem,{red:obj.faqI18nStatus.inValidCount>0?true:false})}>{obj.faqI18nStatus.inValidCount} languages invalid;</span>
                            <span className={style.modelItem}>{obj.faqI18nStatus.noTranslationCount} No translation;</span>
                            <span className={style.modelItem}>{obj.faqI18nStatus.validCount} Languages Valid;</span>
                        </div>

                    </td>
                    <td>
                        {
                            obj.readCount
                        }
                    </td>
                    <td>{obj.consCount}/{obj.prosCount}</td>
                    <td className={style.fixWidth80}>
                        <Button type="ghost">Copy</Button>
                        <Button type="ghost">Delete</Button>
                    </td>
                    <td>
                        {obj.creator}
                    </td>
                </tr>
            })
        }
        if(faqsTD.length==0){
            faqsTD=<tr><td  align="center"  colSpan="11" >No Date</td></tr>
        }

        return(
           <div>
               <NewTemplate show={this.state.showTemplate} closeModal={this.closeTemplate} categorys={categorys} labels={labels} itemsModels={itemsModels} ></NewTemplate>

               <div className={style.formItem}>
                   <label htmlFor="">keywords</label>
                   <div className="zujian"> <Input size="large" placeholder="search keyWords" onChange={this.storeKeyword}/></div>
               </div>

               <div className={style.formItem}>
                   <label htmlFor="">Category</label>
                   <div className="zujian">

                       <Select showSearch
                               style={{ width: 200 }}
                               placeholder="choose Category"
                               optionFilterProp="children"
                               notFoundContent="no found"
                               allowClear={true}
                               defaultValue={categoryDefault}
                               onChange={this.storeCategory}
                       >
                           {categorys}
                       </Select>
                   </div>
               </div>

               <div className={style.formItem}>
                   <label htmlFor="">Model</label>
                   <div className="zujian">
                       <Cascader options={itemsModels} expandTrigger="hover"
                                 onChange={this.storeModel}
                                 allowClear={true}
                       />
                   </div>
               </div>

               <div className={style.formItem}>
                   <label htmlFor="">Label</label>
                   <div className="zujian">

                       <Select showSearch
                               style={{ width: 200 }}
                               placeholder="请选择标签"
                               optionFilterProp="children"
                               notFoundContent="无法找到"
                               allowClear={true}
                                onchange={this.storeLabel}
                       >
                           {labels}
                       </Select>

                   </div>
               </div>

               <div className={style.formItem}>
                   <Button type="primary" icon="search" onClick={this.doSearch}>Search</Button>
               </div>


               <div className={style.buttons}>
                   <Button  size="large" icon="edit" onClick={this.addNewTemplate}>Create new</Button>
                   <Button  size="large" icon="export">Export</Button>
                   <Button  size="large" icon="shrink">Import</Button>
               </div>

               <div className="content">

                   <table className="table table-bordered table-hover table-fix">
                       <thead>
                       <tr>
                           <th>FAQ ID</th>
                           <th>Question</th>
                           <th className={style.fixWidth2}>Answer</th>
                           <th className={style.fixWidth1}>Category</th>
                           <th>Display</th>
                           <th>Model</th>
                           <th>Label</th>
                           <th className={style.fixWidth15}>Multi-Language</th>
                           <th>Views</th>
                           <th>Cons/Pros</th>
                           <th >Copy/Delete</th>
                           <th >Creator</th>
                       </tr>
                       </thead>
                       <tbody>
                       {faqsTD}
                       </tbody>
                   </table>

               </div>
               <center className={classnames({hidden:FAQS.searchFAQ.totalCount?false:true})}>
                  <div className={style.center}>
                      <Pagination onChange={this.doSearch} defaultCurrent={FAQS.searchFAQ.pageNo?FAQS.searchFAQ.pageNo:1} total={FAQS.searchFAQ.totalCount?FAQS.searchFAQ.totalCount:1} />,
                  </div>
               </center>




           </div>

        )

    }
});


// connect action to props
const mapStateToProps = (state) => ({FAQS: state.faqs, config: state.config});
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(unionActions, dispatch)});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FAQS);
