import React from 'react';
import PropTypes from 'react-proptypes';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';
import { getBookAction, borrowBookAction } from '../actions/bookAction';
import UserHeader from './common/UserHeader.jsx';
import UserSidebar from './common/UserSidebar.jsx';
import BookCardUser from './book/BookCardUser.jsx';
import { decodeToken } from '../utils/helpers';
import { getCategoryAction } from '../actions/categoryAction';

export class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      categories: [],
      category_id: '',
      pageCount: null,
      limit:3
    };
    this.borrowBook = this.borrowBook.bind(this);
    this.bookCategoryChange = this.bookCategoryChange.bind(this);
  }

  componentWillMount() {
    this.props.getBookAction(this.state.limit, 0, this.state.category_id);
    this.props.getCategoryAction();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.bookState.success === false){
      this.setState({ errors: nextProps.bookState.errors });
    }
    if (this.state.categories !== nextProps.categoryState.categories ) {
      this.setState({ categories: nextProps.categoryState.categories });
    }
    if (this.state.pageCount !== nextProps.bookState.pageCount ) {
      this.setState({ pageCount: nextProps.bookState.pageCount });
    }
  }

  componentDidUpdate() {
    $('select').material_select();
    $(ReactDOM.findDOMNode(this.refs.category_id)).on('change', this.bookCategoryChange.bind(this));
  }

  bookCategoryChange(event) {
    this.setState({ category_id: event.target.value });
    this.props.getBookAction(this.state.limit, 0, event.target.value);
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

            <div className='row'>
              <div className='input-field col s6 l4  m4'>
                <select
                  name = 'category_id'
                  value = {this.state.category_id}
                  ref = 'category_id'
                  onChange= {this.bookCategoryChange}
                >
                  <option value=''>Select Category</option>
                  { this.state.categories.map((category, i) =>
                    <option key={i} value={category.id}>{category.category_name}</option>
                  )}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="row">
                { this.props.bookState.books.map((book, i) =>
                  <BookCardUser
                    key={i}
                    book={ book }
                    borrowBook = { this.borrowBook }
                  />
                )}
              </div>

              <div className="row">
                {
                  ((this.state.pageCount) ?
                    <Pagination
                      items={this.state.pageCount}
                      onSelect={(page) => {
                        const offset = (page - 1) * this.state.limit;
                        this.props.getBookAction(this.state.limit, offset, this.state.category_id);
                      }
                      } /> : '')
                }
              </div>

            </div>

          </div>
        </div>
      </div>

    );
  }
}

User.propTypes = {
  bookState: PropTypes.object.isRequired,
  getBookAction: PropTypes.func.isRequired,
  getCategoryAction: PropTypes.func.isRequired,
  borrowBookAction: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  bookState: state.bookReducer,
  categoryState: state.categoryReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getBookAction, getCategoryAction, borrowBookAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(User);