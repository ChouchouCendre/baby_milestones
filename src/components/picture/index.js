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
    console.log('%%% PICTURE.componentDidUpdate');
    if (prevProps.crop !== this.props.crop) {
      this.setState({ crop: this.props.crop, zoom: this.props.zoom });
      console.log('>>> this.props.zoom', this.props.zoom);
    }
  }
  */

  // REACT CROP

  onCropChange(crop) {
    // this.setState({ crop })
  }

  onCropComplete(croppedArea, croppedAreaPixels) {
    // console.log(croppedArea, croppedAreaPixels)
  }

  onZoomChange(zoom) {
    // this.setState({ zoom })
  }

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
        <tspan class="badge-header" fill="#000" font-family="Lato" font-size="13">${this.props.label}</tspan>
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
            onCropChange={this.onCropChange}
            onCropComplete={this.onCropComplete}
            onZoomChange={this.onZoomChange}
            cropShape="round"
            showGrid={false}
          />
        </div>
        {/* TEST */}
        <button type="button" className="pictures_line_button" onClick={this.clicChange}>CHANGER</button>
        <div className="pictures_line_m">{this.props.months}</div>
        {/* CURVED TEXT */}
        { this.renderSVG() }
        {/* END CURVED TEXT */}
      </div>
    )
  }
}

export default Picture;
