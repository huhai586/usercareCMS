import React from 'react';
import { Modal, Button,FormGroup,FormControl } from 'react-bootstrap';
import style from './style.less';
import DataChooseAndInput from '../../components/Common/data_choose_and_input';

export default React.createClass({
    getInitialState(){
        var countryChooseData=[],adminChooseData=[],countryList=[],adminList=[];

        return {
            countryChooseData,
            adminChooseData,
            countryList,
            adminList


        }
    },


    deleteModels(modelCodes){
        var params={projectName:this.props.item.projectName,modelCodes:modelCodes}
        this.props.actions.deleteModels(params).then(res=>{
            if(!res.error){
                alert("delete Models Success")
                this.props.queryProject();

            }
        })
    },
    addModels(modelCodes){
        var params={projectName:this.props.item.projectName,modelCodes:modelCodes}
        this.props.actions.addModels(params).then(res=>{
            if(!res.error){
                alert("add Models Success")
                this.props.queryProject();
            }
        })
    },
    render() {
        let {item=[]}=this.props,modelList=[];

        modelList=item.modelList;




       if(modelList instanceof Array){
           modelList=modelList.map((obj,index)=>{
               return {label:obj.modelCode,value:obj.modelCode}
           });
       }else{
           modelList=[]
       }



        return(
            <div>
                <Modal {...this.props} onHide={this.props.closeModal} bsSize="sm" aria-labelledby="contained-modal-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg" backdrop="static">{item.projectName} Models List</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>



                        <div className={style.modalRight}>
                            <DataChooseAndInput
                                title={item.projectName+" Models List"}
                                dataForChoose={modelList}
                                introText={"check to delete one or more models from this project"}
                                introText2={"input one or more model names to add to this project eg(6055J;6055P)"}
                                delete={this.deleteModels}
                                add={this.addModels} >
                            </DataChooseAndInput>
                        </div>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.closeModal} >Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        )
    }
});