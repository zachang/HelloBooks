import React from 'react';
import classnames from 'classnames';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changePasswordAction } from '../actions/userAction';

/**
 * ChangePassword class declaration
 *
 * @class ChangePassword
 *
 * @extends {React.Component}
 */
export class ChangePassword extends React.Component {
  /**
   * class constructor
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      changePasswordData: {
        oldPassword: '',
        newPassword: '',
        newPassword_confirmation: ''
      },
      errors: null,
      showToast: false,
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
    if (nextProps.userState.success === true) {
      if (this.state.showToast) {
        Materialize.toast('Password changed!', 4000);
        this.setState({
          showToast: false
        });
      }
    }
    if (nextProps.userState.errors) {
      this.setState({
        errors: nextProps.userState.errors
      });
    }
    if (!nextProps.userState.success &&
      nextProps.userState.fails === 'Incorrect old password') {
      if (this.state.showToast) {
        Materialize.toast('Incorrect old password!', 4000);
        this.setState({ showToast: false });
      }
      this.setState({
        errors: nextProps.userState.errors
      });
    }
    if (!nextProps.userState.success &&
      nextProps.userState.fails === 'Password not changed') {
      if (this.state.showToast) {
        Materialize.toast('Password not changed!', 4000);
        this.setState({ showToast: false });
      }
      this.setState({
        errors: nextProps.userState.errors
      });
    }
  }

  /**
   * Handles password update input
   *
   * @method handleChange
   *
   * @return {void} void
   *
   * @param {object} event - event
   */
  handleChange(event) {
    const changePasswordData = this.state.changePasswordData;
    changePasswordData[event.target.name] = event.target.value;
    this.setState({
      changePasswordData,
      errors: null
    });
  }

  /**
   * Handles password form update
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
      changePasswordData: {
        oldPassword: '',
        newPassword: '',
        newPassword_confirmation: ''
      },
      showToast: true,
      imagePreviewUrl: '',
      errors: null
    });
    this.props.changePasswordAction(this.state.changePasswordData);
  }

  /**
   * Renders ChangePassword component
   *
   * @return {XML} JSX
   */
  render() {
    const { changePasswordData } = this.state;

    return (
      <div>
        {changePasswordData && <div>
          <div className='row'>
            <div className='col s10 m8 l6 bookadd'
              style={{ marginLeft: '35%', marginTop: '15%' }}
            >

              <div className='row'>
                <form className='col s10' onSubmit={this.handleSubmit}>
                  <div className='row'>
                    <div className='input-field col s10'>
                      <input
                        id='oldPassword'
                        name='oldPassword'
                        type='password'
                        className={classnames({
                          invalid: (this.state.errors &&
                            !!this.state.errors.oldPassword) ?
                            !!this.state.errors.oldPassword : false
                        })}
                        value={changePasswordData.oldPassword || ''}
                        onChange={this.handleChange}
                      />
                      <label
                        htmlFor='old password'
                        className={((this.state.errors &&
                          !!this.state.errors.oldPassword)
                          || changePasswordData.oldPassword.length > 0) ?
                          'custom-active custom-validate' : 'custom-validate'}
                        data-error={(this.state.errors &&
                          !!this.state.errors.oldPassword) ?
                          this.state.errors.oldPassword : ''}
                      >
                        Old Password
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='input-field col s10'>
                      <input
                        id='newPassword'
                        name='newPassword'
                        type='password'
                        className={classnames({
                          invalid: (this.state.errors &&
                            !!this.state.errors.newPassword) ?
                            !!this.state.errors.newPassword : false
                        })}
                        value={changePasswordData.newPassword}
                        onChange={this.handleChange}
                      />
                      <label
                        htmlFor='new password'
                        className={((this.state.errors &&
                          !!this.state.errors.newPassword)
                          || changePasswordData.newPassword.length > 0) ?
                          'custom-active custom-validate' : 'custom-validate'}
                        data-error={(this.state.errors &&
                          !!this.state.errors.newPassword) ?
                          this.state.errors.newPassword : ''}
                      >
                        New Password
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='input-field col s10'>
                      <input
                        id='newPassword_confirmation'
                        name='newPassword_confirmation'
                        type='password'
                        className={classnames({
                          invalid:
                            (this.state.errors &&
                              !!this.state.errors.newPassword_confirmation)
                              ? !!this.state.errors.newPassword_confirmation
                              : false
                        })}
                        value={changePasswordData.newPassword_confirmation}
                        onChange={this.handleChange}
                      />
                      <label
                        htmlFor='Confirm New Password'
                        className={
                          ((this.state.errors &&
                            !!this.state.errors.newPassword_confirmation) ||
                            changePasswordData.newPassword_confirmation.length >
                            0) ?
                            'custom-active custom-validate' : 'custom-validate'}
                        data-error={
                          (this.state.errors &&
                            !!this.state.errors.newPassword_confirmation) ?
                            this.state.errors.newPassword_confirmation : ''}
                      >
                        Confirm New Password
                      </label>
                    </div>
                  </div>

                  <button
                    className='col s10 btn btn-large waves-effect waves-light'
                    type='submit'
                    name='action'
                  >
                    Change Password
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>}
      </div>

    );
  }
}

ChangePassword.propTypes = {
  userState: PropTypes.object.isRequired,
  changePasswordAction: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  userState: state.userReducer,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ changePasswordAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);