import React from 'react'
import { Link , useLocation } from 'react-router-dom';
import Icons from '../Icons';
import './style.css';

function SideMenu() {
  let route = useLocation();
  return (
    <div className='side-menu-component'>
      <div>
        <div>
          <Link to='/'>
            <div s={String( route.pathname==='/' )} className='side-menu-row'>
              <div>
                <Icons name='file-contract'/>
                <p>الملفات</p>
              </div>
            </div>
          </Link>
          <Link to='/csv-viewer'>
            <div s={String( route.pathname==='/csv-viewer' )} className='side-menu-row'>
              <div>
                <Icons name='file-csv'/>
                <p>القالب</p>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link to='/about'>
            <div s={String( route.pathname==='/about' )} className='side-menu-row'>
              <div>
                <Icons name='code'/>
                <p>حول</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SideMenu