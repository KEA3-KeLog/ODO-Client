// PhHandWaving.jsx
import React from 'react';
import PhHandWavingSvg from './PhHandWaving.svg';

const PhHandWaving = (props) => {
  return <img src={PhHandWavingSvg} alt="Hand Waving" {...props} />;
};

export default PhHandWaving;  // 중괄호 없이 기본으로 내보내기