import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import style from './style.less';
import UMeditor from '../UMeditor/index'
import { Input,Switch,Icon,Pagination,Cascader,Checkbox   } from 'antd';
import SelectCommon from "../../components/Articles/select-common.js";
import {uniq,compact} from 'lodash';

export default React.createClass({
    getInitialState(){
        return {

            translationStatus:[{value:"all",label:"all"},{value:"valid",label:"valid"},{value:"invalid",label:"invalid"},{value:"No Translation",label:"No Translation"}],
            languageStatus:"all",
            curLanguageData:[],
            curLanguageName:"",
            selectdLanguageStatus:"",
            curLanguageLabel:""
        }
    },
    saveTemplate(){

        var {editor,title}=this.refs;
        var params={
            faqId:this.props.faqId,
            topic:title.value.trim(),
            brief:editor.getContent(),
            languageShortName:this.state.curLanguageName
        };
        hasError=false;
        for(var x in params){
            if(params[x].length==0){
                hasError=true;
            }
        }
        if(hasError){
            alert("some info miss!")
            return
        }
        if(this.props.FAQS.mLangDetail.id!=undefined){
            params.id=this.props.FAQS.mLangDetail.id
        }
        //执行上传
        this.props.actions.saveLanTrans(params).then(res=>{
            if(!res.error){
                this.closeModal()
            }
        })
    },
    componentDidMount(){
        // getLanguage

    },
    storeCurLanguageShortName(){
        if(arguments[0]=="") return
        this.setState({curLanguageName:arguments[0],curLanguageLabel:arguments[1][0].label},()=>{
            //get当前语言相应的数据
            this.props.actions.getDetailInfo({
                faqId:this.props.faqId,
                language:arguments[0]
            })
        })
    },
    getLanguage(){
        var params={
            faqId:this.props.faqId,
            status:this.state.languageStatus
        };

        this.props.actions.getCurStatus(params).then(res=>{
            if(!res.error){
                this.setState({curLanguageData:res.payload.items})
            }
        })
    },
    componentWillReceiveProps(nextProps){
        if(this.props.show==false && nextProps.show==true){
            this.getLanguage()
        }
    },
    componentWillUnmount(){
        console.log("组件即将被卸载")
    },
    storeStatus(val){
        this.setState({languageStatus:val,curLanguageName:"",curLanguageLabel:""},()=>{
            this.getLanguage()
        });
    },

    storeModel(val){
        //存储当前的model

        this.setState({curModel:val});

    },

    storeLabel(val){
        this.setState({labels:val});
    },
    closeModal(){
        this.setState(this.getInitialState(), () => {
            this.props.closeModal();
        });
    },

    render() {
        let {faqId,show,FAQS}=this.props;
        //组成language select的option数据
        var languageData=this.state.curLanguageData.map(obj=>{
                //all状态下的语言label显示的不一样
                return {value:obj.languageShortName,label:obj.languageName+"  ("+obj.status+")"}

        });
       var curLanguageInfo=FAQS.mLangDetail
        return(
            <div>
               <Modal  {...this.props} backdrop="static" onHide={this.closeModal} bsSize="large" aria-labelledby="contained-modal-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg" backdrop="static">Multi-language Translation Management</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6 className="categoryName">FAQ ID :{this.props.faqId}</h6>
                        <div className={style.inlineBlock}>
                            <span className="categoryName">Filter</span>
                                <div className={style.formItem}>
                                    <label htmlFor="">Translation Status</label>
                                    <div className="zujian">

                                        <SelectCommon
                                            onChange={this.storeStatus}
                                            options={this.state.translationStatus}
                                            value={this.state.languageStatus}


                                            />
                                    </div>
                                </div>

                            <div className={style.formItem}>
                                <label htmlFor="">Language</label>
                                <div className="zujian">

                                    <SelectCommon
                                        onChange={this.storeCurLanguageShortName}
                                        options={languageData}
                                        value={this.state.curLanguageName}

                                        />
                                </div>
                            </div>
                        </div>

                        <div className={style.inlineBlock}>
                            <span className="categoryName">language Status</span>
                            <span className="languageStatus">{this.state.curLanguageLabel}</span>
                        </div>

                        <div className={style.inlineBlock}>
                            <span className="categoryName">Question</span>
                            <span>
                                {curLanguageInfo.enTopic}
                            </span>
                        </div>

                        <div className={style.inlineBlock}>
                            <span className="categoryName">Target Language</span>
                            <input  defaultValue={curLanguageInfo.topic} type="text" className="form-control fixInput"  ref="title"  />
                        </div>

                        <div className={style.inlineBlock}>
                            <span className="categoryName">Answer</span>
                            <div className="detailContent" dangerouslySetInnerHTML={{__html:curLanguageInfo.enBrief}}></div>
                        </div>

                        <h4>Target Language</h4>

                        <UMeditor brief={curLanguageInfo.brief} parentShow={show} ref="editor" ></UMeditor>






           





                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.saveTemplate} bsStyle="success">Submit</Button>
                        <Button onClick={this.closeModal} >Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        )
    }
});