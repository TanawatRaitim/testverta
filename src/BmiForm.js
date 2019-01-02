import React, { Component } from 'react'
// import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import BmiModal from './BmiModal'
import {connect} from 'react-redux'

class BmiForm extends Component {

    state = {
        yourName: 'Welcome To BMI Form',
        yourBmi: '',
        modalShow: false,
        modalData: ''
    }

    toggleModal = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
    }

    getBmi = (e) => {
        let weight = this.getWeight.value
        let height = this.getHeight.value
        this.setState({
            yourBmi: (weight/(Math.pow((height/100),2))).toFixed(2)
        })
    }

    handleNameChange = (e) => {
        let personName = this.getName.value

        if(personName)
        {
            this.setState({
                yourName: personName
            })
        }else{
            this.setState({
                yourName: 'Welcome To BMI Form'
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const personName = this.getName.value;
        const personHeight = this.getHeight.value
        const personWeight = this.getWeight.value
        const bmi = (personWeight/(Math.pow((personHeight/100),2))).toFixed(2)

        // 20.7 = median(18.5, 22.9)
        const weightStandard = 20.7*(Math.pow((personHeight/100),2))
        let bmiResult = ''
        let bmiDiff = 0

        if(bmi<18.5)
        {
            bmiDiff = (personWeight - weightStandard).toFixed(2)
            bmiResult = 'คุณน้ำหนักน้อยกว่ามาตรฐาน'
        }else if(bmi >= 18.5 && bmi <=22.9)
        {
            bmiDiff = '+-0'
            bmiResult = 'คุณน้ำหนักปกติ'
        }else if(bmi >=23 && bmi <=24.9)
        {
            bmiDiff = (personWeight - weightStandard).toFixed(2)
            bmiResult = 'คุณอ้วนระดับ1'
        }else if(bmi >=25 && bmi <=29.9)
        {
            bmiDiff = (personWeight - weightStandard).toFixed(2)
            bmiResult = 'คุณอ้วนระดับ2'
        }else if(bmi >=30)
        {
            bmiDiff = (personWeight - weightStandard).toFixed(2)
            bmiResult = 'คุณอ้วนระดับ3'
        }
        else{
            bmiResult = 'N/A'
        }

        const data = {
            id: this.props.persons.length + 1,
            personName,
            personHeight,
            personWeight,
            editing: false,
            bmi: bmi,
            bmiDiff: bmiDiff
        }

        this.props.dispatch({
            type: 'ADD_PERSON',
            data
        })

        this.getName.value = ''
        this.getHeight.value = 0
        this.getWeight.value = 0
        this.setState({
            yourName: 'Welcome To BMI Form',
            modalData: bmiResult
        })
        this.toggleModal()
        this.getName.focus()

    }

    render() {
        return (
            <div>
                <div className="card bg-dark text-white col-md-6 mx-auto mt-3">
                    <div className="card-body">
                        <h5 className="card-title">BMI Form <small className="float-right">{this.state.yourName} </small></h5>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input className="form-control form-control-sm" onChange={this.handleNameChange} required type="text" ref={(input)=>this.getName = input} placeholder="Enter Your Name" />
                            </div>
                            <div className="form-group">
                                <label>Height</label>
                                <input onChange={this.getBmi} className="form-control form-control-sm" required type="number" ref={(input)=>this.getHeight = input} placeholder="Height" />
                            </div>
                            <div className="form-group">
                                <label>Weight</label>
                                <input onChange={this.getBmi} className="form-control form-control-sm" required type="number" ref={(input)=>this.getWeight = input} placeholder="Weight" />
                            </div>
                            <button className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>

                <BmiModal
                show={this.state.modalShow}
                toggle={this.toggleModal}
                text={this.state.modalData}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        persons: state
    }
}

export default connect(mapStateToProps)(BmiForm)