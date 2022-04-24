import { createStore } from 'redux';

const initialState = {
  files : [],
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
        newState.files.push(data);
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
    case 'removeFile':
      let removeFile = ()=>{
        let { index } = data;
        newState.files = newState.files.filter((file,i)=>i!==index);;
        return newState;
      }
      return removeFile();
    default:
      return newState;
  }
}

const store = createStore(reducer);

export default store;
