import './scss/index.scss'

import Util from './util/index'
import ColorPicker from './colorpicker/index'
import GradientPicker from './gradient/index'

export default {
    ...Util,
    ...ColorPicker,
    ...GradientPicker
} 