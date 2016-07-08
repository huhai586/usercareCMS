/**
 * Created by haihu on 2016/5/11.
 */
import React from 'react';
import {FETCH_TYPE,SOURCE_OPTION} from '../../constants/placeholder';
import style from "./style.less"
import classnames from 'classnames';
export default React.createClass({
    storeKeyWord:function(e){
        console.log("搜索值",e)
        this.props.actions.storeKeyWord(e.target.value)
    },
    render(){
        let {actions}=this.props;
        return(
          <div className={classnames(style.querySelect,"fixWidth")}>
              <div className="input-group">
                  <input type="text" className="form-control" placeholder={this.props.placeholder} onBlur={this.storeKeyWord} />
                  <span className="input-group-addon">
                      <span className={classnames("glyphicon","glyphicon-search")}  aria-hidden="true"></span>
                  </span>

              </div>
          </div>
        )
    }

})