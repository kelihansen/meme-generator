import React, { Component } from 'react';
import dom2Image from 'dom-to-image';
import fileSaver from 'file-saver';
import starterImage from '../nat-geo-camel.jpg';

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
    image: starterImage,
    header: 'TEXT',
    footer: 'TEXT',
    color: '#000000',
    headerSize: 4.5,
    footerSize: 4.5
  };

  handleHeaderChange({ target }) {
    this.setState({ header: target.value });
  }

  handleFooterChange({ target }) {
    this.setState({ footer: target.value });
  }

  handleColorChange({ target }) {
    this.setState({ color: target.value });
  }
  
  handleSizeChange(property, { target }) {
    this.setState({ [property]: target.value });
  }

  handleImageUrl({ target }) {
    const image = target.value || starterImage;
    this.setState({ image });
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
    const { header, footer, color, headerSize, footerSize, image } = this.state;
    return (
      <main>
        <section className="meme">
          <h1>Your Meme</h1>
          <div className="image-wrapper" ref={node => this.imageExport = node}>
            <img src={image} alt="your image"/>
            <h2 className="header" style={{ color, fontSize: headerSize + 'rem', lineHeight: headerSize + 'rem' }}>{header}</h2>
            <h2 className="footer" style={{ color, fontSize: footerSize + 'rem', lineHeight: footerSize + 'rem' }}>{footer}</h2>
          </div>
          <button onClick={this.handleImageDownload}>
            DOWNLOAD
          </button>
        </section>

        <section className="controls">
          <fieldset>
            <label>
            Enter a header for your meme:
              <input
                type="text"
                value={header}
                onChange={event => this.handleHeaderChange(event)}
              />
            </label>
            <label>
            Select a header size:
              <input
                type="range"
                min="1"
                max="8"
                step="any"
                value={headerSize}
                onChange={event => this.handleSizeChange('headerSize', event)}
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
            Select a footer size:
              <input
                type="range"
                min="1"
                max="8"
                step="any"
                value={footerSize}
                onChange={event => this.handleSizeChange('footerSize', event)}
              />
            </label>
            <label>
            Select a text color:
              <input
                type="color"
                value={color}
                onChange={event => this.handleColorChange(event)}
              />
            </label>
            
          </fieldset>


          <fieldset>
            <label>
            Enter a new image URL:
              <input
                type="text"
                onChange={event => this.handleImageUrl(event)}
              />
            </label>

            <p>OR</p>

            <label>
            Upload an image:
              <input
                type="file"
                onChange={event => this.handleImageUpload(event)}
              />
            </label>
          </fieldset>
        </section>
      </main>
    );
  }
}