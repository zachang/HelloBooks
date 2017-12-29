import React from 'react';
import classnames from 'classnames';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AdminHeader from './common/AdminHeader.jsx';
import AdminSidebar from './common/AdminSidebar.jsx';
import { addCategoryAction } from '../actions/categoryAction';


export class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryData: {
        categoryName: '',
      },
      errors: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.categoryState.errors });
  }

  handleChange(e) {
    const categoryData = this.state.categoryData;
    categoryData[e.target.name] = e.target.value;
    this.setState({ categoryData })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addCategoryAction(this.state.categoryData);
  }

  render() {
    const { categoryData } = this.state;

    return (
        <div>
          <div className='row'>
            <div className='col s10 m8 l6 bookcat' style={{ marginLeft: '35%', marginTop: '20%' }}>

              <div className='row'>
                <form className='col s10' onSubmit={this.handleSubmit}>
                  <div className='row'>
                    <div className='input-field col s12'>
                      <input
                        id='categoryName'
                        name='categoryName'
                        type='text'
                        className={ classnames({
                          'invalid': (this.state.errors && !!this.state.errors['categoryName'])? !!this.state.errors['categoryName'] : false
                        }) }
                        value={categoryData.categoryName}
                        onChange={ this.handleChange }
                      />
                      <label
                        htmlFor='category'
                        className={(this.state.errors && !!this.state.errors['categoryName'] || categoryData.categoryName.length > 0) ?
                          'custom-active custom-validate' : 'custom-validate'}
                        data-error={(this.state.errors && !!this.state.errors['categoryName']) ? this.state.errors['categoryName'] : ''}
                      >
                        Category
                      </label>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col m12 s12'>
                      <button
                        className='col s12 btn btn-large waves-effect waves-light'
                        type='submit'
                        name='action'> Add Category
                      </button>

                      <div style={{ color: 'red', float: 'right' }}>{this.props.categoryState.fails}</div>
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>

    );
  }
}

AddCategory.propTypes = {
  categoryState: PropTypes.object.isRequired,
  addCategoryAction: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  categoryState: state.categoryReducer,
  tokenState: state.tokenReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ addCategoryAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);