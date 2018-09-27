import React from 'react';

import SemanticHeader from './elements/Header/Header';
import Image from './elements/Image/Image';
import Icon from './elements/Icon/Icon';

class Header extends React.Component {
  render() {
    return (
      <div 
        id="header"
        className="bottom-edge-shadow display-flex"
      >
        {
          this.props.iconImagePath
          ?
            <div
              className="display-flex flex-justify-center flex-align-center"
              id="iconContainerStyle"
            >
              <Image src={this.props.iconImagePath} />
            </div>
          :
            null
        }
        {
          this.props.iconImagePath === undefined && this.props.iconName !== undefined
          ?
            <Icon
              name={this.props.iconName || 'user'}
              color={this.props.iconColor || 'white'}
              size={this.props.iconSize || 'big'}
            />
          :
            null
        }
        <div className="display-flex flex-one flex-justify-center flex-direction-column">
          <SemanticHeader
            as={this.props.headerTitleAs || 'h4'}
            style={{color: this.props.headerTitleColor || 'black'}}
            className="title display-flex margin-zero"
          >
            <div className="content">
              {this.props.headerTitle || 'Title'}
            </div>
          </SemanticHeader>
          <div
            id="header-subtitle-container"
            className="display-flex flex-align-center"
          >
            <Icon
              size={this.props.headerSubtitleIconSize || 'tiny'}
              name={this.props.headerSubtitleIcon || 'circle'}
              color={this.props.headerSubtitleIconColor || 'green'}
            />
            <SemanticHeader
              as={this.props.headerSubtitleAs || 'h5'}
              style={{color: this.props.headerSubtitleColor || 'black'}}
              className="subtitle margin-zero"
            >
              <div className="content">
                {this.props.headerSubtitle || 'Subtitle'}
              </div>
            </SemanticHeader>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;