// import { Conf } from "../core/conf";
import { Conf } from "../core/conf";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
// import { Util } from "../libs/util";
import { Color } from 'three/src/math/Color';

// -----------------------------------------
//
// -----------------------------------------
export class FormItem extends MyDisplay {

  // private _con:HTMLElement;
  private _div:any;

  constructor(opt:any) {
    super(opt)

    // this._con = this.qs('.con');
    this.addClass('s-gpu');

    this._div = this.qs('.con > div');

    const col = Util.instance.randomArr(Conf.instance.COLOR);

    if(Util.instance.hit(5)) {
      Tween.instance.set(this._div, {
        backgroundColor:new Color(1 - col.r, 1 - col.g, 1 - col.b).getStyle(),
        // color:col.getStyle(),
      })
    } else {
      Tween.instance.set(this._div, {
        // color:new Color(1 - col.r, 1 - col.g, 1 - col.b).getStyle(),
        backgroundColor:col.getStyle(),
      })
    }

    this._resize();
  }

  // public setRate(r:number): void {
  //   // let txt = '';
  //   // const num = ~~(r * 50);
  //   // for(let i = 0; i < num; i++) {
  //   //   txt += Util.instance.randomArr('ABCDEFGHIKLMNOPRSTUVWXYZ0123456789'.split(''));
  //   // }

  //   // this._input.innerHTML = txt;
  // }

  public setSize(w:number, h:number, dx:number): void {
    // ドロップシャドウのプロパティ
    const tgDropX = dx * 1;
    const tgDropY = Math.abs(dx) * 0;

    // ドロップシャドウの内容を連続で指定
    let drop = ''
    const num = 2;
    for(let i = 0; i < num; i++) {
      const dropX = Util.instance.mix(tgDropX, 0, i / (num - 1));
      const dropY = Util.instance.mix(tgDropY, 0, i / (num - 1));
      const col = new Color(0,0,0);
      drop += dropX + 'px ' + dropY + 'px 0px 1px ' + col.getStyle();
      if(i != num - 1) {
        drop += ',';
      }
    }

    Tween.instance.set(this.getEl(), {
      width: w,
      height: h,
    })

    Tween.instance.set(this._div, {
      width: w,
      height: h,
      x:-w * 0.5,
      y:-h * 0.5,
      // scaleY:0.9,
      boxShadow:drop
    })
  }

  protected _update(): void {
    super._update();
  }

  protected _resize(): void {
    super._resize();
  }
}