import React, { Component } from 'react';
import { connect } from 'react-redux';
import {v1 as uuidv1} from 'uuid';
import {
  Grid,
  withStyles,
  Typography, 
  TextField, 
  Button, 
  FormControl, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  FormLabel, 
  Select, 
  FormHelperText, 
  MenuItem, 
  InputLabel,
  Box
 } from '@material-ui/core';
// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

const styles = {   
  submitButton: { 
    textAlign: "right", 
    marginRight: '5%', 
    marginTop: "60px"
  }, 
  createButton: { 
    textAlign: "Left", 
    marginLeft: '5%', 
    marginTop: "60px"
  },
  formBox: { 
    marginLeft: "3%", 
    marginRight: "3%", 
    minHeight: "50vh", 
    paddingTop: "3%", 
    backgroundColor: "white"
  }
}

class CreateLesson extends Component {
  state = {
    newLesson: { 
      lesson_owner_id: this.props.reduxState.user.id,
      lessonName: '', 
      language: '', 
      description: '', 
      notes: '',
      public: true, 
      country: '',
      difficulty: 'beginner',
      code: ''
    }, 
    lessonCreated: false, 
  };

  componentDidMount() { 
    let myuuid = uuidv1();
    console.log('Your UUID is: ' + myuuid);
    this.setState({ 
      newLesson: { 
        ...this.state.newLesson,
        code: myuuid
      }
    })
  }

  handleChangeFor = (event, inputType) => { 
    if (inputType !== 'public') { 
      this.setState({ 
        newLesson: {
          ...this.state.newLesson, 
          [inputType]: event.target.value
        }
      })
    } else { 
      this.setState({ 
        newLesson: {
          ...this.state.newLesson, 
          [inputType]: this.str2bool(event.target.value) 
        }
      })
    }
  }
  submit = () => { 
    this.props.history.push(
      `/add-questions/${this.props.reduxState.lesson.allUserLessons[this.props.reduxState.lesson.allUserLessons.length - 1 ]?.id}`
      )
  }
  create = () => { 
    if (this.state.newLesson.description === '') { 
      alert('please add a lesson name or language')
    } else { 
      this.props.dispatch({type: 'ADD_LESSON', payload: this.state.newLesson});
      this.setState({
        lessonCreated: true
      })
    }
  }
  str2bool = (value) => {
    if (value && typeof value === "string") {
         if (value.toLowerCase() === "true") return true;
         if (value.toLowerCase() === "false") return false;
    }
    return value;
  }
  render() {
    const { classes } = this.props; 
    let submitButton = <Button style={{marginRight: "1000"}} variant="contained" onClick={this.submit}>Next</Button>
    let createButton = <Button style={{marginRight: "1000"}} variant="contained" onClick={this.create}>Create</Button>
    if (this.state.lessonCreated === false) { 
      submitButton = <div></div>
    } 
    if (this.state.lessonCreated === true) { 
      createButton = <div></div>
    } 
  const countries =  [ {"name": "Country", "code": "CC"},
      {"name": "Afghanistan", "code": "AF"}, 
      {"name": "land Islands", "code": "AX"}, 
      {"name": "Albania", "code": "AL"}, 
      {"name": "Algeria", "code": "DZ"}, 
      {"name": "American Samoa", "code": "AS"}, 
      {"name": "AndorrA", "code": "AD"}, 
      {"name": "Angola", "code": "AO"}, 
      {"name": "Anguilla", "code": "AI"}, 
      {"name": "Antarctica", "code": "AQ"}, 
      {"name": "Antigua and Barbuda", "code": "AG"}, 
      {"name": "Argentina", "code": "AR"}, 
      {"name": "Armenia", "code": "AM"}, 
      {"name": "Aruba", "code": "AW"}, 
      {"name": "Australia", "code": "AU"}, 
      {"name": "Austria", "code": "AT"}, 
      {"name": "Azerbaijan", "code": "AZ"}, 
      {"name": "Bahamas", "code": "BS"}, 
      {"name": "Bahrain", "code": "BH"}, 
      {"name": "Bangladesh", "code": "BD"}, 
      {"name": "Barbados", "code": "BB"}, 
      {"name": "Belarus", "code": "BY"}, 
      {"name": "Belgium", "code": "BE"}, 
      {"name": "Belize", "code": "BZ"}, 
      {"name": "Benin", "code": "BJ"}, 
      {"name": "Bermuda", "code": "BM"}, 
      {"name": "Bhutan", "code": "BT"}, 
      {"name": "Bolivia", "code": "BO"}, 
      {"name": "Bosnia and Herzegovina", "code": "BA"}, 
      {"name": "Botswana", "code": "BW"}, 
      {"name": "Bouvet Island", "code": "BV"}, 
      {"name": "Brazil", "code": "BR"}, 
      {"name": "British Indian Ocean Territory", "code": "IO"}, 
      {"name": "Brunei Darussalam", "code": "BN"}, 
      {"name": "Bulgaria", "code": "BG"}, 
      {"name": "Burkina Faso", "code": "BF"}, 
      {"name": "Burundi", "code": "BI"}, 
      {"name": "Cambodia", "code": "KH"}, 
      {"name": "Cameroon", "code": "CM"}, 
      {"name": "Canada", "code": "CA"}, 
      {"name": "Cape Verde", "code": "CV"}, 
      {"name": "Cayman Islands", "code": "KY"}, 
      {"name": "Central African Republic", "code": "CF"}, 
      {"name": "Chad", "code": "TD"}, 
      {"name": "Chile", "code": "CL"}, 
      {"name": "China", "code": "CN"}, 
      {"name": "Christmas Island", "code": "CX"}, 
      {"name": "Cocos (Keeling) Islands", "code": "CC"}, 
      {"name": "Colombia", "code": "CO"}, 
      {"name": "Comoros", "code": "KM"}, 
      {"name": "Congo", "code": "CG"}, 
      {"name": "Congo, The Democratic Republic of the", "code": "CD"}, 
      {"name": "Cook Islands", "code": "CK"}, 
      {"name": "Costa Rica", "code": "CR"}, 
      {"name": "Cote D'Ivoire", "code": "CI"}, 
      {"name": "Croatia", "code": "HR"}, 
      {"name": "Cuba", "code": "CU"}, 
      {"name": "Cyprus", "code": "CY"}, 
      {"name": "Czech Republic", "code": "CZ"}, 
      {"name": "Denmark", "code": "DK"}, 
      {"name": "Djibouti", "code": "DJ"}, 
      {"name": "Dominica", "code": "DM"}, 
      {"name": "Dominican Republic", "code": "DO"}, 
      {"name": "Ecuador", "code": "EC"}, 
      {"name": "Egypt", "code": "EG"}, 
      {"name": "El Salvador", "code": "SV"}, 
      {"name": "Equatorial Guinea", "code": "GQ"}, 
      {"name": "Eritrea", "code": "ER"}, 
      {"name": "Estonia", "code": "EE"}, 
      {"name": "Ethiopia", "code": "ET"}, 
      {"name": "Falkland Islands (Malvinas)", "code": "FK"}, 
      {"name": "Faroe Islands", "code": "FO"}, 
      {"name": "Fiji", "code": "FJ"}, 
      {"name": "Finland", "code": "FI"}, 
      {"name": "France", "code": "FR"}, 
      {"name": "French Guiana", "code": "GF"}, 
      {"name": "French Polynesia", "code": "PF"}, 
      {"name": "French Southern Territories", "code": "TF"}, 
      {"name": "Gabon", "code": "GA"}, 
      {"name": "Gambia", "code": "GM"}, 
      {"name": "Georgia", "code": "GE"}, 
      {"name": "Germany", "code": "DE"}, 
      {"name": "Ghana", "code": "GH"}, 
      {"name": "Gibraltar", "code": "GI"}, 
      {"name": "Greece", "code": "GR"}, 
      {"name": "Greenland", "code": "GL"}, 
      {"name": "Grenada", "code": "GD"}, 
      {"name": "Guadeloupe", "code": "GP"}, 
      {"name": "Guam", "code": "GU"}, 
      {"name": "Guatemala", "code": "GT"}, 
      {"name": "Guernsey", "code": "GG"}, 
      {"name": "Guinea", "code": "GN"}, 
      {"name": "Guinea-Bissau", "code": "GW"}, 
      {"name": "Guyana", "code": "GY"}, 
      {"name": "Haiti", "code": "HT"}, 
      {"name": "Heard Island and Mcdonald Islands", "code": "HM"}, 
      {"name": "Holy See (Vatican City State)", "code": "VA"}, 
      {"name": "Honduras", "code": "HN"}, 
      {"name": "Hong Kong", "code": "HK"}, 
      {"name": "Hungary", "code": "HU"}, 
      {"name": "Iceland", "code": "IS"}, 
      {"name": "India", "code": "IN"}, 
      {"name": "Indonesia", "code": "ID"}, 
      {"name": "Iran, Islamic Republic Of", "code": "IR"}, 
      {"name": "Iraq", "code": "IQ"}, 
      {"name": "Ireland", "code": "IE"}, 
      {"name": "Isle of Man", "code": "IM"}, 
      {"name": "Israel", "code": "IL"}, 
      {"name": "Italy", "code": "IT"}, 
      {"name": "Jamaica", "code": "JM"}, 
      {"name": "Japan", "code": "JP"}, 
      {"name": "Jersey", "code": "JE"}, 
      {"name": "Jordan", "code": "JO"}, 
      {"name": "Kazakhstan", "code": "KZ"}, 
      {"name": "Kenya", "code": "KE"}, 
      {"name": "Kiribati", "code": "KI"}, 
      {"name": "Korea, Democratic People'S Republic of", "code": "KP"}, 
      {"name": "Korea, Republic of", "code": "KR"}, 
      {"name": "Kuwait", "code": "KW"}, 
      {"name": "Kyrgyzstan", "code": "KG"}, 
      {"name": "Lao People'S Democratic Republic", "code": "LA"}, 
      {"name": "Latvia", "code": "LV"}, 
      {"name": "Lebanon", "code": "LB"}, 
      {"name": "Lesotho", "code": "LS"}, 
      {"name": "Liberia", "code": "LR"}, 
      {"name": "Libyan Arab Jamahiriya", "code": "LY"}, 
      {"name": "Liechtenstein", "code": "LI"}, 
      {"name": "Lithuania", "code": "LT"}, 
      {"name": "Luxembourg", "code": "LU"}, 
      {"name": "Macao", "code": "MO"}, 
      {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"}, 
      {"name": "Madagascar", "code": "MG"}, 
      {"name": "Malawi", "code": "MW"}, 
      {"name": "Malaysia", "code": "MY"}, 
      {"name": "Maldives", "code": "MV"}, 
      {"name": "Mali", "code": "ML"}, 
      {"name": "Malta", "code": "MT"}, 
      {"name": "Marshall Islands", "code": "MH"}, 
      {"name": "Martinique", "code": "MQ"}, 
      {"name": "Mauritania", "code": "MR"}, 
      {"name": "Mauritius", "code": "MU"}, 
      {"name": "Mayotte", "code": "YT"}, 
      {"name": "Mexico", "code": "MX"}, 
      {"name": "Micronesia, Federated States of", "code": "FM"}, 
      {"name": "Moldova, Republic of", "code": "MD"}, 
      {"name": "Monaco", "code": "MC"}, 
      {"name": "Mongolia", "code": "MN"}, 
      {"name": "Montenegro", "code": "ME"},
      {"name": "Montserrat", "code": "MS"},
      {"name": "Morocco", "code": "MA"}, 
      {"name": "Mozambique", "code": "MZ"}, 
      {"name": "Myanmar", "code": "MM"}, 
      {"name": "Namibia", "code": "NA"}, 
      {"name": "Nauru", "code": "NR"}, 
      {"name": "Nepal", "code": "NP"}, 
      {"name": "Netherlands", "code": "NL"}, 
      {"name": "Netherlands Antilles", "code": "AN"}, 
      {"name": "New Caledonia", "code": "NC"}, 
      {"name": "New Zealand", "code": "NZ"}, 
      {"name": "Nicaragua", "code": "NI"}, 
      {"name": "Niger", "code": "NE"}, 
      {"name": "Nigeria", "code": "NG"}, 
      {"name": "Niue", "code": "NU"}, 
      {"name": "Norfolk Island", "code": "NF"}, 
      {"name": "Northern Mariana Islands", "code": "MP"}, 
      {"name": "Norway", "code": "NO"}, 
      {"name": "Oman", "code": "OM"}, 
      {"name": "Pakistan", "code": "PK"}, 
      {"name": "Palau", "code": "PW"}, 
      {"name": "Palestinian Territory, Occupied", "code": "PS"}, 
      {"name": "Panama", "code": "PA"}, 
      {"name": "Papua New Guinea", "code": "PG"}, 
      {"name": "Paraguay", "code": "PY"}, 
      {"name": "Peru", "code": "PE"}, 
      {"name": "Philippines", "code": "PH"}, 
      {"name": "Pitcairn", "code": "PN"}, 
      {"name": "Poland", "code": "PL"}, 
      {"name": "Portugal", "code": "PT"}, 
      {"name": "Puerto Rico", "code": "PR"}, 
      {"name": "Qatar", "code": "QA"}, 
      {"name": "Reunion", "code": "RE"}, 
      {"name": "Romania", "code": "RO"}, 
      {"name": "Russian Federation", "code": "RU"}, 
      {"name": "RWANDA", "code": "RW"}, 
      {"name": "Saint Helena", "code": "SH"}, 
      {"name": "Saint Kitts and Nevis", "code": "KN"}, 
      {"name": "Saint Lucia", "code": "LC"}, 
      {"name": "Saint Pierre and Miquelon", "code": "PM"}, 
      {"name": "Saint Vincent and the Grenadines", "code": "VC"}, 
      {"name": "Samoa", "code": "WS"}, 
      {"name": "San Marino", "code": "SM"}, 
      {"name": "Sao Tome and Principe", "code": "ST"}, 
      {"name": "Saudi Arabia", "code": "SA"}, 
      {"name": "Senegal", "code": "SN"}, 
      {"name": "Serbia", "code": "RS"}, 
      {"name": "Seychelles", "code": "SC"}, 
      {"name": "Sierra Leone", "code": "SL"}, 
      {"name": "Singapore", "code": "SG"}, 
      {"name": "Slovakia", "code": "SK"}, 
      {"name": "Slovenia", "code": "SI"}, 
      {"name": "Solomon Islands", "code": "SB"}, 
      {"name": "Somalia", "code": "SO"}, 
      {"name": "South Africa", "code": "ZA"}, 
      {"name": "South Georgia and the South Sandwich Islands", "code": "GS"}, 
      {"name": "Spain", "code": "ES"}, 
      {"name": "Sri Lanka", "code": "LK"}, 
      {"name": "Sudan", "code": "SD"}, 
      {"name": "Suriname", "code": "SR"}, 
      {"name": "Svalbard and Jan Mayen", "code": "SJ"}, 
      {"name": "Swaziland", "code": "SZ"}, 
      {"name": "Sweden", "code": "SE"}, 
      {"name": "Switzerland", "code": "CH"}, 
      {"name": "Syrian Arab Republic", "code": "SY"}, 
      {"name": "Taiwan, Province of China", "code": "TW"}, 
      {"name": "Tajikistan", "code": "TJ"}, 
      {"name": "Tanzania, United Republic of", "code": "TZ"}, 
      {"name": "Thailand", "code": "TH"}, 
      {"name": "Timor-Leste", "code": "TL"}, 
      {"name": "Togo", "code": "TG"}, 
      {"name": "Tokelau", "code": "TK"}, 
      {"name": "Tonga", "code": "TO"}, 
      {"name": "Trinidad and Tobago", "code": "TT"}, 
      {"name": "Tunisia", "code": "TN"}, 
      {"name": "Turkey", "code": "TR"}, 
      {"name": "Turkmenistan", "code": "TM"}, 
      {"name": "Turks and Caicos Islands", "code": "TC"}, 
      {"name": "Tuvalu", "code": "TV"}, 
      {"name": "Uganda", "code": "UG"}, 
      {"name": "Ukraine", "code": "UA"}, 
      {"name": "United Arab Emirates", "code": "AE"}, 
      {"name": "United Kingdom", "code": "GB"}, 
      {"name": "United States", "code": "US"}, 
      {"name": "United States Minor Outlying Islands", "code": "UM"}, 
      {"name": "Uruguay", "code": "UY"}, 
      {"name": "Uzbekistan", "code": "UZ"}, 
      {"name": "Vanuatu", "code": "VU"}, 
      {"name": "Venezuela", "code": "VE"}, 
      {"name": "Viet Nam", "code": "VN"}, 
      {"name": "Virgin Islands, British", "code": "VG"}, 
      {"name": "Virgin Islands, U.S.", "code": "VI"}, 
      {"name": "Wallis and Futuna", "code": "WF"}, 
      {"name": "Western Sahara", "code": "EH"}, 
      {"name": "Yemen", "code": "YE"}, 
      {"name": "Zambia", "code": "ZM"}, 
      {"name": "Zimbabwe", "code": "ZW"} 
      ]
    return (
      <>
        <Grid style={{textAlign: 'left', display: 'inline-block', marginLeft: '5%', marginBottom: '4%' }}>
          <Typography variant="h4" color="primary">Create a lesson </Typography> 
        </Grid> 
        <Box boxShadow={2} className={classes.formBox} >
        <Grid container>
          {/* -------------------------------- Basic lesson info inputs -------------------------------- */}
          <Grid  
            sm={6}
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{alignItems: "center"}} 
            > 
            <TextField label="Lesson name" variant="outlined" style={{display: "block", margin: "10px"}} 
            onChange={(event)=> this.handleChangeFor(event, 'lessonName')} value={this.state.newLesson.lessonName}/>
            <TextField label="Language" variant="outlined" style={{display: "block", margin: "10px"}} 
            onChange={(event)=> this.handleChangeFor(event, 'language')} value={this.state.newLesson.language}/>
            <TextField label="Description" variant="outlined" style={{display: "block", margin: "10px"}} 
            onChange={(event)=> this.handleChangeFor(event, 'description')} value={this.state.newLesson.description}/>
            <TextField label="Notes link" variant="outlined" style={{display: "block", margin: "10px"}} 
            onChange={(event)=> this.handleChangeFor(event, 'notes')} value={this.state.newLesson.notes}/>
            {/* -------------------------------- Language selector -------------------------------- */}
          </Grid>{/* ---------------  END OF LESSON NAME - NOTES LINK FORM ------------------- */}
          <Grid  
          container
          sm={6}
          direction="column"
          justify="center"
          alignItems="right" 
          > 
            <FormControl className={classes.formControl} style={{width: '50%'}}>
              <InputLabel>Country</InputLabel>
              <Select
                value={this.state.newLesson.country}
                onChange={(event)=>this.handleChangeFor(event, 'country')}
                >
                {
                  countries.map((country, i) => (
                    <MenuItem key={i} value={country.name ? country.name : " "} >{country.name}</MenuItem>
                    ))
                  }
              </Select>
              <FormHelperText>Language origin</FormHelperText>
            </FormControl>
                {/* -------------------------------- Difficulty radio -------------------------------- */}
            <FormControl component="fieldset" style={{ display: "block", marginTop: "25px"}}>
              <FormLabel component="legend">Difficulty level</FormLabel>
              <RadioGroup row>
                <FormControlLabel 
                value={"beginner"}  
                onChange={(event)=>this.handleChangeFor(event, "difficulty")} 
                control={<Radio />} label="Beginner" 
                checked={this.state.newLesson.difficulty==="beginner"}
                />
                <FormControlLabel 
                value={"intermediate"} 
                onChange={(event)=>this.handleChangeFor(event, "difficulty")} 
                checked={this.state.newLesson.difficulty==="intermediate"} control={<Radio />} label="Intermediate" 
                />
                <FormControlLabel 
                value={"expert"} 
                onChange={(event)=>this.handleChangeFor(event, "difficulty")} 
                checked={this.state.newLesson.difficulty==="expert"} control={<Radio />} label="Expert" 
                />
              </RadioGroup>
            </FormControl>
            {/* -------------------------------- Public status radio radio -------------------------------- */}
            <FormControl component="fieldset" style={{ display: "block", marginTop: "25px"}}>
              <FormLabel component="legend">Do you want you lesson to be public?</FormLabel>
              <RadioGroup row>
                  <FormControlLabel 
                  value={true}  
                  onChange={(event)=>this.handleChangeFor(event, "public")} 
                  control={<Radio />} label="Public" 
                  checked={this.state.newLesson.public}
                  />
                  <FormControlLabel 
                  value={false} 
                  onChange={(event)=>this.handleChangeFor(event, "public")} 
                  checked={!this.state.newLesson.public} control={<Radio />} label="Private" 
                  />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
          <Grid className={classes.createButton}>
            {createButton}
          </Grid>
          <Grid className={classes.submitButton}>
            {submitButton}
          </Grid>
        </Box>
      </>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(CreateLesson))