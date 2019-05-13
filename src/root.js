// @flow
import {connect} from 'Redux'

const root = connect((state => ({count: state.count}), {increment: dispatch => {}, decrement: dispatch => {}})(({items}) => (
  <div>
));

export default root;
