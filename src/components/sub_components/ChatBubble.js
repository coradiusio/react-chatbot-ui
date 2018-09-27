import React from 'react';

import TalkBubble from './TalkBubble';

export default class ChatBubble extends React.Component {
  render() {
    const { float = 'left' } = this.props;
    return (
      <div className="group width-full">
        <div className={`group ${float} width-full`}>
          <div className={`${float} width-full`}>
            {
              this.props.widget === 'camera'
              ?
                <div className={`chat-bubble ${float === 'right' ? 'margin-top-12 margin-bottom-16' : ''} chat-bubble-${float}`}>
                  {this.props.children}
                </div>
              :
                <TalkBubble
                  chatClass={`chat-bubble-${float} ${this.props.typing ? 'typing': ''}`}
                  text={this.props.children}
                  float={float}
                />
            }
          </div>
        </div>
      </div>
    );
  }
}