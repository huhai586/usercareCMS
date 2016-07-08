import React from 'react';
import { Pagination } from 'react-bootstrap';

export default React.createClass({
  getInitialState(){
    return {activePage:1}
  },



  handleSelect(eventKey) {
    
    this.setState({activePage:eventKey})
    // var requestPage=parseInt(eventKey.target.innerText);
    this.props.query(eventKey);
  },
  componentWillReceiveProps(nextProps){

    if(nextProps.pageNo!=this.state.activePage&&nextProps.pageNo){
      this.setState({activePage:nextProps.pageNo})
    }
  },
  render(){
    let{pageNo,totalPage}=this.props;
    return (
        <Pagination
            bsSize="small"
            prev="prev"
            next="next"
            first="first"
            last="last"
            ellipsis
            boundaryLinks
            items={totalPage}
            maxButtons={4}
            activePage={this.state.activePage}
            onSelect={this.handleSelect} />
    );
  }
});