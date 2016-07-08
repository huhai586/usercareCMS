/**
 * Created by haihu on 2016/5/11.
 */
import React from 'react';
import Select from 'react-select';
import {FETCH_TYPE,SOURCE_OPTION} from '../../constants/placeholder';
import style from "./style.less"

export default React.createClass({
    componentDidMount(){

        var fetchTypeValue=this.props.fetchTypeValue;
            //根据fetch-type的ID获取source-option
            //获取sorce-option
            this.props.actions.getSourceOption({sourceType:fetchTypeValue}).then((res)=>{
                // if(res.payload.length==0){
                //    this.props.actions.changeSourceOption(res.payload[0].sourceId);
                // }
            })


    },
    changeTypeAndSource(val){
        //更新fetch_type
        this.props.actions.changeFetchType(val);
        //更新source-option
        this.props.actions.getSourceOption({sourceType:val}).then((res)=>{
                this.props.actions.changeSourceOption(res.payload[0]?res.payload[0].sourceId:"");

        })
    },
    render(){

        let {optionsFetch,sourceOption,actions,fetchTypeValue,sourceOptionValue}=this.props;
        return(
                <div className={style.unionSelect}>
                    <div className={style.querySelect}>
                        <Select
                            clearable={false}
                            name="form-field-name"
                            placeholder={FETCH_TYPE}
                            options={optionsFetch}
                            value={fetchTypeValue}
                            onChange={this.changeTypeAndSource}
                            />
                    </div>

                    <div className={style.querySelect}>
                        <Select

                            clearable={true}
                            name="form-field-name"
                            placeholder={SOURCE_OPTION}
                            options={sourceOption}
                            value={sourceOptionValue}
                            onChange={actions.changeSourceOption}
                            />
                    </div>
                </div>


        )
    }
})