import axios from 'axios';

export const SIGNUP = 'user/SIGNUP';
export const SIGNIN = 'user/SIGNIN';
export const SIGNOUT = 'user/SIGNOUT';
export const SHOW_SIGNUP = 'user/SHOW_SIGNUP';
export const SHOW_SIGNIN = 'user/SHOW_SIGNIN';

const initialState = {
  showSigninModal: false,
  showSignupModal: false,
  signedIn: false,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        showSignupModal: false
      };

    case SIGNIN:
      return {
        ...state,
        signedIn: true,
        user: action.payload
      };

    case SIGNOUT:
      return {
        ...state,
        signedIn: false,
        user: null
      };

    case SHOW_SIGNUP:
      return {
        ...state,
        showSignupModal: action.payload
      };

    case SHOW_SIGNIN:
      return {
        ...state,
        showSigninModal: action.payload
      };

    default:
      return state;
  }
};

export const signup = (user, errorMsg) => {
  return dispatch => {
    axios
      .post(`${process.env.REACT_APP_API_URI}/signup`, user)
      .then(response => {
        const data = response.data;
        console.log('Response from signup:', response, errorMsg);
        if (!data.success) return errorMsg && errorMsg(data.msg);
        dispatch({
          type: SIGNUP,
          payload: response
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export const signin = user => {
  return dispatch => {
    axios
      .post(`${process.env.REACT_APP_API_URI}/signin`, user)
      .then(response => {
        console.log('Response from signin:', response);
        dispatch({
          type: SIGNIN,
          payload: response
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export const signout = user => {
  return dispatch => {
    axios
      .post(`${process.env.REACT_APP_API_URI}/signout`, user)
      .then(response => {
        console.log('Response from signout:', response);
        dispatch({
          type: SIGNOUT,
          payload: response
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export const showSignup = show => {
  return dispatch => {
    dispatch({
      type: SHOW_SIGNUP,
      payload: show
    });
  };
};

export const showSignin = show => {
  return dispatch => {
    dispatch({
      type: SHOW_SIGNIN,
      payload: show
    });
  };
};
