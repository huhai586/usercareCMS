import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import style from './style.less';
import UMeditor from '../UMeditor/index'
import { Input,Switch,Icon,Pagination,Cascader   } from 'antd';
import SelectCommon from "../../components/Articles/select-common.js";
import {uniq,compact} from 'lodash';

export default React.createClass({
    getInitialState(){
        return {
            versions:[],
            allModels:[]

        }
    },
    saveTemplate(){

    },
    componentDidMount(){
        // this.getVersions()
    },
    getVersions(){
        this.props.actions.getAppList().then((res)=>{
            console.log("得到数据app list",res)
            if(res.error) return
            let versions=res.payload.map(obj=>(
            {value: obj.versionCode, label: obj.versionName}
            ));
            this.setState({versions:versions})

        })
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
    componentWillReceiveProps(nextProps){
        if(this.props.show==false && nextProps.show==true){
            //第一次打开界面的时候初始化state
            var defaultCategory=this.props.categoryId;
            var defaultLabel=this.props.label;
            var defaultModel=this.props.allModel;
            if()
            this.setState({categoryId:this.props.categoryId});

        }

    },
    pushTOallModels(){
        this.setState(state=>{
            var allModels=state.allModels?state.allModels:[];
            var curModel=this.state.curModel;
            if(!curModel||curModel.length==0) return
            allModels.push(curModel);
            allModels=uniq(allModels);
            return {...state,allModels}

        },()=>{
            console.log("最终的state",this.state)

                this.setState({curModel:[]})

        })
    },
    removeModel(index){
        this.setState(state=>{
            var allModels=state.allModels;
            delete allModels[index];
            allModels=compact(allModels);
            return {...state,allModels}
        })
    },
    storeLabel(val){
        this.setState({label:val});
    },
    render() {
        let {categorys,itemsModels,labels,show}=this.props;

        return(
            <div>
               <Modal  {...this.props} backdrop="static" onHide={this.props.closeModal} bsSize="large" aria-labelledby="contained-modal-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg" backdrop="static">FAQ english creation page</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className={style.formItem}>
                            <label htmlFor="">Category</label>
                            <div className="zujian">

                                <SelectCommon
                                    onChange={this.storeCategory}
                                    options={categorys}
                                    value={this.state.categoryId}

                                    />
                            </div>
                        </div>

                        <h4>Question</h4>
                        <input  type="text" className="form-control"  ref="title" />
                        <h4>Answer</h4>
                        <UMeditor parentShow={show}></UMeditor>


                        <h4>Apply to models</h4>
                        <div className={style.clearFloat}>
                        <div className={style.alignLeft}>
                            <span>Universal:This FAQ Will be applied to all the Alcatel ot TCL devices</span>
                            <div className={style.formItem}>
                                <div className="zujian">
                                    <Cascader options={itemsModels} expandTrigger="hover"
                                              onChange={this.storeModel}
                                              allowClear={true}
                                        />
                                    <Button onClick={this.pushTOallModels}>add</Button>
                                </div>
                            </div>
                        </div>

                            <div className={style.alignRight}>
                                <span>You choosed:</span>
                                <div className={style.selectedModel}>
                                    {
                                        this.state.allModels.map((obj,index)=>{
                                            return <span key={index} onClick={this.removeModel.bind(this,index)}>
                                           { obj[0]+" "+obj[1]}
                                            </span>
                                        })
                                    }
                                </div>
                            </div>

                        </div>

                        <h4>Labels</h4>

                        <div className={style.formItem}>
                            <div className="zujian">

                                <SelectCommon
                                    onChange={this.storeLabel}
                                    options={labels}
                                    value={this.state.label}
                                    />

                            </div>
                        </div>






                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.saveTemplate} bsStyle="success">Submit</Button>
                        <Button onClick={this.props.closeModal} >Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        )
    }
});