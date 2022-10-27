import { Conf } from "../core/conf";
import { Func } from "../core/func";
import { MousePointer } from "../core/mousePointer";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Point } from "../libs/point";
import { Update } from "../libs/update";
import { Util } from "../libs/util";
import { FormItem } from "./formItem";

// -----------------------------------------
//
// -----------------------------------------
export class FormBox extends MyDisplay {

  private _id:number
  private _con:HTMLElement;
  private _conRot:Point = new Point();
  private _item:Array<FormItem> = [];

  constructor(opt:any) {
    super(opt)

    this._id = opt.id;
    this._conRot.x = this._id * 0

    this._con = this.getEl();

    this.addClass('s-gpu');

    this.qsAll('.item').forEach((val) => {
      this._item.push(new FormItem({
        el:val,
      }));
    });

    this._resize();
  }

  protected _update(): void {
    super._update();

    const sw = Func.instance.sw();
    const sh = Func.instance.sh();

    const mx = MousePointer.instance.easeNormal.x;
    const my = MousePointer.instance.easeNormal.y;

    let itemWidth = Math.max(sw, sh) * Func.instance.val(0.15, 0.1);

    let h = itemWidth;
    let totalH = h * Conf.instance.NUM;

    let y = sh * 0.5 + this._id * h - (totalH * 0.5) - h;

    let dy = Math.abs(Util.instance.map(y, -1, 1, 0, sh) - my);
    dy = Math.pow(dy, 2);
    itemWidth *= Util.instance.map(dy, 3, 0.5, 0, 0.5);
    // h = itemWidth;

    // h *= Util.instance.map(dy, 2, 0.1, 0, 0.5);
    // y = sh * 0.5 + this._id * h - (totalH * 0.5) - h - h * 0.5;
    // totalH = h * Conf.instance.NUM;
    // y = sh * 0.5 + this._id * h - (totalH * 0.5) - h;

    // const speed = Util.instance.map(dy, 1.5, 1, 0, 0.5) * mx * 5;

    // const cx = itemWidth * 0.5;
    // const cy = itemWidth * 0.5;

    // const rate = Util.instance.map(Math.sin(Util.instance.radian(this._conRot.x * 2)), 0, 1, -1, 1);
    // const rate = Math.abs(mx) * 1;

    // const it = 1 / this._item.length
    this._item.forEach((val,i) => {
      const radian = Util.instance.radian((360 / this._item.length) * i);
      const x = 0 + Math.sin(radian) * itemWidth * 0.5;
      const z = Math.cos(radian) * itemWidth * 0.5;
      let rot = Util.instance.degree(Math.atan2(z, (x - 0))) - 90;

      Tween.instance.set(val.getEl(), {
        x:x + (dy * -0.1) * sw * 0,
        z:z * -1,
        width: itemWidth,
        rotationY:rot,
      })

      if(Update.instance.cnt % 1 == 0) {
        val.setSize(itemWidth, h, mx * itemWidth);
        // val.setRate(Util.instance.map(rate, 0, 1, it * i, it * i + it));
        // val.setRate(1);
      }

    });


    Tween.instance.set(this._con, {
      x: sw * 0.5,
      rotationY:mx * 90,
      rotationX:my * -90,
      // rotationZ:this._conRot.x * 1,
      // width: itemWidth,
      // height: itemWidth,
      y:sh * 0.5,
      // z:Util.instance.map(dy, 3, 0.5, 0, 0.5) * -1,
    })
    // this._conRot.x += speed;
    this._conRot.x = Func.instance.val(0, 0) + mx * Func.instance.val(10, 5) * 20;
  }

  protected _resize(): void {
    super._resize();
  }
}