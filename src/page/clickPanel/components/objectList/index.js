import React, {Component} from "react";
import styles from './styles.less'
import BorderPoint from '../../../../publicObject/border-point'
import { Select, Table } from "antd";
import Events from '../../../../utils/event';
const {Option} = Select;

export default class ObjectList extends Component {
    constructor(props){
        super(props);
        this.state = {
            showPanel: true,
            text: '',
            tableColumns: [],
            dataSource: [],
            characterName: '社区名称',
            characterValue: '社区ID',
            characterNameCode: 'ComName',
            characterValueCode: 'ComId',
        }
    }
    componentDidMount() {
        const { types } = this.props;
        this.getTable(types)
        // Events.xiaoleiChangeEvent.add(this.getTable)
    }
    componentWillUnmount() {
        // Events.xiaoleiChangeEvent.remove(this.getTable)
    }

    getProps = (props) => {
        const { secondItemValue } = props;
    }

    getTable = (types) => {
        let characterName,characterValue;
        if (types && types.length) {
            switch (types) {
                case "glwg_sq":
                    characterName = "社区名称";
                    characterValue = "社区ID";
                    break;  
                default:
                    break;  
            }
        }
        this.setState({
            tableColumns: [
                {
                    title: '序号',
                    dataIndex: 'cloud_computing_mark',
                    key: 'cloud_computing_mark'
                },
                {
                    title: characterName,
                    dataIndex: 'project_name',
                    key: 'project_name'
                },
                {
                    title: characterValue,
                    dataIndex: 'data_scope',
                    key: 'data_scope'
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    key: 'operation',
                    render: (text, record) => (
                        <span>
                            <a className="data-location" onClick={this.locationData(text)}>定位 </a>
                            <a className="data-info" onClick={this.showDataInfo(text)}>详情</a>
                        </span>
                    )
                },
            ],
            dataSource: [
                {
                    cloun_computing_mark: "1",
                    project_name: '社区名称',
                    data_scope: "社区ID",
                },
                {
                    cloun_computing_mark: "2",
                    project_name: '街道名称',
                    data_scope: "街道ID",
                },
                {
                    cloun_computing_mark: "3",
                    project_name: '区县名称',
                    data_scope: "区县ID",
                },
                {
                    cloun_computing_mark: "4",
                    project_name: '建筑名称',
                    data_scope: "建筑编码",
                },
            ]
        })
    }

    locationData = (e) => {
        console.log(e,"==============locationData");
    }

    showDataInfo = (e) => {
        console.log(e,"========================showDataInfo");
    }

    onFocus = (e) => {
        const {text} = this.state;
        if (text !== '') return;
        this.props.onFocus && this.props.onFocus(e);
    }

    onBlur = (e) => {

    }

    handleInputChange = (e) => {

    }

    deSearch = (value) => {

    }

    onKeyup = (e) => {

    }

    search = (value) => {
        const { text } = this.state;
        if (!text) {
            this.setState({
                text: value,
            })
        }
        this.props.onSearch && this.props.onSearch(text || value);
    }

    render(){
        const {showPanel, text, tableColumns, dataSource} = this.state;
        const pagination = {
            pageSize: 3,
        }
        return (
            <>
            <div className={`${styles.panel} ${showPanel ? '' : styles.hide}`}>
                <BorderPoint/>
                <div className={styles.wrapper}>
                    <input className={styles.input} placeholder={this.props.placeholder || "请输入关键字搜索"} value={text} onFocus={() => this.onFocus()} onBlur={ () => this.onBlur()} onChange={this.handleInputChange} onKeyup={this.onKeyup}/>
                    <i className={styles.searchIcon} onClick={this.search}>&#xe646;</i>
                </div>
                <div className={styles.tablePanel}>
                    <Table columns={tableColumns} dataSource={dataSource} pagination={pagination}>

                    </Table>
                </div>
            </div>
            </>
        )
    }
}
