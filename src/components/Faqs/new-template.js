import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import style from './style.less';
import UMeditor from '../UMeditor/index'
import { Input,Select,Switch,Icon,Pagination,Cascader   } from 'antd';

export default React.createClass({
    getInitialState(){
        return {
            versions:[],
            expireTime:[{value:21600,label:"6 Hours"},{value:43200,label:"12 Hours"},{value:86400,label:"24 Hours"}]

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
        this.setState({model:val[1]});
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

                                <Select showSearch
                                        style={{ width: 200 }}
                                        placeholder="choose Category"
                                        optionFilterProp="children"
                                        notFoundContent="no found"
                                        allowClear={true}

                                        onChange={this.storeCategory}
                                >
                                    {categorys}
                                </Select>
                            </div>
                        </div>

                        <h4>Question</h4>
                        <input  type="text" className="form-control"  ref="title" />
                        <h4>Answer</h4>
                        <UMeditor parentShow={show}></UMeditor>


                        <h4>Apply to models</h4>
                        <span>Universal:This FAQ Will be applied to all the Alcatel ot TCL devices</span>
                         <div className={style.formItem}>
                            <div className="zujian">
                                <Cascader options={itemsModels} expandTrigger="hover"
                                          onChange={this.storeModel}
                                          allowClear={true}
                                />
                            </div>
                        </div>

                        <h4>Labels</h4>

                        <div className={style.formItem}>
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