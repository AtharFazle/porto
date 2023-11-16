"use client"
import React,{FC} from 'react';
import { Next13ProgressBar } from 'next13-progressbar';
interface ProgressBarProps {}


const ProgressBar:FC<ProgressBarProps> = ({}) => {
  return (
    <div>
            <Next13ProgressBar height="4px" color="#EF4123" options={{ showSpinner: true }} showOnShallow />
    </div>
  )
};

export default ProgressBar;
