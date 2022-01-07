import { Gradient } from "./Gradient";
import { Position, Length } from "../Length";
import { convertMatches, reverseMatches } from "../../util/functions/parser";
import { isString } from "../../util/functions/func";
import { ColorStep } from "./ColorStep";
const DEFINED_POSITIONS = {
  ["center"]: true,
  ["top"]: true,
  ["left"]: true,
  ["right"]: true,
  ["bottom"]: true
};

export class RadialGradient extends Gradient {
  getDefaultObject(obj = {}) {
    return super.getDefaultObject({
      type: "radial-gradient",
      radialType: "ellipse",
      radialPosition: [Position.CENTER, Position.CENTER],
      ...obj
    }); 
  }

  toCloneObject() {

    var radialPosition = this.json.radialPosition || [Length.percent(50), Length.percent(50)]

    return {
      ...super.toCloneObject(),
      radialType: this.json.radialType || 'ellipse',
      radialPosition: JSON.parse(JSON.stringify(radialPosition))
    }
  }

  isRadial() {
    return true;
  }

  toString() {
    if(this.colorsteps.length === 0) return '';        
    var colorString = this.getColorString();
    var json = this.json;
    var opt = '';
    var radialType = json.radialType;
    var radialPosition = json.radialPosition || ["center", "center"];

    if (DEFINED_POSITIONS[radialPosition]) {
      // noop 
    } else {  
      if (typeof radialPosition === 'string') {
        
      } else {
        radialPosition = radialPosition.map(it => {

          if (typeof it === 'string') {
            return it;
          }

          if (it.isString()) {
            return it.value;
          }
  
          return it.round(1000);
        }).join(' ');
      }

    }


    opt = radialPosition ? `${radialType} at ${radialPosition}` : radialType;

    return `${json.type || "radial-gradient"}(${opt}, ${colorString})`;
  }

  static parse(str) {
    var results = convertMatches(str);
    var radialType = "ellipse";
    var radialPosition = [Position.CENTER, Position.CENTER];
    var colorsteps = [];
    results.str
      .split("(")[1]
      .split(")")[0]
      .split(",")
      .map(it => it.trim())
      .forEach((newValue, index) => {
        if (newValue.includes("@")) {
          // color 복원
          newValue = reverseMatches(newValue, results.matches);

          // 나머지는 ColorStep 이 파싱하는걸로
          // ColorStep 은 파싱이후 colorsteps 를 리턴해줌... 배열임, 명심 명심
          colorsteps.push(...ColorStep.parse(newValue));
        } else {
          // direction
          if (newValue.includes("at")) {
            // at 이 있으면 radialPosition 이 있는 것임
            [radialType, radialPosition] = newValue
              .split("at")
              .map(it => it.trim());
          } else {
            // at 이 없으면 radialPosition 이 center, center 로 있음
            radialType = newValue;
          }

          if (isString(radialPosition)) {
            var arr = radialPosition.split(' ');
            if (arr.length === 1) {
              var len = Length.parse(arr[0]);

              if (len.isString()) {
                radialPosition = [len.value, len.value];
              } else {
                radialPosition = [len.clone(), len.clone()];
              }
            } else if (arr.length === 2) {
              radialPosition = arr.map(it => {
                var len = Length.parse(it);
                return len.isString() ? len.value : len;
              });
            }
          }
        }
      });

    return new RadialGradient({ radialType, colorsteps });
  }
}
 