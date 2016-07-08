import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Nav from '../../components/Nav';
import { Grid } from 'react-bootstrap';
import classnames from 'classnames';
var App = React.createClass({

  render() {

    let {config}=this.props;
    return (
      <div>
        <header>
          <Nav {...this.props}/>
        </header>
        <section>
          <Grid>
            {this.props.children}
          </Grid>
        </section>
        <div  className={classnames('spinner', {"hidden":!config.loading})}>
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
    );
  }
});

// connect action to props
const mapStateToProps = (state) => ({config:state.config});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
