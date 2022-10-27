import { Conf } from "../core/conf";
import { MyDisplay } from "../core/myDisplay";
import { FormBox } from "./formBox";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {


  constructor(opt:any) {
    super(opt)

    // 複製する
    const tg = document.querySelector('.l-main') as HTMLElement
    const org = document.querySelector('.l-main-con') as HTMLElement;
    for(let i = 0; i < Conf.instance.NUM; i++) {
      const el = org.cloneNode(true);
      tg.append(el);
    }

    org.remove();

    document.querySelectorAll('.l-main-con').forEach((val,i) => {
      new FormBox({
        el:val,
        id:i,
      })
    })

    this._resize();
  }

  protected _update(): void {
    super._update();
  }

  protected _resize(): void {
    super._resize();
  }
}