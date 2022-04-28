import React from 'react'
import Icons from '../Icons';
import './style.css';

function SideMenu(props) {
  let { pathname , routing=()=>{} } = props;
  return (
    <div className='side-menu-component'>
      <div>
        <div>
          <div s={String( pathname==='/' )} onClick={e=>routing({ pathname:'/' })} className='side-menu-row' >
            <div>
              <Icons name='file-contract'/>
              <p>الملفات</p>
            </div>
          </div>
          <div s={String( pathname==='/csv-viewer' )} onClick={e=>routing({ pathname:'/csv-viewer' })} className='side-menu-row'>
            <div>
              <Icons name='file-csv'/>
              <p>القالب</p>
            </div>
          </div>
        </div>
        <div>
          <div s={String( pathname==='/about' )} onClick={e=>routing({ pathname:'/about' })} className='side-menu-row'>
            <div>
              <Icons name='code'/>
              <p>حول</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideMenu