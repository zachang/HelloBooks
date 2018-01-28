import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';
import { viewUserReturnAction } from '../actions/bookAction';
import UserReturn from './return/UserReturn.jsx';
import { decodeToken } from '../utils/helpers';

/**
 * Returned class declaration
 * @class Returned
 * @extends {React.Component}
 */
export class Returned extends React.Component {
  /**
   * class constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      books: [],
      pageCount: null,
      limit: 15,
    };
  }

  /**
   * @method componentWillMount
   * @return {void} void
   */
  componentWillMount() {
    const userDetails = decodeToken(window.sessionStorage.getItem('token'));
    this.props.viewUserReturnAction(userDetails.id, this.state.limit, 0);
  }

  /**
   * @method componentWillReceiveProps
   * @param {object} nextProps - nextProps
   * @return {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.bookState.success === false) {
      this.setState({ errors: nextProps.bookState.errors });
    }
    if (this.state.pageCount !== nextProps.bookState.pageCount) {
      this.setState({ pageCount: nextProps.bookState.pageCount });
    }
  }

  /**
   * Renders Returned component
   * @return {XML} JSX
   */
  render() {
    const userId = decodeToken(window.sessionStorage.getItem('token'));
    return (
      <div className='row'>
        <div className='section'>
          <h4 style={{ marginTop: '7%' }}>Returned Books</h4>
        </div>
        <div className='divider'
          style={{ marginTop: '-2%', marginBottom: '3%' }}
        >
        </div>

        <div className='row'>
          { (this.props.bookState.returnings) ?
            this.props.bookState.returnings.map((returning, i) =>
              <UserReturn
                key={i}
                returning={returning}
              />) : null }
        </div>

        <div className='row'>
          {
            ((this.state.pageCount) ?
              <Pagination
                items={this.state.pageCount}
                onSelect={(page) => {
                  const offset = (page - 1) * this.state.limit;
                  this.props.viewUserReturnAction(userId.id, this.state.limit,
                    offset);
                }} /> : '')
          }
        </div>
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