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
      rotation: undefined,
    };
    this.clicClose = this.clicClose.bind(this);
    this.clickChoice = this.clickChoice.bind(this);
    // this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.clicValidate = this.clicValidate.bind(this);
    this.clicRotateLeft = this.clicRotateLeft.bind(this);
    this.clicRotateRight = this.clicRotateRight.bind(this);
    this.onCropChange = this.onCropChange.bind(this);
    this.onZoomChange = this.onZoomChange.bind(this);
  }

  componentDidMount() {
    this.initEvents();
    // this.setState({ texte: this.props.currentLabel });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.displayPopin !== this.props.displayPopin) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        texte: this.props.currentDatas.label, legend: this.props.currentDatas.legend, imageSrc: this.props.currentDatas.img, crop: this.props.currentDatas.crop, zoom: this.props.currentDatas.zoom,
      });
    }
  }

  onCropChange(crop) {
    this.setState({ crop });
  }

  onZoomChange(zoom) {
    this.setState({ zoom });
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageDataUrl = await this.readFile(e.target.files[0]);
      this.setState({
        imageSrc: imageDataUrl,
        crop: { x: 0, y: 0 },
        zoom: 1,
      });
    }
  }

  initEvents() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27 && this.props.displayPopin) this.clicClose();
    });
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

  clicRotateLeft() {
    // popin_img
    const tmpImg = document.querySelector('.popin_img img');
    if (!this.state.rotation) {
      tmpImg.style = 'transform: rotate(90deg)';
      this.setState({ rotation: 90 });
    } else if (this.state.rotation === 90) {
      tmpImg.style = 'transform: rotate(180deg)';
      this.setState({ rotation: 180 });
    } else {
      tmpImg.style = 'transform: rotate(0deg)';
      this.setState({ rotation: undefined });
    }
  }

  clicRotateRight() {
    if (!this.state.rotation) {
      this.img.style = 'transform: rotate(-90deg)';
      this.setState({ rotation: -90 });
    } else if (this.state.rotation === -90) {
      this.img.style = 'transform: rotate(-180deg)';
      this.setState({ rotation: -180 });
    } else {
      this.img.style = 'transform: rotate(0deg)';
      this.setState({ rotation: undefined });
    }
  }

  readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => resolve(reader.result),
        false,
      );
      reader.readAsDataURL(file);
    });
  }

  render() {
    const classDialog = this.props.displayPopin ? ' dialog--open' : '';
    return (
      <div id="popin" className={`dialog dialog--close${classDialog}`}>
        <div className="dialog__overlay" onClick={this.clicClose} role="button" />
        <div className="dialog__content" ref={c => (this.popin = c)}>
          <div className="dialog__close" onClick={this.clicClose} role="button" />
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
            <div className="popin_title">{`Photo ${this.props.id + 1}`}</div>
            <div className="popin_areas">

              <div className="popin_left">
                <h2>1. { this.props.lang !== 'en' ? 'Changer la Photo' : 'Change picture'}</h2>
                <div className="popin_img" ref={r => (this.img = r)}>
                  <Cropper
                    image={this.state.imageSrc}
                    crop={this.state.crop}
                    zoom={this.state.zoom}
                    aspect={this.state.aspect}
                    onCropChange={this.onCropChange}
                    onCropComplete={() => { }}
                    onZoomChange={this.onZoomChange}
                    cropShape="round"
                    showGrid={false}
                  />
                </div>
                {
                this.state.imageSrc && <React.Fragment><div className="popin_slider"><Slider
                  value={this.state.zoom}
                  min={1}
                  max={6}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e, zoom) => this.onZoomChange(zoom)}
                /></div>{/* <div><button onClick={this.clicRotateLeft}>ROTATE LEFT</button><button onClick={this.clicRotateRight}>ROTATE RIGHT</button></div> */}</React.Fragment>
                }
                <button className="popin_button--file commonButton" type="button">
                  <label htmlFor="file">
                    <span>{ this.props.lang !== 'en' ? 'CHOISIR UNE PHOTO' : 'CHOOSE A PICTURE'}</span>
                    <span>
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="portrait" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M336 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM192 128c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm112 236.8c0 10.6-10 19.2-22.4 19.2H102.4C90 384 80 375.4 80 364.8v-19.2c0-31.8 30.1-57.6 67.2-57.6h5c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h5c37.1 0 67.2 25.8 67.2 57.6v19.2z" /></svg>
                    </span>
                    <input type="file" id="file" className="buttonFile" accept=".jpg,.jpeg,.png,.gif,.bmp" onChange={this.onFileChange} />
                  </label>
                </button>
                <div className="popin_info" />

              </div>

              <div className="popin_right">
                <div className="popin_bloc">
                  <h2>2. { this.props.lang !== 'en' ? 'Modifier le texte' : 'Modify text'}</h2>
                  {/* <input type="text" /> */}
                  <div className="popin_bloc_textfield">
                    <TextField
                      id="standard-text"
                      className="popin_bloc_input"
                      value={this.state.texte}
                      onChange={this.handleChange('texte')}
                      margin="normal"
                    />
                  </div>
                </div>
                <div className="popin_bloc">
                  <h2>3. { this.props.lang !== 'en' ? 'Modifier la légende' : 'Modify legend'}</h2>
                  {/* <input type="text" /> */}
                  <div className="popin_bloc_textfield">
                    <TextField
                      id="standard-legend"
                      className="popin_bloc_input"
                      value={this.state.legend}
                      onChange={this.handleChange('legend')}
                      margin="normal"
                      inputProps={{ min: 0, style: { textAlign: 'center' } }}
                      style={{ width: 100 }}
                    />
                  </div>
                  <div className="intro-subtitle animated flipInX"><span /></div>
                </div>
              </div>

            </div>
            <button className="popin_button commonButton" onClick={this.clicValidate} type="button">
              <span>{ this.props.lang !== 'en' ? 'VALIDER' : 'VALIDATE'}</span>
              <span>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" /></svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

}

export default Popin;
