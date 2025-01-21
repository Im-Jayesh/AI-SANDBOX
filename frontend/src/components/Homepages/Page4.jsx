import React from 'react';
import i6 from '../../assets/i6.png';
import i7 from '../../assets/i7.png';
import i8 from '../../assets/i8.png';
import Examplecard from '../../assets/Examplecard.png';

function Page4() {
    return (
        <div className="page4">
            <div className="displaycard2">
                <div><img className="i6" src={i6} alt="" /></div>
                <div><img className="i7" src={i7} alt="" /></div>
                <div><img className="i8" src={i8} alt="" /></div>
            </div>
            <div className='examplecard'><img className='eci' src={Examplecard} alt="" /></div>
        </div>
    );
}

export default Page4;