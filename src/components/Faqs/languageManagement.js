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

            translationStatus:[{value:"all",label:"all"}]

        }
    },
    saveTemplate(){
        var params={};
        params.categoryId=this.state.categoryId;
        params.models=this.state.allModels;
        params.labelIds=this.state.labels;
        params.topic=this.refs.title.value.trim();
        params.brief=this.refs.editor.getContent();

        //检查数据的的完整性
        var valid=true;
        for(var x in params){
           if(params[x]==false){
               valid=false;
           }
        }
        if(!valid){
            alert('No certain data, please check！');
            return
        }
        this.props.actions.saveTemplate(params)

    },
    componentDidMount(){
        // this.getVersions()
    },

    componentWillUnmount(){
        console.log("组件即将被卸载")
    },
    storeCategory(val){
        this.setState({categoryId:val});
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
        let {faqId,show}=this.props;

        return(
            <div>
               <Modal  {...this.props} backdrop="static" onHide={this.closeModal} bsSize="large" aria-labelledby="contained-modal-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg" backdrop="static">Multi-language Translation Management</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>FAQ ID :9999</h6>
                        <div>
                            <span className="categoryName">Filter</span>
                                <div className={style.formItem}>
                                    <label htmlFor="">Translation Status</label>
                                    <div className="zujian">

                                        <SelectCommon
                                            onChange={this.storeCategory}
                                            options={this.state.translationStatus}


                                            />
                                    </div>
                                </div>

                            <div className={style.formItem}>
                                <label htmlFor="">Language</label>
                                <div className="zujian">

                                    <SelectCommon
                                        onChange={this.storeCategory}
                                        options={this.state.curLangeage}


                                        />
                                </div>
                            </div>
                        </div>

                        <div>
                            <span className="categoryName">Status</span>
                            <span className="languageStatus">Valid</span>
                        </div>

                        <div>
                            <span className="categoryName">Question</span>
                        </div>

                        <div>
                            <span className="categoryName">Target Language</span>
                            <input  type="text" className="form-control"  ref="title"  value={this.state.title}/>
                        </div>

                        <div>
                            <span className="categoryName">Answer</span>
                            <p>

                            </p>
                        </div>

                        <div>

                            <span className="categoryName">Target Language</span>
                            <div></div>



                        </div>



                        <h4>Question</h4>
                        <input  type="text" className="form-control"  ref="title"  value={this.state.title}/>
                        <h4>Answer</h4>
                        <UMeditor parentShow={show} ref="editor" brief={this.state.brief}></UMeditor>


                        <h4>Apply to models</h4>
                        <div className={style.clearFloat}>
                        <div className={style.alignLeft}>
                            <span>Universal:This FAQ Will be applied to all the Alcatel ot TCL devices</span>
                            <div className={style.universal}>
                                <Checkbox checked={this.state.universalChecked} onChange={this.selectAllModels}>Universal</Checkbox>
                            </div>
                            <div className={style.formItem}>
                                <div className="zujian">
                                    <Cascader options={itemsModels} expandTrigger="hover"
                                              onChange={this.storeModel}
                                              allowClear={true}
                                              size="large"

                                        />
                                    <Button onClick={this.pushTOallModels} className={style.addButton}>add</Button>
                                </div>
                            </div>
                        </div>

                            <div className={style.alignRight}>
                                <span>You choosed:</span>
                                <div className={style.selectedModel}>
                                    {
                                        this.state.allModels.map((obj,index)=>{
                                            return <span key={index} onClick={this.removeModel.bind(this,index)}>
                                           { obj.projectName+" "+obj.modelCode}
                                            </span>
                                        })
                                    }
                                </div>
                            </div>

                        </div>

           





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