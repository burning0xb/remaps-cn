"use strict";

import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Title extends Component {
  static propTypes = {
    width: PropTypes.number,
    title: PropTypes.string,
    titleClassName: PropTypes.string
  };

  constructor(props) {
    super (props);
  }

  render() {
    const {
      titleClassName,
      title,
      width,
     } = this.props;

    const titleStyle = {
      width: width,
      textAlign: 'center',
      fontSize: '2em',
      paddingBottom: '1.3em'
    }

    return (
      <div
        style= {titleStyle}
        className={titleClassName}
      >
        {title}
      </div>
    )
  }
}
