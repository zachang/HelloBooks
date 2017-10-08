import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { tokenValidate } from '../utils/helpers';
import { getBookAction } from '../actions/bookAction';
import AdminHeader from './common/AdminHeader.jsx';
import AdminSidebar from './common/AdminSidebar.jsx';
import BookCard from './book/BookCard.jsx';
import Paginate from './common/Paginate.jsx';

export class Admindashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      books: []
    };
  }

  componentWillMount() {
    this.props.getBookAction();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tokenState.message != null) {
      tokenValidate(nextProps.tokenState.type);
    } else {
      this.setState({ errors: nextProps.bookState.errors });
    }
  }


  render() {
    return (
      <div className="row">
        <AdminHeader/>
        <AdminSidebar/>

        <div className="container mainCon" style={{ marginLeft: '5%'}}>
          <div className="row">
            <div className="section">
              <h4 style={{ marginTop: '7%' }}>All Books</h4>
            </div>
            <div className="divider" style={{ marginTop: '-2%', marginBottom: '3%' }}></div>

            <div className="row">
              { this.props.bookState.books.map((book, i) =>
                <BookCard
                  key={i}
                  book={ book }
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


Admindashboard.propTypes = {
  bookState: PropTypes.object.isRequired,
  tokenState: PropTypes.object.isRequired,
  getBookAction: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  bookState: state.bookReducer,
  tokenState: state.tokenReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getBookAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Admindashboard);