import React from 'react';
import { Modal, Button,FormGroup,FormControl } from 'react-bootstrap';
import style from './style.less'

export default React.createClass({


    addAccount(){
        let {account}=this.refs;
        var accountName=account.value.trim();
        if(!accountName) return
        debugger
        this.props.actions.addAccount({accountName:accountName}).then(res=>{
            if(!res.error){
                this.props.closeModal(true)
            }
        })
    },

    render() {

        return(
            <div>
               <Modal {...this.props} backdrop="static" onHide={this.props.closeModal} bsSize="small" aria-labelledby="contained-modal-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg" backdrop="static">Add account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={style.inputAccount}>
                            <input ref="account" type="text" className="form-control"/>
                        </div>
                        <Button onClick={this.addAccount}>Add</Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.closeModal} >Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        )
    }
});