import React from 'react';
import {Link, IndexLink} from 'react-router';
import classnames from 'classnames';
import PropTypes from 'react-proptypes';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AdminHeader from './common/AdminHeader';
import AdminSidebar from './common/AdminSidebar';
import { tokenValidate } from '../utils/helpers';
import addCategoryAction from '../actions/addCategoryAction.js';


export class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryData: {
        category_name: '',
      },
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const categoryData = this.state.categoryData;
    categoryData[e.target.name] = e.target.value;
    this.setState({categoryData})
  }

  handleSubmit(e) {
    e.preventDefault();
    //console.log(this.state.categoryData);
    this.props.addCategoryAction(this.state.categoryData);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.tokenState.message === null) {
      this.setState({errors: nextProps.addCategoryState.errors});
    }
    else {
      tokenValidate(nextProps.tokenState.type);
    }
  }

  render() {
    const {categoryData} = this.state;

    return (
      <div className="row">
        <AdminHeader/>
        <AdminSidebar/>
        <div className="container mainCon" style={{marginLeft: '5%'}}>
          <div className="row">
            <div className="col s10 m8 l6 bookcat" style={{marginLeft: '35%', marginTop: '20%'}}>

              <div className="row">
                <form className="col s10" onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id='category_name'
                        name='category_name'
                        type='text'
                        className={ classnames({
                          'invalid': (this.state.errors && !!this.state.errors['category_name'])? !!this.state.errors['category_name'] : false
                        }) }
                        value={categoryData.category_name}
                        onChange={ this.handleChange }
                      />
                      <label
                        htmlFor='category'
                        className={(this.state.errors && !!this.state.errors['category_name'] || categoryData.category_name.length > 0) ?
                          'custom-active custom-validate' : 'custom-validate'}
                        data-error={ (this.state.errors && !!this.state.errors['category_name']) ? this.state.errors['category_name'] : '' }
                      >
                        Category
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col m12 s12">
                      <button
                        className='col s12 btn btn-large waves-effect waves-light'
                        type='submit'
                        name='action'> Add Category
                      </button>

                      <div style={{ color:'red', float:'right' }}>{this.props.addCategoryState.fails}</div>
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div>

        </div>
      </div>

    );
  }
}

AddCategory.propTypes = {
  addCategoryState: PropTypes.object.isRequired,
  addCategoryAction: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  addCategoryState: state.addCategoryReducer,
  tokenState: state.tokenReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({addCategoryAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);