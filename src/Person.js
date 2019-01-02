import React, { Component } from 'react'
import {connect} from 'react-redux'

class Person extends Component{
    render(){
        const bmi = this.props.person.bmi
        let bmiColorClass = '';
        if(bmi<18.5)
        {
            bmiColorClass = 'text-danger'
        }else if(bmi >= 18.5 && bmi <=22.9)
        {
            bmiColorClass = 'text-success'
        }else if(bmi >=23 && bmi <=30)
        {
            bmiColorClass = 'text-info'
        }else if(bmi >=30)
        {
            bmiColorClass = 'text-primary'
        }

        return (
            <tr>
                <td>{this.props.person.personName}</td>
                <td className={bmiColorClass}><strong>{this.props.person.bmi}</strong></td>
                <td>{this.props.person.bmiDiff}</td>
                <td>
                <button
                    className="btn btn-sm btn-info"
                    onClick={()=>this.props.dispatch({type: 'EDIT_PERSON', id:this.props.person.id})}
                >Edit</button>
                &nbsp;
                <button
                    className="btn btn-sm btn-danger"
                    onClick={()=>this.props.dispatch({type: 'DELETE_PERSON', id: this.props.person.id})}
                >Remove</button>
                </td>
            </tr>
        )
    }
}

export default connect()(Person)