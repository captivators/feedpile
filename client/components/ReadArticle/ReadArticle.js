import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui-icons/Close';
import OpenInNew from 'material-ui-icons/OpenInNew';
import RaisedButton from 'material-ui/RaisedButton';
import DOMPurify from 'dompurify';
import feedPileImg from '../../images/feedpile.png'
import './ReadArticle.css';

const styles = {
  smallIcon: {
    width: 36,
    height: 36
  },
  small: {
    width: 72,
    height: 72,
    padding: 16
  }
};

const buttonStyle = {
  margin: 12,
};

const ReadArticle = (props) => {
  return (
    <MuiThemeProvider>
      <div className="read-article-page">
        <Link to="/app">
          <IconButton iconStyle={styles.smallIcon} style={styles.small}>
            <Close />
          </IconButton>
        </Link>
        <div className="read-article-container">
          <div className="read-article-title">{props.selectedArticle.title}</div>
          <div className="default-image">
            <img src={props.selectedArticle.description.includes('img') ? '':feedPileImg}/>
          </div>
          <div className="read-article-content" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.selectedArticle.description)}}></div>
        </div>
        <div className="url-button-container">
          <RaisedButton
            href={props.selectedArticle.url}
            target="_blank"
            label="Visit Website"
            style={buttonStyle}
            icon={<OpenInNew />}
          />
        </div>
      </div>
    </MuiThemeProvider>
  )
};

const mapStateToProps = (state) => {
  return {
    selectedArticle: state.currentArticle
  }
};

export const Unwrapped = ReadArticle;
export default connect(mapStateToProps)(ReadArticle);
