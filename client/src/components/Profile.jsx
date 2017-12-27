import React from 'react';
import classnames from 'classnames';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getOneUserAction, updateUserAction } from '../actions/userAction';

/**
 * Profile class declaration
 * @class Profile
 * @extends {React.Component}
 */
export class Profile extends React.Component {
  /**
   * class constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        fullname: '',
        username: '',
        email: '',
        phone_no: '',
        user_image: '',
        user_image_txt: ''
      },
      errors: null,
      showToast: false,
      imagePreviewUrl: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  /**
   * @method componentDidMount
   * @return {void} void
   */
  componentDidMount() {
    this.props.getOneUserAction(this.props.params.id);
  }

  /**
   * @method componentWillReceiveProps
   * @param {object} nextProps - nextProps
   * @return {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.userState.success === true) {
      if (this.state.showToast) {
        Materialize.toast('User updated!', 4000);
        this.setState({
          showToast: false
        });
      }
      this.setState({
        userData: nextProps.userState.user
      });
    } else if (nextProps.userState.errors === 'Error, No update done') {
      if (this.state.showToast) {
        Materialize.toast('User not updated!', 4000);
        this.setState({ showToast: false });
      }
      this.setState({
        errors: nextProps.userState.errors
      });
    } else if (!nextProps.userState.success && nextProps.userState.errors !== 'Error, No update done') {
      if (this.state.showToast) {
        Materialize.toast('Fill the form properly!', 4000);
        this.setState({ showToast: false });
      }
      this.setState({
        errors: nextProps.userState.errors
      });
    }
  }

  /**
   * Handles user Image file input
   * @method handleImageChange
   * @return {void} void
   * @param {object} event - event
   */
  handleImageChange(event) {
    const reader = new FileReader();
    const userData = this.state.userData;
    const file = event.target.files[0];
    userData.user_image = file;
    userData.user_image_text = file.name;

    reader.onloadend = () => {
      this.setState({
        userData,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(userData.user_image);
  }

  /**
   * Handles user update input
   * @method handleChange
   * @return {void} void
   * @param {object} event - event
   */
  handleChange(event) {
    const userData = this.state.userData;
    userData[event.target.name] = event.target.value;
    this.setState({
      userData,
      errors: null
    });
  }

  /**
   * Handles user form update
   * @method handleSubmit
   * @return {void}
   * @param {object} event - event
   */
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      showToast: true
    });
    this.props.updateUserAction(this.state.userData, this.props.params.id);
  }
  /**
   * Renders Profile component
   * @return {XML} JSX
   */
  render() {
    const { userData, imagePreviewUrl  } = this.state;

    return (
      <div>
        {userData && <div>
          <div className='row'>
            <div className='row'>
              <div className='col s10 m8 l6 profile_marg' style={{ marginLeft: '23%', marginTop: '7%' }}>
                <div className='card' style={{boxShadow: '2px 1px 7px #000'}}>
                  <form method='post' className='col s12' onSubmit={this.handleSubmit}>
                    <div className='card-content white-text'
                      style={{ height: '200px', background: 'rgba(77, 182, 172, 0.9)' }}
                    >

                      <div className='profile-image circle'>
                        {(imagePreviewUrl) ? <img
                          className='activator image-display circle'
                          src={imagePreviewUrl}/>
                            :
                          <img
                          className='activator image-display circle'
                          src={(userData.user_image !== null)
                          ? userData.user_image : '../../imgs/avatar.png'}
                        />}
                      </div>

                    </div>
                    <div className='card-action' style={{ height: '340px', background: 'rgba(217,217,217,0.7)' }}>

                      <div className='row'>
                        <div className='input-field col s6'>
                          <input
                            id='fullname'
                            name='fullname'
                            type='text'
                            className={classnames({
                              invalid: (this.state.errors && !!this.state.errors.fullname) ?
                                !!this.state.errors.fullname : false
                            })}
                            value={userData.fullname || ''}
                            onChange={this.handleChange}
                          />
                          <label
                            htmlFor='fullname'
                            className={((this.state.errors && !!this.state.errors.fullname)
                              || userData.fullname.length > 0) ? 'custom-active custom-validate' : 'custom-validate'}
                            data-error={(this.state.errors && !!this.state.errors.fullname) ?
                              this.state.errors.fullname : ''}
                          >
                            Full Name
                          </label>
                        </div>
                        <div className='input-field col s6'>
                          <input
                            id='username'
                            name='username'
                            type='text'
                            className={classnames({
                              invalid: (this.state.errors && !!this.state.errors.username) ?
                                !!this.state.errors.username : false
                            })}
                            value={userData.username || ''}
                            onChange={this.handleChange}
                          />
                          <label
                            htmlFor='username'
                            className={((this.state.errors && !!this.state.errors.username)
                              || userData.username.length > 0) ? 'custom-active custom-validate' : 'custom-validate'}
                            data-error={(this.state.errors && !!this.state.errors.username) ?
                              this.state.errors.username : ''}
                          >
                            Username
                          </label>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='input-field col s6'>
                          <input
                            id='email'
                            name='email'
                            type='text'
                            className={classnames({
                              invalid: (this.state.errors && !!this.state.errors.email) ?
                                !!this.state.errors.email : false
                            })}
                            value={userData.email || ''}
                            onChange={this.handleChange}
                          />
                          <label
                            htmlFor='email'
                            className={((this.state.errors && !!this.state.errors.email)
                              || userData.email.length > 0) ? 'custom-active custom-validate' : 'custom-validate'}
                            data-error={(this.state.errors && !!this.state.errors.email) ?
                              this.state.errors.email : ''}
                          >
                            Email
                          </label>
                        </div>
                        <div className='input-field col s6'>
                          <input
                            id='phone_no'
                            name='phone_no'
                            type='text'
                            className={classnames({
                              invalid: (this.state.errors && !!this.state.errors.phone_no) ?
                                !!this.state.errors.phone_no : false
                            })}
                            value={userData.phone_no || ''}
                            onChange={this.handleChange}
                          />
                          <label
                            htmlFor='phone number'
                            className={((this.state.errors && !!this.state.errors.phone_no)
                              || userData.phone_no.length > 0) ? 'custom-active custom-validate' : 'custom-validate'}
                            data-error={(this.state.errors && !!this.state.errors.phone_no) ?
                              this.state.errors.phone_no : ''}
                          >
                            Phone Number
                          </label>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='file-field input-field col s10'>
                          <div className='btn'>
                            <span>Add Image</span>
                            <input
                              type='file'
                              id='user_image'
                              name='user_image'
                              accept='image/*'
                              onChange={this.handleImageChange}
                            />
                          </div>
                          <div className='file-path-wrapper'>
                            <input
                              type='text'
                              name='user_image_txt'
                              className={classnames('file-path', {
                                invalid: (this.state.errors && !!this.state.errors.user_image_txt) ?
                                  !!this.state.errors.user_image_txt : false
                              })}
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        className='waves-effect waves-light btn profile-btn'
                        style={{marginLeft: '35%'}}
                        type='submit'
                      >
                        Update
                      </button>

                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>}
      </div>

    );
  }
}

Profile.propTypes = {
  userState: PropTypes.object.isRequired,
  getOneUserAction: PropTypes.func.isRequired,
  updateUserAction: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  userState: state.userReducer,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getOneUserAction, updateUserAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);