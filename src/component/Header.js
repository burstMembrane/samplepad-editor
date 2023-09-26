/* Global imports */
import React from 'react';
import { connect } from 'react-redux'

/* App imports */
import { DeviceType } from 'const'
import { selectAndLoadDrive } from 'actions/drive'

/* Component imports */
import KitListComponent from 'component/KitList'

const HeaderComponent = (props) => {
  return (
    <section className="hero has-shadow is-fullwidth is-small  is-primary is-bold is-fullwidth">
      <div className="hero-body">
        <div className="is-pulled-left">
          <h2 className="title is-size-4">
            {props.deviceType} Kit Editor
          </h2>
        </div>
        <div className="is-pulled-right">
          <KitListComponent />
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state, ownProps) => {
  let deviceType = "";
  switch (state.drive.deviceType) {
    case DeviceType.SAMPLEPAD_PRO:
      deviceType = "Samplepad Pro";
      break;
    case DeviceType.SAMPLERACK:
      deviceType = "Samplerack";
      break;
    default:
      deviceType = "";
      break;
  }

  return {
    deviceType: deviceType
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCard: () => {
      dispatch(selectAndLoadDrive())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)
