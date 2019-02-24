import React, { Component } from 'react';
import './App.scss';
import Picture from './components/picture';
import Popin from './components/popin';

class App extends Component {

  constructor() {
    super();
    this.state = {
      popinOpen: false,
    }
    this.openPopin = this.openPopin.bind(this);
    this.closePopin = this.closePopin.bind(this);
  }

  openPopin() {
    this.setState({ popinOpen: true });
  }

  closePopin() {
    this.setState({ popinOpen: false });
  }

  render() {
    return (
      <div className="App">
      <div>
        <div className="heart"><img src="svg/heart.svg" width="40" alt="" /></div>
        <div className="heart2"><img src="svg/heart.svg" width="40" alt="" /></div>
        <div>MON PETIT PRÉNOM</div>
        <div className="firstname">
          <div className="trait"><img src="svg/trait.svg" width="100" alt="" /></div>
          <div className="firstname_field">Nolan</div>
          <div className="trait"><img src="svg/trait.svg" width="100" alt="" /></div>
        </div>
        <div className="three">
          <div>
            <div className="three_title">JE MESURAIS</div>
            <div className="three-second">51 cm</div>
          </div>
          <div>
            <div className="three_title">JE SUIS NÉ LE</div>
            <div className="three-date">05/07/14<br />à 16h32</div>
          </div>
          <div>
            <div className="three_title">JE PESAIS</div>
            <div className="three-second">4,06 kg</div>
          </div>
        </div>
        <div className="pictures">
          <div className="pictures_line">
            <Picture clicOpenPopin={this.openPopin} img="img/20141116_205922.jpg" months="4" />
            <Picture clicOpenPopin={this.openPopin} img="img/IMG_6160.jpg" months="6" />
            <Picture clicOpenPopin={this.openPopin} img="img/IMG_6447.jpg" months="9" />
          </div>
          <div className="pictures_line">
            <Picture clicOpenPopin={this.openPopin} img="img/IMG_6456.jpg" months="11" />
            <Picture clicOpenPopin={this.openPopin} img="img/IMG_7493.jpg" months="12" />
            <Picture clicOpenPopin={this.openPopin} img="img/IMG_7528.jpg" months="14" />
          </div>
          <div className="pictures_line">
            <Picture clicOpenPopin={this.openPopin} img="img/IMG_7788.jpg" months="17" />
            <Picture clicOpenPopin={this.openPopin} img="img/IMG_8109.jpg" months="21" />
            <Picture clicOpenPopin={this.openPopin} img="img/IMG_8396.jpg" months="24" />
          </div>
        </div>
        <Popin displayPopin={this.state.popinOpen} closePopin={this.closePopin} />
      </div>
      </div>
    );
  }
}

export default App;
