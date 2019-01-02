import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import Person from './Person'
import EditPerson from './EditPerson'

class AllPerson extends Component {
    render() {
        const personSort = this.props.persons.slice(0)
        personSort.sort((a,b)=>{
            return a.bmi-b.bmi
        })

    return (
        <div>
            <h3>All Person</h3>
            <table className="table table-small">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>BMI</th>
                        <th>Diff (Kg)</th>
                        <th colSpan="3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {personSort.map((person,i)=>(
                    <Fragment key={person.id}>
                        {person.editing ? <EditPerson key={person.id} person={person}/>
                            : <Person key={person.id} person={person}/>
                        }
                    </Fragment>
                ))}
                </tbody>
            </table>
        </div>
    )
   }
}

const mapStateToProps = (state) => {
    return {
        persons: state
    }
}

export default connect(mapStateToProps)(AllPerson)