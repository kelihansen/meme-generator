import React, { Component } from 'react';
import dom2Image from 'dom-to-image';
import fileSaver from 'file-saver';

export default class App extends Component {
  // I installed the "class properties" Babel plugin, but here's another way to set things up:

  // constructor() {
  //  super();
  //  this.state = {
  //    header: 'HEADER TEXT'
  //    etc.
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

  handleImageUpload({ target }) {
    const reader = new FileReader();

    reader.readAsDataURL(target.files[0]);

    reader.onload = () => {
      this.setState({ image: reader.result });
    };
  }

  handleImageDownload = () => {
    dom2Image.toBlob(this.imageExport).then(blob => {
      fileSaver.saveAs(blob, 'my-meme.png');
    });
  };
  
  render() {
    const { image, header, footer } = this.state;
    return (
      <main>
        <section className="meme">
          <h1>Your Meme</h1>
          <div className="image-wrapper" ref={node => this.imageExport = node}>
            <img src={image} alt="your image"/>
            <h2 className="header">{header}</h2>
            <h2 className="footer">{footer}</h2>
          </div>
          <button onClick={this.handleImageDownload}>
            DOWNLOAD
          </button>
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

          <label>
            Upload an image:
            <input
              type="file"
              onChange={event => this.handleImageUpload(event)}
            />
          </label>
        </section>
      </main>
    );
  }
}