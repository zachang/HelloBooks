import React from 'react';
import PropTypes from 'react-proptypes';
import jwt_decode from 'jwt-decode';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { viewUserReturnAction } from '../actions/bookAction';
import UserHeader from './common/UserHeader';
import UserSidebar from './common/UserSidebar';
import Paginate from './common/Paginate';
import UserReturn from './return/UserReturn.jsx';

export class Returned extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      books: []
    };
  }

  componentWillMount() {
    const userDetails = jwt_decode(window.sessionStorage.token);
    this.props.viewUserReturnAction(userDetails.id);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.bookState.success === false){
      this.setState({ errors: nextProps.bookState.errors });
    }
  }


  render() {
    return (
          <div className='row'>
            <div className='section'>
              <h4 style={{marginTop: '7%'}}>Returned Books</h4>
            </div>
            <div className='divider' style={{marginTop: '-2%', marginBottom: '3%'}}></div>

            <div className='row'>
              { (this.props.bookState.returnings) ? this.props.bookState.returnings.map((returning, i) =>
                <UserReturn
                  key={i}
                  returning={ returning }
                />
              ): null }

            </div>

            <Paginate/>
          </div>
    );
  }
}

Returned.propTypes = {
  bookState: PropTypes.object.isRequired,
  viewUserReturnAction: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  bookState: state.bookReducer,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ viewUserReturnAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Returned);