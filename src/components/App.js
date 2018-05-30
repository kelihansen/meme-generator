import React, { Component } from 'react';

export default class App extends Component {
  // I installed the "class properties" Babel plugin, but here's another way to set things up:

  // constructor() {
  //  super();
  //  this.state = {
  //    header: 'HEADER TEXT'
  //  };
  // }

  state = {
    image: null,
    header: 'TEXT',
    footer: 'TEXT'
  };

  handleHeaderChange({ target }) {
    this.setState({ header: target.value });
  }

  handleFooterChange({ target }) {
    this.setState({ footer: target.value });
  }

  handleImageUrl({ target }) {
    this.setState({ image: target.value });
  }
  
  render() {
    const { image, header, footer } = this.state;
    return (
      <main>
        <section className="meme">
          <h1>Your Meme</h1>
          <div className="image-wrapper">
            <img src={image} alt="your image"/>
            <h2 className="header">{header}</h2>
            <h2 className="footer">{footer}</h2>
          </div>
        </section>

        <section className="controls">
          <label>
          Enter a header for your meme:
            <input
              type="text"
              value={header}
              onChange={event => this.handleHeaderChange(event)}
            />
          </label>

          <label>
          Enter a footer for your meme:
            <input
              type="text"
              value={footer}
              onChange={event => this.handleFooterChange(event)}
            />
          </label>

          <label>
              Enter an image URL:
            <input
              type="text"
              onChange={event => this.handleImageUrl(event)}
            />
          </label>
        </section>
      </main>
    );
  }
}