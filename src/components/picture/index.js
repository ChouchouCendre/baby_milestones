import React, { PureComponent } from 'react';
import Cropper from 'react-easy-crop';
import './picture.scss';

class Picture extends PureComponent {

  constructor() {
    super();
    this.state = {
      // crop: { x: 0, y: 0 },
      // zoom: 1,
      aspect: 4 / 4,
    };
    this.clicChange = this.clicChange.bind(this);
  }

  /*
  componentDidUpdate(prevProps) {
    if (prevProps.crop !== this.props.crop) {
      this.setState({ crop: this.props.crop, zoom: this.props.zoom });
    }
  }
  */

  clicChange() {
    this.props.clicOpenPopin(this.props.id);
  }

  renderSVG() {
    const svg = `<svg version="1.1" id="elp-badge" class="badge"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 289.1 289.1" enable-background="new 0 0 289.1 289.1"
    xml:space="preserve">
    <defs>
      <filter id="dropshadow">
        <feGaussianBlur in="SourceAlpha" stdDeviation="0"/>
        <feOffset dx="-5" dy="5" result="offsetblur"/>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <circle class="circle" fill="transparent" cx="144.5" cy="144.5" r="144.5"/>
    <path id="SVGID_x5F_2_x5F_" fill="none" d="M31.1,129c10.4-62.1,69.2-104,131.4-93.6s104,69.2,93.6,131.4
        c-10.4,62.1-69.2,104-131.4,93.6C62.5,249.9,20.6,191.1,31.1,129z"/>
    <text text-anchor="middle">
      <textPath xlink:href="#SVGID_x5F_2_x5F_" startOffset="160">
        <tspan class="badge-header" fill="#000" font-family="Lato" font-size="12">${this.props.label}</tspan>
      </textPath>
    </text>
    <path id="SVGID_x5F_1_x5F_" fill="none" d="M263.9,172.8c11-65.5-33.2-127.6-98.7-138.6S37.5,67.4,26.5,133s33.2,127.6,98.7,138.6
                                              C190.8,282.6,252.9,238.4,263.9,172.8z"/>
  </svg>`;
    return <div className="pictures_line_svg" dangerouslySetInnerHTML={{ __html: svg }} />;
  }

  render() {
    // <div className="pictures_line_img" style={{ backgroundImage: `url(${this.props.img})` }}>
    return (
      <div className="pictures_line_img">
        {/* TEST */}
        <div className="popin_img">
          <Cropper
            image={this.props.img}
            crop={this.props.crop}
            zoom={this.props.zoom}
            aspect={this.state.aspect}
            onCropChange={() => { }}
            onCropComplete={() => { }}
            onZoomChange={() => { }}
            cropShape="round"
            showGrid={false}
          />
        </div>
        {/* TEST */}
        <button type="button" className="pictures_line_button" onClick={this.clicChange}>
          <span>{ this.props.lang === 'fr' ? 'CHANGER' : 'CHANGE'}</span>
          <span>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z" /></svg>
          </span>
        </button>
        <div className="pictures_line_m">{this.props.months}</div>
        {/* CURVED TEXT */}
        { this.renderSVG() }
        {/* END CURVED TEXT */}
      </div>
    );
  }
}

export default Picture;
