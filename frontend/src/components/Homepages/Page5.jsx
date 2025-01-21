import React from 'react';
import i10 from '../../assets/i10.png';
import i11 from '../../assets/i11.png';
import i12 from '../../assets/i12.png';
import i13 from '../../assets/i13.png';

function Page5() {
    return (
        <div className="page5">
            <div className="displaycard3">
                <div><img className='i10' src={i10} alt="" /></div>
                <div><img className='i11' src={i11} alt="" /></div>
                <div><img className='i12' src={i12} alt="" /></div>
                <div><img className='i13' src={i13} alt="" /></div>
                <div className="btn2">
                    <button id="2"><b>Just click Bruh!</b></button>
                </div>
            </div>
        </div>
    );
}

export default Page5;