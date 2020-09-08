import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};

const Testimonial = ({
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
    'testimonial section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'testimonial-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames('tiles-wrap', pushLeft && 'push-left');

  const sectionHeader = {
    title: 'Customer testimonials',
    paragraph: 'Hear how our App has helped our customers!',
  };

  return (
    <section {...props} className={outerClasses}>
      <div className='container'>
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className='center-content' />
          <div className={tilesClasses}>
            <div
              className='tiles-item reveal-from-right'
              data-reveal-delay='200'
            >
              <div className='tiles-item-inner'>
                <div className='testimonial-item-content'>
                  <p className='text-sm mb-0'>
                    — I have always checked zillow for my house estimate but the
                    value of my home doesn't seem to be accurate. I love how I
                    SPY REFI calculates and tracks your home value of recent
                    sales but also takes into consideration any major home
                    improvements! I feel confident that my home assessment is
                    the true value of my home!
                  </p>
                </div>
                <div className='testimonial-item-footer text-xs mt-32 mb-0 has-top-divider'>
                  <span className='testimonial-item-name text-color-high'>
                    - Douglas
                  </span>
                </div>
              </div>
            </div>

            <div className='tiles-item reveal-from-bottom'>
              <div className='tiles-item-inner'>
                <div className='testimonial-item-content'>
                  <p className='text-sm mb-0'>
                    — I SPY REFI saved me so much time. I was able to enter all
                    my major updates to my home and have them give me a house
                    assement value. I feel confident that I would be able to
                    apply for a home equity loan based off my returned value.
                    UPDATE- I applied and was able to aquire one! The banks
                    assesment was within a couple grand of I SPY REFI's
                    estamate! Thank you I SPI REFI!!
                  </p>
                </div>
                <div className='testimonial-item-footer text-xs mt-32 mb-0 has-top-divider'>
                  <span className='testimonial-item-name text-color-high'>
                    - Blake
                  </span>
                </div>
              </div>
            </div>

            <div
              className='tiles-item reveal-from-left'
              data-reveal-delay='200'
            >
              <div className='tiles-item-inner'>
                <div className='testimonial-item-content'>
                  <p className='text-sm mb-0'>
                    - I recently decided to sell my home and didn't want an
                    agent. I used I SPY REFI's estamate as a value to sell my
                    home. I got an offer in a week based off the value they gave
                    me and sold my home!
                  </p>
                </div>
                <div className='testimonial-item-footer text-xs mt-32 mb-0 has-top-divider'>
                  <span className='testimonial-item-name text-color-high'>
                    - Steffi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Testimonial.propTypes = propTypes;
Testimonial.defaultProps = defaultProps;

export default Testimonial;
