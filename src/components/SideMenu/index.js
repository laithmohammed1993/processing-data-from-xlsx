import React from 'react'
import { Link } from 'react-router-dom';
import Icons from '../Icons';
import './style.css';

function SideMenu() {
  let [ state,setstate ] = React.useReducer((s,d)=>({ ...s,...d }),{ 'selectedPage':'/' });
  return (
    <div className='side-menu-component'>
      <div>
        <Link to='/resources'>
          <div s={String( state.selectedPage==='/resources' )} className='side-menu-row' onClick={e=>setstate({ 'selectedPage':'/resources' })}>
            <div>
              <Icons name='dungeon'/>
              <p>الموارد</p>
            </div>
          </div>
        </Link>
        <Link to='/'>
          <div s={String( state.selectedPage==='/' )} className='side-menu-row' onClick={e=>setstate({ 'selectedPage':'/' })}>
            <div>
              <Icons name='file-contract'/>
              <p>البيانات</p>
            </div>
          </div>
        </Link>
        <Link to='/tables'>
          <div s={String( state.selectedPage==='/tables' )} className='side-menu-row' onClick={e=>setstate({ 'selectedPage':'/tables' })}>
            <div>
              <Icons name='file-contract'/>
              <p>الجداول</p>
            </div>
          </div>
        </Link>
        <Link to='/csv-viewer'>
          <div s={String( state.selectedPage==='/csv-viewer' )} className='side-menu-row' onClick={e=>setstate({ 'selectedPage':'/csv-viewer' })}>
            <div>
              <Icons name='file-contract'/>
              <p>CSV</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default SideMenu