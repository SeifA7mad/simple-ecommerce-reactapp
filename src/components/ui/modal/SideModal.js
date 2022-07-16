import { Component } from 'react';

import Modal from './Modal';

import classes from './SideModal.module.css';
class SideModal extends Component {
  render() {
    return (
      <Modal
        onClose={this.props.onClose}
        style={`${classes.sideModal} ${this.props.style}`}
        backdropStyle={`${classes.backdrop} ${this.props.backdropStyle}`}
      >
        <div className={classes.sideModalContent}>{this.props.children}</div>
      </Modal>
    );
  }
}

export default SideModal;
