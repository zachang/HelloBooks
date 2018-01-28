import React from 'react';
import classnames from 'classnames';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addCategoryAction } from '../actions/categoryAction';

/**
 * AddCategory class declaration
 *
 * @class AddCategory
 *
 * @extends {React.Component}
 */
export class AddCategory extends React.Component {
  /**
   * class constructor
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      categoryData: {
        categoryName: '',
      },
      errors: null,
      showToast: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * @method componentWillReceiveProps
   *
   * @param {object} nextProps - nextProps
   *
   * @return {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.categoryState.success) {
      if (this.state.showToast) {
        Materialize.toast('Category added!', 4000);
        this.setState({
          showToast: false
        });
      }
    } else if (!nextProps.categoryState.success) {
      if (this.state.showToast) {
        Materialize.toast('Category not added!', 4000);
        this.setState({
          showToast: false
        });
      }
      this.setState({
        errors: nextProps.categoryState.errors
      });
    }
  }

  /**
   * Handles category file input
   *
   * @method handleChange
   *
   * @return {void} void
   *
   * @param {object} event
   */
  handleChange(event) {
    const categoryData = this.state.categoryData;
    categoryData[event.target.name] = event.target.value;
    this.setState({ categoryData });
  }

  /**
   * Handles category submit
   *
   * @method handleSubmit
   *
   * @return {void} void
   *
   * @param {object} event
   */
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      categoryData: {
        categoryName: '',
      },
      showToast: true,
      errors: null
    });
    this.props.addCategoryAction(this.state.categoryData);
  }

  /**
   * Renders AddCategory component
   *
   * @return {XML} JSX
   */
  render() {
    const { categoryData } = this.state;

    return (
      <div>
        <div className='row'>
          <div className='col s10 m8 l6 bookcat' style={{
            marginLeft: '35%',
            marginTop: '20%'
          }}>

            <div className='row'>
              <form className='col s10' onSubmit={this.handleSubmit}>
                <div className='row'>
                  <div className='input-field col s12'>
                    <input
                      id='categoryName'
                      name='categoryName'
                      type='text'
                      className={classnames({
                        invalid: (this.state.errors &&
                          !!this.state.errors.categoryName) ?
                          !!this.state.errors.categoryName : false
                      })}
                      value={categoryData.categoryName}
                      onChange={this.handleChange}
                    />
                    <label
                      htmlFor='category'
                      className={((this.state.errors &&
                        !!this.state.errors.categoryName) ||
                        categoryData.categoryName.length > 0) ?
                        'custom-active custom-validate' : 'custom-validate'}
                      data-error={(this.state.errors &&
                        !!this.state.errors.categoryName) ?
                        this.state.errors.categoryName : ''}
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

                    <div style={{ color: 'red', float: 'right' }}>
                      {this.props.categoryState.fails}
                    </div>
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
  categoryState: state.categoryReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ addCategoryAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);