import React, { Component } from 'react';
import './App.scss';
import Picture from './components/picture';
import Popin from './components/popin';
import PopinInfos from './components/popinInfos';

class App extends Component {

  constructor() {
    console.log('@@@ constructor');
    super();
    console.log(JSON.parse(localStorage.getItem('chouchou_datas')));
    this.state = {
      popinOpen: false,
      popinInfosOpen: false,
      datas: JSON.parse(localStorage.getItem('chouchou_datas')) || [
        {
          label: 'MA PREMIÈRE PHOTO', legend: '4m', img: 'img/20141116_205922.jpg', crop: { x: 0, y: 0 }, zoom: 1,
        },
        {
          label: 'J\'AI EU MA PREMIÈRE DENT À', legend: '6m', img: 'img/IMG_6447.jpg', crop: { x: 0, y: 0 }, zoom: 1,
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
      firstname: localStorage.getItem('chouchou_firstname') || 'Hugo',
      height: localStorage.getItem('chouchou_height') || '50 cm',
      birthdate: localStorage.getItem('chouchou_birthdate') || '01/01/10',
      hourBirthdate: localStorage.getItem('chouchou_hourBirthdate') || '13h30',
      weight: localStorage.getItem('chouchou_weight') || '2,58 kg',
      gender: localStorage.getItem('chouchou_gender') || 'M',
    };
    this.openPopin = this.openPopin.bind(this);
    this.closePopin = this.closePopin.bind(this);
    this.updateDatas = this.updateDatas.bind(this);
    this.clicOpenPopinInfos = this.clicOpenPopinInfos.bind(this);
    this.closePopinInfos = this.closePopinInfos.bind(this);
    this.updateDatasInfos = this.updateDatasInfos.bind(this);
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
    this.setState({ datas }, () => {
      const storageDatas = [...datas];
      // const storageDatas = Object.values(datas);
      storageDatas[this.state.currentId].img = 'img/newborn.jpg';
      console.log('storageDatas', storageDatas);
      console.log('datas', datas);
      localStorage.setItem('chouchou_datas', JSON.stringify(storageDatas));
    });
    this.closePopin();
  }

  updateDatasInfos(firstname, height, birthdate, hourBirthdate, weight, gender) {
    // this.props.updateDatas(this.state.firstname, this.state.height, this.state.birthdate, this.state.weight);
    this.setState({
      firstname,
      height,
      birthdate,
      hourBirthdate,
      weight,
      gender,
    });
    localStorage.setItem('chouchou_firstname', firstname);
    localStorage.setItem('chouchou_height', height);
    localStorage.setItem('chouchou_birthdate', birthdate);
    localStorage.setItem('chouchou_hourBirthdate', hourBirthdate);
    localStorage.setItem('chouchou_weight', weight);
    localStorage.setItem('chouchou_gender', gender);
  }

  closePopin() {
    this.setState({ popinOpen: false });
  }

  closePopinInfos() {
    this.setState({ popinInfosOpen: false });
  }

  clicPrint() {
    console.log('@@@ clicPrint');
    window.print();
  }

  clicOpenPopinInfos() {
    console.log('@@@ clicOpenPopinInfos');
    this.setState({ popinInfosOpen: true });
  }

  renderPictures() {
    return this.state.datas.map((data, i) => <Picture key={i} id={i} clicOpenPopin={this.openPopin} label={data.label} img={data.img} months={data.legend} crop={data.crop} zoom={data.zoom} />);
  }

  render() {
    console.log('this.state', this.state);
    return (
      <React.Fragment>
        <div className="App">
          <div>
            <div className="heart"><img src="svg/heart.svg" width="40" alt="" /></div>
            <div className="heart2"><img src="svg/heart.svg" width="40" alt="" /></div>
            <div>MON PETIT PRÉNOM</div>
            <div className="firstname">
              <div className="trait"><img src="svg/trait.svg" width="100" alt="" /></div>
              <div className="firstname_field hover" role="button" onClick={this.clicOpenPopinInfos}>{ this.state.firstname }</div>
              <div className="trait"><img src="svg/trait.svg" width="100" alt="" /></div>
            </div>
            <div className="three">
              <div>
                <div className="three_title">JE MESURAIS</div>
                <div className="three-second hover" role="button" onClick={this.clicOpenPopinInfos}>{ this.state.height }</div>
              </div>
              <div>
                <div className="three_title">{this.state.gender === 'M' ? 'JE SUIS NÉ LE' : 'JE SUIS NÉE LE'}</div>
                <div className="three-date hover" role="button" onClick={this.clicOpenPopinInfos}>{ this.state.birthdate }<br />à { this.state.hourBirthdate }</div>
              </div>
              <div>
                <div className="three_title">JE PESAIS</div>
                <div className="three-second hover" role="button" onClick={this.clicOpenPopinInfos}>{ this.state.weight }</div>
              </div>
            </div>
            <div className="pictures">
              <div className="pictures_container">
                { this.renderPictures() }
              </div>
            </div>
            <Popin displayPopin={this.state.popinOpen} closePopin={this.closePopin} currentDatas={this.state.datas[this.state.currentId]} updateDatas={this.updateDatas} id={this.state.currentId} />
            <PopinInfos displayPopin={this.state.popinInfosOpen} closePopin={this.closePopinInfos} updateDatas={this.updateDatasInfos} appState={this.state} />
          </div>
        </div>
        <div className="generate">
          <button type="button" onClick={this.clicPrint} className="chouchouButton">IMPRIMER</button>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
