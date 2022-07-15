import { Component } from 'react';

import classes from './SelectableImages.module.css';

class SelectableImages extends Component {
  constructor() {
    super();
    this.state = {
      selectedImage: null,
    };
  }

  componentDidMount() {
    this.setState({ selectedImage: this.props.images[0] });
  }

  onChangeSelectedImageHandler(image) {
    this.setState((prevState) => {
      if (prevState.selectedImage !== image) {
        return { selectedImage: image };
      }
    });
  }

  render() {
    const subImages = this.props.images.map((source, i) => (
      <img
        key={i}
        src={source}
        alt='product'
        loading='lazy'
        placeholder='Product'
        onClick={this.onChangeSelectedImageHandler.bind(this, source)}
      />
    ));
    return (
      <div className={classes.selectableImages}>
        <div className={classes.subImages}>{subImages}</div>
        <img
          src={this.state.selectedImage}
          className={classes.mainImage}
          alt='product'
          loading='lazy'
          placeholder='Product'
        />
      </div>
    );
  }
}

export default SelectableImages;
