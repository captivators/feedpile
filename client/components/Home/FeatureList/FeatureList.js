import React from 'react';
import './FeatureList.css'
import RssFeed from 'material-ui-icons/RssFeed';
import PersonPin from 'material-ui-icons/PersonPin'
import StayCurrentPortrait from 'material-ui-icons/StayCurrentPortrait'
import Language from 'material-ui-icons/Language'

const featureList = [
  {
    name: 'Syndication',
    description: 'Keeping abreast of the news is demanding and visiting multiple sites frequently to find out if content has been updated is a waste of time. Feedpile uses aggregation technology to consolidate many news outlets into a one page application, saving you time and energy.',
    icon: <RssFeed style={{
      width: "60px",
      height: "60px",
      marginTop: '50px'
    }}/>,
  },
  {
    name: 'Responsive Design',
    description: 'Our responsive design provides you not only with the sleakest desktop platform but also a clean RSS feed reader for any mobile device.',
    icon: <StayCurrentPortrait style={{
      width: "60px",
      height: "60px",
      order: "2",
      marginTop: '50px'
    }}/>,
  },
  {
    name: 'Customization',
    description: 'Escape the monotonous echo chamber of mainstream media and curate your own personal newspaper easily by subscribing to content from you favorite sites. Store collections of feeds in categories to customize your content. Save articles with Evernote integration and share them over social media.',
    icon: <PersonPin style={{
      width: "60px",
      height: "60px",
      order: "0",
      marginTop: '50px'
    }}/>,
  },
  {

  }
]

const FeatureList = (props) => {
  console.log(props)
  return (
    <div className="features">
      <ul className="features-list">
        <li>
          <div className="feature-item">
            <div className="icon-a">
              <i>{featureList[0].icon}</i>
            </div>
            <div className="info-a">
              <ul >
                <li style={{fontSize: "24px"}}>{featureList[0].name}</li>
                <br/>
                <li className="description">{featureList[0].description}</li>
              </ul>
            </div>
          </div>
        </li>
        <li>
          <div className="feature-item">
            <div className="icon-b">
            <i>{featureList[1].icon}</i>
            </div>
          <div className="info-b">
          <ul >
          <li style={{fontSize: "24px"}}>{featureList[1].name}</li>
          <br/>
          <li className="description">{featureList[1].description}</li>
          </ul>
          </div>

        </div>
        </li>

        <li>
          <div className="feature-item">
          <div className="icon-a">
          <i>{featureList[2].icon}</i>
          </div>
          <div className="info-a">
          <ul >
          <li style={{fontSize: "24px"}}>{featureList[2].name}</li>
          <br/>
          <li className="description">{featureList[2].description}</li>
          </ul>
          </div>

        </div>
        </li>

      </ul>
    </div>
    )
}

export default FeatureList;