import Color from '@easylogic/color';
import BaseModule from '~/colorpicker/BaseModule';

export default class ColorSetsList extends BaseModule {
  initialize () {
    super.initialize();
    this.$store.currentColorSets = {};
  }

  '/list'($store) {
    return Array.isArray($store.userList) && $store.userList.length > 0 ? $store.userList : [];
  }

  '/setUserPalette' ($store, list) {
    $store.userList = list;
    $store.dispatch('/resetUserPalette');
    $store.dispatch('/setCurrentColorSets');
  }

  '/resetUserPalette' ($store) {
    if ($store.userList && $store.userList.length) {
      $store.userList = $store.userList.map((element, index) => {
        if (typeof element.colors == 'function') {
          const makeCallback = element.colors;
          element.colors = makeCallback($store);
          element._colors = makeCallback;
        }

        return Object.assign({
          name: `color-${index}`,
          colors : []
        }, element);
      });

      $store.emit('changeUserList');
    }
  }

  '/setCurrentColorSets' ($store, nameOrIndex) {
    const _list = $store.dispatch('/list');

    if (typeof nameOrIndex == 'undefined') {
      $store.currentColorSets = _list[0];
    } else if (typeof nameOrIndex == 'number') {
      $store.currentColorSets = _list[nameOrIndex];
    } else {
      $store.currentColorSets = _list.filter(function (obj) {
        return obj.name === nameOrIndex;
      })[0];
    }

    $store.emit('changeCurrentColorSets');
  }

  '/getCurrentColorSets'($store) {
    return $store.currentColorSets || [];
  }

  '/addCurrentColor'($store, color) {
    if (Array.isArray($store.currentColorSets.colors)) {
      $store.currentColorSets.colors.push(color);
      $store.emit('changeCurrentColorSets');
      $store.emit("addCurrentColor", color);
    }
  }

  '/setCurrentColorAll'($store, colors = []) {
    console.log('/setCurrentColorAll')
    $store.currentColorSets.colors = colors;
    $store.emit('changeCurrentColorSets');
  }

  '/removeCurrentColor'($store, index) {
    if ($store.currentColorSets.colors[index]) {
      $store.currentColorSets.colors.splice(index, 1);
      $store.emit('changeCurrentColorSets');
    }
  }

  '/removeCurrentColorToTheRight'($store, index) {
    if ($store.currentColorSets.colors[index]) {
      $store.currentColorSets.colors.splice(index, Number.MAX_VALUE);
      $store.emit('changeCurrentColorSets');
    }
  }

  '/clearPalette'($store) {
    if ($store.currentColorSets.colors) {
      $store.currentColorSets.colors = [];
      $store.emit('changeCurrentColorSets');
    }
  }

  '/getCurrentColors'($store ) {
    return $store.dispatch('/getColors', $store.currentColorSets);
  }

  '/getColors'($store, element) {
    if (!element) return [];
    if (element.scale) {
      return Color.scale(element.scale, element.count);
    }
    return element.colors || [];
  }

  '/getColorSetsList'($store) {
    return $store.dispatch('/list').map(element => {
      return {
        name : element.name,
        edit : element.edit,
        colors : $store.dispatch('/getColors', element)
      }
    });
  }

}
