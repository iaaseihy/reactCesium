/* eslint-disable react/jsx-no-undef */
import React, { Component } from 'react';
import { Breadcrumb, Form, Select, Input, Table, InputNumber, Popconfirm, Typography } from 'antd';

import styles from './styles.less'
import ObjectList from './components/objectList';
// import { Option } from 'antd/lib/mentions';
const {Option} = Select;

export default class clickPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDutyDeptShow: false, //是否显示下拉框
            dutyDeptValue: '',
            xiaoleiArr: [],
            xiaolei: '',
            dalei: '',
            itemArr: [
                {
                    name: '行政区划',
                    key: '0',
                    children: [
                        {
                            name: "市级行政区",
                            key: "0-0",
                        },
                        {
                            name: "县级行政区",
                            key: "0-1",
                        },
                        {
                            name: "乡级行政区",
                            key: "0-2",
                        },
                    ]
                },
                {
                    name: '管理网格',
                    key: '1',
                    children: [
                        {
                            name: "社区",
                            key: "1-0",
                        },
                        {
                            name: "街道",
                            key: "1-1",
                        },
                        {
                            name: "区划",
                            key: "1-2",
                        },
                    ]
                },
            ],
            firstItemArr: [],
            secondItemArr: [],
            isShowBg: true,//是否显示
            isShowObject: false,//是否显示对象列表，默认不显示
        }
      }
    
    onDutyDeptClick = () => {
        this.setState({
            isDutyDeptShow: true
        })
    }
    
    onDutyDeptBlur = () => {
        this.setState({
            isDutyDeptShow: false
        })
    }
    
    onDutyDeptSelect = (LabeledValue, option) => {
        const obj = {}
        obj.Name = option.props.children
        obj.Value = LabeledValue
        const arr = this.state.dutyDeptArr
        arr.push(obj)
        this.setState({
            dutyDeptArr: arr
        })
    }

    onDutyDeptDeselect = (value) => {
        const arr = this.state.dutyDeptArr
        arr.forEach((v,i)=>{
            if(v.Value === value)
                arr.splice(i,1)
        })
        this.setState({
            dutyDeptArr: arr
        })
    }

    handleChange = (value, option) => {
        this.setState({
          dutyDeptValue: value
        })
      }
    
    daleiChange = (e) => {
        console.log(e,"============================================e")
        this.setState({
            xiaolei: '',
        })
        this.setState({
            dalei: this.state.itemArr[e].name,
        })
        this.setState({
            secondItemArr: this.state.itemArr[e].children
        })
    }

    xiaoleiChange = (e) => {
        
        let firstNO =  e.split("-")[0]
        let secondNO =  e.split("-")[1]
        console.log(e,firstNO,"asasassa+++++++++++e")
        this.setState({
            xiaolei: this.state.itemArr[firstNO].children[secondNO].name,
        })
    }
    showClick =()=>{
        const {isShowBg,isShowObject} = this.state
        this.setState({
            isShowBg:!isShowBg
        })
        if(this.state.isShowBg === true){
            this.setState({
                isShowObject: false
            })
        }
    }
    showObjectList = () => {
        const {isShowObject} = this.state
        this.setState({
            isShowObject:!isShowObject
        })
    }
    // render
    render() {
        let DutyDeptCodeList = [
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

        const {itemArr, dalei, xiaolei, xiaoleiArr, firstItemArr, secondItemArr, isShowBg, isShowObject} = this.state
        // const { getFieldDecorator } = this.props.form;
        return (
            <>

            <div className={`${styles.bar} ${isShowBg ? styles.bgShow : styles.bgHide}`}>
                <div className={styles.firstDiv}>
                <span style={{position: 'absolute',left: '9%',top: '10%',}} className='firstLabel'>实体大类</span>
                <Select style={{position: 'absolute',width: '140px',left: '6%',top: '16%',}} className={styles.firstPanel} value={dalei} onChange={this.daleiChange}>
                    {
                        itemArr.map(daleiItem => {
                            return <Option key={daleiItem.key}>{daleiItem.name}</Option>
                        })
                    }
                </Select>
                </div>
                <div className={styles.firstDiv}>
                <span style={{position: 'absolute',left: '21.5%',top: '10%',}} className='secondLabel'>实体小类</span>
                <Select style={{position: 'absolute',width: '140px',left: '19%',top: '16%',}} className={styles.secondPanel} value={xiaolei} onChange={this.xiaoleiChange}>
                    {
                        secondItemArr.map(xiaoleiItem => {
                            return <Option key={xiaoleiItem.key}>{xiaoleiItem.name}</Option>
                        })
                    }
                </Select>
                </div>
                <div className={styles.third} onClick={this.showObjectList}></div>
                {isShowBg?<div className={styles.hideBtn} onClick={this.showClick}></div>:<div className={styles.hideBtn} onClick={this.showClick}></div>}
                {/* <Panel>panel</Panel> */}
            </div>
            {isShowObject?<ObjectList types={xiaolei}/>:<div></div>}
    {/* <Form>
        <Form.Item label="社区">
            {
            // getFieldDecorator('DutyDeptCode')( 
                <Select 
                    onBlur={this.onDutyDeptBlur}
                    onChange={this.handleChange}
                    open={this.state.isDutyDeptShow}
                    mode="multiple" 
                >
                {
                    DutyDeptCodeList ? DutyDeptCodeList.map((value) => {
                        return <Option value={value.key} key={value.key}>{value.name}</Option>
                    }) : ''
                }
                </Select>
            // )
            }
            <Input 
                value={this.state.dutyDeptValue} 
                // placeholder='请选择'  
                
                onClick={this.onDutyDeptClick} 
                onFocus={this.onDutyDeptClick} 
                onBlur={this.onDutyDeptBlur}
            />
        </Form.Item>
    </Form> */}

    
    </>
        )
    }
}

