import React from 'react';
import './order_proBar.less'
  const OrderProgress = (props) => {   
    let isShow = {  display: 'none' }                                       //是否显示文字的3种状态
    let isTrue = { display: 'block' }
    let nowTrue = { color: '#fff' }                                         //绿色圆圈的3种状态
    let gray= { color: 'gray', background: '#fff'}
    let green= { positive: 'absolute', background: '#fff', border: '1px solid rgba(117,200,43,1)' }
    let nowPic = { color: 'gray', background: 'rgba(117,200,43,1)', border: '1px solid rgba(117,200,43,1)' }
    let lineGreen = { border: '1px solid rgba(117,200,43,1)' }                //线颜色
    let lineGray = { border: '1px solid rgba(0,0,0,0.15)' }
    let reight = { width: '8px', height: '16px',borderColor: 'rgba(117,200,43,1)',borderStyle: 'solid',borderWidth: '0 2px 2px 0',transform: 'rotate(45deg)',position: 'absolute',top: '5',left: '9'}
    const { actionList, isStatus } = props;
    return(<div>
        <div className='orderProgressBar' >
          <div style={{ display: 'flex'}}>
          {
            actionList && actionList.length && actionList.map((item, index) => {
              let nowStatus = index+1
              let color = isStatus === nowStatus ?  nowTrue : isStatus > nowStatus ? reight : isTrue
              let pic = isStatus === nowStatus ?  nowPic : isStatus > nowStatus ? green : gray
              let isNum =  isStatus <= nowStatus ? isTrue : isShow
              return (<div style={{ display: 'flex' }} >
                <div className='checkoutOrder'  >
                  <div className='isRight' style={ pic }>
                    <span style={ color } >
                      <span style={ isNum }>{index+1}</span>
                    </span>
                  </div>
                  <b>{item}</b>
                </div>
                { index < actionList.length - 1 && 
                  <span className='Barline' style={ isStatus >= (index+2) ? lineGreen : lineGray }></span> }
              </div>)
            })
          }
      </div>
    </div>
  </div> )
}

export default OrderProgress
