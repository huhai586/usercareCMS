/**
 * Created by haihu on 2016/5/11.
 */
import React from 'react';
import Select from 'react-select';
import style from "./style.less"
export default React.createClass({
    changeStatus(val){
        this.props.actions.changeStatus(val);
    },
    getValue(){
        console.log("获得category,",this.refs.category.state.values)
        return this.refs.category.state.values;
    },
    getSimpleValue(){
        return this.refs.category.state.value;
    },
    render(){
        
        return(
            <div className={style.querySelect} >
                <Select ref="category" clearable={false}
                    {...this.props}
                />
            </div>


        )
    }
})