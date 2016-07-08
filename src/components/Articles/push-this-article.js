import React from 'react';
import { Modal, Button,FormGroup,FormControl } from 'react-bootstrap';
import style from './style.less'
import SelectCommon from './select-common';
import {utcTime} from "../../utils/common";
import Datetimepicker from '../Datetimepicker/time-solo';
import Timepicker from '../Datetimepicker/time';
import { isValidDate,convertTOutc } from '../../utils/common';

export default React.createClass({
    getInitialState(){
        return {
            versions:[],
            expireTime:[{value:21600,label:"6 Hours"},{value:43200,label:"12 Hours"},{value:86400,label:"24 Hours"}]

        }
    },

    componentDidMount(){
        this.getVersions()
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
    startPush(){
        var pushTime=new Date();
        var params={};
        params.contentId=this.props.contentId;
        params.versionCodes=this.refs.versions.getValue();
        params.versionCodes=this.extractArray(params.versionCodes);

        params.expiredTime=this.refs.expireTime.getValue();
        params.expiredTime=params.expiredTime[0].value;

        params.pushTitle=this.refs.title.value;
        params.pushBody=this.refs.content.value;



        //获取push date+时分秒
        let{ pushDate,pushTimea}=this.refs;
        if(!isValidDate(pushDate.getValue()) && !isValidDate(pushTimea.getValue()) ){
            alert("time format error!")
            return
        }
        //拼接日期与时间（time格式固定，时间都用十分位表示，所以直接substr(11)）
        var dateAndTime=pushDate.getValue()+" "+pushTimea.getValue().substr(11);
        params.pushedTimestamp=convertTOutc(dateAndTime);


        if(params.pushTitle.length==0 || params.pushBody.length==0){
            alert("pushTitle or pushBody can not be null");
            return
        }


        if(params.versionCodes.length==0){
            alert("Please select version");
            return
        }

        this.props.actions.pushThisArticle(params).then((res)=>{

            if(!res.error){
                alert("Push success!");
                this.props.closeModal();
            }
        })

    },
    extractArray(array){
        return array.map((obj)=>{
            return obj.value;
        })
    },
    render() {
        let {content,article,config,actions}=this.props;
        return(
            <div>
               <Modal  {...this.props} backdrop="static" onHide={this.props.closeModal} bsSize="large" aria-labelledby="contained-modal-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg" backdrop="static">Push Add</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Title</h4>
                        <input  type="text" className="form-control" defaultValue={content.title} ref="title" />
                        <h4>Content</h4>
                        <textarea ref="content" className="form-control" rows="3"></textarea>
                        <h4>Time</h4>
                        <Datetimepicker ref="pushDate" />
                        <Timepicker ref="pushTimea"></Timepicker>

                        <h4>Version</h4>
                        <SelectCommon  multi={true} options={this.state.versions}  ref="versions"/>


                        <h4>Expire Time</h4>
                        <SelectCommon  multi={false} options={this.state.expireTime} value={21600} ref="expireTime"/>






                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.startPush} bsStyle="success">Push this article</Button>
                        <Button onClick={this.props.closeModal} >Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        )
    }
});