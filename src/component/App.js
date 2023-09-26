/* Global imports */
import React from 'react';
import { connect } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

/* App imports */
import { selectAndLoadDrive } from 'actions/drive'

/* Component imports */
import ModalComponent from 'component/Modal'
import NoticeComponent from 'component/Notice'
import EditKitComponent from 'component/EditKit'
import HeaderComponent from 'component/Header'
import SampleListComponent from 'component/SampleList'



const AppComponent = (props) => {



  return (
    <DndProvider backend={HTML5Backend}>
      {props.showSplash &&
        <div className="App is-flex is-flex-direction-column">
          <HeaderComponent />

          <div className="SDCardTile is-medium">
            <h2 className='title is-4 is-medium'>Load your SD card</h2>
            <p>Please select a SD Card from the file browser.</p>
            <button className="button is-link is-medium" onClick={props.loadCard}> <i className='glyphicon glyphicon-folder-open'></i> </button>
          </div>
        </div>
      }

      {!props.showSplash &&
        <div className="App is-flex is-flex-direction-column">
          <ModalComponent />
          <NoticeComponent notices={props.notices} />
          <HeaderComponent />
          <section className="columns">
            <div className="column has-shadow is-one-fifth is-flex">
              <SampleListComponent />
            </div>
            <div className="column has-shadow is-four-fifths is-flex is-fullwidth">
              {!props.hasActiveKit &&

                <div className="splash is-medium  ">
                  Select, import, or create a new kit to begin
                </div>

              }

              {props.hasActiveKit &&
                <div className='container'>
                  <EditKitComponent className="has-shadow " kitId={props.activeKitId} />
                </div>
              }
            </div>
          </section>

        </div>
      }
    </DndProvider>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    showSplash: !state.drive.deviceId,
    notices: state.notices,
    activeKitId: state.app.activeKitId,
    hasActiveKit: (state.app.activeKitId !== null),
    deviceType: state.app.deviceType
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCard: () => {
      dispatch(selectAndLoadDrive())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent)