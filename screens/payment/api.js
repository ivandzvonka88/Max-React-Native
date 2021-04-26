
export const handleSave = (parent) => {
    parent.setState({ loading: true, errors: {} });

    var maxs = parent.state.maxs

    for (const max in parent.state.maxs_copy) {
        const move = parent.state.comp_styles[max]
        maxs[move] = parent.state.maxs_copy[max]
    }

    const q = {
        cognito_id: parent.state.cognito_id,
        maxs,
        height: parent.state.height,
        bodyweight: parent.state.bodyweight,
        birthday: `${parent.state.birth_year}-${parent.state.birth_month}-${parent.state.birth_day}`,
        email: parent.state.email,
        male: parent.state.male,
        metric: parent.state.metric,
        comp_styles: parent.state.comp_styles
    }

    var errors = {}
    for (const property in q) {
        if (q[property] === null || q[property] === "") {
            errors[property] = true
        }

        if (property === 'maxs') {
            console.log(q[property])
            for (const lift in q.comp_styles) {
                const val = q[property][q.comp_styles[lift]]
                console.log(val)
                if (val.max === 0 || val.max === null || val.max === "" || val.max === "0") {
                    errors[lift] = true
                }
            }
        }
    }

    if (Object.keys(errors).length > 0) {
        // handleValidationError(errors)
        console.log('uh oh!')
    } else {
        parent.props.updateUserData(q).then(
            () => parent.setState({ loading: false, changed: [] }));
    }
}