import React from 'react';
import CalmingVideosSlider from './CalmingVideosSlider';
import RelaxingPdf from './RelaxingPdf';
import MeditationResources from './MeditationResources';

const Relax = () => {
  return (
    <div className="relax-page">
      <CalmingVideosSlider />
      <RelaxingPdf />
      <MeditationResources />
    </div>
  );
};

export default Relax;
