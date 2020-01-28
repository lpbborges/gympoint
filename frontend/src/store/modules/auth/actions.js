export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_SUCCESS',
    payload: { token, user },
  };
}

export function signInFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
