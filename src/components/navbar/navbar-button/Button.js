import { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <button
        style={{
          cursor: 'pointer',
          font: 'inherit',
          border: 'none',
          backgroundColor: 'transparent',
          position: 'relative',
        }}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
