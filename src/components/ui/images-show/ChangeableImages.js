import { Component } from 'react';

import classes from './ChangeableImages.module.css';

class ChangeableImages extends Component {
  constructor() {
    super();
    this.state = {
      currentImage: 0,
    };
  }

  onCurrentImagePlusHnadler() {
    this.setState((prevState) => {
      return {
        currentImage: ++prevState.currentImage % this.props.gallery.length,
      };
    });
  }

  onCurrentImageMinusHnadler() {
    this.setState((prevState) => {
      if (prevState.currentImage === 0) {
        return {
          currentImage: this.props.gallery.length - 1,
        };
      }
      return {
        currentImage: --prevState.currentImage,
      };
    });
  }

  render() {
    return (
      <div className={classes.image}>
        <img
          src={this.props.gallery[this.state.currentImage]}
          loading='lazy'
          alt='product'
          placeholder='Product'
        />
        {this.props.changeable && (
          <div className={classes.arrows}>
            <div onClick={this.onCurrentImageMinusHnadler.bind(this)}>
              <i className={`${classes.arrow} ${classes.left}`}></i>
            </div>
            <div onClick={this.onCurrentImagePlusHnadler.bind(this)}>
              <i className={`${classes.arrow} ${classes.right}`}></i>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ChangeableImages;
