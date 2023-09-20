import React from 'react';
import { connect } from 'react-redux'

/* App imports */
import { DeviceType } from 'const'
const ImageOverlay = (props) => {

    console.log(props.deviceType)
    return (

        props.deviceType === DeviceType.SAMPLEPAD_PRO && (


            <div className="image" >


                {/* Render the original image */}
                <img src={`${process.env.PUBLIC_URL}/assets/samplepadpro.png`} alt="Original" style={{ width: '100%', height: 'auto' }} />
            </div>
        )


    );
}


const mapStateToProps = (state) => {
    return {
        deviceType: state.drive.deviceType
    }
}

export default connect(mapStateToProps)(ImageOverlay)




