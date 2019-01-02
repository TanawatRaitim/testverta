import React, { Component } from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

class BmiModal extends Component {
    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.props.toggle} className={this.props.className} backdrop="static">
                <ModalHeader toggle={this.props.toggle}>BMI Result</ModalHeader>
                <ModalBody>
                    <strong>{this.props.text}</strong>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default BmiModal