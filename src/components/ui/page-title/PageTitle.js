import { Component } from 'react';

import ModalArrow from '../modal/modal-arrow/ModalArrow';

import classes from './PageTitle.module.css';

class PageTitle extends Component {
  render() {
    const title = `${this.props.title[0].toUpperCase()}${this.props.title.substring(
      1
    )}`;
    const modalArrow = this.props.onClick ? (
      <ModalArrow isModalOpen={this.props.isModalOpen} style={classes.arrow} />
    ) : null;
    return (
      <h2
        className={`${classes.pageTitle} ${
          this.props.onClick ? classes.clickable : null
        }`}
        style={this.props.style}
        onClick={this.props.onClick}
      >
        {title} {modalArrow}
      </h2>
    );
  }
}

export default PageTitle;
