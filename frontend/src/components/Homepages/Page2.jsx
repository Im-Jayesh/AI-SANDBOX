import React from 'react';
import i1 from '../../assets/i1.png';
import i2 from '../../assets/i2.png';
import i3 from '../../assets/i3.png';
import i4 from '../../assets/i4.png';

function Page2() {
    return (
        <div className="page2">
            <img className="i1" src={i1} alt="i1" />
            <div className="Displaycard">
                <div ><img className="i2" src={i2} alt="" /></div>
                <div><img className='i3' src={i3} alt="" /></div>
                <div><img className='i4' src={i4} alt="" /></div>
            </div>
        </div>
    );
}

export default Page2;