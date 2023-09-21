/* Global imports */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'

/* App imports */
import { Drive } from 'const'
import SampleStore from 'util/sampleStore'

/* Component imports */
import SampleComponent from 'component/Sample'
import SamplePlayerComponent from 'component/SamplePlayer'
import 'css/SampleList.css'
import { getKitAndPadsFromFile } from 'util/kitFile';

// converted to functional component
const SampleList = ({ samples, importSamples, clear, kits, drive }) => {
  const [filter, setFilter] = useState('');

  const [filenameKitMap, setFilenameKitMap] = useState({})
  const handleRefresh = (e) => {
    console.log(e);
  };
  useEffect(() => {
    // find the kit name for samples
    const filenameMap = {}
    for (const kitID of kits.ids) {
      let kit = kits.models[kitID];
      let { pads } = getKitAndPadsFromFile(drive, kit.filePath + "/" + kit.fileName);
      for (const pad of Object.keys(pads)) {
        filenameMap[pads[pad].fileName] = kit.fileName
        filenameMap[pads[pad].fileNameB] = kit.fileName
      }
    }
    setFilenameKitMap(filenameMap)
  }, [drive, kits.ids, kits.models])

  const filterSamples = (filter) => {
    setFilter(filter);
  };

  return (
    <section className="SampleList is-fullwidth">
      <nav className="panel is-fullwidth">
        <div className="panel-heading is-fullwidth">
          <div className="level">
            <div className="level-left">
              <div className="level-item">Samples</div>
            </div>
            <div className="level-right">
              <p className="is-size-7">
                ({samples ? samples.length : 0}/{Drive.MAX_SAMPLES})
              </p>
            </div>
            <button
              className="glyphicon glyphicon-refresh level-right"
              onClick={handleRefresh}
            ></button>
            <button
              className="glyphicon glyphicon-trash level-right"
              onClick={clear}
            />
          </div>
        </div>

        <div className="panel-block">
          <div className="control has-icons-left">
            <input
              className="input"
              type="text"
              placeholder="Search"
              onChange={(e) => filterSamples(e.target.value)}
            />
            <span className="icon is-left">
              <i className="glyphicon glyphicon-search" aria-hidden="true"></i>
            </span>
          </div>
        </div>

        <div className="samples">
          {samples &&
            samples.sort((a, b) => {
              const kitNameA = filenameKitMap[a] || '';  // Handle cases where the kit name is not available
              const kitNameB = filenameKitMap[b] || '';  // Handle cases where the kit name is not available
              return kitNameB.localeCompare(kitNameA);  // Reverse the sort order
            }).map((file, index) => (
              <span key={index}>
                {file.toLowerCase().includes(filter.toLowerCase()) && (
                  <SamplePlayerComponent sampleFile={file}>
                    <SampleComponent
                      fileName={file}
                      kitName={filenameKitMap[file]}
                      highlightKeyword={filter}
                      draggable={true}
                    />

                  </SamplePlayerComponent>
                )}
              </span>
            ))}
        </div>

        <div className="panel-block">
          <button
            className="button is-link is-outlined is-fullwidth"
            onClick={importSamples}
          >
            Import Samples
          </button>
        </div>
      </nav>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    samples: state.drive.samples,
    kits: state.kits,
    drive: state.drive

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    importSamples: () => {
      dispatch(SampleStore.importSamples());
    },
    clear: () => {
      dispatch(SampleStore.clear());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SampleList);