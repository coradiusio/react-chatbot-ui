import React from 'react';

import Button from './elements/Button/Button';
import Icon from './elements/Icon/Icon';
import Loader from './elements/Loader/Loader';
import Image from './elements/Image/Image';

import ChatBubble from './sub_components/ChatBubble';

import {
  massageText
} from '../utils';

let checkBoxDisplayValueList = [];
let checkBoxActualValueList = [];

const TypingIndicator = (props) => {
  return (
    <ChatBubble typing float={props.float}>
      <div className={`typing-indicator ${props.float}`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </ChatBubble>
  );
}

export default class Body extends React.Component {
  radioChoices = (repliedMessage, currentQuestion) => {
    if (repliedMessage.radioOptions) {
      return repliedMessage.radioOptions.map((option, index) => <Button
          key={index}
          value={option.value}
          className="choice-button radio-choice-button"
          onClick={(e) => {
            e.preventDefault();
            e.target.classList.remove('selected');
            e.target.classList.add('selected');
            if (repliedMessage.node === currentQuestion.node) {
              this.props.submitInputValue(option.label, option.value, 'radio');
            }
            else return null;
          }}
        >
          {option.label}
        </Button>
      );
    } else return;
  }

  checkboxChoices = (repliedMessage) => {
    if (repliedMessage.checkboxOptions) {
      return repliedMessage.checkboxOptions.map((option, index) => {
        return (
          <div className="checkbox" key={index}>
            <label>
              <input
                type="checkbox"
                defaultValue={option.value}
                dataLabel={option.label}
                onChange={(e) => {
                  if (e.target.checked) {
                    checkBoxActualValueList.push(e.target.value);
                    checkBoxDisplayValueList.push(e.target.attributes.datalabel.value);
                  } else {
                    let index = checkBoxActualValueList.indexOf(e.target.value);
                    if (index > -1) {
                      checkBoxActualValueList.splice(index, 1);
                    }
                    index = checkBoxDisplayValueList.indexOf(e.target.attributes.datalabel.value);
                    if (index > -1) {
                      checkBoxDisplayValueList.splice(index, 1);
                    }
                  }
                }}
              />
              <span className="checkbox-material">
                <span className="check"></span>
              </span> {option.label}
            </label>
          </div>
        );
      });
    } else return;
  }

  render() {
    const repliedMessages = this.props.repliedMessages;
    const result = this.props.result;
    const currentQuestion = this.props.currentQuestion;
    let leftOrRight = 'left', differentSender = false;

    return (
      <div className="display-flex flexbox-item-grow">
        {
          this.props.noQuestionAvailable
          ?
            <Loader size='medium' active={true} inline='centered' className="flex-align-self-center" content="Loading" />
          :
            <div id="react-chatbot-ui-messages-container" className="flexbox-item-grow">
            {
              repliedMessages.map((repliedMessage, index) => {
                leftOrRight = repliedMessage.sender === 'user' ? 'right' : 'left';
                differentSender = (
                  index === 0 || (repliedMessages[index -1].sender !== repliedMessages[index].sender)
                );

                return (
                  <div key={index}>
                    {
                      repliedMessage.isAnswer === undefined
                      ?
                        <ChatBubble float={leftOrRight} widget={repliedMessage.widget}>
                          {
                            repliedMessages[index].sender === 'bot' && differentSender
                            ?
                              <div className={`sender-name text-align-${leftOrRight}`}>
                                {repliedMessage.sender === 'user' ? 'User' : 'Bot'}
                              </div>
                            : null
                          }
                          {
                            repliedMessage.source !== 'file'
                            ?
                              <div className={`display-flex ${leftOrRight === 'right' ? 'flex-justify-content-end' : ''}`}>
                                {
                                  repliedMessage.errorMessage
                                  ?
                                    <div className="errorIconContainer">
                                      <Image
                                        className={`max-width-full`}
                                        src={process.env.PUBLIC_URL + `error-icon.png`}
                                        alt=""
                                      />
                                    </div>
                                  :
                                    null
                                }
                                {massageText(repliedMessage.text, result)}
                              </div>
                            :
                              <div>
                                {
                                  ['jpeg', 'jpg', 'png'].indexOf(repliedMessage.fileExtension.trim().toLowerCase()) > -1
                                  ?
                                    <Image
                                      className={`user-uploaded-image adjust-image`}
                                      src={repliedMessage.fileURL}
                                      alt=""
                                    />
                                  :
                                    null
                                }
                                {`${repliedMessage.fileName}.${repliedMessage.fileExtension}`}
                              </div>
                          }
                          {
                            repliedMessage.showTime
                            ?
                              <div className="group">
                                {
                                  leftOrRight === 'right'
                                  ?
                                    <Icon className='edit-icon' name='compose' size='small' />
                                  :
                                    null
                                }
                                <span className={`timeString text-align-${leftOrRight === 'left' ? 'right' : 'left'} ${leftOrRight}`}>
                                  {repliedMessage.createdAt}
                                </span>
                              </div>
                            :
                              null
                          }
                        </ChatBubble>
                      :
                        <div className="choices-container">
                          {
                            repliedMessage.widget === 'radio'
                            ?
                              this.radioChoices(repliedMessage, currentQuestion)
                            :
                              <div className="checkbox-container">
                                {
                                  repliedMessage.widget === 'checkbox'
                                  ?
                                    <div id={`question-${currentQuestion.node}-checkbox-choices`} className="checkbox-choices-container coloured">
                                      {this.checkboxChoices(repliedMessage, currentQuestion)}
                                      <Button
                                        className="choice-button checkbox-submit"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.target.classList.remove('selected');
                                          e.target.classList.add('selected');
                                          if (repliedMessage.node === currentQuestion.node) {
                                            this.props.submitInputValue(checkBoxDisplayValueList.join(repliedMessage.joinWith || ','), checkBoxActualValueList.join(repliedMessage.joinWith || ','), 'checkbox');
                                            checkBoxActualValueList = [];
                                            checkBoxDisplayValueList = [];
                                          } else return null;
                                        }}
                                      >
                                        Done
                                      </Button>
                                    </div>
                                  :
                                    null
                                }
                              </div>
                          }
                        </div>
                    }
                  </div>
                );
              })
            }
            {
              this.props.isBotTyping
              ?
                <TypingIndicator float="left" />
              :
                null
            }
            {
              this.props.isUserTyping
              ?
                <TypingIndicator float="right" />
              :
                null
            }
          </div>
        }
      </div>
    );
  }
}