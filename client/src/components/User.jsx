import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getBookAction, borrowBookAction } from '../actions/bookAction';
import UserHeader from './common/UserHeader.jsx';
import UserSidebar from './common/UserSidebar.jsx';
import Paginate from './common/Paginate.jsx';
import BookCardUser from './book/BookCardUser.jsx';
import { decodeToken } from '../utils/helpers';

export class Userdashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      books: []
    };
    this.borrowBook = this.borrowBook.bind(this);
  }

  componentWillMount() {
    this.props.getBookAction();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.bookState.success === false){
      this.setState({ errors: nextProps.bookState.errors });
    }
  }

  borrowBook(token, bookId){
    const userId = decodeToken(token).id;
    this.props.borrowBookAction(userId, bookId);
  }

  render() {
    return (
      <div className="row">
        <UserHeader/>
        <UserSidebar/>
        <div className="container mainCon" style={{marginLeft: '5%'}}>
          <div className="row">
            <div className="section">
              <h4 style={{ marginTop: '7%' }}>All Books</h4>
            </div>
            <div className="divider" style={{ marginTop: '-2%', marginBottom: '3%' }}></div>

            <div className="row">

              { this.props.bookState.books.map((book, i) =>
                <BookCardUser
                  key={i}
                  book={ book }
                  borrowBook = { this.borrowBook }
                />
              )}

            </div>

            <Paginate/>

          </div>
        </div>
      </div>

    );
  }
}

Userdashboard.propTypes = {
  bookState: PropTypes.object.isRequired,
  getBookAction: PropTypes.func.isRequired,
  borrowBookAction: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  bookState: state.bookReducer,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getBookAction, borrowBookAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Userdashboard);