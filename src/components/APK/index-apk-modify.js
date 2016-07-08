import React from 'react';
import { Modal, Button,FormGroup,FormControl } from 'react-bootstrap';
import { Transfer } from 'antd';
import style from './style.less';
import{without,union} from 'lodash';

import {indexOf} from 'lodash'

export default React.createClass({
  getInitialState() {
    return {
      size:null,
      progress:0,
      complete:false,
      showHide:false
    };
  },
  changeHideStatus(){
    this.setState({showHide:true})
  },
  closeModal(){
    this.setState(this.getInitialState(),()=>{
      this.props.closeModal();
    });

  },

  submit(){

    var _this=this;
    //versionCode、versionName、description
    let{versionName,versionCode,description,uploadButton}=this.refs,params={};
    if(versionName.value.trim().length==0){
      alert("version name need");
      return
    }else if(versionCode.value.trim().length==0){
      alert("version code need");
      return
    }else if(description.value.trim().length==0){
      alert("description need");
      return
    }
    params.versionCode=versionCode.value.trim();
    var haveCode=indexOf(this.props.allCodes,parseInt(params.versionCode));
    if(haveCode!=-1  && this.props.apkInfo.versionCode!=params.versionCode){
      alert("code already exists");
      return
    }
    params.versionName=versionName.value.trim();
    params.description=description.value.trim();

    //
    params={...this.props.apkInfo,...params};
    debugger
    this.props.actions.modifyAPK(params).then(res=>{
      if(!res.error){
        this.closeModal();
      }
    })







  }

  ,
  render() {
    let {actions,apkInfo}=this.props;
    let soloAPKInfo=apkInfo|| {};
    return(
       <div>
         <Modal  backdrop="static" dialogClassName={style.custom_modal} {...this.props} onHide={this.props.closeModal} aria-labelledby="contained-modal-title-lg">
           <Modal.Header closeButton>
             <Modal.Title id="contained-modal-title-lg" backdrop="static">APK  Modify</Modal.Title>
           </Modal.Header>

           <Modal.Body>
             <h4>version Name</h4>
             <input type="text" className="form-control" defaultValue={soloAPKInfo.versionName} ref="versionName" />
             <h4>version Code</h4>
             <input  type="text" className="form-control" defaultValue={soloAPKInfo.versionCode}  ref="versionCode" />



             <h4>refresh manual</h4>
             <textarea defaultValue={soloAPKInfo.description} className="form-control" name="" id="" cols="30" rows="5" ref="description"></textarea>



           </Modal.Body>
           <Modal.Footer>
             <Button onClick={this.submit} bsStyle="success">Submit</Button>
             <Button onClick={this.closeModal} >Cancel</Button>
           </Modal.Footer>
         </Modal>
       </div>

    )
  }
});