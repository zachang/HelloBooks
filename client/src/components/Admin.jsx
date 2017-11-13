import React from 'react';
import PropTypes from 'react-proptypes';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getBookAction, deleteBookAction } from '../actions/bookAction';
import AdminHeader from './common/AdminHeader.jsx';
import AdminSidebar from './common/AdminSidebar.jsx';
import BookCard from './book/BookCard.jsx';
import Paginate from './common/Paginate.jsx';
import { getCategoryAction } from '../actions/categoryAction';


export class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: '',
      categories: [],
      category_id: ''
    };
    this.bookCategoryChange = this.bookCategoryChange.bind(this);
  }

  componentWillMount() {
    this.props.getBookAction();
    this.props.getCategoryAction();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bookState.success === false) {
      this.setState({ errors: nextProps.bookState.errors });
    }
    if (this.state.categories !== nextProps.categoryState.categories) {
      this.setState({ categories: nextProps.categoryState.categories });
    }
  }

  componentDidUpdate() {
    $(ReactDOM.findDOMNode(this.refs.category_id)).on('change', this.bookCategoryChange.bind(this));
  }


  bookCategoryChange(event) {
    this.setState({ category_id: event.target.value });
    this.props.getBookAction(event.target.value);
  }


  render() {
    return (
      <div className='row'>
        <AdminHeader/>
        <AdminSidebar/>

        <div className='container mainCon' style={{ marginLeft: '5%'}}>
          <div className='row'>
            <div className='section'>
              <h4 style={{ marginTop: '7%' }}>All Books</h4>
            </div>
            <div className='divider' style={{ marginTop: '-2%', marginBottom: '3%' }}></div>

            <div className='row'>
              <div className='input-field col s6 l4  m4'>
                <select
                  name = 'category_id'
                  value = {this.state.category_id}
                  ref = 'category_id'
                  onChange= {this.bookCategoryChange}
                >
                  <option value='' disabled>Select Category</option>
                  { this.state.categories.map((category, i) =>
                    <option key={i} value={category.id}>{category.category_name}</option>
                  )}
                </select>
              </div>
            </div>

            <div className='row'>
              { this.props.bookState.books.map((book, i) =>
                <BookCard
                  key={i}
                  book={book}
                  deleteBookAction={this.props.deleteBookAction}
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


Admin.propTypes = {
  bookState: PropTypes.object.isRequired,
  getBookAction: PropTypes.func.isRequired,
  getCategoryAction: PropTypes.func.isRequired,
  deleteBookAction: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  bookState: state.bookReducer,
  categoryState: state.categoryReducer,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getBookAction, getCategoryAction, deleteBookAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Admin);