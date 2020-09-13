import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {
  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  };

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  return (
    <section {...props} className={outerClasses} style={{ paddingTop: '10%' }}>
      <div className='container-sm'>
        <div className={innerClasses}>
          <div className='hero-content'>
            <h1
              className='mt-0 mb-16 reveal-from-bottom'
              data-reveal-delay='200'
            >
              {' '}
              <span className='text-color-primary'>
                <Image
                  src={require('./../../assets/logo/ispy.png')}
                  alt='logo'
                  width={896}
                  height={504}
                />
              </span>
            </h1>
            <div className='container-xs'>
              <p
                className='m-0 mb-32 reveal-from-bottom'
                data-reveal-delay='400'
              >
                A place to get a personal assesment on your home's worth!
              </p>
              <div className='reveal-from-bottom' data-reveal-delay='600'>
                <ButtonGroup>
                  <Button tag='a' color='primary' wideMobile href='/additions'>
                    Get Started Now
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
          <div
            className='hero-figure reveal-from-bottom illustration-element-01'
            data-reveal-value='20px'
            data-reveal-delay='800'
          >
            <a
              data-video='https://www.youtube.com/embed/KHdyXbE_kik?rel=0;&autoplay=1&start=46'
              href='#0'
              aria-controls='video-modal'
              onClick={openModal}
            >
              <Image
                className='has-shadow'
                src={require('./../../assets/house.png')}
                alt='house'
                width={896}
                height={504}
              />
            </a>
          </div>
          <Modal
            id='video-modal'
            show={videoModalActive}
            handleClose={closeModal}
            video='https://www.youtube.com/embed/KHdyXbE_kik?rel=0;&autoplay=1&start=46'
            videoTag='iframe'
          />
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;
