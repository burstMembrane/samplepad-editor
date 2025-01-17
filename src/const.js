export const Actions = {
  /* drive action types */
  LOAD_DRIVE: 'LOAD_DRIVE',
  SET_DEVICE_TYPE: 'SET_DEVICE_TYPE',
  RESET_SAMPLES: 'RESET_SAMPLES',

  /* kit action types */
  SORT_KITS: 'SORT_KITS',
  RESET_KITS: 'RESET_KITS',
  ADD_KIT: 'ADD_KIT',
  UPDATE_KIT_PROPERTY: 'UPDATE_KIT_PROPERTY',
  UPDATE_KIT_STATE: 'UPDATE_KIT_STATE',

  /* pad action types */
  ADD_PADS: 'ADD_PADS',
  ADD_PAD: 'ADD_PAD',
  UPDATE_PAD_PROPERTY: 'UPDATE_PAD_PROPERTY',

  /* app action types */
  SET_SELECTED_KIT_ID: 'SET_SELECTED_KIT_ID',
  SET_ACTIVE_KIT_ID: 'SET_ACTIVE_KIT_ID',

  /* modal action types */
  SHOW_MODAL_CONFIRM_OVERWRITE: 'SHOW_MODAL_CONFIRM_OVERWRITE',
  HIDE_MODAL_CONFIRM_OVERWRITE: 'HIDE_MODAL_CONFIRM_OVERWRITE',
  SHOW_MODAL_CONFIRM_LOAD_CARD: 'SHOW_MODAL_CONFIRM_LOAD_CARD',
  HIDE_MODAL_CONFIRM_LOAD_CARD: 'HIDE_MODAL_CONFIRM_LOAD_CARD',

  /* notice action types */
  SHOW_NOTICE: 'SHOW_NOTICE'
};

export const PadErrors = {
  VELOCITY_SWAPPED_A: 'VELOCITY_SWAPPED_A',
  VELOCITY_TOO_HIGH_A: 'VELOCITY_TOO_HIGH_A',
  VELOCITY_SWAPPED_B: 'VELOCITY_SWAPPED_B',
  VELOCITY_TOO_HIGH_B: 'VELOCITY_TOO_HIGH_B',
  DUPLICATE_MIDI_NOTE: 'DUPLICATE_MIDI_NOTE',
};

export const PadErrorStrings = {
  VELOCITY_SWAPPED_A: 'Velocity must be in order (min-max)',
  VELOCITY_TOO_HIGH_A: 'Velocity values must be 127 or lower',
  VELOCITY_SWAPPED_B: 'Velocity must be in order (min-max)',
  VELOCITY_TOO_HIGH_B: 'Velocity values must be 127 or lower',
  DUPLICATE_MIDI_NOTE: 'Midi Note must be unique'
};

export const KitErrors = {
  INVALID_KIT_NAME: 'INVALID_KIT_NAME',
};

export const KitErrorStrings = {
  INVALID_KIT_NAME: 'Kit name contains invalid characters (A-Z, a-z, 0-9 only)',
};

export const DragItemTypes = {
  SAMPLE: 'sample'
};

export const Drive = {
  DEVICE_ID_FILE: ".sampleeditordevice",
  SAMPLE_FILE_TYPE: "wav",
  SAMPLE_EXTENSION: ".wav",
  KIT_EXTENSION: ".KIT",
  KIT_FILE_TYPE: "KIT",
  KIT_DIRECTORY: "KITS",
  MAX_SAMPLES: 511,
  MAX_FILENAME_LENGTH: 8
};

export const DeviceType = {
  SAMPLEPAD_PRO: 'samplepad_pro',
  SAMPLERACK: 'samplerack'
}

export const KitBuffer = {
  CHECKSUM_BYTE: 0x08,

  // pads are written to the kit file in this order
  PAD_FILE_ORDER: {
    [DeviceType.SAMPLEPAD_PRO]: [
      'pad_01', 'pad_02', 'pad_03', 'pad_04', 'pad_05', 'pad_06', 'pad_07', 'pad_08', 'ext_1a', 'ext_1b',
      'ext_2', 'kick', 'hh_ope', 'hh_mid', 'hh_clo', 'hh_chk', 'hh_spl'
    ],
    [DeviceType.SAMPLERACK]: [
      'snr_a', 'snr_b', 'tom1a', 'tom1b', 'tom2a', 'tom2b', 'tom3a', 'tom3b', 'cr1a', 'cr1b', 'cr2a', 'cr2b', 'ridea',
      'ride2', 'rideb', 'kick', 'hha_op', 'hhb_op', 'hha_md', 'hhb_md', 'hha_cl', 'hhb_cl', 'hh_chk', 'hh_spl'
    ],
  },

  /* Map of each pad to its memory block start location: {pad: [block1_start, block2_start]} */
  PAD_MEMORY_BLOCK_LOCATIONS: {
    [DeviceType.SAMPLERACK]: {
      kick: [0x0F80, 0x2780],
      snr_a: [0x0080, 0x1880],
      snr_b: [0x0180, 0x1980],
      tom1a: [0x0280, 0x1A80],
      tom1b: [0x0380, 0x1B80],
      tom2a: [0x0480, 0x1C80],
      tom2b: [0x0580, 0x1D80],
      tom3a: [0x0680, 0x1E80],
      tom3b: [0x0780, 0x1F80],
      cr1a: [0x0880, 0x2080],
      cr1b: [0x0980, 0x2180],
      cr2a: [0x0A80, 0x2280],
      cr2b: [0x0B80, 0x2380],
      ridea: [0x0C80, 0x2480],
      ride2: [0x0D80, 0x2580],
      rideb: [0x0E80, 0x2680],
      hha_op: [0x1080, 0x2880],
      hha_md: [0x1280, 0x2A80],
      hha_cl: [0x1480, 0x2C80],
      hhb_op: [0x1180, 0x2980],
      hhb_md: [0x1380, 0x2B80],
      hhb_cl: [0x1580, 0x2D80],
      hh_chk: [0x1680, 0x2E80],
      hh_spl: [0x1780, 0x2F80]
    },

    [DeviceType.SAMPLEPAD_PRO]: {
      pad_01: [0x0080, 0x1180],
      pad_02: [0x0180, 0x1280],
      pad_03: [0x0280, 0x1380],
      pad_04: [0x0380, 0x1480],
      pad_05: [0x0480, 0x1580],
      pad_06: [0x0580, 0x1680],
      pad_07: [0x0680, 0x1780],
      pad_08: [0x0780, 0x1880],
      ext_1a: [0x0880, 0x1980],
      ext_1b: [0x0980, 0x1A80],
      ext_2: [0x0A80, 0x1B80],
      kick: [0x0B80, 0x1C80],
      hh_ope: [0x0C80, 0x1D80],
      hh_mid: [0x0D80, 0x1E80],
      hh_clo: [0x0E80, 0x1F80],
      hh_chk: [0x0F80, 0x2080],
      hh_spl: [0x1080, 0x2180]
    }
  },

  /* Map of each parameters memory start location in its param block */
  PAD_PARAM_MEMORY_LOCATION: [
    {
      'location': 0x07,
      'level': 0x29,
      'tune': 0x2d,
      'pan': 0x31,
      'reverb': 0x35,
      'midiNote': 0x39,
      'mode': 0x3d,
      'sensitivity': 0x41,
      'mgrp': 0x49
    },
    {
      'level': 0x29,
      'tune': 0x2d,
      'pan': 0x31,
      'reverb': 0x35,
      'midiNote': 0x39,
      'mode': 0x3d,
      'sensitivity': 0x41,
      'mgrp': 0x49,
      'velocityMin': 0x82,
      'velocityMax': 0x83,
      'fileNameLength': 0x87,
      'fileName': 0x90,
      'velocityMinB': 0xa2,
      'velocityMaxB': 0xa3,
      'fileNameLengthB': 0xa7,
      'fileNameB': 0xb0,
    }
  ],

  /*
   * Map of which params to read from which blocks
   * leaves out filenames, since they require the length to read
   */
  PAD_PARAM_READ_BLOCKS: [
    ['location', 'level', 'tune', 'pan', 'reverb', 'midiNote', 'mode', 'sensitivity', 'mgrp'],
    ['velocityMin', 'velocityMax', 'fileNameLength', 'velocityMinB', 'velocityMaxB', 'fileNameLengthB']
  ]
};

/*
 * Map pad types to the pad name and default midi note
 * This is also used to determine the order we want to display the pads
 */
export const MidiMap = {
  [DeviceType.SAMPLERACK]: {
    kick: ["Bass Drum 1", 36],
    snr_a: ["Snare Drum 1", 38],
    snr_b: ["Snare Drum 2", 40],
    tom1a: ["High Tom 2", 48],
    tom1b: ["High Tom 1", 50],
    tom2a: ["Mid Tom 2", 45],
    tom2b: ["Mid Tom 1", 47],
    tom3a: ["Low Tom 1", 43],
    tom3b: ["Low Tom 2", 58],
    cr1a: ["Crash Cymbal 1", 49],
    cr1b: ["Splash Cymbal", 55],
    cr2a: ["Crash Cymbal 2", 57],
    cr2b: ["Chinese Cymbal", 52],
    ridea: ["Ride Cymbal 1", 51],
    rideb: ["Ride Bell", 53],
    ride2: ["Ride Cymbal 2", 59],
    hha_op: ["Open Hi-hat 1", 46],
    hha_md: ["Mid Hi-hat 1", 23],
    hha_cl: ["Closed Hi-hat 1", 42],
    hhb_op: ["Open Hi-hat 2", 26],
    hhb_md: ["Mid Hi-hat 2", 24],
    hhb_cl: ["Closed Hi-hat 2", 22],
    hh_chk: ["Pedal Hi-hat", 44],
    hh_spl: ["Spl Hi-hat 1", 21]
  },

  [DeviceType.SAMPLEPAD_PRO]: {

    pad_01: ["Pad 1", 49],
    pad_02: ["Pad 2", 51],
    pad_03: ["Pad 3", 48],
    pad_04: ["Pad 4", 45],
    pad_05: ["Pad 5", 46],
    pad_06: ["Pad 6", 36],
    pad_07: ["Pad 7", 38],
    pad_08: ["Pad 8", 42],
    ext_1a: ["External Pad 1A", 38],
    ext_1b: ["External Pad 1B", 40],
    ext_2: ["External Pad 2", 43],
    kick: ["Kick Pedal", 36],
    hh_ope: ["Open Hi-hat", 46],
    hh_mid: ["Mid Hi-hat", 23],
    hh_clo: ["Closed Hi-hat", 42],
    hh_chk: ["Pedal Hi-hat", 44],
    hh_spl: ["Spl Hi-hat", 21]
  }
}

export const GMDrumMap = new Map([
  [35, "Acoustic Bass Drum"],
  [36, "Bass Drum 1"],
  [37, "Side Stick"],
  [38, "Acoustic Snare"],
  [39, "Hand Clap"],
  [40, "Electric Snare"],
  [41, "Low Floor Tom"],
  [42, "Closed Hi Hat"],
  [43, "High Floor Tom"],
  [44, "Pedal Hi-Hat"],
  [45, "Low Tom"],
  [46, "Open Hi-Hat"],
  [47, "Low-Mid Tom"],
  [48, "Hi-Mid Tom"],
  [49, "Crash Cymbal 1"],
  [50, "High Tom"],
  [51, "Ride Cymbal 1"],
  [52, "Chinese Cymbal"],
  [53, "Ride Bell"],
  [54, "Tambourine"],
  [55, "Splash Cymbal"],
  [56, "Cowbell"],
  [57, "Crash Cymbal 2"],
  [58, "Vibraslap"],
  [59, "Ride Cymbal 2"],
  [60, "Hi Bongo"],
  [61, "Low Bongo"],
  [62, "Mute Hi Conga"],
  [63, "Open Hi Conga"],
  [64, "Low Conga"],
  [65, "High Timbale"],
  [66, "Low Timbale"],
  [67, "High Agogo"],
  [68, "Low Agogo"],
  [69, "Cabasa"],
  [70, "Maracas"],
  [71, "Short Whistle"],
  [72, "Long Whistle"],
  [73, "Short Guiro"],
  [74, "Long Guiro"],
  [75, "Claves"],
  [76, "Hi Wood Block"],
  [77, "Low Wood Block"],
  [78, "Mute Cuica"],
  [79, "Open Cuica"],
  [80, "Mute Triangle"],
  [81, "Open Triangle"]
]);
