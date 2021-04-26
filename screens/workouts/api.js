import axios from 'axios';
import { Auth } from 'aws-amplify';

const workoutsUrl = `https://rtazrn3d21.execute-api.ap-northeast-1.amazonaws.com/dev/api/workouts`

const config = { headers: { 'Content-Type': 'application/json' } };

const extendMovements = async (newData, props) => {
    if (newData.length) {
        var newItems = props.state.items
        newItems = newItems.concat(newData)

        // loop through newItems and write sliderText
        for (const micro of newItems) {
            var next_week = newItems[micro.micro_count - 1]
            var last_week = newItems[micro.micro_count + 1]

            var left_arrow = last_week ? "‹  " : ""
            var right_arrow = next_week ? "  ›" : ""

            micro['sliderText'] = `${left_arrow}Week ${micro.micro_count + 1}${right_arrow}`

            micro.days = micro.days.filter(day => day.movements.length > 0)

            for (const day_idx in micro.days) {
                const day = micro.days[day_idx]

                var next_day = micro.days[parseInt(day_idx) + 1]
                var last_day = micro.days[parseInt(day_idx) - 1]

                var left_day_arrow = last_day ? "‹  " : ""
                var right_day_arrow = next_day ? "  ›" : ""

                day['sliderText'] = `${left_day_arrow}${day.day_of_week.en}, ${day.date_utc}${right_day_arrow}`
            }
        }

        props.setState({
            items: newItems
        });
    } else {
        console.log('No new items, setting hasMore to false')
        props.setState({
            hasMore: false,
            message: "That's all!",
        });
    }

    // console.log('this.state after extendMovements:', props.state);
};

export const fetchData = async (payload, props, range = null) => {
    // Mixpanel.track('get workouts');
    console.log(process.env)
    const date = new Date()
    var authToken = await (await Auth.currentSession()).idToken.jwtToken;
    var headers = { 'Authorization': authToken }

    const data = {
        cognito_id: payload.cognito_id,
        program_id: props.state.stripe_id,
        micro_hold_offset: payload.micro_hold_offset,
        metric: props.state.metric,
        local_date: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`,
        program_start: props.state.start_date
    };

    if (range) {
        data['start_micro'] = range['start_micro'];
        data['end_micro'] = range['end_micro']
    }

    data['start_micro'] = "0";
    data['end_micro'] = "2"

    return axios
        .get(workoutsUrl, { params: data, headers })
        .then(data => {
            const workouts = data.data;
            return extendMovements(workouts, props);
        })
        .catch(err => console.log(err));
};

export const fetchMoreData = (items, payload, props) => {
    if (items.length) {
        const lowest_micro = items[items.length - 1]['micro_count']
        // console.log(`fetching more data... with lowest_micro ${lowest_micro}`);

        const range = { 'end_micro': lowest_micro, 'start_micro': lowest_micro - 2 }

        fetchData(payload, props, range);
    } else {
        console.log('running fetchMoreData with a zero list of items...')
    }
};

export const submitResultsData = changedResults => {
    // console.log(changedResults);
    return sendResults(changedResults);
};

export const sendResults = async (data, parent) => {
    // Mixpanel.track('send results');
    console.log('wow sending results...', parent.state.loadingMovement)
    var authToken = await (await Auth.currentSession()).idToken.jwtToken;
    var specialConfig = config;
    specialConfig.headers.Authorization = authToken;

    const payload = {
        metric: parent.state.metric,
        new_obj: data
    }

    return axios
        .post(workoutsUrl, payload, specialConfig)
        .then(data => {
            // console.log(data);
            return data;
        })
        .catch(err => {
            // console.log(err);
            return 'error';
        });
};

export const submitResults = async (child, idxs, parent) => {
    const rir = child.value
    var items = parent.state.items;
    var micro = items[idxs[0]]
    var day = micro.days[idxs[1]]
    var movement = day.movements[idxs[2]]
    var next_movement = day.movements[parseInt(idxs[2]) + 1]
    var set = JSON.parse(JSON.stringify(movement.sets[idxs[3]]))

    set.cognito_id = parent.state.cognito_id;
    set.program_id = parent.state.stripe_id;

    set.rir = parseInt(rir)
    set.written = true;
    console.log('sending results...')

    items[idxs[0]].days[idxs[1]].movements[idxs[2]].sets[idxs[3]] = set
    parent.setState({
        show: false,
        loadingMovement: movement.movement_id,
        items
    })

    sendResults(set, parent).then((e) => {
        parent.setState({ loadingMovement: '' })
        if (e === 'error') {
            set.written = false;
            console.log('ERROR! ' + e);
            // setDialog(<Translate id="screens.workouts.layout.error" />, parent); //error
        } else {
            items[idxs[0]] = e.data.program;
            var new_move = items[idxs[0]].days[idxs[1]].movements[idxs[2]]

            // loop through newItems and write sliderText
            // literally copypasted from above because I couldn't get a 
            // fucking function call to work
            // TODO: refactor this
            for (const micro of items) {
                var next_week = items[micro.micro_count - 1]
                var last_week = items[micro.micro_count + 1]

                var left_arrow = last_week ? "‹  " : ""
                var right_arrow = next_week ? "  ›" : ""

                micro['sliderText'] = `${left_arrow}Week ${micro.micro_count + 1}${right_arrow}`

                micro.days = micro.days.filter(day => day.movements.length > 0)

                for (const day_idx in micro.days) {
                    const day = micro.days[day_idx]

                    var next_day = micro.days[parseInt(day_idx) + 1]
                    var last_day = micro.days[parseInt(day_idx) - 1]

                    var left_day_arrow = last_day ? "‹  " : ""
                    var right_day_arrow = next_day ? "  ›" : ""

                    day['sliderText'] = `${left_day_arrow}${day.day_of_week.en}, ${day.date_utc}${right_day_arrow}`
                }
            }

            if (new_move.sets.length === set.set_order + 1 || set.rir === -1) {
                console.log('next_movement:', next_movement);
                if (day.movements.length === movement.movement_order + 1) {
                    parent.setState({
                        items,
                        expandedMovement: null,
                    });
                } else {
                    // handleClick(movement, movement.movement_id, parent)

                    // setTimeout(function () {
                    //     handleClick(next_movement, next_movement.movement_id, parent)
                    // }, 50)

                    parent.setState({ items });
                }
            } else {
                parent.setState({
                    items,
                });
            }

            // if ('snackbar_message' in e.data) {
            //     parent.setState({
            //         snackbarMessage: e.data.snackbar_message,
            //         snackbarOpen: true
            //     })
            // }
        }
    })

}