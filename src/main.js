// in your main.js file
import React from 'react';
import {connect} from 'react-redux';
import Redux, {
  ReduxToken,
  ReducerToken,
  EnhancerToken,
  GetInitialStateToken,
} from 'fusion-plugin-react-redux';
import ReduxActionEmitterEnhancer from 'fusion-plugin-redux-action-emitter-enhancer';
import App from 'fusion-react';

const reducer = (state, action) => ({
  count: countReducer(state.count, action),
});

function countReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const Component = connect(
  ({count}) => ({count}), 
  dispatch => ({
    increment() { dispatch({ type: 'INCREMENT' }) },
    decrement() { dispatch({ type: 'DECREMENT' }) }
  })
)(({count, increment, decrement}) => (
  <div>
    <div>{count}</div>
    <button onClick={() => increment()}>Increment</button>
    <button onClick={() => decrement()}>Decrement</button>
  </div>
));

const root = <Component />

export default function start() {
  const app = new App(root);

  app.register(ReduxToken, Redux);
  app.register(ReducerToken, reducer);

  app.register(EnhancerToken, (next) => (reducer, initialState) => {
    return next((state, action) => {
      // Here's your state
      console.log(state, action);
      return reducer(state, action) 
    }, initialState) 
  });

  __NODE__ && app.register(GetInitialStateToken, async ctx => ({
    count: 0,
  }));

  return app;
}