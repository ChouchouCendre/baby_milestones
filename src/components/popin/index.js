import React, { PureComponent } from 'react';

import './popin.scss';
// import Picture from './../picture';

const movieNames = ['INDIANA JONES', 'GLADIATOR', 'MAD MAX', 'BATMAN', 'GAME OF THRONES'];
let popinTimeline = null;

class Popin extends PureComponent {

  constructor() {
    super();
    this.state = {
      inputName: '',
      file: undefined,
      img: 'img/IMG_8109.jpg',
    };
    this.clicClose = this.clicClose.bind(this);
    this.handlerTimer = this.handlerTimer.bind(this);
    this.clickChoice = this.clickChoice.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
  }

  componentDidMount() {
    this.initEvents();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.displayPopin !== this.props.displayPopin) {
      if (this.props.displayPopin) {
        if (popinTimeline) popinTimeline.restart();
        this.count = 0;
        const rand = Math.round(Math.random() * (movieNames.length - 1));
        this.currentMovie = movieNames[rand];
        this.interval = setInterval(this.handlerTimer, 300);
      } else {
        clearInterval(this.interval);
        this.interval = null;
        if (popinTimeline) popinTimeline.pause();
      }
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

  fileChangedHandler(event) {
    const file = event.target.files[0];
    console.log('file', file);
    // this.setState({ img: file });
    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        file: file,
        img: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  mouseDown() {
    console.log('@@@ mouseDown');
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mousemup', this.mouseUp);
    // document.addEventListener('mousemove', this.mouseMove);
  }

  mouseMove() {
    console.log('@@@ mouseMove');
  }

  mouseUp() {
    console.log('@@@ mouseUp');
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mousemup', this.mouseUp);
  }

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
              <h2>1. Texte</h2>
              <input type="text" />
              <hr />
              <h2>2. Photo</h2>
              <div className="popin_img" onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>
                {/* <Picture img="img/IMG_8109.jpg" months="21" /> */}
                {/*
                <div className="pictures_line_img" style={{ backgroundImage: `url(${this.state.img})` }} />
                */}
                <img src={this.state.img} alt="" />
                {/* <button onClick={this.uploadHandler}>Upload!</button> */}
              </div>
              <input type="file" accept=".jpg,.jpeg,.png,.gif,.bmp" onChange={this.fileChangedHandler} />
              <div className="popin_info">Vos photos ne sont pas chargées sur un serveur.</div>
              <hr />
              <h2>3. Légende</h2>
              <input type="text" />
              <div className="intro-subtitle animated flipInX"><span></span></div>

              {/*
              <div className="dialog__choices">
                <div className="dialog__choice" onClick={ this.clickChoice }>
                  <div className="multichoice">
                    <div>
                      <span></span>
                      <div>INCEPTION</div>
                    </div>
                    <div>
                      <span className="movie1"></span>
                      <div>SAW</div>
                    </div>
                    <div>
                      <span className="movie2"></span>
                      <div>AVENGERS</div>
                    </div>
                  </div>
                  <button className="action" data-dialog-close="a"><span></span>
                  </button>
                </div>
                <div className="dialog__choice" onClick={ this.clickChoice }>
                  <div className="inputmode">
                    <input type="text" value={ this.state.inputName || '' } name="toto" onChange={ () => { }} readOnly />
                    <div className="inputmode-ok">OK</div>
                  </div>
                  <button className="action" data-dialog-close="a"><span></span>
                  </button>
                </div>
              </div>
              */}
            </div>
          </div>
      </div>
    );
  }

}

export default Popin;
