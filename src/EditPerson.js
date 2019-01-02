import React, { Component, Fragment } from 'react'
import BmiModal from './BmiModal'
import { connect } from 'react-redux'

class EditPerson extends Component {

    state = {
        modalShow: false,
        modalData: '',
        isFinish:false ,
        data:{}
    }

    toggleModal = () => {
        this.setState({
            modalShow: !this.state.modalShow,
            isFinish: true
        })

        if(this.state.isFinish)
        {
            this.props.dispatch({ type: 'UPDATE_PERSON', id: this.props.person.id, data: this.state.data })
        }

    }

    handleEdit = (e) => {
        e.preventDefault()
        const newName = this.getName.value
        const newHeight = this.getHeight.value
        const newWeight = this.getWeight.value
        const bmi = (newWeight/(Math.pow((newHeight/100),2))).toFixed(2)

        // 20.7 = median(18.5, 22.9)
        const weightStandard = 20.7*(Math.pow((newHeight/100),2))
        let bmiResult = ''
        let bmiDiff = 0

        if(bmi<18.5)
        {
            bmiDiff = (newWeight - weightStandard).toFixed(2)
            bmiResult = 'คุณน้ำหนักน้อยกว่ามาตรฐาน'
        }else if(bmi >= 18.5 && bmi <=22.9)
        {
            bmiDiff = '+-0'
            bmiResult = 'คุณน้ำหนักปกติ'
        }else if(bmi >=23 && bmi <=24.9)
        {
            bmiDiff = (newWeight - weightStandard).toFixed(2)
            bmiResult = 'คุณอ้วนระดับ1'
        }else if(bmi >=25 && bmi <=29.9)
        {
            bmiDiff = (newWeight - weightStandard).toFixed(2)
            bmiResult = 'คุณอ้วนระดับ2'
        }else if(bmi >=30)
        {
            bmiDiff = (newWeight - weightStandard).toFixed(2)
            bmiResult = 'คุณอ้วนระดับ3'
        }
        else{
            bmiResult = 'N/A'
        }

        this.setState({
            modalData: bmiResult,
            modalShow: true
        })

        const data = {
            newName,
            newHeight,
            newWeight,
            bmi,
            bmiDiff: bmiDiff
        }

        this.setState({
            data :data
        })

        this.toggleModal()

    }

    render() {
        return (
            <Fragment>
                <tr key={this.props.key}>
                    <td>Name:  <input required type="text" ref={(input) => this.getName = input} defaultValue={this.props.person.personName} placeholder="Edit Name" /></td>
                    <td>Height: <input required type="number" ref={(input) => this.getHeight = input} defaultValue={this.props.person.personHeight} placeholder="Edit Height" /></td>
                    <td>Weight: <input required type="number" ref={(input) => this.getWeight = input} defaultValue={this.props.person.personWeight} placeholder="Edit Weight" /></td>
                    <td><button className="btn btn-sm btn-warning" onClick={this.handleEdit}>Update</button></td>
                    <td>
                    <BmiModal
                    show={this.state.modalShow}
                    toggle={this.toggleModal}
                    text={this.state.modalData}
                    />

                    </td>
                </tr>
            </Fragment>
        )
    }
}
export default connect()(EditPerson)
