import React from 'react';
import classnames from 'classnames';

export default (props) => (
  <div className={ classnames('card', props.className) }>
    {props.children}
  </div>
)