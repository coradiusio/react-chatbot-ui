import React from 'react';

import MaskedInput from 'react-text-mask'

import Input from './elements/Input/Input';
import Icon from './elements/Icon/Icon';
import Loader from './elements/Loader/Loader';
import SemanticImage from './elements/Image/Image';
import Select from './addons/Select/Select';
import Button from './elements/Button/Button';
import SearchSelect from './sub_components/SearchSelect';

import {
  isElementByIdValueEmpty,
  resizeImage,
} from '../utils';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      footerInputValidated: false,
      currentNode: 0,
    }
  }

  componentDidMount() {
    this.setState({currentNode: this.props.currentQuestion.node || 0})
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const value = e.target.value.trim();
      this.props.submitInputValue(value);
    }
  }

  compressImage = (e) => {
    const me = this;

    var fileinput = document.getElementById(e.target.id);
    var fileToLoad = fileinput.files[0];
    var fileNameSplit = fileToLoad.name.split('.');
    var fileName = fileNameSplit[0];
    var fileExtension = fileNameSplit[fileNameSplit.length - 1];
    var max_width = fileinput.getAttribute('data-maxwidth');
    var max_height = fileinput.getAttribute('data-maxheight');

    if ( !( window.File && window.FileReader && window.FileList && window.Blob ) ) {
      alert('The File APIs are not fully supported in this browser.');
      return false;
    }

    if (!(/image/i).test(fileToLoad.type)) {
      alert("File "+ fileToLoad.name +" is not an image.");
      return false;
    }

    // read the files
    var reader = new FileReader();
    reader.readAsArrayBuffer(fileToLoad);
    
    reader.onload = function (event) {
      // blob stuff
      var blob = new Blob([event.target.result]); // create blob...
      window.URL = window.URL || window.webkitURL;
      var blobURL = window.URL.createObjectURL(blob); // and get it's URL
      
      // helper Image object
      var image = new Image();
      image.src = blobURL;
      //preview.appendChild(image); // preview commented out, I am using the canvas instead
      image.onload = function() {
        // have to wait till it's loaded
        var resized = resizeImage(image, fileExtension, max_width, max_height, 0.6); // send it to canvas
        console.log('image base64 length :- ', resized.length);

        me.props.submitInputValue(window.URL.createObjectURL(fileToLoad), resized, 'file', fileName, fileExtension);
      }
    };

    fileinput.value = "";
  }

  inputComponentDecider = (currentQuestion) => {
    const widget = currentQuestion.widget;

    if (widget === 'text' || widget === 'radio' || widget === 'checkbox') {
      return (
        <div>
          {
            currentQuestion.inputMask
            ?
              <Input
                action={
                  <div id="send-button-container" className={!this.state.footerInputValidated ? 'disabled' : ''}>
                    <SemanticImage
                      src={process.env.PUBLIC_URL + `send-icon-${this.state.footerInputValidated ? 'active': 'disabled'}.png`}
                      onClick={() => this.props.submitInputValue(document.getElementById('react-chatbot-ui-input').value)}
                      alt=''
                    />
                  </div>
                }
                transparent={true}
                fluid={true}
              >
                <MaskedInput
                  mask={currentQuestion.inputMask}
                  placeholder={currentQuestion.placeholder || 'Enter Your Message'}
                  onKeyPress={(e) => {
                    this.handleKeyPress(e, currentQuestion.entity)
                  }}
                  style={{ textTransform: currentQuestion.validateInput && currentQuestion.validateInput.casing && currentQuestion.validateInput.casing.trim().toLowerCase() === 'uppercase' ? 'uppercase' : 'none' }}
                  onChange={(e) => this.setState({footerInputValidated: !isElementByIdValueEmpty(e.target.id)})}
                  onFocus={() => this.props.handleStateValue('isUserTyping', true)}
                  onBlur={() => this.props.handleStateValue('isUserTyping', false)}
                  id="react-chatbot-ui-input"
                  disabled={widget === 'radio' || widget === 'checkbox'}
                />
              </Input>
            :
              <Input
                action={
                  <div id="send-button-container" className={!this.state.footerInputValidated ? 'disabled' : ''}>
                    <SemanticImage
                      src={process.env.PUBLIC_URL + `send-icon-${this.state.footerInputValidated ? 'active': 'disabled'}.png`}
                      onClick={() => this.props.submitInputValue(document.getElementById('react-chatbot-ui-input').value)}
                      alt=''
                    />
                  </div>
                }
                className={currentQuestion.validateInput && currentQuestion.validateInput.casing && currentQuestion.validateInput.casing.trim().toLowerCase() === 'uppercase' ? 'uppercase' : ''}
                transparent={true}
                fluid={true}
                placeholder={currentQuestion.placeholder || 'Enter Your Message'}
                disabled={widget === 'radio' || widget === 'checkbox'}
                id="react-chatbot-ui-input"
                onFocus={() => this.props.handleStateValue('isUserTyping', true)}
                onBlur={() => this.props.handleStateValue('isUserTyping', false)}
                onChange={(e) => {
                  const autoValidateAndFill = currentQuestion.validateInput && currentQuestion.validateInput.autoValidateAndFill;
                  if (autoValidateAndFill) {
                    for (let i = 0; i < autoValidateAndFill.length; i++) {
                      if (new RegExp(autoValidateAndFill[i].regexPattern).test(e.target.value)) {
                        e.target.value += autoValidateAndFill[i].fill;
                      }
                    }
                  }
                  this.setState({footerInputValidated: !isElementByIdValueEmpty(e.target.id)});
                }}
                onKeyPress={(e) => {
                  this.handleKeyPress(e, currentQuestion.entity)
                }}
              />
          }
        </div>
      );
    } else if (widget === 'searchselect') {
      return (
        <SearchSelect
          source={currentQuestion.searchOptions}
          placeholder={currentQuestion.placeholder}
          onSelect={this.props.submitInputValue}
          minCharacters={currentQuestion.minCharactersToSearch || 3}
        />
      );
    } else if (widget === 'select') {
      const modifiedOptions = currentQuestion.selectOptions.map(option => {return {
        key: option.value === '' ? '0' : option.value,
        value: option.value,
        text: option.label
      }});
      return (
        <Select
          placeholder={currentQuestion.placeholder}
          fluid
          onChange={(e, { value }) => {
            if (value !== '') {
              this.props.submitInputValue(e.target.textContent, value, 'select');
            }
          }}
          options={modifiedOptions}
        />
      )
    } else return null;
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.currentNode !== nextProps.currentQuestion.node) {
      this.setState({currentNode: nextProps.currentQuestion.node}, () => {
        this.setState({
          footerInputValidated: this.props.isUserAllowedToAnswer && !isElementByIdValueEmpty('react-chatbot-ui-input') && (!(this.state.currentNode !== nextProps.currentQuestion.node))
        })
      });
    }
  }

  render() {
    const currentQuestion = this.props.currentQuestion;
    return (
      <div id="footer" className="flexbox-item">
        {
          currentQuestion.widget === 'file' || currentQuestion.widget === 'camera'
          ?
            <div id="footer-file-upload-button">
              <input id="react-chatbot-ui-file" type="file" className='display-none' data-maxwidth="500" onChange={(e) => {this.compressImage(e)}} />
              <Button
                fluid
                className="height-inherit"
                id="file-upload-button"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('react-chatbot-ui-file').click();
                }}
              >
                {
                  currentQuestion.showFileUploadButtonIcon
                  ?
                    <Icon id="file-upload-button-icon" name={currentQuestion.fileUploadButtonIconName || 'upload'} />
                  :
                    null
                }
                {currentQuestion.placeholder || 'Click To Upload File'}
              </Button>
            </div>
          :
            <div id="footer-input-wrapper">
              <div id="footer-input" className="display-flex flex-one flex-align-center">
                <div className="flex-one">
                  {
                    this.props.isUserAllowedToAnswer
                    ?
                      <div>
                        {this.inputComponentDecider(currentQuestion)}
                      </div>
                    :
                      <Loader size='small' active={true} inline='centered' />
                  }
                </div>
              </div>
            </div>
        }
        
      </div>
      
    );
  }
}
