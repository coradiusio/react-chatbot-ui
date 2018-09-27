import React from 'react';

class TalkBubble extends React.Component {
  render() {
    return (
      <blockquote className={`chat-bubble ${this.props.chatClass} ${this.props.float === 'right' ? 'margin-top-12 margin-bottom-16' : ''}`}>
        {this.props.text}
      </blockquote>
    )
  }
}

export default TalkBubble;