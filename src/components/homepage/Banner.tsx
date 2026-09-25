import React from 'react';
import bannerimg from '@/assets/banner.png'
import Image from 'next/image';
const Banner = () => {
    return (<div className='bg-black'>
        <div className="max-w-7xl flex justify-between items-center container mx-auto bg-[#222630] p-12">
            <div> 
               <p className='text-[#ccff00]'>WORKOUT LIBRARY</p>
               <h1 className='text-5xl font-bold my-5'>TRAIN WITH INTENT. LOG <br/>EVERY SET.</h1>
               <p className='my-8'>FitLog is a dark, no-nonsense gym companion: pick a lift, lock it<br/>into today&apos;s plan, and watch the week&apos;s work add up.</p>
               <button className=" rounded-sm bg-[#ccff00] px-4 py-2 text-sm font-bold text-black"> BROWSE WORKOUTS</button>
            </div>
            <div> 
             <Image src={bannerimg} alt="FitLog workout banner"/>
            </div>
        </div> </div>
    );
};

export default Banner;