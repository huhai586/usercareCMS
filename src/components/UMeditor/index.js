import React from 'react';
import {Button} from 'react-bootstrap';
import style from './style.less'
export default React.createClass({
  getInitialState(){
    return{
      images:[],
      articleClone:""
    }
  },
  componentDidMount(){
    this.um = UM.getEditor("containerNew");
  },

//   componentWillUpdate(nextProps){
//
//     if(this.props.parentShow==false && nextProps.parentShow==true){
//       this.um = UM.getEditor("containerNew");
//     }
//     if(this.props.parentShow==true && nextProps.parentShow==false){
//       this.um.destroy();
//     }
// },


  shouldComponentUpdate(nextProps){
    if(this.props.parentShow==false && nextProps.parentShow==true){
      this.um = UM.getEditor("containerNew");
      return true;
    }else if(this.props.parentShow==true && nextProps.parentShow==false){
      this.um && this.um.destroy();
      this.um = null;
      return false;
    }
    return true;

  },

  getContent(){
    return this.um.getContent();
    
  },


  render() {
    

    return(
        <div>
          <div className="article_solo_content"  id="containerNew" >
          </div>
          
 
        </div>
    )
  }
});