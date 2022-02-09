function ChangeState(state, changeState = {}) {
   return Object.assign({}, state, changeState);
}

export { ChangeState };
