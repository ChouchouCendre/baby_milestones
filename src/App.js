import React, { Component } from 'react';
import './App.scss';
import Picture from './components/picture';
import Popin from './components/popin';

class App extends Component {

  constructor() {
    super();
    this.state = {
      popinOpen: false,
      datas: [
        {
          label: 'MA PREMIÈRE PHOTO', legend: '4m', img: 'img/20141116_205922.jpg', crop: { x: 0, y: 0 }, zoom: 1,
        },
        {
          label: 'J\'AI EU MA PREMIÈRE DENT À', legend: '6m', img: 'img/IMG_6160.jpg', crop: { x: 0, y: 0 }, zoom: 1,
        },
        {
          label: 'JE ME SUIS ASSIS SEUL À', legend: '9m', img: 'img/IMG_6447.jpg', crop: { x: 0, y: 0 }, zoom: 1,
        },
        {
          label: 'J\'AI FAIT DU 4 PATTES À', legend: '11m', img: 'img/IMG_6456.jpg', crop: { x: 0, y: 0 }, zoom: 1,
        },
        {
          label: 'J\'AI MARCHÉ À', legend: '12m', img: 'img/IMG_7493.jpg', crop: { x: 0, y: 0 }, zoom: 1,
        },
        {
          label: 'MON PREMIER ANNIVERSAIRE', legend: '12m', img: 'img/IMG_7528.jpg', crop: { x: 0, y: 0 }, zoom: 1,
        },
        {
          label: 'J\'AI MANGÉ SEUL À', legend: '17m', img: 'img/IMG_7788.jpg', crop: { x: 0, y: 0 }, zoom: 1,
        },
        {
          label: 'J\'AI DIT PAPA À', legend: '21m', img: 'img/IMG_8109.jpg', crop: { x: 0, y: 0 }, zoom: 1,
        },
        {
          label: 'J\'AI DIT MAMAN À', legend: '24m', img: 'img/IMG_8396.jpg', crop: { x: 0, y: 0 }, zoom: 1,
        },
      ],
      currentId: undefined,
      // currentLabel: undefined,
      // currentLegend: undefined,
    };
    this.openPopin = this.openPopin.bind(this);
    this.closePopin = this.closePopin.bind(this);
    this.updateDatas = this.updateDatas.bind(this);
  }

  openPopin(id) {
    this.setState({ popinOpen: true, currentId: id });
  }

  updateDatas(label, legend, img, crop, zoom) {
    console.log('@@@ updateDatas');
    const datas = [...this.state.datas];
    datas[this.state.currentId].label = label;
    datas[this.state.currentId].legend = legend;
    datas[this.state.currentId].img = img;
    datas[this.state.currentId].crop = crop;
    datas[this.state.currentId].zoom = zoom;
    console.log('img', img);
    console.log('datas[this.state.currentId]', datas[this.state.currentId]);
    this.setState({ datas });
    this.closePopin();
  }

  closePopin() {
    this.setState({ popinOpen: false });
  }

  renderPictures() {
    return this.state.datas.map((data, i) => <Picture key={i} id={i} clicOpenPopin={this.openPopin} label={data.label} img={data.img} months={data.legend} crop={data.crop} zoom={data.zoom} />);
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
            <div className="pictures_container">
              { this.renderPictures() }
            </div>
          </div>
          <div className="generate"><button>GENERATE PDF</button></div>
          <Popin displayPopin={this.state.popinOpen} closePopin={this.closePopin} currentDatas={this.state.datas[this.state.currentId]} updateDatas={this.updateDatas} id={this.state.currentId} />
        </div>
      </div>
    );
  }
}

export default App;
