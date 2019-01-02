
const iniPerson = [
  {
  id: 1,
  personName: "Tanawat",
  personHeight: 170,
  personWeight: 60,
  bmi: 20.76,
  bmiDiff: '+-0',
  editing: false,
  },
  {
  id: 2,
  personName: "Kamonchanok",
  personHeight: 162,
  personWeight: 50,
  bmi: 19.05,
  bmiDiff: "+-0",
  editing: false,
  }
]
const personReducer = (state = iniPerson, action) => {
    switch(action.type) {
      case 'ADD_PERSON':
        return state.concat([action.data])
      case 'DELETE_PERSON':
        return state.filter((person)=>person.id !== action.id)
      case 'EDIT_PERSON':
        return state.map((person)=>person.id === action.id ? {...person, editing: !person.editing}:person)
      case 'UPDATE_PERSON':
        return state.map((person)=>{
          if(person.id === action.id){
            return {
              ...person,
              personName: action.data.newName,
              personHeight: action.data.newHeight,
              personWeight: action.data.newWeight,
              bmi: action.data.bmi,
              bmiDiff: action.data.bmiDiff,
              editing: !person.editing
            }
          }else{
            return person
          }
        })
      default:
        return state
    }
  }
  export default personReducer