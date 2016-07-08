import React from 'react';
import style from "./style.less";
import classnames from 'classnames';
import SelectCommon from '../../components/Articles/select-common';
import {Checkbox,Button} from 'antd';
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
        var select=this.refs.category.getSimpleValue();
        if(select.length==0) alert("You have not selectd");
        select=select.split(",");
        select=select.map(obj=>{
            return parseInt(obj)
        })
        this.props.add(select)

    },
    deleteAction(){

        this.props.delete(this.state.chooseIds)
    },
    render() {



        return(
            <div>
                <h4>{this.props.title}</h4>
                <CheckboxGroup options={this.props.dataForChoose} onChange={this.storeCheckbox} />
                <h6>{this.props.introText}</h6>
                <div className={style.right}>
                    <Button type="primary" onClick={this.deleteAction}>Delete</Button>
                </div>

                <h6>{this.props.introText2}</h6>



                <SelectCommon  multi={true} options={this.props.dateForSelect}
                              ref="category"  />
                <div className={style.right}>
                    <Button type="primary" onClick={this.addAction}>Add</Button>
                </div>

            </div>
        )

    }
});