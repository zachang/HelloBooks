import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateBookAction, getOneBookAction } from '../actions/bookAction';
import { getCategoryAction } from '../actions/categoryAction';

/**
 * UpdateBook class declaration
 *
 * @class UpdateBook
 *
 * @extends {React.Component}
 */
export class UpdateBook extends React.Component {
  /**
   * class constructor
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      bookData: {
        bookName: '',
        author: '',
        bookCount: '',
        categoryId: '',
        publishYear: '',
        isbn: '',
        pages: '',
        description: '',
        isAvailable: '',
        bookImage: '',
        bookImage_text: '',
        bookContent: '',
        bookContent_text: ''
      },
      errors: null,
      categories: [],
      showToast: false,
      imagePreviewUrl: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  /**
   * @method componentWillMount
   *
   * @return {void} void
   */
  componentWillMount() {
    this.props.getCategoryAction();
    this.props.getOneBookAction(this.props.params.id);
  }

  /**
   * @method componentWillReceiveProps
   *
   * @param {object} nextProps - nextProps
   *
   * @return {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.bookState.success === true) {
      if (this.state.showToast) {
        Materialize.toast('Book updated!', 4000);
        this.setState({
          showToast: false
        });
      }
      this.setState({
        bookData: nextProps.bookState.book
      });
    } else if (nextProps.bookState.errors === 'Error updating books') {
      if (this.state.showToast) {
        Materialize.toast('Book not updated!', 4000);
        this.setState({ showToast: false });
      }
      this.setState({
        errors: nextProps.bookState.errors
      });
    } else if (!nextProps.bookState.success &&
      nextProps.bookState.errors !== 'Error updating books') {
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
   *
   * @return {void} void
   */
  componentDidUpdate() {
    $('select').material_select();
    $('.datepicker').pickadate();
    $(ReactDOM.findDOMNode(this.refs.categoryId)).on('change',
      this.handleChange.bind(this));
    $(ReactDOM.findDOMNode(this.refs.publishYear)).on('change',
      this.handleChange.bind(this));
  }


  /**
   * Handles pdf book file input
   *
   * @method handleFileChange
   *
   * @return {void} void
   *
   * @param {object} event
   */
  handleFileChange(event) {
    const bookData = this.state.bookData;
    bookData.bookContent_text = event.target.value;
    bookData.bookContent = event.target.files[0];
    this.setState({ bookData });
  }

  /**
   * Handles book Image file input
   *
   * @method handleImageChange
   *
   * @return {void} void
   *
   * @param {object} event - event
   */
  handleImageChange(event) {
    const reader = new FileReader();
    const bookData = this.state.bookData;
    const file = event.target.files[0];
    bookData.bookImage = file;
    bookData.bookImage_text = file.name;

    reader.onloadend = () => {
      this.setState({
        bookData,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(bookData.bookImage);
  }

  /**
   * Handles book update input
   *
   * @method handleChange
   *
   * @return {void} void
   *
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
   * Handles book form update
   *
   * @method handleSubmit
   *
   * @return {void}
   *
   * @param {object} event - event
   */
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      showToast: true,
      imagePreviewUrl: ''
    });
    this.props.updateBookAction(this.state.bookData, this.props.params.id);
  }

  /**
   * Renders UpdateBook component
   *
   * @return {XML} JSX
   */
  render() {
    const { bookData, imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img
        src={imagePreviewUrl}
        style={{
          width: '100%',
          height: '100%'
        }}/>);
    }

    return (
      <div>
        {bookData && <div>
          <div className='row'>
            <div className='col s10 m8 l6 bookadd'
              style={{
                marginLeft: '35%',
                marginTop: '4%'
              }}>

              <div className='row'>
                <form className='col s10' onSubmit={this.handleSubmit}>
                  <div className='row'>
                    <div className='input-field col s10'>
                      <input
                        id='bookName'
                        name='bookName'
                        type='text'
                        className={classnames({
                          invalid: (this.state.errors &&
                            !!this.state.errors.bookName) ?
                            !!this.state.errors.bookName : false
                        })}
                        value={bookData.bookName || ''}
                        onChange={this.handleChange}
                      />
                      <label
                        htmlFor='bookName'
                        className={((this.state.errors &&
                          !!this.state.errors.bookName)
                          || bookData.bookName.length > 0)
                          ? 'custom-active custom-validate' : 'custom-validate'}
                        data-error={(this.state.errors &&
                          !!this.state.errors.bookName) ?
                          this.state.errors.bookName : ''}
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
                          invalid: (this.state.errors &&
                            !!this.state.errors.author) ?
                            !!this.state.errors.author : false
                        })}
                        value={bookData.author}
                        onChange={this.handleChange}
                      />
                      <label
                        htmlFor='author'
                        className={((this.state.errors &&
                          !!this.state.errors.author)
                          || bookData.author.length > 0) ?
                          'custom-active custom-validate' : 'custom-validate'}
                        data-error={(this.state.errors &&
                          !!this.state.errors.author) ?
                          this.state.errors.author : ''}
                      >
                        Author
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='input-field col s10'>
                      <input
                        id='publishYear'
                        name='publishYear'
                        ref='publishYear'
                        type='text'
                        className={classnames('datepicker', {
                          invalid: (this.state.errors &&
                            !!this.state.errors.publishYear) ?
                            !!this.state.errors.publishYear : false
                        })}
                        value={new Date(bookData.publishYear).getFullYear()}
                      />
                      <label
                        htmlFor='publishYear'
                        className={((this.state.errors &&
                          !!this.state.errors.publishYear)
                          || bookData.publishYear.length > 0) ?
                          'custom-active custom-validate' : 'custom-validate'}
                        data-error={(this.state.errors &&
                          !!this.state.errors.publishYear) ?
                          this.state.errors.publishYear : ''}
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
                          invalid: (this.state.errors &&
                            !!this.state.errors.isbn) ?
                            !!this.state.errors.isbn : false
                        })}
                        value={bookData.isbn}
                        onChange={this.handleChange}
                      />
                      <label
                        htmlFor='isbn'
                        className={((this.state.errors &&
                          !!this.state.errors.isbn)
                          || bookData.isbn.length > 0) ?
                          'custom-active custom-validate' : 'custom-validate'}
                        data-error={(this.state.errors &&
                          !!this.state.errors.isbn) ?
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
                          invalid: (this.state.errors &&
                            !!this.state.errors.pages) ?
                            !!this.state.errors.pages : false
                        })}
                        value={bookData.pages}
                        onChange={this.handleChange}
                      />
                      <label
                        htmlFor='pages'
                        className={((this.state.errors &&
                          !!this.state.errors.pages)
                          || bookData.pages.toString().length > 0) ?
                          'custom-active custom-validate' : 'custom-validate'}
                        data-error={(this.state.errors &&
                          !!this.state.errors.pages) ?
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
                        value={bookData.description}
                        className={classnames('materialize-textarea', {
                          invalid: (this.state.errors &&
                            !!this.state.errors.description) ?
                            !!this.state.errors.description : false
                        })}
                      >{ bookData.description }</textarea>
                      <label
                        htmlFor='description'
                        className={((this.state.errors &&
                          !!this.state.errors.description)
                          || bookData.description.length > 0) ?
                          'custom-active custom-validate' : 'custom-validate'}
                        data-error={(this.state.errors &&
                          !!this.state.errors.description) ?
                          this.state.errors.description : ''}
                      >
                        Description
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='input-field col s10'>
                      <select
                        id='categoryId'
                        name='categoryId'
                        ref='categoryId'
                        value={bookData.categoryId}
                        className={classnames({
                          invalid: (this.state.errors &&
                            !!this.state.errors.categoryId) ?
                            !!this.state.errors.categoryId : false
                        })}
                      >
                        <option value='' disabled>Select</option>
                        {this.state.categories.map((category, i) =>
                          <option key={i} value={category.id}>
                            { category.categoryName }
                          </option>
                        )}
                      </select>
                      <label
                        htmlFor='categoryId'
                        className={((this.state.errors &&
                          !!this.state.errors.categoryId)
                          || bookData.categoryId.length > 0) ?
                          'custom-active custom-validate' : 'custom-validate'}
                        data-error={(this.state.errors &&
                          !!this.state.errors.categoryId) ?
                          this.state.errors.categoryId : ''}
                      >
                        Choose Category
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='input-field col s10'>
                      <input
                        id='bookCount'
                        name='bookCount'
                        type='number'
                        className={classnames({
                          invalid: (this.state.errors &&
                            !!this.state.errors.bookCount) ?
                            !!this.state.errors.bookCount : false
                        })}
                        value={bookData.bookCount}
                        onChange={this.handleChange}
                      />
                      <label
                        htmlFor='bookCount'
                        className={((this.state.errors &&
                          !!this.state.errors.bookCount)
                          || bookData.bookCount.toString().length > 0) ?
                          'custom-active custom-validate' : 'custom-validate'}
                        data-error={(this.state.errors &&
                          !!this.state.errors.bookCount) ?
                          this.state.errors.bookCount : ''}
                      >
                        Add Count
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='input-field col s10'>
                      <input
                        id='isAvailable'
                        name='isAvailable'
                        type='text'
                        className={classnames({
                          invalid: (this.state.errors &&
                            !!this.state.errors.isAvailable) ?
                            !!this.state.errors.isAvailable : false
                        })}
                        value={bookData.isAvailable}
                        onChange={this.handleChange}
                      />
                      <label
                        htmlFor='isbn'
                        className={((this.state.errors &&
                          !!this.state.errors.isAvailable)
                          || bookData.isbn.length > 0) ?
                          'custom-active custom-validate' : 'custom-validate'}
                        data-error={(this.state.errors &&
                          !!this.state.errors.isAvailable) ?
                          this.state.errors.isAvailable : ''}
                      >
                        Is_Available
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='file-field input-field col s10'>
                      <div className='btn'>
                        <span>Add Image</span>
                        <input type='file'
                          id='bookImage'
                          name='bookImage'
                          accept='image/*'
                          onChange={this.handleImageChange}
                        />
                      </div>
                      <div className='file-path-wrapper'>
                        <input
                          type='text'
                          name='bookImage_txt'
                          className={classnames('file-path', {
                            invalid: (this.state.errors &&
                              !!this.state.errors.bookImage_text) ?
                              !!this.state.errors.bookImage_text : false
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
                          id='bookContent'
                          name='bookContent'
                          value={bookData.bookContent_text}
                          onChange={this.handleFileChange}
                        />
                      </div>
                      <div className='file-path-wrapper'>
                        <input
                          type='text'
                          name='book_file_text'
                          className={classnames('file-path', {
                            invalid: (this.state.errors &&
                              !!this.state.errors.bookContent_text) ?
                              !!this.state.errors.bookContent_text : false
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
                    Update Book
                  </button>

                </form>
              </div>
            </div>
          </div>
          <div className='row imagePreview'>
            {$imagePreview}
          </div>
        </div>}
      </div>

    );
  }
}

UpdateBook.propTypes = {
  bookState: PropTypes.object.isRequired,
  categoryState: PropTypes.object.isRequired,
  updateBookAction: PropTypes.func.isRequired,
  getCategoryAction: PropTypes.func.isRequired,
  getOneBookAction: PropTypes.func.isRequired,
  params: PropTypes.object
};
const mapStateToProps = state => ({
  bookState: state.bookReducer,
  categoryState: state.categoryReducer,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    updateBookAction,
    getCategoryAction,
    getOneBookAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBook);