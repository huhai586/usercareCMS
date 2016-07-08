import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import * as modelsActions from '../../actions/models';
import style from './style.less';
import { Modal,Pagination } from 'antd';
import  ProjectEditModal  from '../../components/Models/modal';
import classnames from 'classnames'

let unionActions = Object.assign({}, modelsActions);

var Dashboard = React.createClass({
    getInitialState(){
        return {modalShow:false,curIndex:0,pageNo:1}

    },

    componentDidMount() {
        //请求select数据
  
        this.props.actions.getProjectsList({pageNo:this.state.pageNo});

    },

    queryProject: function () {
        this.props.actions.getProjectsList({pageNo:this.state.pageNo});
    },

    openModal(){
        this.setState({articleModalShow:true})
    },
    closeModal(){
        this.setState({articleModalShow:false},()=>{
            // this.queryNews();
        })
    },
    deleteProject(projectName){

        var _this=this;
        layer.msg('Are you sure want to delete ？', {
            time: 0 //不自动关闭
            ,btn: ['Yes', 'No']
            ,yes: function(index){
                layer.close(index)
                _this.props.actions.deleteProject({projectName:projectName}).then((res)=>{
                    if(!res.error){
                        var k=_this.state.pageNo;
                        if(_this.props.models.projectsList.items.length==1){
                            k--;
                        };

                        _this.props.actions.getProjectsList({pageNo:k});
                    }
                });
            }
        });
    },
    newAdd(){

        var _this=this;
        var index=layer.prompt(function(val){
            
            console.log(val)
            var trimVal=val.trim();
            if(trimVal.length==0){
               return
            }
            _this.props.actions.addProject({projectName:trimVal}).then((res)=>{
                if(!res.error){
                    var k=_this.state.pageNo;
                    if(_this.props.models.projectsList.items.length==10){
                        k++;
                    };

                    _this.props.actions.getProjectsList({pageNo:k});

                    alert("add Success!")
                    layer.close(index)
                }
            })
        });
    },
    showEdit(id){
        //
        // var allItems=this.props.regionsAndM.regionsData.items;
        // var curItem=allItems[index];
        this.setState({curIndex:id,modalShow:true})
    },
    closeModal(){
        this.setState({modalShow:false},()=>{

            this.queryProject();
            
        })
    },
    pageOnChange(num){
        this.setState({pageNo:num},()=>{
            this.queryProject();
        });

    },
    render() {
        let {models} = this.props, rows = [];
        var pageInfo=models.projectsList;
        let projectsList=models.projectsList.items;

        if (projectsList&&projectsList.length!=0) {
            rows = projectsList.map((obj, index)=> {
                // obj.offlineFlag=obj.offlineFlag==0?1:0;


                return (

                    <tr key={index}>

                        <td><span className={style.regionName} onClick={this.showEdit.bind(this,index)}>{obj.projectName}</span></td>
                        <td className={style.countryList}>

                            {
                                obj.modelList.map((curModel,index)=>{
                                    return(
                                        <span key={index}>
                                            {curModel.modelCode}
                                        </span>
                                    )
                                })
                            }

                        </td>

                        <td className="operate">
                            <Button onClick={this.deleteProject.bind(this,obj.projectName)}>delete</Button>
                            <Button onClick={this.showEdit.bind(this,index)} >Edit</Button>

                        </td>
                    </tr>
                )
            })
        }
        if (rows.length == 0) {
            rows = <tr><td colSpan='3'>no Data</td></tr>

        }

        return (
                <div>
                    <ProjectEditModal queryProject={this.queryProject} closeModal={this.closeModal} show={this.state.modalShow} item={projectsList?projectsList[this.state.curIndex]:[]} actions={this.props.actions} ></ProjectEditModal>
                    <div className={style.addNewButton}>
                        <Button bsStyle="success" onClick={this.newAdd}>Create New</Button>
                    </div>

                    <table className="table table-bordered table-hover table-fix">
                        <thead>
                        <tr>
                            <th>Project</th>
                            <th>Model</th>
                            <th>Management</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>

                    <center className={classnames({"hidden":!pageInfo.pageNo})}>
                        <Pagination current={pageInfo.pageNo?pageInfo.pageNo:0} onChange={this.pageOnChange} total={pageInfo.totalCount?pageInfo.totalCount:0} />
                    </center>
                </div>

   

        );
    }
});

// connect action to props
const mapStateToProps = (state) => ({models: state.models});
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(unionActions, dispatch)});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
