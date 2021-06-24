import BaseColorPicker from '~/colorpicker/BaseColorPicker';
import Swatch from '~/colorpicker/ui/Swatch';
import './index.scss';

export default class MiniColorPicker extends BaseColorPicker {

  components() {
    return {
      Swatch,
    };
  }

  template() {
    const colors = this.$store.dispatch('/swatch.index');
    return `
      <div class="el-colorpicker__wrap">
        ${colors.length > 0 ? `
          <template target="Swatch"></template>
        ` : `
          <div class="el-colorpicker__empty">No colorSet</div>
        `}
      </div>
    `;
  }

}
