import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { viewUserBorrowAction, returnBookAction } from '../actions/bookAction';
import UserHeader from './common/UserHeader';
import UserSidebar from './common/UserSidebar';
import Paginate from './common/Paginate-UserBorrow';
import UserBorrow from './borrow/UserBorrow.jsx';
import { decodeToken } from '../utils/helpers';


export class Borrowed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      books: []
    };
    this.returnBook = this.returnBook.bind(this);
  }

  componentWillMount() {
    const userDetails = decodeToken(window.sessionStorage.token);
    this.props.viewUserBorrowAction(userDetails.id);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.bookState.success === false){
      this.setState({ errors: nextProps.bookState.errors });
    }
  }


  returnBook(bookId){
    const userDetails = decodeToken(window.sessionStorage.token);
    this.props.returnBookAction(userDetails.id, bookId);
  }


  render() {
    return (
      <div className="row">
        <UserHeader/>
        <UserSidebar/>
        <div className="container mainCon" style={{ marginLeft: '5%' }}>
          <div className="row">
            <div className="section">
              <h4 style={{ marginTop: '7%' }}>Borrowed Books</h4>
            </div>
            <div className="divider" style={{ marginTop: '-2%', marginBottom: '3%' }}></div>

            <div className="row">
              { (this.props.bookState.borrows) ? this.props.bookState.borrows.map((borrow, i) =>
                <UserBorrow
                  key={i}
                  borrow={ borrow }
                  returnBook ={ this.returnBook }
                />
              ): null }

            </div>

            <Paginate/>
          </div>
        </div>
      </div>

    );
  }
}

Borrowed.propTypes = {
  bookState: PropTypes.object.isRequired,
  viewUserBorrowAction: PropTypes.func.isRequired,
  returnBookAction: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  bookState: state.bookReducer,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ viewUserBorrowAction, returnBookAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Borrowed);