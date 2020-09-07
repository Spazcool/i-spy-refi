import React from 'react';
// import Header from '../components/layout/Header'; //TODO Delete
import Footer from '../components/layout/Footer';

const LayoutDefault = ({ children }) => (
  <>
    {/* <Header navPosition='right' className='reveal-from-bottom' /> // TODO DELETE */}
    <main className='site-content'>{children}</main>
    {/* <Footer /> // TODO rendering twice delete? */}
  </>
);

export default LayoutDefault;
