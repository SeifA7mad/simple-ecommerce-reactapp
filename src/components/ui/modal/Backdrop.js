import { Component } from "react";

import classes from './Backdrop.module.css';

class Backdrop extends Component {
    render() {
        return (
          <div className={classes.backdrop} onClick={this.props.onClose}></div>
        );
    }
}

export default Backdrop;