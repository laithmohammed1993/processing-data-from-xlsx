import { createStore } from 'redux';

const initialState = {
  files : {},
  value : {
    pageHeader : `هيئة مشاريع بغداد
قسم ادارة التشييد                                                                     استمارة صرف أجور العمال (الأجر يومي)
مشروع أنشاء خزاني سعة 18000م3   / مصفى الدورة              جدول الحضور للفترة من 1/3/2022 ولغاية   31/3/2022`,
    pageTotal : `المجموع / `,
    pageFooter : `مسؤول الفعالية                    المسؤول الإداري                  محاسب المشروع                          مدير الموقع                     مدير قسم التشييد                الحاسبة                   مدير الهيئة
                                    عقيل غضبان سلمان                احمد فؤاد صالح                       براق غازي ورشان`,
  },
}

const reducer = (state=initialState,action)=>{
  let newState = { ...state };
  let { type , data } = action;
  switch (type) {
    case 'addNewFile':
      let addNewFile = ()=>{
        let entries = Object.entries(newState.files);
        entries.push([String(entries.length),data]);
        console.log(entries)
        newState.files = Object.fromEntries(entries);
        return newState;
      }
      return addNewFile();
    case 'restartState':
      return initialState;
    case 'setValue':
      let setValue = ()=>{
        newState.value[data.name] = data.value;
        return newState;
      }
      return setValue();
    default:
      return newState;
  }
}

const store = createStore(reducer);

export default store;
