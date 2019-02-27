import React, { PureComponent } from 'react';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/lab/Slider';
import TextField from '@material-ui/core/TextField';

import './popin.scss';

class Popin extends PureComponent {

  constructor() {
    super();
    this.state = {
     imageSrc: null,
      crop: { x: 0, y: 0 },
      zoom: 1,
      aspect: 4 / 4,
      texte: 'Cat in the Hat',
      legend: 'Lorem ipsum',
    };
    this.clicClose = this.clicClose.bind(this);
    this.handlerTimer = this.handlerTimer.bind(this);
    this.clickChoice = this.clickChoice.bind(this);
    // this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.clicValidate = this.clicValidate.bind(this);
  }

  componentDidMount() {
    this.initEvents();
    // this.setState({ texte: this.props.currentLabel });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.displayPopin !== this.props.displayPopin) {
      /*
      if (this.props.displayPopin) {
        if (popinTimeline) popinTimeline.restart();
        this.count = 0;
      } else {
        clearInterval(this.interval);
        this.interval = null;
        if (popinTimeline) popinTimeline.pause();
      }
      */
      this.setState({ texte: this.props.currentDatas.label, legend: this.props.currentDatas.legend, imageSrc: this.props.currentDatas.img });
    }
  }

  initEvents() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27 && this.props.displayPopin) this.clicClose();
    });
  }

  handlerTimer() {
    const tmpName = this.currentMovie.substr(0, this.count);
    this.setState({ inputName: `${tmpName}_` });
    this.count += 1;
    if (this.count > this.currentMovie.length + 5) this.count = 0;
  }

  clicClose() {
    this.props.closePopin();
  }

  clickChoice(e) {
    this.props.clicPopin(e.currentTarget.getAttribute('data-id'));
  }

  clicValidate() {
    this.props.updateDatas(this.state.texte, this.state.legend, this.state.imageSrc, this.state.crop, this.state.zoom);
  }

  // REACT EASY CROP

  onCropChange = crop => {
    this.setState({ crop })
  }

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    // console.log(croppedArea, croppedAreaPixels)
  }

  onZoomChange = zoom => {
    this.setState({ zoom })
  }

  readFile(file) {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        () => resolve(reader.result),
        false
      )
      reader.readAsDataURL(file)
    })
  }

  onFileChange = async e => {
    if (e.target.files && e.target.files.length > 0) {
      const imageDataUrl = await this.readFile(e.target.files[0])
      this.setState({
        imageSrc: imageDataUrl,
        crop: { x: 0, y: 0 },
        zoom: 1,
      })
    }
  }

  // MATERIAL TEXTFIELD

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const classDialog = this.props.displayPopin ? ' dialog--open' : '';
    return (
      <div id="popin" className={`dialog dialog--close${classDialog}`}>
        <div className="dialog__overlay" onClick={ this.clicClose }></div>
          <div className="dialog__content" ref={ c => (this.popin = c) }>
            <div className="dialog__close" onClick={ this.clicClose }></div>
            {/*
            <div className="morph-shape">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 560 280" preserveAspectRatio="none">
                <rect x="3" y="3" fill="none" width="556" height="276"></rect>
              </svg>
            </div>
            */}
            {/*
            <div className="dialog-inner" style={{ backgroundImage: `url(img/backgrounds/${this.state.nameItem}.jpg)` }}>
            */}
            <div className="dialog-inner">
              <div className="popin_areas">
                <div className="popin_left">
                  <div className="popin_bloc">
                  <h2>1. Modifier le texte</h2>
                    {/* <input type="text" /> */}
                    <div className="popin_bloc_textfield">
                    <TextField
              id="standard-name"
              label="Texte"
              className="popin_bloc_input"
              value={this.state.texte}
              onChange={this.handleChange('texte')}
              margin="normal"
            />
            </div>
                  </div>
                  <div className="popin_bloc">
                  <h2>2. Modifier la légende</h2>
                  {/* <input type="text" /> */}
                  <div className="popin_bloc_textfield">
                  <TextField
              id="standard-legend"
              label="Légende"
              className="popin_bloc_input"
              value={this.state.legend}
              onChange={this.handleChange('legend')}
              margin="normal"
            />
            </div>
                  <div className="intro-subtitle animated flipInX"><span></span></div>
                </div>
                </div>
                <div className="popin_right">
                <h2>3. Changer la Photo</h2>
                  <div className="popin_img">
                    {/* <img src={this.state.img} alt="" /> */}
                    <Cropper
                    image={this.state.imageSrc}
                    crop={this.state.crop}
                    zoom={this.state.zoom}
                    aspect={this.state.aspect}
                    onCropChange={this.onCropChange}
                    onCropComplete={this.onCropComplete}
                    onZoomChange={this.onZoomChange}
                    cropShape='round'
                    showGrid={false}
                  />
                  </div>
                  {
                  this.state.imageSrc && <div className="popin_slider"><Slider
                    value={this.state.zoom}
                    min={1}
                    max={6}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e, zoom) => this.onZoomChange(zoom)}
                  /></div>
                  }
                  <input type="file" accept=".jpg,.jpeg,.png,.gif,.bmp" onChange={this.onFileChange} />
                  <div className="popin_info">Vos photos ne sont pas chargées sur un serveur.</div>
                </div>
                </div>
              <button className="popin_button" onClick={this.clicValidate}>VALIDER</button>
            </div>
          </div>
      </div>
    );
  }

}

export default Popin;
