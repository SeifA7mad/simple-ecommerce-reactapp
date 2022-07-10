import { Component } from 'react'

import classes from './ModalArrow.module.css';

class ModalArrow extends Component {
  render() {
    return (
      <span
        className={`${classes.arrow} ${this.props.style} ${
          this.props.isModalOpen ? classes.up : classes.down
        }`}
      ></span>
    );
  }
}

export default ModalArrow;