function Validation(values){
    const errors = {}
    if (values.title === '') {
        errors.title = "Title should not be empty"
    }else{
        errors.title = ''
    }
    if (values.note === '') {
        errors.note = "Note should not be empty"
    }else{
        errors.note = ''
    }

    return errors
}

export default Validation 

