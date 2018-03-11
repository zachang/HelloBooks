import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PDFReader from 'react-pdf-reader';
import 'react-pdf-reader/dist/sass/TextLayerBuilder.scss';
import 'react-pdf-reader/dist/sass/PdfReader.scss';
import { getOneBookAction } from '../actions/bookAction';

/**
 * ReadBook class declaration
 *
 * @class ReadBook
 *
 * @extends {React.Component}
 */
class ReadBook extends Component {
  /**
   * class constructor
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      book: null
    };
  }

  /**
   * @method componentWillMount
   *
   * @return {void} void
   */
  componentWillMount() {
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
    if (nextProps.book.success === true) {
      this.setState({
        book: nextProps.book.book
      });
    }
  }

  /**
   * @method componentDidMount
   *
   * @return {void} void
   */
  componentDidMount() {
    $('select').material_select();
    $('.collapsible').collapsible();
    $('.dropdown-button').dropdown();
    $('.button-collapse').sideNav();
  }

  /**
   * Renders ReadBook component
   *
   * @return {XML} JSX
   */
  render() {
    const { book } = this.state;

    return (
      <div className='row col m12 col-sm-2'>
        {(book !== null) && <PDFReader
          file={book.bookContent}
          renderType='canvas'
        />
        }
      </div>
    );
  }
}

ReadBook.propTypes = {
  book: PropTypes.object,
  params: PropTypes.object,
  getOneBookAction: PropTypes.func
};
const mapStateToProps = state => ({
  book: state.bookReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getOneBookAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReadBook);