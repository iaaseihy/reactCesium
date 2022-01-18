/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import styles from './styles.less';

let actionList = ['总体规划','详细计划','土地征收','土地储备','土地利用','土地回收']
let actionCancel = ['已申请','仓库已取消','财务已退款','已取消']

export default class progressBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isStatus: true,
            isCancel: true,
            currentIndex: null,
        }
      }
      
      minusItem = () => {
            var nodeList = document.getElementsByClassName(styles.itembox)[0].childNodes;
            var childDiv = document.getElementsByClassName(styles.itembox)[0].children[0].className
      }

      plusItem = () => {
          
     }
     clickLi = (child) => {
        console.log(child)
        this.setState({
            currentIndex: child.key
        })
        if(child.key === this.state.currentIndex){
            return styles.licative
         }else {
             return ''
         }
     }
     getLiClass = (child) => {
         if(child.key === this.state.currentIndex){
            return styles.licative
         }else {
             return ''
         }
     }
      render() {
        // let {isStatus, isCancel} = this.status;
        let itemArr = [
            {
                name: '社区',
                Key: '0',
                children:[
                    {
                        name: '社区',
                        key: '0-0',
                    },
                    {
                        name: '街道',
                        key: '0-1',
                    },
                    {
                        name: '区县',
                        key: '0-2',
                    },
                ]
            },
            {
                name: '宗地',
                Key: '1',
                children:[
                    {
                        name: '地籍区',
                        key: '1-0',
                    },
                    {
                        name: '地籍子区',
                        key: '1-1',
                    },
                    {
                        name: '宗地',
                        key: '1-2',
                    },
                ]
            },
            {
                name: '土地供应',
                key: '2',
                children:[

                ]
            },
            {
                name: '建筑',
                key: '3',
                children:[

                ]
            },
            {
                name: '管线',
                key: '4',
                children:[

                ]
            },
            {
                name: '水系',
                key: '5',
                children:[

                ]
            },
            {
                name: '城市交通',
                key: '6',
                children:[

                ]
            },
            {
                name: '规划单元',
                key: '7',
                children:[

                ]
            },
            {
                name: '工程建设项目',
                key: '8',
                children:[

                ]
            },
        ]
        return (
            <>
                 <div style={{display:'flex',position:'absolute',width:'600px',backgroundColor:'rgba(8, 13, 42, 0.9)',right:'30%',justifyContent:'space-between'}} className={styles.bar}>
                     <div onClick={() => this.minusItem()}>《</div>
                {
                    itemArr.map((item)=>{
                        return <div className={styles.itembox}>
                            <div id={['item']} className={styles.item}>{item.name}
                            <ul className={styles.ulpanel} style={{position:'absolute',display:'block',alignItems:'center',justifyContent:'center',}}>
                                {
                                    item.children && item.children.map((child)=>{
                                        return <li className={this.getLiClass(child)} onClick={()=>this.clickLi(child)}>{child.name}</li>
                                    })
                                }
                            </ul>
                            </div>
                        </div>
                    })
                }
                <div onClick={() => this.plusItem()}>》</div>
                </div>
                </>
        )
    }
}

