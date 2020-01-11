// these are references to all information needed to parse parameters out of a file
export default Object.freeze({
  // map setup {note: [level, tune, pan, reverb, sensitivity, mgrp, velocity_min, velocity_max, display_name, filename], ...}

  // todo: need to store references to all layer b param locations
  NOTE_MAP: {
    36: [0x00000fa9,0x00000fad,0x00000fb1,0x00000fb5,0x00000fc1,0x00000fc9,0x00002802,0x00002803,0x00002808,0x00002810]
  },

  // the index in the above map which each param uses
  PROP_MAP_KEY: {
    'level': 0,
    'tune': 1,
    'pan': 2,
    'reverb': 3,
    'sensitivity': 4,
    'mgrp': 5,
    'velocity_min': 6,
    'velocity_max': 7,
    'display_name': 8,
    'filename': 9
  },

  // the data type for each prop
  PROP_TYPE: {
    'level': 'int8',
    'tune': 'int8',
    'pan': 'int8',
    'reverb': 'int8',
    'sensitivity': 'int8',
    'mgrp': 'int8',
    'velocity_min': 'int8',
    'velocity_max': 'int8',
    'display_name': 'string',
    'filename': 'string'
  },

  // the number of bytes to read for a string prop
  PROP_LENGTH: {
    'display_name': 8,
    'filename': 8
  }
});