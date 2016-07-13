import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import * as labelsActions from '../../actions/labels';
import style from './style.less';
import { Modal,Pagination } from 'antd';
import  LabelManagment  from '../../components/Common/label-data_choose_and_input';
import classnames from 'classnames'

let unionActions = Object.assign({}, labelsActions);

var Dashboard = React.createClass({
    getInitialState(){
        return {modalShow:false,curIndex:0,pageNo:1}

    },

    componentDidMount() {
        //请求select数据

       this.queryLabels()

    },

    queryLabels(){
        this.props.actions.getLabels();
    },


    deleteLabels(labelId){

        var params=labelId

        this.props.actions.deleteLabels(params).then(res=>{
            if(!res.error){
                alert("delete labels Success")
                this.queryLabels()

            }
        })
    },
    newAdd(){

        var _this=this;
        var index=layer.prompt(function(val){

            console.log(val)
            var trimVal=val.trim();
            if(trimVal.length==0){
                return
            }
            _this.props.actions.addLabels({labelName:trimVal}).then((res)=>{
                if(!res.error){
                    _this.queryLabels()
                    alert("add labels Success!")
                    layer.close(index)
                }
            })
        });
    },


    pageOnChange(num){

        this.setState({pageNo:num},()=>{
            this.queryProject();
        });


    },
    addLabels(){
        alert("添加标签")
    },
    render() {
        let {labels} = this.props, rows = [];
        var soloLabelData=labels.labelsData;
        var  item=soloLabelData.items;
        if(!item){
            item=[];
        }else{
            item=item.map(obj=>{
                return {label:obj.name,value:obj.id}
            })
        }

        return (
            <div className={style.labelContainer}>

                <div className={style.addNewButton}>
                    <Button bsStyle="success" onClick={this.newAdd}>Create New</Button>
                </div>
                <LabelManagment
                title="label list"
                dataForChoose={item}
                introText={"Check to delete one or more labels"}
                delete={this.deleteLabels}
                ></LabelManagment>



                
            </div>



        );
    }
});

// connect action to props
const mapStateToProps = (state) => ({labels: state.labels});
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(unionActions, dispatch)});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
