import React, {Component} from "react";
import styles from './index.less'

// 边框上的四个小点

export default class BorderPoint extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <><div style={{ backgroundColor: this.props.pointColor || '#BC9CB8' }} className={styles.borderPoint + ' ' + styles.leftTop}></div><div style={{ backgroundColor: this.props.pointColor || '#BC9CB8' }} className={styles.borderPoint + ' ' + styles.rightTop}></div><div style={{ backgroundColor: this.props.pointColor || '#BC9CB8' }} className={styles.borderPoint + ' ' + styles.leftBottom}></div><div style={{ backgroundColor: this.props.pointColor || '#BC9CB8' }} className={styles.borderPoint + ' ' + styles.rightBottom}></div></>
        )
    }
}