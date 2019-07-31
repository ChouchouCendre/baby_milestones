import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// import './popinInfos.scss';

class PopinInfos extends PureComponent {

  constructor() {
    super();
    this.state = {
      firstname: '',
      height: '51 cm',
      birthdate: '',
      hourBirthdate: '',
      weight: '4,06 kg',
      // selectedDate: new Date('2014-08-18T21:11:54'),
      valueCheckbox: 'M',
    };
    this.clicClose = this.clicClose.bind(this);
    this.clickChoice = this.clickChoice.bind(this);
    this.clicValidate = this.clicValidate.bind(this);
  }

  componentDidMount() {
    this.initEvents();
    this.setState({
      firstname: this.props.appState.firstname, height: this.props.appState.height, birthdate: this.props.appState.birthdate, hourBirthdate: this.props.appState.hourBirthdate, weight: this.props.appState.weight, valueCheckbox: this.props.appState.gender,
    });
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

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

  initEvents() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27 && this.props.displayPopin) this.clicClose();
    });
  }

  /*
  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };
  */

  render() {
    const classDialog = this.props.displayPopin ? ' dialog--open' : '';
    return (
      <div id="popin" className={`dialog popin--infos dialog--close${classDialog}`}>
        <div className="dialog__overlay" onClick={this.clicClose} role="button" />
        <div className="dialog__content" ref={c => (this.popin = c)}>
          <div className="dialog__close" onClick={this.clicClose} role="button" />
          <div className="dialog-inner">
            <div className="popin_title">Informations</div>
            <div className="popin_areas">
              <div className="popin_left">
                <div className="popin_bloc">
                  <h2>1. { this.props.lang !== 'en' ? 'Prénom' : 'Name'}</h2>
                  {/* <input type="text" /> */}
                  <div className="popin_bloc_textfield">

                    <TextField
                      id="standard-name"
                      className="popin_bloc_input"
                      value={this.state.firstname}
                      onChange={this.handleChange('firstname')}
                      margin="normal"
                    />
                  </div>
                </div>
                <div className="popin_bloc">
                  <h2>2. { this.props.lang !== 'en' ? 'Taille' : 'Height'}</h2>
                  {/* <input type="text" /> */}
                  <div className="popin_bloc_textfield">
                    <TextField
                      id="standard-legend"
                      className="popin_bloc_input"
                      value={this.state.height}
                      onChange={this.handleChange('height')}
                      margin="normal"
                      inputProps={{ min: 0, style: { textAlign: 'center' } }}
                      style={{ width: 100 }}
                    />
                  </div>
                  <div className="intro-subtitle animated flipInX"><span /></div>
                </div>
              </div>
              <div className="popin_right">

                <div className="popin_bloc">
                  <h2>3. { this.props.lang !== 'en' ? 'Date de naissance' : 'Birthdate'}</h2>
                  <div className="popin_bloc_textfield">
                    <div className="popin_bloc_textfield-cont">
                      {/*
                      <form noValidate>
                        <TextField
                          id="datetime-local"
                          type="datetime-local"
                          // defaultValue={this.props.lang === 'en' ? '2014-12-06T10:30' : '2017-05-24T10:30'}
                          defaultValue="2014-12-30T10:30"
                          InputLabelProps={{ shrink: true }}
                          onChange={this.handleChangeDate('birthdate')}
                        />
                      </form>
                      */}
                      <TextField
                        id="date"
                        value={this.state.birthdate}
                        onChange={this.handleChange('birthdate')}
                        inputProps={{ min: 0, style: { textAlign: 'center' } }}
                        style={{ width: 150 }}
                      />
                      <TextField
                        id="hour"
                        value={this.state.hourBirthdate}
                        onChange={this.handleChange('hourBirthdate')}
                        inputProps={{ min: 0, style: { textAlign: 'center' } }}
                        style={{ width: 100 }}
                      />
                      {
                      this.props.lang !== 'en' && <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="Gender"
                          name="gender"
                          value={this.state.valueCheckbox}
                          onChange={this.handleChange('valueCheckbox')}
                          className="popin_gender"
                        >
                          <FormControlLabel value="F" control={<Radio />} label="👧" />
                          <FormControlLabel value="M" control={<Radio />} label="👦" />
                        </RadioGroup>
                      </FormControl>
                      }
                    </div>
                  </div>
                  <div className="intro-subtitle animated flipInX"><span /></div>
                </div>

                <div className="popin_bloc">
                  <h2>4. { this.props.lang !== 'en' ? 'Poids' : 'Weight'}</h2>
                  <div className="popin_bloc_textfield">
                    <TextField
                      id="standard-legend"
                      className="popin_bloc_input"
                      value={this.state.weight}
                      onChange={this.handleChange('weight')}
                      margin="normal"
                      inputProps={{ min: 0, style: { textAlign: 'center' } }}
                      style={{ width: 100 }}
                    />
                  </div>
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

export default PopinInfos;
