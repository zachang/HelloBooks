import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AdminHeader from './common/AdminHeader.jsx';
import AdminSidebar from './common/AdminSidebar.jsx';
import { addBookAction } from '../actions/bookAction';
import { getCategoryAction } from '../actions/categoryAction';

/**
 * AddBook class declaration
 * @class AddBook
 * @extends {React.Component}
 */
export class AddBook extends React.Component {
  /**
   * class constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      bookData: {
        book_name: '',
        author: '',
        book_count: '',
        category_id: '',
        publish_year: '',
        isbn: '',
        pages: '',
        description: '',
        book_image: '',
        book_image_text: '',
        book_content: '',
        book_content_text: ''
      },
      imagePreviewUrl: '',
      errors: null,
      categories: [],
      showToast: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  /**
   * @method componentWillMount
   * @return {void} void
   */
  componentWillMount() {
    this.props.getCategoryAction();
  }

  /**
   * @method componentDidMount
   * @return {void} void
   */
  componentDidMount() {
    $('select').material_select();
    $('.datepicker').pickadate();
    $(ReactDOM.findDOMNode(this.refs.category_id)).on('change', this.handleChange.bind(this));
    $(ReactDOM.findDOMNode(this.refs.publish_year)).on('change', this.handleChange.bind(this));
  }

  /**
   * @method componentWillReceiveProps
   * @param {object} nextProps - nextProps
   * @return {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.bookState.success === true) {
      this.setState({
        imagePreviewUrl: ''
      });
      if (this.state.showToast) {
        Materialize.toast('Book Created!', 4000);
        this.setState({ showToast: false });
      }
    } else if (nextProps.bookState.errors === 'Book not created') {
      if (this.state.showToast) {
        Materialize.toast('Book not Created!', 4000);
        this.setState({ showToast: false });
      }
      this.setState({ errors: nextProps.bookState.errors });
    } else if (!nextProps.bookState.success && nextProps.bookState.errors !== 'Book not created') {
      if (this.state.showToast) {
        Materialize.toast('Fill the form properly!', 4000);
        this.setState({ showToast: false });
      }
      this.setState({
        errors: nextProps.bookState.errors
      });
    }
    this.setState({ categories: nextProps.categoryState.categories });
  }

  /**
   * @method componentDidUpdate
   * @return {void} void
   */
  componentDidUpdate() {
    $('select').material_select();
    $('.datepicker').pickadate();
    $(ReactDOM.findDOMNode(this.refs.category_id)).on('change', this.handleChange.bind(this));
    $(ReactDOM.findDOMNode(this.refs.publish_year)).on('change', this.handleChange.bind(this));
  }

  /**
   * Handles pdf book file input
   * @method handleFileChange
   * @return {void} void
   * @param {object} event
   */
  handleFileChange(event) {
    const bookData = this.state.bookData;
    bookData.book_content_text = event.target.value;
    bookData.book_content = event.target.files[0];
    this.setState({ bookData });
  }

  /**
   * Handles book Image file input
   * @method handleImageChange
   * @return {void} void
   * @param {object} event - event
   */
  handleImageChange(event) {
    const reader = new FileReader();
    const bookData = this.state.bookData;
    const file = event.target.files[0];
    bookData.book_image = file;
    bookData.book_image_text = file.name;

    reader.onloadend = () => {
      this.setState({
        bookData,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(bookData.book_image);
  }

  /**
   * Handles book input
   * @method handleChange
   * @return {void} void
   * @param {object} event - event
   */
  handleChange(event) {
    const bookData = this.state.bookData;
    bookData[event.target.name] = event.target.value;
    this.setState({
      bookData,
      errors: null
    });
  }

  /**
   * Handles book form submit
   * @method handleSubmit
   * @return {void}
   * @param {object} event - event
   */
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      bookData: {
        book_name: '',
        author: '',
        book_count: '',
        category_id: '',
        publish_year: '',
        isbn: '',
        pages: '',
        description: '',
        book_image: '',
        book_image_text: '',
        book_content: '',
        book_content_text: '',
      },
      showToast: true,
      imagePreviewUrl: ''
    });
    this.props.addBookAction(this.state.bookData);
  }

  /**
   * Renders AddBook component
   * @return {XML} JSX
   */
  render() {
    const { bookData, imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} style={{ width: '100%', height: '100%' }}/>);
    }

    return (
      <div className='row'>
        <AdminHeader/>
        <AdminSidebar/>
        <div className='container mainCon' style={{ marginLeft: '5%' }}>
          <div className='row'>
            <div className='col s10 m8 l6 bookadd' style={{ marginLeft: '35%', marginTop: '4%' }}>

              <div className='row'>
                <form className='col s10' onSubmit={this.handleSubmit}>
                  <div className='row'>
                    <div className='input-field col s10'>
                      <input
                        id='book_name'
                        name='book_name'
                        type='text'
                        className={classnames({
                          invalid: (this.state.errors && !!this.state.errors.book_name) ?
                            !!this.state.errors.book_name : false
                        })}
                        value={bookData.book_name}
                        onChange={this.handleChange}
                      />
                      <label
                        htmlFor='book_name'
                        className={((this.state.errors && !!this.state.errors.book_name) ||
                          bookData.book_name.length > 0) ? 'custom-active custom-validate' : 'custom-validate'}
                        data-error={(this.state.errors && !!this.state.errors.book_name) ?
                          this.state.errors.book_name : ''}
                      >
                        Book Name
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='input-field col s10'>
                      <input
                        id='author'
                        name='author'
                        type='text'
                        className={classnames({
                          invalid: (this.state.errors && !!this.state.errors.author) ?
                            !!this.state.errors.author : false
                        })}
                        value={bookData.author}
                        onChange={this.handleChange}
                      />
                      <label
                        htmlFor='author'
                        className={((this.state.errors && !!this.state.errors.author) ||
                          bookData.author.length > 0) ? 'custom-active custom-validate' : 'custom-validate'}
                        data-error={(this.state.errors && !!this.state.errors.author) ?
                          this.state.errors.author : ''}
                      >
                        Author
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='input-field col s10'>
                      <input
                        id='publish_year'
                        name='publish_year'
                        ref='publish_year'
                        type='text'
                        className={classnames('datepicker', {
                          invalid: (this.state.errors && !!this.state.errors.publish_year) ?
                            !!this.state.errors.publish_year : false
                        })}
                        value={bookData.publish_year}
                      />
                      <label
                        htmlFor='publish_year'
                        className={((this.state.errors && !!this.state.errors.publish_year) ||
                          bookData.publish_year.length > 0) ? 'custom-active custom-validate' : 'custom-validate'}
                        data-error={(this.state.errors && !!this.state.errors.publish_year) ?
                          this.state.errors.publish_year : ''}
                      >
                        Publish Year
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='input-field col s10'>
                      <input
                        id='isbn'
                        name='isbn'
                        type='text'
                        className={classnames({
                          invalid: (this.state.errors && !!this.state.errors.isbn) ?
                            !!this.state.errors.isbn : false
                        })}
                        value={bookData.isbn}
                        onChange={this.handleChange}
                      />
                      <label
                        htmlFor='isbn'
                        className={((this.state.errors && !!this.state.errors.isbn) ||
                          bookData.isbn.length > 0) ? 'custom-active custom-validate' : 'custom-validate'}
                        data-error={(this.state.errors && !!this.state.errors.isbn) ?
                          this.state.errors.isbn : ''}
                      >
                        ISBN
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='input-field col s10'>
                      <input
                        id='pages'
                        name='pages'
                        type='number'
                        className={classnames({
                          invalid: (this.state.errors && !!this.state.errors.pages) ?
                            !!this.state.errors.pages : false
                        })}
                        value={bookData.pages}
                        onChange={this.handleChange}
                      />
                      <label
                        htmlFor='pages'
                        className={((this.state.errors && !!this.state.errors.pages) ||
                          bookData.pages.length > 0) ? 'custom-active custom-validate' : 'custom-validate'}
                        data-error={(this.state.errors && !!this.state.errors.pages) ?
                          this.state.errors.pages : ''}
                      >
                        Pages
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='input-field col s10'>
                      <textarea
                        id='description'
                        name='description'
                        onChange={this.handleChange}
                        className={classnames('materialize-textarea', {
                          invalid: (this.state.errors && !!this.state.errors.description) ?
                            !!this.state.errors.description : false
                        })}
                      >
                        { bookData.description }
                      </textarea>
                      <label
                        htmlFor='description'
                        className={((this.state.errors && !!this.state.errors.description) ||
                          bookData.description.length > 0) ? 'custom-active custom-validate' : 'custom-validate'}
                        data-error={(this.state.errors && !!this.state.errors.description) ?
                          this.state.errors.description : ''}
                      >
                        Description
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='input-field col s10'>
                      <select
                        id='category_id'
                        name='category_id'
                        ref='category_id'
                        value={bookData.category_id}
                        className={classnames({
                          invalid: (this.state.errors && !!this.state.errors.category_id) ?
                            !!this.state.errors.category_id : false
                        })}
                      >
                        <option value=''>Select</option>
                        { this.state.categories.map((category, i) =>
                          <option key={i} value={category.id}>{category.category_name}</option>
                        )}
                      </select>
                      <label
                        htmlFor='category_id'
                        className={((this.state.errors && !!this.state.errors.category_id) ||
                          bookData.category_id.length > 0) ? 'custom-active custom-validate' : 'custom-validate'}
                        data-error={(this.state.errors && !!this.state.errors.category_id) ?
                          this.state.errors.category_id : ''}
                      >
                        Choose Category
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='input-field col s10'>
                      <input
                        id='book_count'
                        name='book_count'
                        type='number'
                        className={classnames({
                          invalid: (this.state.errors && !!this.state.errors.book_count) ?
                            !!this.state.errors.book_count : false
                        })}
                        value={bookData.book_count}
                        onChange={this.handleChange}
                      />
                      <label
                        htmlFor='book_count'
                        className={((this.state.errors && !!this.state.errors.book_count) ||
                          bookData.book_count.length > 0) ? 'custom-active custom-validate' : 'custom-validate'}
                        data-error={(this.state.errors && !!this.state.errors.book_count) ?
                          this.state.errors.book_count : ''}
                      >
                        Add Count
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='file-field input-field col s10'>
                      <div className='btn'>
                        <span>Add Image</span>
                        <input
                          type='file'
                          accept='image/*'
                          id='book_image'
                          name='book_image'
                          onChange={this.handleImageChange}
                        />
                      </div>
                      <div className='file-path-wrapper'>
                        <input
                          type='text'
                          name='book_image_text'
                          className={classnames('file-path', {
                            invalid: (this.state.errors && !!this.state.errors.book_image_text) ?
                              !!this.state.errors.book_image_text : false
                          })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='file-field input-field col s10'>
                      <div className='btn'>
                        <span>Add PDF</span>
                        <input
                          type='file'
                          accept='application/pdf'
                          id='book_content'
                          name='book_content'
                          value={bookData.book_content_text}
                          onChange={this.handleFileChange}
                        />
                      </div>
                      <div className='file-path-wrapper'>
                        <input
                          type='text'
                          name='book_file_text'
                          className={classnames('file-path', {
                            invalid: (this.state.errors && !!this.state.errors.book_content_text) ?
                              !!this.state.errors.book_content_text : false
                          })}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    className='col s10 btn btn-large waves-effect waves-light'
                    type='submit'
                    name='action'
                  >
                    Add Book
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className='row imagePreview'>
            {$imagePreview}
          </div>
        </div>
      </div>

    );
  }
}

AddBook.propTypes = {
  bookState: PropTypes.object.isRequired,
  categoryState: PropTypes.object.isRequired,
  addBookAction: PropTypes.func.isRequired,
  getCategoryAction: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  bookState: state.bookReducer,
  categoryState: state.categoryReducer,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ addBookAction, getCategoryAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);