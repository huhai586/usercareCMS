import React from 'react';
import style from "./style.less";
import classnames from 'classnames';
import SelectCommon from '../../components/Articles/select-common';
import {Checkbox,Button } from 'antd';
const CheckboxGroup = Checkbox.Group;


export default React.createClass({
    getInitialState(){
        var chooseIds=[];
        return({
            chooseIds
        })
    },
    storeCheckbox(e){
        this.setState({chooseIds:e})
    },
    addAction(e){
        //有点奇怪
        var inputData=this.refs.modelSpecial.value.trim();
        this.refs.modelSpecial.value="";
        if(inputData.length==0){
            alert("You have not selectd");
            return
            
        };
        inputData=inputData.split(";");


        
        this.props.add(inputData)

    },
    deleteAction(){

        this.props.delete(this.state.chooseIds)
    },
    render() {



        return(
            <div>
                <CheckboxGroup options={this.props.dataForChoose} onChange={this.storeCheckbox} />
                <h6>{this.props.introText}</h6>
                <div className={style.right}>
                    <Button type="primary" onClick={this.deleteAction}>Delete</Button>
                </div>

                <h6>{this.props.introText2}</h6>

                <input type="text" className="form-control"
                       placeholder="please input..." ref="modelSpecial"/>
                
                <div className={style.right}>
                    <Button type="primary" onClick={this.addAction}>Add</Button>
                </div>

            </div>
        )

    }
});