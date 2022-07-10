import { Component } from 'react';

import Modal from './Modal';

import classes from './SideModal.module.css';
class SideModal extends Component {
  render() {
    return (
      <Modal style={`${classes.sideModal} ${this.props.style}`}>
        <div className={classes.sideModalContent}>{this.props.children}</div>
      </Modal>
    );
  }
}

export default SideModal;
