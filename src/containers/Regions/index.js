import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import * as regionsActions from '../../actions/regions';
import style from './style.less';
import { Modal } from 'antd';
import  RegionEditModal  from '../../components/Regions/modal';


let unionActions = Object.assign({}, regionsActions);

var Dashboard = React.createClass({
    getInitialState(){
        return {modalShow:false,curIndex:0}

    },
    componentWillUpdate(nextPros){


    },
    componentDidMount() {
        //请求select数据
  
        this.props.actions.getRegionsList();

    },
    queryNews: function (requestPage) {},

    openModal(){
        this.setState({articleModalShow:true})
    },
    closeModal(){
        this.setState({articleModalShow:false},()=>{
            // this.queryNews();
        })
    },
    deleteRegions(id){

        var _this=this;
        layer.msg('Are you sure want to delete ？', {
            time: 0 //不自动关闭
            ,btn: ['Yes', 'No']
            ,yes: function(index){
                layer.close(index)
                _this.props.actions.deleteRegion({regionId:id}).then((res)=>{
                    if(!res.error){
                        _this.props.actions.getRegionsList();
                    }
                });
            }
        });
    },
    newRegion(){
        var _this=this;
        var index=layer.prompt(function(val){
            
            console.log(val)
            var trimVal=val.trim();
            _this.props.actions.addRegion({regionName:trimVal}).then((res)=>{
                if(!res.error){
                    _this.props.actions.getRegionsList();
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
            debugger
            this.props.actions.getRegionsList();
        })
    },
    render() {
        let {regionsAndM} = this.props, rows = [];
        let regionsList=regionsAndM.regionsData.items;

        if (regionsList&&regionsList.length!=0) {
            rows = regionsList.map((obj, index)=> {
                // obj.offlineFlag=obj.offlineFlag==0?1:0;


                return (

                    <tr key={index}>

                        <td><span className={style.regionName} onClick={this.showEdit.bind(this,index)}>{obj.regionName}</span></td>
                        <td className={style.countryList}>

                            {
                                obj.countryList.map((curCountry,index)=>{
                                    return(
                                        <span key={index}>
                                            {curCountry.countryName}
                                        </span>
                                    )
                                })
                            }

                        </td>
                        <td className="upAndDown">

                            {
                                obj.adminList.map((curAdmin,index)=>{
                                    return(
                                        <span key={index}>
                                            {curAdmin.email}
                                        </span>
                                    )
                                })
                            }

                        </td>
                        <td className="operate">
                            <Button onClick={this.deleteRegions.bind(this,obj.id)}>delete</Button>
                            <Button onClick={this.showEdit.bind(this,index)} >Edit</Button>

                        </td>
                    </tr>
                )
            })
        }
        if (rows.length == 0) {
            rows = <tr><td colSpan='4'>no Data</td></tr>

        }

        return (
                <div>
                    <RegionEditModal closeModal={this.closeModal} show={this.state.modalShow} item={regionsList?regionsList[this.state.curIndex]:[]} actions={this.props.actions} ></RegionEditModal>
                    <div className={style.addNewButton}>
                        <Button bsStyle="success" onClick={this.newRegion}>Create New</Button>
                    </div>

                    <table className="table table-bordered table-hover table-fix">
                        <thead>
                        <tr>
                            <th>Region</th>
                            <th>Country</th>
                            <th>Administrator</th>
                            <th>Management</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>

                </div>

   

        );
    }
});

// connect action to props
const mapStateToProps = (state) => ({regionsAndM: state.regions, config: state.config});
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(unionActions, dispatch)});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
