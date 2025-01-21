import React from 'react';
import i5 from '../../assets/i5.png';
import stroke2 from '../../assets/stroke2.png';

function Page3() {
    return (
        <div className="page3">
            
            <div className="Displayvideo">
                <img className='stroke2' src={stroke2} alt="" />
                <video className='v1' width="100%" height="auto" controls>
                    <source src="path_to_your_video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div><img className='i5' src={i5} alt="" /></div>
        </div>
    );
}

export default Page3;