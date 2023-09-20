import React, { useState, useRef, useEffect } from 'react';

import { connect } from 'react-redux'
import ImageMapper from 'react-img-mapper';
/* App imports */
import { DeviceType } from 'const'
import { useDrag, useDrop } from 'react-dnd';
import { updatePadStringProperty } from 'actions/pad'
/* App imports */
import { DragItemTypes } from 'const';

import SamplePlayerComponent from 'component/SamplePlayer'

const originalWidth = 3000;  // Replace with the original width of your image
const desiredWidth = 640;  // Set the desired width for scaling
const scalingFactor = desiredWidth / originalWidth;

const scaleCoords = coords => coords.map(coord => Math.floor(coord * scalingFactor));

const threshold = 10
// TODO: prefill with current pad files
const MAP = {
    name: "my-map",
    areas: [
        { shape: "rect", coords: scaleCoords([403, 867, 1112, 1422]), preFillColor: "rgba(255, 255, 255, 0.1)", label: "pad6", id: "pad_06" },
        { shape: "rect", coords: scaleCoords([1865, 1422, 1128, 863]), preFillColor: "rgba(255, 255, 255, 0.1)", label: "pad7", id: "pad_07" },
        { shape: "rect", coords: scaleCoords([1887, 859, 2604, 1417]), preFillColor: "rgba(255, 255, 255, 0.1)", label: "pad8", id: "pad_08" },
        { shape: "rect", coords: scaleCoords([402, 276, 1117, 832]), preFillColor: "rgba(255, 255, 255, 0.1)", label: "pad3", id: "pad_03" },
        { shape: "rect", coords: scaleCoords([1859, 832, 1138, 286]), preFillColor: "rgba(255, 255, 255, 0.1)", label: "pad4", id: "pad_04" },
        { shape: "rect", coords: scaleCoords([2604, 840, 1899, 286]), preFillColor: "rgba(255, 255, 255, 0.1)", label: "pad5", id: "pad_05" },
        { shape: "rect", coords: scaleCoords([386, 115, 1170, 233]), preFillColor: "rgba(255, 255, 255, 0.1)", label: "pad1", id: "pad_01" },
        { shape: "rect", coords: scaleCoords([1846, 124, 2628, 241]), preFillColor: "rgba(255, 255, 255, 0.1)", label: "pad2", id: "pad_02" }
    ]
};
const ImageOverlay = (props) => {
    const [samples, setSamples] = useState({}); // State to keep track of samples on each pad
    const [layer, setLayer] = useState("layerA")
    const wrapperRef = useRef(null);  // Ref for the wrapper div
    const sampleRefs = useRef({});  // ref for sample player component


    const findArea = (offset, elemRect) => {

        const x = offset.x - elemRect.left;
        const y = offset.y - elemRect.top;

        // Find if the coordinates fall in any of the areas
        const area = MAP.areas.find(area => {
            const [left, top, right, bottom] = area.coords;
            const minX = Math.min(left, right) - threshold;  // Subtract threshold
            const maxX = Math.max(left, right) + threshold;  // Add threshold
            const minY = Math.min(top, bottom) - threshold;  // Subtract threshold
            const maxY = Math.max(top, bottom) + threshold;  // Add threshold


            return x >= minX && x <= maxX && y >= minY && y <= maxY;
        });
        return area
    }

    const toggleLayer = () => {
        setLayer(layer === 'layerA' ? 'layerB' : 'layerA');

    };

    useEffect(() => {

        console.log("Loading samples to pads")
        console.log(props)
        let padSamples = {}
        for (const pad in props.pads) {
            // get the pad from the props
            const padID = props.pads[pad].padType
            let area = MAP.areas.find(area => area.id === padID);

            if (area) {
                console.log(props.pads[pad].fileName)
                area.preFillColor = layer === 'layerA' ? "rgba(0, 255, 255, 0.2)" : "rgba(255, 0, 0, 0.2)";
                padSamples[area.id] = props.pads[pad].fileName
            }
        }
        setSamples(padSamples)


    }, [props.props.kitId]);

    const addSample = (padID, area, fileName) => {

        // update the prefill color to indicate a sample has been added
        area.preFillColor = layer === 'layerA' ? "rgba(0, 255, 255, 0.2)" : "rgba(255, 0, 0, 0.2)";

        // set the area label to filename
        area.label = fileName
        area.fileName = fileName
        for (const pad in props.pads) {

            if (props.pads[pad].padType === padID) {

                if (props.pads[pad].fileName !== fileName) {
                    layer === 'layerA' ? props.updatePadSample(pad, fileName) : props.updatePadSampleB(pad, fileName);
                    console.log(`Mapping pad ${props.pads[pad].padType} to filename ${fileName}`)
                }
                else {
                    // pad filenames are the same, skip
                    console.log(`Current and desired samples have the same name ${fileName}`)
                }

            }

        }
        // Update the state with the sample dropped in this area
        setSamples({
            ...samples,
            [area.id]: fileName
        });
    }

    const [, ref] = useDrop({
        accept: DragItemTypes.SAMPLE,
        drop: (item, monitor) => {
            if (wrapperRef.current) {
                const offset = monitor.getClientOffset();
                const elemRect = wrapperRef.current.getBoundingClientRect();
                const area = findArea(offset, elemRect)

                if (area) {
                    console.log(`Sample dropped: ${area.id}`);
                    // update the prefill color to indicate a sample has been added
                    addSample(area.id, area, item.fileName)
                }
            }
        }
    });
    const handleAreaClick = (area) => {
        if (sampleRefs.current[area.id]) {
            sampleRefs.current[area.id].playSample();  // Trigger the playSample function
        }
    };
    // set the ref to the wrapperref
    useEffect(() => {
        ref(wrapperRef);
    }, [ref]);

    return (
        props.deviceType === DeviceType.SAMPLEPAD_PRO && (
            <div className='overlayContainer' ref={ref}>

                <p> Drag and drop samples onto the pads to assign.</p>

                <div ref={wrapperRef}>
                    <p>Editing Layer {layer === 'layerA' ? 'A' : 'B'}</p>
                    <ImageMapper
                        className='imageOverlay'
                        src={`${process.env.PUBLIC_URL}/assets/samplepadpro.png`}
                        alt="SamplePad Pro"
                        map={MAP}
                        width={desiredWidth}
                        onClick={handleAreaClick}
                    />

                    {Object.keys(samples).map(padId => (
                        <div key={padId}>
                            <SamplePlayerComponent sampleFile={samples[padId]} ref={(el) => { sampleRefs.current[padId] = el }} />

                        </div>
                    ))}
                    <button className='button is-small is-1' onClick={toggleLayer}>Switch to {layer === 'layerA' ? 'Layer B' : 'Layer A'}</button>
                </div>
            </div>
        )
    );
};

const mapStateToProps = (state) => {

    return {
        deviceType: state.drive.deviceType,
        pads: state.pads,
        kitId: state.kitId
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updatePadSample: (padID, fileName) => {
            dispatch(updatePadStringProperty(padID, 'fileName', fileName));
        },
        updatePadSampleB: (padID, fileName) => {
            dispatch(updatePadStringProperty(padID, 'fileNameB', fileName));
        },
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(ImageOverlay);



