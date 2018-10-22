import {log} from '../services/BluzelleService'

log.observe(v => {

    if(logs.length === logs_max_length) {
        logs.shift();
    }


    const date = new Date();

    const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds();

    logs.push({
        send_or_receive: v.newValue[0],
        json: v.newValue[1],
        time
    });

});


const logs_max_length = 5;
const logs = observable([]);


@observer
export class Log extends Component {

    render() {

        return (
            <BS.ListGroup flush>

                {logs.reverse().map((msg, i) =>

                    <BS.ListGroupItem 
                    color={msg.json.error !== undefined ? 'danger' : ''}
                    key={i}
                    style={{
                        wordBreak: 'break-all'
                    }}>

                        <BS.ListGroupItemHeading>
                            <span>
                                <i 
                                style={{
                                    color: msg.send_or_receive === 'Sending' ? 'orange' : 'purple'
                                }}
                                className={
                                    msg.send_or_receive === 'Sending' ? "fas fa-sign-out-alt" : "fas fa-sign-in-alt fa-flip-horizontal"
                                }></i>
                            </span>
                            &nbsp; &nbsp;&nbsp;&nbsp;
                            <BS.Badge pill>{msg.time}</BS.Badge>
                        </BS.ListGroupItemHeading>
                        

                        <BS.ListGroupItemText style={{
                            fontFamily: 'monospace'
                        }}>
                            {JSON.stringify(msg.json)}
                        </BS.ListGroupItemText>
                        

                    </BS.ListGroupItem>

                )}
            </BS.ListGroup>
        );
    }
}
