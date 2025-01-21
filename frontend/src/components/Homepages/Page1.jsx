import React from 'react';
import Heading from '../../assets/heading.png';
import Heading2 from '../../assets/heading2.png';
import Heading3 from '../../assets/heading3.png';
import stroke1 from '../../assets/stroke1.png';



function Page1(){
    return(
        <div className="page">


            <div className="stroke">
                <img src={stroke1} alt="" />
            </div>
            <div className="page1">
                <div className="heading">
                <img src={Heading} alt="" />
                </div>
                <div className="heading2">
                    <img src={Heading2} alt="" />
                </div>
                <div className="heading3">
                    <img src={Heading3} alt="" />
                </div>
                <div className="btn1">
                    <button id="1"><b>Slay here</b></button>
                </div>
            </div>
        

        </div>

        
    );
}

export default Page1