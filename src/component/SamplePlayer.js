/* Global imports */
import React from 'react'
import { v1 as uuidv1 } from 'uuid';


/* App imports */
import SampleStore from 'util/sampleStore'

/* Electron imports */
const { wav, midi } = window.api


class SamplePlayerComponent extends React.Component {

  /*
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props)

    this.state = {
      wavStack: [],
      player: null,
      playingSample: false
    }

    this.renderChildren = this.renderChildren.bind(this)
    this.playOrStopSample = this.playOrStopSample.bind(this)

    this.handlerId = uuidv1()
    this.addMidiHandler()
  }

  renderChildren() {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        playOrStopSample: this.playOrStopSample,
        playingSample: this.state.playingSample
      })
    })
  }

  render() {
    return (
      <div>
        {this.renderChildren()}
      </div>
    )
  }
  async stopSample() {
    const stopPromises = this.state.wavStack.map(wavId => wav.stopWavFile(wavId));
    await Promise.all(stopPromises);

    this.setState({
      playingSample: false,
      wavStack: []
    });
  }
  async playSample() {
    const wavId = uuidv1();

    this.setState(prevState => ({
      playingSample: true,
      wavStack: [...prevState.wavStack, wavId]
    }));

    try {
      await wav.playWavFile(wavId, SampleStore.getFileNameOnDisk(this.props.sampleFile));
      this.setState(prevState => {
        const wavIndex = prevState.wavStack.indexOf(wavId);
        if (wavIndex > -1) {
          const newWavStack = [...prevState.wavStack];
          newWavStack.splice(wavIndex, 1);
          return {
            playingSample: newWavStack.length > 0,
            wavStack: newWavStack
          };
        }
        return prevState;
      });
    } catch (error) {
      console.error("Error playing sample:", error);
    }
  }
  async playOrStopSample() {
    if (this.state.playingSample) {
      // If you want to stop all samples when a new one is played, uncomment the next line
      await this.stopSample();
      // If you want to allow multiple samples to play at once, leave it commented out
    }

    await this.playSample();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.midi) {
      if (prevProps.sampleFile !== this.props.sampleFile ||
        prevProps.midi.note !== this.props.midi.note ||
        prevProps.midi.min !== this.props.midi.min ||
        prevProps.midi.max !== this.props.midi.max) {

        this.removeMidiHandler(prevProps.midi.note)
        this.addMidiHandler()
      }
    }
  }

  componentWillUnmount() {
    if (this.props.midi) {
      this.removeMidiHandler(this.props.midi.note)
    }
  }

  addMidiHandler() {
    if (this.props.sampleFile && this.props.midi) {
      midi.addMidiNoteOnHandler(this.handlerId, this.props.midi.note, this.props.midi.min, this.props.midi.max, async (e) => {
        await this.playSample()
      })
    }
  }

  removeMidiHandler(note) {
    if (this.handlerId) {
      midi.removeMidiNoteOnHandler(this.handlerId, note)
    }
  }
}

export default SamplePlayerComponent
