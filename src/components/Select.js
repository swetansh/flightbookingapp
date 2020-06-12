import React from 'react';

export default (props) => (
  <select value={props.value} onChange={props.onChange}>
    {
      props.options && props.options.map(option => {
        if(option && option.hasOwnProperty('value'))
          return <option key={option.value} value={option.value}>{option.label}</option>
        return <option key={option} value={option}>{option}</option>
      })
    }
  </select>
)