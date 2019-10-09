import React, { Component } from 'react';
import './App.scss';
import Picture from './components/picture';
import Popin from './components/popin';
import PopinInfos from './components/popinInfos';

class App extends Component {

  constructor() {
    super();

    let lang;
    let couple = false;
    if ('URLSearchParams' in window) {
      const searchParams = new URLSearchParams(document.location.search);
      const langParam = searchParams.get('lang');
      lang = langParam || 'fr';
      lang = lang.toLowerCase();
      // Couple
      const coupleParam = searchParams.get('couple');
      couple = coupleParam === 'true';
    } else {
      lang = 'fr';
    }

    // Detect navigator, if not Chrome or Safari
    const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    const uA = navigator.userAgent.toLowerCase();
    const isSafari = uA.indexOf('safari') !== -1 && uA.indexOf('edge') === -1;
    const isChromeOrSafari = isChrome || isSafari;

    // Default labels
    let defaultName = 'Hugo';
    if (couple) defaultName = 'Hugo & Lea';
    //
    let defaultHeight = '50 cm';
    if (!couple && lang === 'en') defaultHeight = '20 inches';
    if (couple) defaultHeight = '12/12/2017';
    //
    let defaultWeight = '2,58 kg';
    if (!couple && lang === 'en') defaultWeight = '6.3 pounds';
    if (couple) defaultWeight = '9';

    this.state = {
      popinOpen: false,
      popinInfosOpen: false,
      datas: JSON.parse(localStorage.getItem('chouchou_datas')) || [
        {
          label: lang === 'en' ? 'MY FIRST PICTURE' : 'MA PREMIÈRE PHOTO 📷', legend: '4m', img: 'img/baby1.jpg', crop: { x: 0, y: 0 }, zoom: 1, rotation: 0,
        },
        {
          label: lang === 'en' ? 'MY FIRST TOOTH' : 'J\'AI EU MA PREMIÈRE DENT À', legend: '6m', img: 'img/baby2.jpg', crop: { x: 0, y: 0 }, zoom: 1, rotation: 0,
        },
        {
          label: lang === 'en' ? 'I SAT BY MYSELFT AT' : 'JE ME SUIS ASSIS SEUL À', legend: '9m', img: 'img/baby3.jpg', crop: { x: 0, y: 0 }, zoom: 1, rotation: 0,
        },
        {
          label: lang === 'en' ? 'I HAVE CRAWLED AT' : 'J\'AI FAIT DU 4 PATTES À', legend: '11m', img: 'img/baby4.jpg', crop: { x: 0, y: 0 }, zoom: 1, rotation: 0,
        },
        {
          label: lang === 'en' ? 'I HAVE WALKED AT' : 'J\'AI MARCHÉ À 👣', legend: '12m', img: 'img/baby5.jpg', crop: { x: 0, y: 0 }, zoom: 1, rotation: 0,
        },
        {
          label: lang === 'en' ? 'MY FIRST BIRTHDAY 🎉' : 'MON PREMIER ANNIVERSAIRE 🎉', legend: '12m', img: 'img/baby6.jpg', crop: { x: 0, y: 0 }, zoom: 1, rotation: 0,
        },
        {
          label: lang === 'en' ? 'MY FIRST SOLID MEAL 🥄' : 'J\'AI MANGÉ SEUL À 🥄', legend: '17m', img: 'img/baby7.jpg', crop: { x: 0, y: 0 }, zoom: 1, rotation: 0,
        },
        {
          label: lang === 'en' ? 'I HAVE SAID DADDY AT' : 'J\'AI DIT PAPA À', legend: '21m', img: 'img/baby8.jpg', crop: { x: 0, y: 0 }, zoom: 1, rotation: 0,
        },
        {
          label: lang === 'en' ? 'MY FIRST RIDE' : 'J\'AI DIT MAMAN À', legend: '24m', img: 'img/baby9.jpg', crop: { x: 0, y: 0 }, zoom: 1, rotation: 0,
        },
      ],
      currentId: undefined,
      firstname: localStorage.getItem('chouchou_firstname') || defaultName,
      height: localStorage.getItem('chouchou_height') || defaultHeight,
      birthdate: localStorage.getItem('chouchou_birthdate') || (lang === 'en' ? '12/30/2014' : '30/12/2014'),
      hourBirthdate: localStorage.getItem('chouchou_hourBirthdate') || (lang === 'en' ? '10am' : '10h30'),
      weight: localStorage.getItem('chouchou_weight') || defaultWeight,
      gender: localStorage.getItem('chouchou_gender') || 'M',
      lang,
      isChromeOrSafari,
      couple,
    };
    this.openPopin = this.openPopin.bind(this);
    this.closePopin = this.closePopin.bind(this);
    this.updateDatas = this.updateDatas.bind(this);
    this.clicOpenPopinInfos = this.clicOpenPopinInfos.bind(this);
    this.closePopinInfos = this.closePopinInfos.bind(this);
    this.updateDatasInfos = this.updateDatasInfos.bind(this);
    this.updateDatasRotation = this.updateDatasRotation.bind(this);
  }

  getLabel(name) {
    let result = '';
    const { lang } = this.state;
    // COUPLE
    if (this.state.couple) {
      if (name === 'prenom') result = lang !== 'en' ? 'NOTRE PETIT COUPLE' : 'OUR LITTLE COUPLE';
      if (name === 'taille') result = lang !== 'en' ? 'DATE DE PACS / MARIAGE' : 'WEDDING DATE';
      if (name === 'poids') result = lang !== 'en' ? 'NOMBRE D\'ANNÉES' : 'NUMBERS OF YEARS';
      if (name === 'date') result = lang !== 'en' ? 'DATE DE RENCONTRE' : 'OUR FIRST ENCOUNTER';
      
      return result;
    }
    // BABY
    if (name === 'prenom') result = lang !== 'en' ? 'MON PETIT PRÉNOM' : 'MY LITTLE NAME';
    if (name === 'taille') result = lang !== 'en' ? 'JE MESURAIS' : 'MY HEIGHT';
    if (name === 'poids') result = lang !== 'en' ? 'JE PESAIS' : 'MY WEIGHT';
    if (name === 'date') {
      if (lang !== 'en') {
        result = this.state.gender === 'M' ? 'JE SUIS NÉ LE' : 'JE SUIS NÉE LE';
      } else {
        result = 'MY BIRTHDATE';
      }
    }
    return result;
  }

  openPopin(id) {
    this.setState({ popinOpen: true, currentId: id });
  }

  updateDatas(label, legend, img, crop, zoom) {
    const datas = [...this.state.datas];
    datas[this.state.currentId].label = label;
    datas[this.state.currentId].legend = legend;
    datas[this.state.currentId].img = img;
    console.info('img.length', img.length);
    // Local storage = 10 Mo
    // 2 867 515 = 2,2 Mo
    // 1 363 031 = 1 Mo
    // 232 231 = 174 Ko
    datas[this.state.currentId].crop = crop;
    datas[this.state.currentId].zoom = zoom;
    this.setState({ datas }, () => {
      const storageDatas = [...datas];
      // const storageDatas = Object.values(datas);
      // storageDatas[this.state.currentId].img = 'img/baby1.jpg';
      try {
        localStorage.setItem('chouchou_datas', JSON.stringify(storageDatas));
        // localStorage.setItem('chouchou_images', JSON.stringify(storageDatas));
      } catch (e) {
        console.error(e);
      }
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

  updateDatasRotation(id, rotation) {
    const datas = [...this.state.datas];
    datas[id].rotation = rotation;
    this.setState({ datas }, () => {
      const storageDatas = [...datas];
      try {
        localStorage.setItem('chouchou_datas', JSON.stringify(storageDatas));
      } catch (e) {
        console.error(e);
      }
    });
  }

  closePopin() {
    this.setState({ popinOpen: false });
  }

  closePopinInfos() {
    this.setState({ popinInfosOpen: false });
  }

  clicPrint() {
    window.print();
  }

  clicOpenPopinInfos() {
    this.setState({ popinInfosOpen: true });
  }

  /*
  returnLabel() {
    const { lang } = this.state;
    if (this.state.couple) {
      return lang !== 'en' ? 'DATE DE RECONTRE' : 'BBB';
    }
    if (lang !== 'en') {
      return this.state.gender === 'M' ? 'JE SUIS NÉ LE' : 'JE SUIS NÉE LE';
    }
    return 'MY BIRTHDATE';
  }
  */

  renderPictures() {
    return this.state.datas.map((data, i) => <Picture key={i} id={i} clicOpenPopin={this.openPopin} label={data.label} img={data.img} months={data.legend} crop={data.crop} zoom={data.zoom} lang={this.state.lang} rotation={data.rotation} updateDatasRotation={this.updateDatasRotation} />);
  }

  renderDesktopIcon() {
    return (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="desktop" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192l-16 48h-72c-13.3 0-24 10.7-24 24s10.7 24 24 24h272c13.3 0 24-10.7 24-24s-10.7-24-24-24h-72l-16-48h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z" /></svg>);
  }

  renderDesktop() {
    if (this.state.lang === 'en') {
      return (<span>{ this.renderDesktopIcon() }<br />SORRY, THIS APPLICATION IS ONLY AVAILABLE FOR DESKTOP.<br /><small>(minimum resolution : 768px)</small></span>);
    }
    return (<span>{ this.renderDesktopIcon() }<br />DÉSOLÉE, CETTE APPLICATION N&apos;EST PAS DISPONIBLE SUR MOBILE.<br /><small>(résolution minimum : 768px)</small></span>);
  }

  renderNavigator() {
    if (this.state.lang === 'en') {
      return 'This page is not optimized for you browser... I recommand <u>Google Chrome</u> of <u>Safari</u>.';
    }
    return 'L\'affichage ainsi que l\'impression peuvent poser problème sur votre navigateur... Je vous recommande d\'utiliser <u>Google Chrome</u> ou <u>Safari</u>.';
  }

  render() {
    return (
      <React.Fragment>
        <div className="dialog popinDesktop">
          <div className="dialog__overlay" />
          <div className="dialog__content">{ this.renderDesktop() }</div>
        </div>
        {
        !this.state.isChromeOrSafari && <div className="bannerNavigator">
          <div dangerouslySetInnerHTML={{ __html: this.renderNavigator() }} />
        </div>
        }
        <div className="App">
          <div>
            <div className="heart"><img src="svg/heart.svg" width="40" alt="" /></div>
            <div className="heart2"><img src="svg/heart.svg" width="40" alt="" /></div>
            <div>{ this.getLabel('prenom') }</div>
            <div className="firstname">
              <div className="trait"><img src="svg/trait.svg" width="100" alt="" /></div>
              <div className="firstname_field hover" role="button" onClick={this.clicOpenPopinInfos}>{ this.state.firstname }</div>
              <div className="trait"><img src="svg/trait.svg" width="100" alt="" /></div>
            </div>
            <div className="three">
              <div className="three_cont">
                <div className="three_title">{ this.getLabel('taille') }</div>
                <div className="three-second hover" role="button" onClick={this.clicOpenPopinInfos}>{ this.state.height }</div>
              </div>
              <div className="three_cont">
                <div className="three_title">{ this.getLabel('date') }
                </div>
                <div className="three-date hover" role="button" onClick={this.clicOpenPopinInfos}>{ this.state.birthdate }<br />{this.state.lang !== 'en' && 'à'} { this.state.hourBirthdate }</div>
              </div>
              <div className="three_cont">
                <div className="three_title">{ this.getLabel('poids') }</div>
                <div className="three-second hover" role="button" onClick={this.clicOpenPopinInfos}>{ this.state.weight }</div>
              </div>
            </div>
            <div className="pictures">
              <div className="pictures_container">
                { this.renderPictures() }
              </div>
            </div>
            <Popin displayPopin={this.state.popinOpen} closePopin={this.closePopin} currentDatas={this.state.datas[this.state.currentId]} updateDatas={this.updateDatas} id={this.state.currentId} lang={this.state.lang} />
            <PopinInfos
              displayPopin={this.state.popinInfosOpen}
              closePopin={this.closePopinInfos}
              updateDatas={this.updateDatasInfos}
              appState={this.state}
              lang={this.state.lang}
              labelPrenom={this.getLabel('prenom')}
              labelPoids={this.getLabel('poids')}
              labelTaille={this.getLabel('taille')}
              labelDate={this.getLabel('date')}
            />
          </div>
        </div>
        <div className="generate">
          <button type="button" onClick={this.clicPrint} className="chouchouButton commonButton">
            <span>{ this.state.lang !== 'en' ? 'IMPRIMER' : 'PRINT'}</span>
            <span>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="print" className="svg-inline--fa fa-print fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M448 192V77.25c0-8.49-3.37-16.62-9.37-22.63L393.37 9.37c-6-6-14.14-9.37-22.63-9.37H96C78.33 0 64 14.33 64 32v160c-35.35 0-64 28.65-64 64v112c0 8.84 7.16 16 16 16h48v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h48c8.84 0 16-7.16 16-16V256c0-35.35-28.65-64-64-64zm-64 256H128v-96h256v96zm0-224H128V64h192v48c0 8.84 7.16 16 16 16h48v96zm48 72c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z" /></svg>
            </span>
          </button>
        </div>
        <div className="footer">
          <span>{ this.state.lang !== 'en' ? 'Crédits :' : 'Credits :'} <a href="https://www.lesaventuresduchouchou.com" target="_blank" rel="noopener noreferrer">Les Aventures du Chouchou Cendré</a></span>
          /
          {
            this.state.lang !== 'en'
              ? <span>🇬🇧  Also available in <a href="index.html?lang=en">english</a></span>
              : <span>🇫🇷  Aussi disponible en <a href="index.html">français</a></span>
          }
          /
          {
            this.state.lang !== 'en'
              ? <span>👥 <a href="index.html?couple=true" rel="noopener noreferrer">Couple version</a></span>
              : <span>👥 <a href="index.html?lang=en&couple=true" rel="noopener noreferrer">Version couple</a></span>
          }
          /
          <span>{ this.state.lang !== 'en' ? '📍  Partager : ' : '📍  Share: '} <a href="https://www.facebook.com/LesAventuresDuChouchou/" target="_blank" rel="noopener noreferrer">Facebook</a> | <a href="https://twitter.com/ChouchouCendre" target="_blank" rel="noopener noreferrer">Twitter</a> | <a href="https://www.instagram.com/chouchou_cendre/" target="_blank" rel="noopener noreferrer">Instagram</a> | <a href="https://www.pinterest.fr/chouchoucendre/" target="_blank" rel="noopener noreferrer">Pinterest</a></span>
          /
          <span>SVG Icons from <a href="https://fontawesome.com" target="_blank" rel="noopener noreferrer">Font Awesome</a></span>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
