import React, { Component } from 'react';

export default class App extends Component {
  // I installed the class properties Babel plugin, but here's another way to set things up:

  // constructor() {
  //  super();
  //  this.state = {
  //    header: 'HEADER TEXT'
  //  };
  // }

  state = {
    header: 'HEADER TEXT'
  };

  handleHeaderChange({ target }) {
    this.setState({ header: target.value });
  }
  
  render() {
    const { header } = this.state;
    return (
      <main>
        <section className="meme">
          <h1>Your Meme</h1>
          <h2>{header}</h2>
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
        </section>
      </main>
    );
  }
}