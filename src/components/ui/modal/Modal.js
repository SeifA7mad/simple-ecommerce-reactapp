import  { Component, Fragment } from 'react';
import ReactDom from 'react-dom';

import Backdrop from './Backdrop';

import classes from './Modal.module.css';

class Modal extends Component {
  constructor() {
    super();
    this.portalElement = document.getElementById('overlays');
  }
  render() {
    return (
      <Fragment>
        {this.props.onClose &&
          ReactDom.createPortal(
            <Backdrop onClose={this.props.onClose} />,
            this.portalElement
          )}
        <div className={`${classes.modal} ${this.props.style}`}>
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

export default Modal;
