import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';

const propTypes = {
  ...SectionSplitProps.types,
};

const defaultProps = {
  ...SectionSplitProps.defaults,
};

const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {
  const outerClasses = classNames(
    'features-split section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-split-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  const sectionHeader = {
    title: 'How it works',
    paragraph: '3 Easy Steps!',
  };

  return (
    <section {...props} className={outerClasses}>
      <div className='container'>
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className='center-content' />
          <div className={splitClasses}>
            <div className='split-item'>
              <div
                className='split-item-content center-content-mobile reveal-from-left'
                data-reveal-container='.split-item'
              >
                <h3 className='mt-0 mb-12 '>
                  Login and Enter your home address
                </h3>
                <p className='m-0 text-color-secondary '>
                  You are presented with a form to enter your address. This
                  information is stored based off your login.
                </p>
              </div>
              <div
                className={classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container='.split-item'
              >
                <Image
                  src={require('./../../assets/FeaturePhotos/address.jpeg')}
                  alt='Features split 01'
                  width={528}
                  height={396}
                />
              </div>
            </div>

            <div className='split-item'>
              <div
                className='split-item-content center-content-mobile reveal-from-right'
                data-reveal-container='.split-item'
              >
                <h3 className='mt-0 mb-12'>
                  Fill out the home renovations form
                </h3>
                <p className='m-0 text-color-secondary'>
                  We will ask you a series of questions about any major updates
                  to your home
                </p>
              </div>
              <div
                className={classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container='.split-item'
              >
                <Image
                  src={require('./../../assets/FeaturePhotos/form.jpeg')}
                  alt='Features split 02'
                  width={528}
                  height={396}
                />
              </div>
            </div>

            <div className='split-item'>
              <div
                className='split-item-content center-content-mobile reveal-from-left'
                data-reveal-container='.split-item'
              >
                <h3 className='mt-0 mb-12'>Dashboard Display</h3>
                <p className='m-0 text-color-secondary'>
                  You will be presented with a dashboard with the following
                  features:
                </p>
                <ul>
                  <li>
                    Home value - we use an algorithm and calculate your house
                    value based of recent sales/comps in your area combined with
                    your home improvments specified in the form. This can help
                    you get a realistic estimate of what a bank would value your
                    home at incase you are thinking about refinancing or
                    aquiring a home equity line of credit.
                  </li>
                  <li>
                    Chart - chart will display the value of your house trending
                    over time. Each time you login, the most recent sales will
                    be be pulled and your value will be recalculated then
                    displayed on a chart. (coming soon)
                  </li>
                  <li>
                    Similar Properties In Area - Check out the recent sales of
                    similar homes in your area
                  </li>
                  <li>
                    Mortgage Rates - we'll display the current mortgage rates in
                    you area to help you decide if it's a good time to refinance
                  </li>
                </ul>
              </div>
              <div
                className={classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container='.split-item'
              >
                <Image
                  src={require('./../../assets/FeaturePhotos/comps.jpeg')}
                  alt='Features split 03'
                  width={528}
                  height={396}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
