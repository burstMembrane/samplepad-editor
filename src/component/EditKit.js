/* Global imports */
import React from 'react';
import { connect } from 'react-redux'

/* App imports */
import { KitErrors, KitErrorStrings, DeviceType } from 'const'
import { saveKit, updateKitName } from 'actions/kit'

/* Component imports */
import SamplerackEditor from 'component/Editor/Samplerack'
import SamplepadProEditor from 'component/Editor/SamplepadPro'

import 'css/EditKit.css'
import ImageOverlay from 'component/ImageOverlay';
import Collapsible from 'react-collapsible';


const EditKit = (props) => {

  let kitNameControlProps = {};

  if (props.hasKitNameError) {
    kitNameControlProps = {
      'data-tooltip': KitErrorStrings.INVALID_KIT_NAME
    }
  }

  return (

    <div className="kit">
      <div className="is-size-1"> {props.originalKitName}</div>
      <div className="field is-grouped">
        <div {...kitNameControlProps} className={"control " + ((props.hasKitNameError) ? 'has-tooltip-bottom' : '')}>
          <input
            type="text"
            className={"input kitName " + ((props.hasKitNameError) ? 'is-danger' : '')}
            value={props.kitName}
            onChange={(e) => props.updateKitName(e.target.value)} />
        </div>

        <div className="buttons control">
          <button className="button is-info" onClick={props.saveKit}>Save Kit</button>
          {
            props.showSaveAsNew &&
            <button className="button" onClick={props.saveNewKit}>Save as New Kit</button>
          }
        </div>
      </div>
      {props.showSamplerackEditor &&
        <SamplerackEditor kitId={props.kitId} />
      }
      {props.showSamplepadProEditor &&
        <>
          <Collapsible trigger='Pad Editor' triggerTagName='div' transitionTime={200} open={true}>
            <ImageOverlay props={props} />
          </Collapsible>
          <Collapsible trigger='Pad Settings' triggerTagName='div' transitionTime={200}>
            <SamplepadProEditor kitId={props.kitId} />
          </Collapsible>
        </>
      }
    </div >
  );
}

const mapStateToProps = (state, ownProps) => {
  let kit = state.kits.models[ownProps.kitId];

  return {
    showSamplerackEditor: (state.drive.deviceType === DeviceType.SAMPLERACK),
    showSamplepadProEditor: (state.drive.deviceType === DeviceType.SAMPLEPAD_PRO),
    showSaveAsNew: kit.isExisting,
    kitName: kit.kitName,
    originalKitName: kit.originalKitName,
    hasKitNameError: (kit.errors.indexOf(KitErrors.INVALID_KIT_NAME) > -1),
    pads: kit.pads
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveKit: () => {
      dispatch(saveKit(ownProps.kitId));
    },
    saveNewKit: () => {
      dispatch(saveKit(ownProps.kitId, true));
    },
    updateKitName: (value) => {
      dispatch(updateKitName(ownProps.kitId, value));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditKit)
