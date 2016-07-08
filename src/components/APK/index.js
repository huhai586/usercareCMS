import React from 'react';
import { Modal, Button,FormGroup,FormControl } from 'react-bootstrap';
import {INFO_TYPE,PUBLISH_STATUS,FETCH_TYPE,SOURCE_OPTION,KEY_WORD} from '../../constants/placeholder';
import { Transfer } from 'antd';
import moment from 'moment';
import style from './style.less';
import{without,union} from 'lodash'
import FileAPI from 'fileapi'
import classnames from 'classnames'
import {loading} from '../../actions/forloading';
import {indexOf} from 'lodash'

import store from '../../store/index';
export default React.createClass({
  getInitialState() {
    return {
      size:null,
      progress:0,
      complete:false
    };
  },

  closeModal(){
    this.setState(this.getInitialState(),()=>{
      this.props.actions.getAppList();
      this.props.closeModal()
    })
  },
  componentDidMount() {},
  doUpload(e){
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
    if(haveCode!=-1){
      alert("code already exists");
      return
    }
    params.versionName=versionName.value.trim();
    params.description=description.value.trim();


    let files=FileAPI.getFiles(uploadButton);
    if(files.length==0){
      alert("please choose a apk file");
      return
    }
    let size=files[0].size;
    this.setState({size:size})
    FileAPI.filterFiles(files, function (file/**Object*/, info/**Object*/){
      if( /apk$/.test(file.name)  ){
        return  true
      } else {
        alert("please select the .apk file");
        return  false;
      }
    }, function (list/**Array*/, other/**Array*/){

      if( list.length ){
        // 通过验证后执行上传操作
        var xhr = FileAPI.upload({
          url: '/cms/apk/add',
          data: {createdTimestamp:(new Date()).getTime(),versionCode: params.versionCode,versionName:params.versionName,description:params.description,appName:list[0].name },
          files: { uploadFile: list[0]},
          upload:()=>{
            var x=loading({loading:true});
            store.dispatch(x);
          },
          progress: function (evt/**Object*/, file/**Object*/, xhr/**Object*/, options/**Object*/){
            var pr = evt.loaded/evt.total * 100;
            _this.setState({progress:pr})
          },
          complete:function(error){
            var x=loading({loading:false});
            store.dispatch(x);
           if(error=="error"){
             alert("upload failure")
           }else{
             _this.setState({complete:true},()=>{
               _this.closeModal()
             });

           }
          }
        });

      }
    });



  },

  processInput(e){
    var obj=e.target
    obj.value=obj.value.replace(/[^0-9]/g,'');

  },
  render() {
    return(
       <div>
         <Modal  backdrop="static" dialogClassName={style.custom_modal} {...this.props} onHide={this.props.closeModal} aria-labelledby="contained-modal-title-lg">
           <Modal.Header closeButton>
             <Modal.Title id="contained-modal-title-lg" backdrop="static">Add APK</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <h4>version Name</h4>
             <input type="text" className="form-control"  ref="versionName" />
             <h4>version Code</h4>
             <input type="text" className="form-control"  ref="versionCode" onChange={this.processInput}/>
            <div className={style.upload}>
              <input type="file"  id="uploadAPK" ref="uploadButton"/>
              <div className={classnames({"hidden":this.state.size==undefined})}>
                flieSize:{this.state.size&&Math.floor((this.state.size)/1024)+"K"};
                uploadProgress:{this.state.progress+"%"};
                complete:{this.state.complete}
              </div>
            </div>


             <h4>refresh manual</h4>
             <textarea className="form-control" name="" id="" cols="30" rows="5" ref="description"></textarea>




           </Modal.Body>
           <Modal.Footer>
             <Button onClick={this.doUpload} bsStyle="success">Submit</Button>
             <Button onClick={this.closeModal} >Cancel</Button>
           </Modal.Footer>
         </Modal>
       </div>

    )
  }
});