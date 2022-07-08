import { Component } from 'react'

import classes from './PageTitle.module.css';

class PageTitle extends Component {

  render() {
    const title = `${this.props.title[0].toUpperCase()}${this.props.title.substring(1)}`;
    return (
      <h2 className={`${classes.pageTitle} ${this.props.style}`}> {title} </h2>
    )
  }
}

export default PageTitle;