import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
// import { Icon } from '@material-ui/core';
import HouseIcon from '@material-ui/icons/House';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import TimelineIcon from '@material-ui/icons/Timeline';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};
const FeaturesTiles = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {
  const outerClasses = classNames(
    'features-tiles section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-tiles-inner section-inner pt-0',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap center-content',
    pushLeft && 'push-left'
  );

  const sectionHeader = {
    title: 'Features',
    // paragraph:
    //   'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis.',
  };

  return (
    <section {...props} className={outerClasses}>
      <div className='container'>
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className='center-content' />
          <div className={tilesClasses}>
            <div className='tiles-item reveal-from-bottom'>
              <div className='tiles-item-inner'>
                <div className='features-tiles-item-header'>
                  <div className='features-tiles-item-image mb-16'>
                    <MoneyIcon fontSize='large' />
                  </div>
                </div>
                <div className='features-tiles-item-content'>
                  <h4 className='mt-0 mb-8 fontCinzelLgNoShadowMargbot'>
                    House Value
                  </h4>
                  <p className='m-0 text-sm '>
                    We'll display a house assessment value based off information
                    you provided as well as recent sales of properties in your
                    area
                  </p>
                </div>
              </div>
            </div>

            <div
              className='tiles-item reveal-from-bottom'
              data-reveal-delay='200'
            >
              <div className='tiles-item-inner'>
                <div className='features-tiles-item-header'>
                  <div className='features-tiles-item-image mb-16'>
                    <CompareArrowsIcon fontSize='large' />
                  </div>
                </div>
                <div className='features-tiles-item-content'>
                  <h4 className='mt-0 mb-8 fontCinzelLgNoShadow'>
                    Similar Homes
                  </h4>
                  <p className='m-0 text-sm'>
                    We'll display houses in your area that have been recently
                    sold for comparison
                  </p>
                </div>
              </div>
            </div>

            <div
              className='tiles-item reveal-from-bottom'
              data-reveal-delay='400'
            >
              <div className='tiles-item-inner'>
                <div className='features-tiles-item-header'>
                  <div className='features-tiles-item-image mb-16'>
                    <TimelineIcon fontSize='large' />
                  </div>
                </div>
                <div className='features-tiles-item-content'>
                  <h4 className='mt-0 mb-8 fontCinzelLgNoShadow'>Dashboard</h4>
                  <p className='m-0 text-sm'>
                    Your house value is tracked over time each time you log in
                    based off new sales to inform you of trends
                  </p>
                </div>
              </div>
            </div>

            <div className='tiles-item reveal-from-bottom'>
              <div className='tiles-item-inner'>
                <div className='features-tiles-item-header'>
                  <div className='features-tiles-item-image mb-16'>
                    <SentimentVerySatisfiedIcon fontSize='large' />
                  </div>
                </div>
                <div className='features-tiles-item-content'>
                  <h4 className='mt-0 mb-8 fontCinzelLgNoShadow'>Confidence</h4>
                  <p className='m-0 text-sm'>
                    You can feel confident that your house value is accurate!
                    This can help you make a decision on refinancing your home,
                    or possibly looking at applying for a home equity line of
                    credit!
                  </p>
                </div>
              </div>
            </div>
            <div className='tiles-item reveal-from-bottom'>
              <div className='tiles-item-inner'>
                <div className='features-tiles-item-header'>
                  <div className='features-tiles-item-image mb-16'>
                    <SentimentVeryDissatisfiedIcon fontSize='large' />
                  </div>
                </div>
                <div className='features-tiles-item-content'>
                  <h4 className='mt-0 mb-8 fontCinzelLgNoShadow'>
                    Refinance Rates
                  </h4>
                  <p className='m-0 text-sm'>
                    We pull in the current mortgage rates to help decide if it's
                    a good time to refinance!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FeaturesTiles.propTypes = propTypes;
FeaturesTiles.defaultProps = defaultProps;

export default FeaturesTiles;
