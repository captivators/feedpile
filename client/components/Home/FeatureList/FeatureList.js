import React from 'react';
import './FeatureList.css'
import RssFeed from 'material-ui-icons/RssFeed';
import PersonPin from 'material-ui-icons/PersonPin'
import StayCurrentPortrait from 'material-ui-icons/StayCurrentPortrait'
import Language from 'material-ui-icons/Language'

const featureList = [
  {
    name: 'Syndication',
    description: 'Keeping on top of the news across various sites is a hassle. Feedpile uses aggregation technology to consolidate many news outlets into a one-page application, saving you time and energy.',
    icon: <RssFeed style={{
      width: "60px",
      height: "60px",
      marginTop: '50px'
    }}/>,
  },
  {
    name: 'Minimalist Design',
    description: 'FeedPile offers a clean and uncluttered UI to make reading the news a breath of fresh air. Enjoy reading individual articles without a flurry of advertisements.',
    icon: <StayCurrentPortrait style={{
      width: "60px",
      height: "60px",
      order: "2",
      marginTop: '50px'
    }}/>,
  },
  {
    name: 'Customization',
    description: 'Escape the monotonous echo chamber of mainstream media and curate your own personal newspaper easily by subscribing to content from your favorite sites. Store collections of feeds in categories to customize your content.',
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
