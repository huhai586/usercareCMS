import React from 'react';
import { Modal, Button,FormGroup,FormControl } from 'react-bootstrap';
import style from './style.less';
import DataAddRemove from '../../components/Common/dataandremove';

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

    componentDidMount(){
        //开始加载country & admins


        this.props.actions.getAllCountry().then(res=>{
            if(!res.error){
                var countrys=res.payload.items
                var allCountry=countrys.map(obj=>{

                    return {value:obj.id,label:obj.countryName}
                });

                this.setState({countryChooseData:allCountry})
            }
        })

        this.props.actions.getAllAdmin().then(res=>{
            if(!res.error){
                var admins=res.payload.items
                var allAdmins=admins.map(obj=>{
                    return {value:obj.id,label:obj.name}
                });

                this.setState({adminChooseData:allAdmins})
            }
        })
    },
    deleteCountry(countryIds){
        var params={regionId:this.props.item.id,countryIds:countryIds}
        this.props.actions.deleteCountry(params).then(res=>{
            if(!res.error){
                alert("delete country Success")
                this.props.actions.getRegionsList();
            }
        })
    },
    addCountry(countryIds){
        var params={regionId:this.props.item.id,countryIds:countryIds}
        this.props.actions.addCountry(params).then(res=>{
            if(!res.error){
                alert("add country Success")
                this.props.actions.getRegionsList();
            }
        })
    },
    deleteAdmin(adminIds){
        var params={regionId:this.props.item.id,adminIds:adminIds}
        this.props.actions.deleteAdmin(params).then(res=>{
            if(!res.error){
                alert("delete admin Success")
                this.props.actions.getRegionsList();
            }
        })
    },
    addAdmin(adminIds){
        var params={regionId:this.props.item.id,adminIds:adminIds}
        this.props.actions.addAdmin(params).then(res=>{
            if(!res.error){
                alert("add admin Success")
                this.props.actions.getRegionsList();
            }
        })
    },
    render() {
        let {item}=this.props,countryList=[],adminList=[];
        countryList=item.countryList;
        adminList=item.adminList;


       if(countryList instanceof Array){
           countryList=countryList.map((obj,index)=>{
               return {label:obj.countryName,value:obj.id}
           });
       }else{
           countryList=[]
       }

        if(adminList instanceof Array){
            adminList=adminList.map((obj,index)=>{
                return {label:obj.name,value:obj.id}
            });
        }else{

            adminList=[]
        }


        return(
            <div>
                <Modal {...this.props} onHide={this.props.closeModal} bsSize="large" aria-labelledby="contained-modal-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg" backdrop="static">{item.regionName} Countries and Admins Management</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className={style.modalLeft}>
                            <DataAddRemove
                                title={item.regionName+" Countrylist"}
                                dataForChoose={countryList}
                                dateForSelect={this.state.countryChooseData}
                                introText={"check to delete one or more countries from this region"}
                                introText2={"choose and add one or more countries from this region"}
                                delete={this.deleteCountry}
                                add={this.addCountry} >
                            </DataAddRemove>
                        </div>

                        <div className={style.modalRight}>
                            <DataAddRemove
                                title={item.regionName+" Adminlist"}
                                dataForChoose={adminList}
                                dateForSelect={this.state.adminChooseData}
                                introText={"check to delete one or more admins from this region"}
                                introText2={"choose and add one or more admins from this region"}
                                delete={this.deleteAdmin}
                                add={this.addAdmin} >
                            </DataAddRemove>
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