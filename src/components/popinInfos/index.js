import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import moment from 'moment';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import './popinInfos.scss';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Lato',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

class PopinInfos extends PureComponent {

  constructor() {
    super();
    this.state = {
      firstname: '',
      height: '51 cm',
      birthdate: '05/07/14',
      hourBirthdate: '16h00',
      weight: '4,06 kg',
      selectedDate: new Date('2014-08-18T21:11:54'),
      valueCheckbox: 'M',
    };
    console.log('this.props', this.props);
    this.clicClose = this.clicClose.bind(this);
    this.handlerTimer = this.handlerTimer.bind(this);
    this.clickChoice = this.clickChoice.bind(this);
    this.clicValidate = this.clicValidate.bind(this);
  }

  componentDidMount() {
    this.initEvents();
    console.log('this.props', this.props);
    this.setState({ firstname: this.props.appState.firstname, height: this.props.appState.height, birthdate: this.props.appState.birthdate, weight: this.props.appState.weight, valueCheckbox: this.props.appState.gender });
  }

  componentDidUpdate() {
    console.log('this.props', this.props);
    // this.setState({ firstname: this.props.appState.firstname });
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
    this.props.updateDatas(this.state.firstname, this.state.height, this.state.birthdate, this.state.hourBirthdate, this.state.weight, this.state.valueCheckbox);
    // this.props.updateDatas(this.state);
    this.clicClose();
  }

  // MATERIAL TEXTFIELD

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChangeDate = name => event => {
    console.log('>>> event.target.value', event.target.value);
    this.setState({
      [name]: moment(event.target.value).format('DD/MM/YYYY'),
      hourBirthdate: moment(event.target.value).format('HH/mm'),
    });
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const classDialog = this.props.displayPopin ? ' dialog--open' : '';
    return (
      <div id="popin" className={`dialog dialog--close${classDialog}`}>
        <div className="dialog__overlay" onClick={ this.clicClose }></div>
          <div className="dialog__content" ref={ c => (this.popin = c) }>
            <div className="dialog__close" onClick={ this.clicClose }></div>
            <div className="dialog-inner">
              <div className="popin_title">Informations Générales</div>
              <div className="popin_areas">
                <div className="popin_left">
                  <div className="popin_bloc">
                  <h2>1. Prénom</h2>
                    {/* <input type="text" /> */}
                    <div className="popin_bloc_textfield">
                    <ThemeProvider theme={theme}>
                    <TextField
              id="standard-name"
              className="popin_bloc_input"
              value={this.state.firstname}
              onChange={this.handleChange('firstname')}
              margin="normal"
            />
            </ThemeProvider>
            </div>
                  </div>
                  <div className="popin_bloc">
                  <h2>2. Taille</h2>
                  {/* <input type="text" /> */}
                  <div className="popin_bloc_textfield">
                  <TextField
              id="standard-legend"
              className="popin_bloc_input"
              value={this.state.height}
              onChange={this.handleChange('height')}
              margin="normal"
            />
            </div>
                <div className="intro-subtitle animated flipInX"><span></span></div>
                </div>
                </div>
                <div className="popin_right">

                <div className="popin_bloc">
                  <h2>3. Date de naissance</h2>
                  {/* <input type="text" /> */}
                  <div className="popin_bloc_textfield">
                  {/*
                  <TextField
              id="standard-legend"
              className="popin_bloc_input"
              value={this.state.birthdate}
              onChange={this.handleChange('birthdate')}
              margin="normal"
            />
                  */}
                   <form noValidate>
      <TextField
        id="datetime-local"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={this.handleChangeDate('birthdate')}
      />
    </form>
    <FormControl component="fieldset">
          <RadioGroup
            aria-label="Gender"
            name="gender"
            value={this.state.valueCheckbox}
            onChange={this.handleChange('valueCheckbox')}
            className="popin_gender"
          >
            <FormControlLabel value="F" control={<Radio />} label="Fille" />
            <FormControlLabel value="M" control={<Radio />} label="Garçon" />
          </RadioGroup>
        </FormControl>
            </div>
                <div className="intro-subtitle animated flipInX"><span></span></div>
                </div>

            <div className="popin_bloc">
                <h2>5. Poids</h2>
                <div className="popin_bloc_textfield">
                  <TextField
              id="standard-legend"
              className="popin_bloc_input"
              value={this.state.weight}
              onChange={this.handleChange('weight')}
              margin="normal"
            />
            </div>
            </div>

                </div>
                </div>
              <button className="popin_button" onClick={this.clicValidate}>VALIDER</button>
            </div>
          </div>
      </div>
      
    );
  }

}

export default PopinInfos;
