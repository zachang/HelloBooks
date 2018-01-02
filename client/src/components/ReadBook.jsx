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
 * @class ReadBook
 * @extends {React.Component}
 */
class ReadBook extends Component {
  /**
   * @return {void}
   */
  componentWillMount() {
    this.props.getOneBookAction(this.props.params.id);
  }

  /**
   * Renders ReadBook component
   * @return {XML} JSX
   */
  render() {
    const { book } = this.props;

    return (
      <div>
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
  book: state.bookReducer.book
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getOneBookAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReadBook);